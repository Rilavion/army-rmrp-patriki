# Подключение Supabase к сайту ВС РФ · в/ч №12132

Сайт **полностью работает без Supabase** — все страницы, галерея, автопарк, новости (в демо-режиме) и уставы отображаются. Supabase нужен только чтобы:

- админам входить на сайт,
- публиковать / редактировать / удалять новости,
- в будущем — редактировать уставы, автопарк, галерею.

Если Supabase не настроен, кнопка «Войти» показывает сообщение «Авторизация временно недоступна», а новости берутся из демо-массива в `js/news.js`.

---

## 1. Создание проекта

1. Зарегистрируйтесь на [supabase.com](https://supabase.com) (бесплатный план подходит).
2. Нажмите **New project**, задайте имя (например, `vsrf-12132`), пароль для БД и регион (ближайший).
3. Дождитесь инициализации (1–2 минуты).

## 2. Получение ключей

1. Откройте проект → **Project Settings** → **API**.
2. Скопируйте:
   - **Project URL** — вида `https://xxxxx.supabase.co`
   - **anon public key** — длинный JWT-токен (публичный, безопасно класть на клиент).

## 3. Вставка ключей в код

Откройте файл `js/config.js` и впишите значения:

```js
window.SUPABASE_CONFIG={
  url:"https://xxxxx.supabase.co",
  anonKey:"eyJhbGciOi..."
};
```

Больше **ничего** менять не нужно. Клиент подключается автоматически (CDN `@supabase/supabase-js@2` уже включён во все страницы).

## 4. Создание таблицы новостей

В Supabase откройте **SQL Editor** и выполните:

```sql
create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null default current_date,
  image text,
  excerpt text,
  body text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index news_date_idx on public.news (date desc);
```

## 5. Row Level Security (RLS)

Включаем RLS, разрешаем всем читать, а изменять — только авторизованным:

```sql
alter table public.news enable row level security;

create policy "news_read_all"
  on public.news for select
  to anon, authenticated
  using (true);

create policy "news_insert_auth"
  on public.news for insert
  to authenticated
  with check (true);

create policy "news_update_auth"
  on public.news for update
  to authenticated
  using (true);

create policy "news_delete_auth"
  on public.news for delete
  to authenticated
  using (true);
```

## 6. Создание администратора

1. В Supabase → **Authentication** → **Users** → **Add user** → **Create new user**.
2. Введите email и пароль администратора.
3. Отключите подтверждение email (**Auto confirm user**), либо подтвердите потом.
4. Отключите публичную регистрацию: **Authentication → Providers → Email → Confirm email + отключить sign-up**, если не нужно, чтобы кто угодно регистрировался.

## 7. Проверка

1. Откройте сайт → «Войти» → введите email/пароль администратора.
2. На странице «Новости» появится кнопка «＋ Добавить новость».
3. Публикация сохраняется в таблицу `public.news` и сразу отображается.

---

## Будущие таблицы (шаблон)

Когда захотите вынести автопарк / галерею / уставы в БД — используйте тот же паттерн (RLS: read all, write authenticated).

### Автопарк

```sql
create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  category text not null,     -- light | armor | transport | special
  title text not null,
  purpose text,
  image text,
  crew text, speed text, role text, year text,
  created_at timestamptz default now()
);
alter table public.vehicles enable row level security;
create policy "veh_read" on public.vehicles for select using (true);
create policy "veh_write" on public.vehicles for all to authenticated using (true) with check (true);
```

### Галерея

```sql
create table public.gallery (
  id uuid primary key default gen_random_uuid(),
  category text not null,     -- territory | barracks | tech | events
  title text not null,
  image text not null,
  created_at timestamptz default now()
);
alter table public.gallery enable row level security;
create policy "gal_read" on public.gallery for select using (true);
create policy "gal_write" on public.gallery for all to authenticated using (true) with check (true);
```

### Уставы (текст)

Тексты уставов сейчас лежат в `data/*.html`. Если захотите редактировать через админку — заведите таблицу:

```sql
create table public.ustavy (
  slug text primary key,
  title text not null,
  html text not null,
  updated_at timestamptz default now()
);
alter table public.ustavy enable row level security;
create policy "u_read" on public.ustavy for select using (true);
create policy "u_write" on public.ustavy for all to authenticated using (true) with check (true);
```

Затем в `ustav.html` замените `fetch('data/xxx.html')` на запрос к таблице `ustavy`.

---

## Как это работает в коде

- `js/config.js` — единственное место, где хранятся ключи.
- `js/auth.js` — модуль `VSRF_AUTH`: инициализирует клиент, обрабатывает вход/выход, показывает/скрывает `.admin-only` элементы, публикует состояние.
- `js/news.js` — модуль `VSRF_NEWS.fetchNews(limit)`: сначала пробует Supabase, при ошибке / отсутствии — возвращает демо-массив.
- Любой блок с классом `admin-only` виден только авторизованным пользователям.

Всё готово к работе. Если что-то не работает — откройте DevTools (F12) → Console.
