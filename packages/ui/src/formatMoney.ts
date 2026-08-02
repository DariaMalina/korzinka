const moneyFormatter = new Intl.NumberFormat('ru-RU', {
  currency: 'RUB',
  maximumFractionDigits: 0,
  style: 'currency',
});

export function formatMoney(kopecks: number) {
  return moneyFormatter.format(kopecks / 100).replace('₽', '₽');
}
