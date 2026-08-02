import type { Product } from '@korzinka/contracts';
import { useCallback, useMemo, useState } from 'react';

import { Benefits } from '../components/Benefits';
import { CartDialog, type ReplacementPreference } from '../components/CartDialog';
import { Catalog } from '../components/Catalog';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProductDialog } from '../components/ProductDialog';
import {
  AddressDialog,
  HistoryDialog,
  SuccessDialog,
  SupportDialog,
} from '../components/ServiceDialogs';
import { Toast } from '../components/Toast';
import { changeCartQuantity, getCartSummary, type Cart } from '../features/cart/cart';
import { useProducts } from '../features/catalog/useProducts';

function scrollToCatalog() {
  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
}

export function App() {
  const [address, setAddress] = useState('Выбрать адрес');
  const [cart, setCart] = useState<Cart>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [replacement, setReplacement] =
    useState<ReplacementPreference>('similar');
  const [toast, setToast] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState('KZ-0000');
  const { products: allProducts } = useProducts('all', '');

  const summary = useMemo(
    () => getCartSummary(cart, allProducts),
    [allProducts, cart],
  );

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
    setOrderNumber(`KZ-${String(Date.now()).slice(-4)}`);
    setCart({});
    setCartOpen(false);
    setSuccessOpen(true);
  };

  const handleContinueShopping = () => {
    setCartOpen(false);
    scrollToCatalog();
  };

  return (
    <>
      <Header
        address={address}
        cartCount={summary.itemCount}
        onAddress={() => setAddressOpen(true)}
        onCart={() => setCartOpen(true)}
        onCatalog={scrollToCatalog}
        onHistory={() => setHistoryOpen(true)}
        onSupport={() => setSupportOpen(true)}
      />
      <main>
        <Hero onCatalog={scrollToCatalog} />
        <Benefits />
        <Catalog
          cart={cart}
          onChangeQuantity={handleChangeQuantity}
          onOpenProduct={setSelectedProduct}
        />
      </main>
      <footer className="footer">
        <div className="shell footer__inner">
          <a className="logo logo--footer" href="#top">
            Корзинка<span aria-hidden="true">.</span>
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
      <AddressDialog
        address={address === 'Выбрать адрес' ? '' : address}
        onClose={() => setAddressOpen(false)}
        onSave={handleAddressSave}
        open={addressOpen}
      />
      <SupportDialog
        onClose={() => setSupportOpen(false)}
        onSent={() => {
          setSupportOpen(false);
          setToast('Сообщение отправлено в поддержку');
        }}
        open={supportOpen}
      />
      <HistoryDialog onClose={() => setHistoryOpen(false)} open={historyOpen} />
      <SuccessDialog
        onClose={() => setSuccessOpen(false)}
        open={successOpen}
        orderNumber={orderNumber}
      />
      <Toast message={toast} onClose={() => setToast(null)} />
    </>
  );
}
