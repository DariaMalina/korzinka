import type { ProductCategory } from '@korzinka/contracts';

export type CatalogCategory = {
  id: ProductCategory | 'all';
  label: string;
};

export const catalogCategories: CatalogCategory[] = [
  { id: 'all', label: 'Все товары' },
  { id: 'ready-meals', label: 'Готовая еда' },
  { id: 'produce', label: 'Овощи, фрукты и зелень' },
  { id: 'dairy-eggs', label: 'Молочные продукты и яйца' },
  { id: 'meat-fish', label: 'Мясо, птица и рыба' },
  { id: 'new-products', label: 'Новинки' },
  { id: 'deli', label: 'Колбасы и деликатесы' },
  { id: 'bakery', label: 'Хлеб и выпечка' },
  { id: 'grocery', label: 'Бакалея' },
  { id: 'cakes', label: 'Торты и пирожные' },
  { id: 'confectionery', label: 'Кондитерские изделия' },
  { id: 'frozen', label: 'Замороженные продукты' },
  { id: 'water-drinks', label: 'Вода, соки и напитки' },
  { id: 'chilled-drinks', label: 'Охлаждённые напитки' },
  { id: 'tea-coffee', label: 'Кофе, чай и какао' },
  { id: 'snacks', label: 'Орехи и снеки' },
];
