import type { Product, ProductCategory, ProductImagePosition } from './product';

type ProductSeed = {
  atlas?: string;
  badge?: string;
  description?: string;
  id: string;
  name: string;
  oldPriceKopecks?: number;
  priceKopecks: number;
  unit: string;
};

const imagePositions: ProductImagePosition[] = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];

function defineCategory(
  category: ProductCategory,
  categoryLabel: string,
  atlas: string,
  products: ProductSeed[],
): Product[] {
  return products.map((product, index) => ({
    id: product.id,
    name: product.name,
    category,
    categoryLabel,
    description:
      product.description ??
      `${product.name} с отборным составом и быстрой доставкой.`,
    priceKopecks: product.priceKopecks,
    oldPriceKopecks: product.oldPriceKopecks ?? null,
    unit: product.unit,
    badge: product.badge ?? null,
    image: {
      src: (product.atlas ?? atlas).replace(/^\//, ''),
      position: imagePositions[index % imagePositions.length]!,
    },
  }));
}

export const productFixtures: Product[] = [
  ...defineCategory(
    'ready-meals',
    'Готовая еда',
    '/catalog/atlases/ready-meals.jpg',
    [
      {
        id: 'pasta-bolognese',
        name: 'Паста болоньезе',
        priceKopecks: 34_900,
        unit: '300 г',
        badge: 'Хит',
      },
      {
        id: 'caesar-chicken',
        name: 'Цезарь с курицей',
        priceKopecks: 31_900,
        unit: '220 г',
      },
      {
        id: 'chicken-rice',
        name: 'Курица с рисом и овощами',
        priceKopecks: 37_900,
        unit: '320 г',
      },
      {
        id: 'pumpkin-soup',
        name: 'Крем-суп тыквенный',
        priceKopecks: 24_900,
        unit: '300 мл',
        badge: 'Новинка',
      },
    ],
  ),
  ...defineCategory(
    'produce',
    'Овощи, фрукты и зелень',
    '/catalog/atlases/produce.jpg',
    [
      {
        id: 'pink-tomatoes',
        name: 'Томаты розовые',
        priceKopecks: 27_900,
        oldPriceKopecks: 34_900,
        unit: '500 г',
        badge: '−20%',
      },
      {
        id: 'medium-cucumbers',
        name: 'Огурцы среднеплодные',
        priceKopecks: 18_900,
        unit: '600 г',
      },
      {
        id: 'hass-avocado',
        name: 'Авокадо Хасс',
        priceKopecks: 19_900,
        unit: '2 шт.',
        badge: 'Спелое',
      },
      {
        id: 'sweet-peppers',
        name: 'Перец сладкий микс',
        priceKopecks: 22_900,
        unit: '2 шт.',
      },
      {
        id: 'mini-bananas',
        name: 'Бананы мини',
        priceKopecks: 16_900,
        unit: '500 г',
        atlas: '/catalog/atlases/fruits.jpg',
      },
      {
        id: 'garden-strawberry',
        name: 'Клубника садовая',
        priceKopecks: 38_900,
        unit: '250 г',
        badge: 'Хит',
        atlas: '/catalog/atlases/fruits.jpg',
      },
      {
        id: 'selected-oranges',
        name: 'Апельсины отборные',
        priceKopecks: 21_900,
        unit: '1 кг',
        atlas: '/catalog/atlases/fruits.jpg',
      },
      {
        id: 'green-apples',
        name: 'Яблоки Гренни Смит',
        priceKopecks: 18_900,
        unit: '1 кг',
        atlas: '/catalog/atlases/fruits.jpg',
      },
    ],
  ),
  ...defineCategory(
    'dairy-eggs',
    'Молочные продукты и яйца',
    '/catalog/atlases/dairy-eggs.jpg',
    [
      {
        id: 'farm-milk',
        name: 'Молоко фермерское',
        priceKopecks: 12_900,
        unit: '930 мл',
        badge: 'Новинка',
      },
      {
        id: 'blueberry-yogurt',
        name: 'Йогурт с черникой',
        priceKopecks: 9_900,
        unit: '180 г',
      },
      {
        id: 'sweet-butter',
        name: 'Масло сладкосливочное',
        priceKopecks: 18_900,
        unit: '180 г',
      },
      {
        id: 'cottage-cheese',
        name: 'Творог 5%',
        priceKopecks: 14_900,
        unit: '300 г',
      },
    ],
  ),
  ...defineCategory(
    'meat-fish',
    'Мясо, птица и рыба',
    '/catalog/atlases/meat-fish.jpg',
    [
      {
        id: 'salmon-fillet',
        name: 'Филе лосося охлаждённое',
        priceKopecks: 74_900,
        unit: '300 г',
        badge: '−12%',
        oldPriceKopecks: 84_900,
      },
      {
        id: 'chicken-breast',
        name: 'Филе куриной грудки',
        priceKopecks: 39_900,
        unit: '600 г',
      },
      {
        id: 'beef-steak',
        name: 'Стейк из мраморной говядины',
        priceKopecks: 89_900,
        unit: '300 г',
        badge: 'Премиум',
      },
      {
        id: 'cod-fillet',
        name: 'Филе трески',
        priceKopecks: 52_900,
        unit: '400 г',
      },
    ],
  ),
  ...defineCategory(
    'new-products',
    'Новинки',
    '/catalog/atlases/new-products.jpg',
    [
      {
        id: 'burrata-tomatoes',
        name: 'Буррата с томатами',
        priceKopecks: 44_900,
        unit: '250 г',
        badge: 'Новинка',
      },
      {
        id: 'pistachio-croissant',
        name: 'Круассан фисташковый',
        priceKopecks: 21_900,
        unit: '140 г',
        badge: 'Новинка',
      },
      {
        id: 'berry-smoothie',
        name: 'Смузи ягодный',
        priceKopecks: 24_900,
        unit: '300 мл',
        badge: 'Новинка',
      },
      {
        id: 'mochi-mix',
        name: 'Моти ассорти',
        priceKopecks: 39_900,
        unit: '6 шт.',
        badge: 'Новинка',
      },
    ],
  ),
  ...defineCategory(
    'deli',
    'Колбасы и деликатесы',
    '/catalog/atlases/deli.jpg',
    [
      {
        id: 'milk-sausages',
        name: 'Сосиски молочные',
        priceKopecks: 34_900,
        unit: '450 г',
      },
      {
        id: 'italian-salami',
        name: 'Салями итальянская',
        priceKopecks: 42_900,
        unit: '250 г',
      },
      {
        id: 'smoked-ham',
        name: 'Ветчина копчёная',
        priceKopecks: 31_900,
        unit: '300 г',
        badge: '−15%',
        oldPriceKopecks: 37_900,
      },
      {
        id: 'turkey-slices',
        name: 'Индейка запечённая',
        priceKopecks: 36_900,
        unit: '300 г',
      },
    ],
  ),
  ...defineCategory('bakery', 'Хлеб и выпечка', '/catalog/atlases/bakery.jpg', [
    {
      id: 'almond-croissant',
      name: 'Круассан миндальный',
      priceKopecks: 15_900,
      oldPriceKopecks: 18_900,
      unit: '120 г',
      badge: '−16%',
    },
    {
      id: 'artisan-bread',
      name: 'Хлеб ремесленный',
      priceKopecks: 17_900,
      unit: '400 г',
    },
    {
      id: 'cinnamon-roll',
      name: 'Булочка с корицей',
      priceKopecks: 14_900,
      unit: '130 г',
      badge: 'Хит',
    },
    {
      id: 'french-baguette',
      name: 'Багет французский',
      priceKopecks: 12_900,
      unit: '300 г',
    },
  ]),
  ...defineCategory('grocery', 'Бакалея', '/catalog/atlases/grocery.jpg', [
    {
      id: 'fusilli-pasta',
      name: 'Макароны фузилли',
      priceKopecks: 13_900,
      unit: '450 г',
    },
    {
      id: 'rice-long-grain',
      name: 'Рис длиннозёрный',
      priceKopecks: 16_900,
      unit: '900 г',
    },
    {
      id: 'buckwheat',
      name: 'Крупа гречневая',
      priceKopecks: 12_900,
      unit: '900 г',
    },
    {
      id: 'olive-oil',
      name: 'Масло оливковое',
      priceKopecks: 69_900,
      unit: '500 мл',
      badge: 'Премиум',
    },
  ]),
  ...defineCategory('cakes', 'Торты и пирожные', '/catalog/atlases/cakes.jpg', [
    {
      id: 'classic-cheesecake',
      name: 'Чизкейк классический',
      priceKopecks: 24_900,
      unit: '130 г',
    },
    {
      id: 'chocolate-cake',
      name: 'Торт шоколадный',
      priceKopecks: 31_900,
      unit: '160 г',
      badge: 'Хит',
    },
    {
      id: 'fruit-tart',
      name: 'Тарт с ягодами',
      priceKopecks: 27_900,
      unit: '140 г',
    },
    {
      id: 'chocolate-eclair',
      name: 'Эклер шоколадный',
      priceKopecks: 15_900,
      unit: '90 г',
    },
  ]),
  ...defineCategory(
    'confectionery',
    'Кондитерские изделия',
    '/catalog/atlases/confectionery.jpg',
    [
      {
        id: 'milk-chocolate',
        name: 'Шоколад молочный',
        priceKopecks: 14_900,
        unit: '90 г',
      },
      {
        id: 'fruit-marmalade',
        name: 'Мармелад фруктовый',
        priceKopecks: 16_900,
        unit: '200 г',
      },
      {
        id: 'oatmeal-cookies',
        name: 'Печенье овсяное',
        priceKopecks: 12_900,
        unit: '250 г',
      },
      {
        id: 'vanilla-marshmallow',
        name: 'Зефир ванильный',
        priceKopecks: 18_900,
        unit: '250 г',
      },
    ],
  ),
  ...defineCategory(
    'frozen',
    'Замороженные продукты',
    '/catalog/atlases/frozen.jpg',
    [
      {
        id: 'frozen-dumplings',
        name: 'Пельмени домашние',
        priceKopecks: 39_900,
        unit: '700 г',
        badge: 'Хит',
      },
      {
        id: 'frozen-berries',
        name: 'Ягодный микс',
        priceKopecks: 29_900,
        unit: '400 г',
      },
      {
        id: 'vanilla-ice-cream',
        name: 'Мороженое пломбир',
        priceKopecks: 17_900,
        unit: '250 г',
      },
      {
        id: 'frozen-vegetables',
        name: 'Овощная смесь',
        priceKopecks: 21_900,
        unit: '400 г',
      },
    ],
  ),
  ...defineCategory(
    'water-drinks',
    'Вода, соки и напитки',
    '/catalog/atlases/water-drinks.jpg',
    [
      {
        id: 'apple-juice',
        name: 'Сок яблочный прямого отжима',
        priceKopecks: 24_900,
        unit: '1 л',
        badge: 'Без сахара',
      },
      {
        id: 'raspberry-kombucha',
        name: 'Комбуча малина',
        priceKopecks: 17_900,
        oldPriceKopecks: 19_900,
        unit: '330 мл',
        badge: '−10%',
      },
      {
        id: 'mineral-water',
        name: 'Вода минеральная газированная',
        priceKopecks: 8_900,
        unit: '750 мл',
      },
      {
        id: 'orange-juice',
        name: 'Сок апельсиновый',
        priceKopecks: 26_900,
        unit: '1 л',
      },
    ],
  ),
  ...defineCategory(
    'chilled-drinks',
    'Охлаждённые напитки',
    '/catalog/atlases/chilled-drinks.jpg',
    [
      {
        id: 'lemonade-mint',
        name: 'Лимонад мята и лайм',
        priceKopecks: 18_900,
        unit: '500 мл',
      },
      {
        id: 'iced-tea-peach',
        name: 'Холодный чай с персиком',
        priceKopecks: 16_900,
        unit: '500 мл',
      },
      {
        id: 'cold-brew',
        name: 'Кофе Cold Brew',
        priceKopecks: 22_900,
        unit: '300 мл',
        badge: 'Новинка',
      },
      {
        id: 'berry-mors',
        name: 'Морс ягодный',
        priceKopecks: 19_900,
        unit: '500 мл',
      },
    ],
  ),
  ...defineCategory(
    'tea-coffee',
    'Кофе, чай и какао',
    '/catalog/atlases/tea-coffee.jpg',
    [
      {
        id: 'coffee-beans',
        name: 'Кофе в зёрнах',
        priceKopecks: 69_900,
        unit: '500 г',
        badge: 'Премиум',
      },
      {
        id: 'earl-grey',
        name: 'Чай Эрл Грей',
        priceKopecks: 24_900,
        unit: '100 г',
      },
      {
        id: 'cocoa-powder',
        name: 'Какао натуральный',
        priceKopecks: 21_900,
        unit: '200 г',
      },
      {
        id: 'matcha-tea',
        name: 'Матча церемониальная',
        priceKopecks: 49_900,
        unit: '50 г',
        badge: 'Новинка',
      },
    ],
  ),
  ...defineCategory('snacks', 'Орехи и снеки', '/catalog/atlases/snacks.jpg', [
    {
      id: 'roasted-almonds',
      name: 'Миндаль жареный',
      priceKopecks: 29_900,
      unit: '200 г',
    },
    {
      id: 'cashew',
      name: 'Кешью натуральный',
      priceKopecks: 34_900,
      unit: '200 г',
    },
    {
      id: 'potato-chips',
      name: 'Чипсы картофельные',
      priceKopecks: 16_900,
      unit: '140 г',
    },
    {
      id: 'granola-bars',
      name: 'Батончики гранола',
      priceKopecks: 19_900,
      unit: '4 шт.',
    },
  ]),
];
