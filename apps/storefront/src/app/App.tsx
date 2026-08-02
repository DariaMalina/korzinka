import type { Product, ProductCategory } from '@korzinka/contracts';
import { useCallback, useMemo, useState } from 'react';

import { AddressDialog } from '../components/AddressDialog';
import { AccountDialog } from '../components/AccountDialog';
import { BrandLogo } from '../components/BrandLogo';
import {
  CartDialog,
  type ReplacementPreference,
} from '../components/CartDialog';
import { Catalog } from '../components/Catalog';
import { CatalogSidebar } from '../components/CatalogSidebar';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { Header } from '../components/Header';
import { ProductDialog } from '../components/ProductDialog';
import {
  HistoryDialog,
  type OrderHistoryItem,
  SuccessDialog,
  SupportDialog,
} from '../components/ServiceDialogs';
import { Toast } from '../components/Toast';
import {
  changeCartQuantity,
  getCartSummary,
  type Cart,
} from '../features/cart/cart';
import { useProducts } from '../features/catalog/useProducts';

function scrollToCatalog() {
  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
}

export function App() {
  const [address, setAddress] = useState('Выбрать адрес');
  const [category, setCategory] = useState<ProductCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<Cart>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [replacement, setReplacement] =
    useState<ReplacementPreference>('similar');
  const [toast, setToast] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState('KZ-0000');
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const { products: allProducts } = useProducts('all', '');

  const summary = useMemo(
    () => getCartSummary(cart, allProducts),
    [allProducts, cart],
  );

  const searchSuggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('ru-RU');
    if (normalizedQuery.length < 2) return [];

    return allProducts
      .filter((product) =>
        [product.name, product.categoryLabel, product.description].some(
          (value) => value.toLocaleLowerCase('ru-RU').includes(normalizedQuery),
        ),
      )
      .slice(0, 5);
  }, [allProducts, query]);

  const handleChangeQuantity = useCallback(
    (productId: string, delta: number) => {
      setCart((current) => changeCartQuantity(current, productId, delta));
      if (delta > 0) setToast('Добавили в корзинку');
    },
    [],
  );

  const handleAddressSave = (nextAddress: string) => {
    setAddress(nextAddress);
    setAddressOpen(false);
    setToast('Адрес доставки сохранён');
  };

  const handleCheckout = () => {
    const nextOrderNumber = `KZ-${String(Date.now()).slice(-4)}`;
    setOrderNumber(nextOrderNumber);
    setOrders((current) => [
      {
        cart: { ...cart },
        createdAt: new Date().toISOString(),
        itemCount: summary.itemCount,
        number: nextOrderNumber,
        totalKopecks: summary.totalKopecks,
      },
      ...current,
    ]);
    setCart({});
    setCartOpen(false);
    setSuccessOpen(true);
  };

  const handleContinueShopping = () => {
    setCartOpen(false);
    scrollToCatalog();
  };

  const handleCategoryChange = (nextCategory: ProductCategory | 'all') => {
    setCategory(nextCategory);
    window.requestAnimationFrame(scrollToCatalog);
  };

  return (
    <>
      <Header
        address={address}
        cartItemCount={summary.itemCount}
        onAddress={() => setAddressOpen(true)}
        onAccount={() => setAccountOpen(true)}
        onCart={() => setCartOpen(true)}
        onOpenProduct={setSelectedProduct}
        onSearchChange={setQuery}
        onSearchSubmit={scrollToCatalog}
        query={query}
        suggestions={searchSuggestions}
      />
      <main className="storefront-layout shell" id="top">
        <CatalogSidebar
          activeCategory={category}
          onSelect={handleCategoryChange}
        />
        <div className="storefront-layout__content">
          <CategoryShowcase
            activeCategory={category}
            onSelect={handleCategoryChange}
          />
          <Catalog
            category={category}
            cart={cart}
            onCategoryChange={handleCategoryChange}
            onChangeQuantity={handleChangeQuantity}
            onOpenProduct={setSelectedProduct}
            onQueryChange={setQuery}
            query={query}
          />
        </div>
      </main>
      <footer className="footer">
        <div className="shell footer__inner">
          <a
            aria-label="Корзинка — на главную"
            className="logo logo--footer"
            href="#top"
          >
            <BrandLogo variant="light" />
          </a>
          <p>Демо-проект сервиса экспресс-доставки продуктов</p>
          <button onClick={() => setSupportOpen(true)} type="button">
            Написать в поддержку
          </button>
        </div>
      </footer>

      <ProductDialog
        onChangeQuantity={handleChangeQuantity}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
        quantity={selectedProduct ? (cart[selectedProduct.id] ?? 0) : 0}
      />
      <CartDialog
        onChangeQuantity={handleChangeQuantity}
        onCheckout={handleCheckout}
        onClose={() => setCartOpen(false)}
        onContinueShopping={handleContinueShopping}
        onReplacementChange={setReplacement}
        open={cartOpen}
        replacement={replacement}
        summary={summary}
      />
      <AccountDialog
        address={address}
        onAddress={() => {
          setAccountOpen(false);
          setAddressOpen(true);
        }}
        onClose={() => setAccountOpen(false)}
        onHistory={() => {
          setAccountOpen(false);
          setHistoryOpen(true);
        }}
        onLogout={() => {
          setAccountOpen(false);
          setToast('Вы вышли из аккаунта');
        }}
        onSupport={() => {
          setAccountOpen(false);
          setSupportOpen(true);
        }}
        open={accountOpen}
        orderCount={orders.length}
      />
      {addressOpen ? (
        <AddressDialog
          address={address === 'Выбрать адрес' ? '' : address}
          onClose={() => setAddressOpen(false)}
          onSave={handleAddressSave}
          open
        />
      ) : null}
      <SupportDialog
        onClose={() => setSupportOpen(false)}
        onSent={() => {
          setSupportOpen(false);
          setToast('Сообщение отправлено в поддержку');
        }}
        open={supportOpen}
      />
      <HistoryDialog
        onClose={() => setHistoryOpen(false)}
        onRepeat={(order) => {
          setCart(order.cart);
          setHistoryOpen(false);
          setCartOpen(true);
          setToast('Заказ добавлен в корзинку');
        }}
        open={historyOpen}
        orders={orders}
      />
      <SuccessDialog
        onClose={() => setSuccessOpen(false)}
        open={successOpen}
        orderNumber={orderNumber}
      />
      <Toast message={toast} onClose={() => setToast(null)} />
    </>
  );
}
