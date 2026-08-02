import { Button } from '@korzinka/ui';

type HeroProps = {
  onCatalog: () => void;
};

export function Hero({ onCatalog }: HeroProps) {
  return (
    <section className="hero" id="top">
      <div className="shell hero__inner">
        <div className="hero__copy">
          <span className="hero__eyebrow">Доставим от 15 минут</span>
          <h1>
            Свежие продукты,
            <br />
            <em>когда захочется</em>
          </h1>
          <p>
            Соберём бережно, привезём быстро. Минимальная сумма заказа — 500 ₽.
          </p>
          <Button className="hero__button" onClick={onCatalog} size="lg">
            Выбрать продукты <span aria-hidden="true">→</span>
          </Button>
        </div>
        <div aria-hidden="true" className="hero__art">
          <span className="hero__leaf hero__leaf--one">🌿</span>
          <span className="hero__leaf hero__leaf--two">🍋</span>
          <span className="hero__bag">🛍️</span>
          <span className="hero__tomato">🍅</span>
          <span className="hero__bread">🥖</span>
        </div>
      </div>
    </section>
  );
}
