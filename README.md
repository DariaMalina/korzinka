**Корзинка**

Портфолио-проект middle frontend-разработчика: responsive web-сервис экспресс-доставки продуктов.

**Основной пользовательский путь**

Авторизация → адрес → каталог и поиск → карточка товара → корзина и настройка замен → оформление → отслеживание заказа → поддержка → история заказов.

**Управление**

[GitHub Project](https://github.com/users/DariaMalina/projects/2)

[Issues](https://github.com/DariaMalina/korzinka/issues)

[Wiki](https://github.com/DariaMalina/korzinka/wiki)

[Linear project](https://linear.app/dariamalinawork/project/zapas-mvp-10-b9f0e574a859)

**Scope MVP**

В MVP входят авторизация, адреса и зоны доставки, каталог, поиск, карточка товара, корзина, замены, checkout, отслеживание заказа, история и служба поддержки.

**Локальный запуск**

Требования: Node.js 20.19+ и npm 10+.

```bash
cp .env.example .env.local
npm install
npm run dev
```

Storefront: `http://localhost:5173`  
API: `http://localhost:3001`  
Storybook: `npm run storybook`

**Яндекс Карты**

Создайте ключ в кабинете разработчика Яндекс Карт и подключите к нему пакеты
JavaScript API и API Геокодера. Для JavaScript API обязательно добавьте
ограничение по HTTP Referer: `localhost` и домен опубликованного приложения —
без протокола, порта и пути.

Заполните локальный файл `.env.local`:

```dotenv
VITE_YANDEX_MAPS_API_KEY=ключ_JavaScript_API
YANDEX_GEOCODER_API_KEY=ключ_API_Геокодера
```

`VITE_YANDEX_MAPS_API_KEY` загружается в браузер, поэтому его защищает
ограничение по Referer. `YANDEX_GEOCODER_API_KEY` используется только BFF и не
попадает в клиентскую сборку. После изменения ключей перезапустите `npm run dev`.

**Команды**

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run check
```

**Структура**

- `apps/storefront` — React-клиент;
- `apps/api` — Node.js BFF;
- `packages/ui` — библиотека компонентов;
- `packages/contracts` — схемы, типы и воспроизводимые fixtures;
- `packages/config` — общая конфигурация TypeScript.
