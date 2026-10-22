# AEROVA — быстрый запуск и публикация

Это **демонстрационный** сайт вымышленного энергетического SaaS, сделанный как портфолио-кейс под вакансию magier. Никаких настоящих клиентов, результатов или работающей аналитики он не заявляет. Основная документация на английском — в README.md.

## Уже реализовано

Astro-страницы, адаптивный интерфейс, React-калькулятор, схемы Sanity Studio (`homePage`, `insight`, `siteSettings`), GROQ-запросы, тесты исходной структуры и GitHub Pages workflow. Без Sanity ID сайт показывает демо-контент; Studio появляется после подключения аккаунта.

## Запуск на компьютере

Нужны Node.js >=22.12 и npm. Распакуй архив и выполни в директории `aerova-astro-sanity`:

```bash
npm install
npm run dev
```

Далее открой адрес из консоли (обычно http://localhost:4321).

## Публикация

1. На GitHub создай **новый пустой публичный репозиторий** `aerova-astro-sanity` у пользователя `iprubakhin-blip`. Не добавляй README при создании.
2. В директории сайта:

```bash
git init
git branch -M main
git add .
git commit -m "Initial AEROVA Astro site"
git remote add origin https://github.com/iprubakhin-blip/aerova-astro-sanity.git
git push -u origin main
```

3. На GitHub: **Settings → Pages → Source: GitHub Actions**. После успешной сборки ссылка должна быть `https://iprubakhin-blip.github.io/aerova-astro-sanity/`.
4. Создай проект на https://www.sanity.io/manage и dataset `production`. Скопируй project ID.
5. В GitHub репозитории: **Settings → Secrets and variables → Actions → Variables**. Добавь `PUBLIC_SANITY_PROJECT_ID` и `PUBLIC_SANITY_DATASET=production`. Перезапусти workflow.
6. В Sanity Manage разреши CORS-origin `https://iprubakhin-blip.github.io` с credentials; открой `/aerova-astro-sanity/studio/`, войди и опубликуй документы. Для первичного заполнения данных см. `scripts/seed-sanity.mjs` в английском README.
7. После изменений контента повторно запускай GitHub Actions deploy (сайт статический). Подключать вебхуки можно позднее.

Пока не проверена полноценная сборка `npm run build` и не создан Sanity project ID, нельзя утверждать, что сайт уже опубликован или что Sanity интеграция проверена end-to-end. Для заявки magier обязательно приложи **реальную, открывающуюся ссылку**.

## Альтернатива

Можно подключить Vercel: после публикации репозитория импортируй его в Vercel, build `npm run build`, output `dist`, без `DEPLOY_TARGET=github-pages`. На Vercel будут работать HTTP 301 из `vercel.json`, в отличие от GitHub Pages.
