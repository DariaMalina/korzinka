const benefits = [
  {
    icon: '⏱',
    title: 'Быстро',
    text: 'Привезём заказ от 15 минут',
  },
  {
    icon: '🥬',
    title: 'Свежо',
    text: 'Проверяем качество при сборке',
  },
  {
    icon: '💬',
    title: 'На связи',
    text: 'Поддержка поможет с заказом',
  },
] as const;

export function Benefits() {
  return (
    <section aria-label="Наши преимущества" className="benefits shell">
      {benefits.map((benefit) => (
        <article className="benefit" key={benefit.title}>
          <span aria-hidden="true" className="benefit__icon">
            {benefit.icon}
          </span>
          <div>
            <h2>{benefit.title}</h2>
            <p>{benefit.text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
