# a-core

**[➡️ Посмотреть демо](https://glebshub.github.io/A-core)**

Клиент на **React** + **Vite** + **TanStack Router** с UI **@alphacore/ui-kit**: вход по GraphQL, дерево функциональных классов, карточка объекта (описание, характеристики, связи).

Просмотр — **по ссылке выше**; локально поднимать не обязательно.

---

<details>
<summary>Локальный запуск</summary>

```bash
npm install
npm run dev
```

GraphQL в dev: прокси `/graphql` → `vite.config.ts`.

</details>

<details>
<summary>Деплой на GitHub Pages (для мейнтейнеров)</summary>

После пуша в `main` workflow **Deploy to GitHub Pages** публикует сборку на `https://glebshub.github.io/<имя-репозитория>/` (имя репо = сегмент пути).

**Settings → Pages → Source: GitHub Actions.**

Опционально secret **`VITE_GRAPHQL_URL`** (HTTPS), если нужен свой GraphQL при сборке. Иначе — дефолт из `src/graphql/client.ts`.

С **https://** страницы нельзя вызывать **http://** API (mixed content); для публичного демо нужен HTTPS у API или прокси.

</details>
