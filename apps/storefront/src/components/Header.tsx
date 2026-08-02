type HeaderProps = {
  address: string;
  cartCount: number;
  onAddress: () => void;
  onCart: () => void;
  onCatalog: () => void;
  onHistory: () => void;
  onSupport: () => void;
};

export function Header({
  address,
  cartCount,
  onAddress,
  onCart,
  onCatalog,
  onHistory,
  onSupport,
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <a aria-label="Корзинка — на главную" className="logo" href="#top">
          Корзинка<span aria-hidden="true">.</span>
        </a>
        <nav aria-label="Основная навигация" className="site-header__nav">
          <button onClick={onCatalog} type="button">
            Каталог
          </button>
          <button onClick={onHistory} type="button">
            Заказы
          </button>
          <button onClick={onSupport} type="button">
            Поддержка
          </button>
        </nav>
        <div className="site-header__actions">
          <button className="address-button" onClick={onAddress} type="button">
            <span aria-hidden="true">⌖</span>
            <span>{address}</span>
          </button>
          <button
            aria-label={`Корзина, товаров: ${cartCount}`}
            className="cart-button"
            onClick={onCart}
            type="button"
          >
            <span aria-hidden="true">🛒</span>
            <span className="cart-button__label">Корзина</span>
            {cartCount > 0 ? (
              <span aria-hidden="true" className="cart-button__count">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}
