# Intelcom Frontend

Фронтенд-збірка на основі **Gulp 5** + **TailwindCSS 4** + **BrowserSync**.

## Вимоги

- [Docker](https://www.docker.com/) — більше нічого встановлювати не потрібно

## Запуск

```bash
# Перший запуск — збирає образ і стартує контейнер
docker compose up --build

# Наступні запуски (образ вже зібраний)
docker compose up

# Запуск у фоні (термінал залишається вільним)
docker compose up -d
```

Після запуску відкрийте в браузері: **http://localhost:3000/intelkom-frontend**

## Зупинка

```bash
# Якщо запущено у foreground — натисніть Ctrl+C
# Якщо запущено у фоні (-d)
docker compose down
```

## Логи

```bash
# Переглянути логи фонового контейнера
docker compose logs -f
```

## Production збірка

```bash
# Зібрати оптимізовані файли в папку dist/
docker compose run --rm frontend npm run build
```

## Структура

```
src/
├── html/       # HTML-сторінки (з підтримкою @@include)
├── styles/     # CSS (TailwindCSS)
├── js/         # JavaScript (esbuild бандлер)
└── assets/     # Зображення та інші статичні файли
dist/           # Зібрані файли (генерується автоматично)
```
