# a-core

React + Vite + TanStack Router, UI — `@alphacore/ui-kit`.

## Локально

```bash
npm install
npm run dev
```

GraphQL в dev идёт через прокси Vite (`/graphql` → см. `vite.config.ts`).

## Демо на GitHub Pages

После пуша в `main` (или ручного запуска workflow **Deploy to GitHub Pages**) статика публикуется на:

`https://GlebsHub.github.io/<имя-репозитория>/`

Включите Pages: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Секрет для API (опционально)

Если нужен свой GraphQL URL при сборке (например HTTPS-эндпоинт), в репозитории добавьте secret **`VITE_GRAPHQL_URL`**. Иначе в проде используется дефолт из `src/graphql/client.ts`.

**Важно:** страница на `https://` не может вызывать `http://` API (mixed content). Для публичного демо нужен HTTPS у бэкенда или прокси.

## Создать репозиторий и залить проект

1. На GitHub (аккаунт **GlebsHub**): **New repository** — имя, например `a-core-test`, без README (или с — тогда при первом пуше понадобится `pull --rebase`).
2. В каталоге проекта:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/GlebsHub/<имя-репозитория>.git
git push -u origin main
```

С [GitHub CLI](https://cli.github.com/): `gh repo create GlebsHub/a-core-test --private --source=. --remote=origin --push` (после `gh auth login`).
