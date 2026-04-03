# Простой workflow для деплоя статики в GitHub Pages
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]  # 👈 Укажите вашу ветку, если она называется master, замените на "master"

  workflow_dispatch:    # Эта строчка позволяет запустить деплой вручную из вкладки Actions

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'  # 👈 '.' означает, что загружается вся папка репозитория
                       # Если ваш сайт в папке dist, замените на 'dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4