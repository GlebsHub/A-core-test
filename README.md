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

**Если по ссылке демо 404 («There isn't a GitHub Pages site here»)** — сайт ещё не опубликован. Сделай по шагам:

1. **Включить Pages под Actions**  
   Репозиторий на GitHub → **Settings → Pages → Build and deployment → Source: GitHub Actions** (не «Deploy from a branch»). Без этого шага сайта не будет вообще.

2. **Запустить workflow**  
   Вкладка **Actions** → workflow **Deploy to GitHub Pages** → последний запуск должен быть **зелёным** (jobs `build` и `deploy`). Если жёлтая точка «ожидает разрешения» — в том же run нажми **Review deployments** и подтверди `github-pages`.

3. **Правильный URL**  
   Адрес вида `https://glebshub.github.io/<имя-репо>/` — сегмент **точно как имя репозитория** (регистр как на GitHub). Точный URL после успешного деплоя смотри в **Settings → Pages** (блок *Your site is live at…*).

4. **Публичный репозиторий**  
   На бесплатном аккаунте GitHub Pages для **приватных** репо часто недоступен; для демо сделай репозиторий **public** или проверь [тариф](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages).

После пуша в `main` workflow публикует сборку. Опционально secret **`VITE_GRAPHQL_URL`** (HTTPS) при сборке; иначе дефолт из `src/graphql/client.ts`. С **https://** страницы нельзя вызывать **http://** API (mixed content).

</details>
