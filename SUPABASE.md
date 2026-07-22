# Подключение Supabase к сайту ВС РФ · в/ч №12132

Пошаговая инструкция от нуля до работающей админки: авторизация, публикация новостей, редактирование уставов.

> ⚠️ **Сайт полностью работает БЕЗ Supabase.** Если ничего из этого не делать — все страницы отображаются, устав читается, новости показывают пустое состояние. Supabase нужен только для админ-функций.

---

## Часть 1. Создание проекта Supabase

### Шаг 1. Регистрация
1. Откройте [supabase.com](https://supabase.com) → **Start your project** → зарегистрируйтесь через GitHub / email.
2. Бесплатный тариф (Free) полностью подходит: 500 МБ БД, 50 000 активных пользователей.

### Шаг 2. Новый проект
1. В дашборде нажмите **New Project**.
2. Заполните:
   - **Name**: `vsrf-12132` (любое)
   - **Database Password**: сгенерируйте и **сохраните** (пригодится, если понадобится SQL-консоль)
   - **Region**: `Frankfurt (eu-central-1)` — ближайший к РФ
   - **Pricing Plan**: Free
3. Нажмите **Create new project**. Ждите ~2 минуты, пока инициализируется.

### Шаг 3. Получение ключей
1. В левом меню: **Project Settings** (⚙️ внизу) → **API**.
2. Скопируйте два значения:

| Что | Пример |
|---|---|
| **Project URL** | `https://abcdefghij.supabase.co` |
| **anon public** key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (длинный JWT) |

> `anon key` — публичный, его безопасно класть на клиент. **Никогда не публикуйте `service_role` key** — он даёт полный доступ в обход RLS.

### Шаг 4. Вставка ключей в сайт
Откройте файл **`config.js`** в корне сайта и замените содержимое:

```js
window.SUPABASE_CONFIG={
  url:"https://abcdefghij.supabase.co",
  anonKey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
};
```

Сохраните → залейте на GitHub → готово, клиент подключается автоматически.

---

## Часть 2. Настройка авторизации

### Шаг 5. Отключение публичной регистрации
Только вы должны заводить админов, а не кто угодно с улицы.

1. **Authentication** → **Providers** → **Email**.
2. **Confirm email**: оставьте ВКЛ (для безопасности) или ВЫКЛ (для простоты — тогда не надо жать ссылку в письме).
3. Прокрутите вниз → **Allow new users to sign up**: **выключите**.
4. Сохранить.

Теперь никто не сможет зарегистрироваться сам — только вы создаёте пользователей вручную.

### Шаг 6. Создание админа
1. **Authentication** → **Users** → **Add user** → **Create new user**.
2. Введите:
   - **Email**: ваш email (например `admin@vsrf-12132.ru` — можно вымышленный)
   - **Password**: надёжный пароль (минимум 8 символов)
   - **Auto Confirm User**: ✅ ВКЛ (иначе придётся подтверждать через письмо)
3. **Create user**.

Пользователь готов. Именно этот email и пароль вводите в форму «Войти» на сайте.

Повторите для каждого администратора. Все они получат одинаковые права.

---

## Часть 3. Создание таблиц

Откройте в Supabase: **SQL Editor** (иконка `</>`) → **+ New query** → вставьте SQL ниже → **Run**.

### Шаг 7. Таблица новостей

```sql
create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null default current_date,
  tag text default 'news',
  image text,
  excerpt text,
  body text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index news_date_idx on public.news (date desc);

alter table public.news enable row level security;

create policy "news_read_all"
  on public.news for select
  to anon, authenticated
  using (true);

create policy "news_write_auth"
  on public.news for all
  to authenticated
  using (true) with check (true);
```

### Шаг 7.1. Если БД уже была — добавить поле tag

Если вы создавали таблицу `news` раньше без поля `tag`, выполните:

```sql
alter table public.news add column if not exists tag text default 'news';
```

Доступные теги (задаются из выпадающего списка в админке):
`news` — Новость · `order` — Приказ · `event` — Мероприятие · `training` — Учения · `tech` — Техника · `personnel` — Кадры · `alert` — Тревога · `announce` — Объявление

### Шаг 8. Таблица уставов

```sql
create table public.ustavy (
  slug text primary key,
  title text not null,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

alter table public.ustavy enable row level security;

create policy "ustavy_read_all"
  on public.ustavy for select
  to anon, authenticated
  using (true);

create policy "ustavy_write_auth"
  on public.ustavy for all
  to authenticated
  using (true) with check (true);
```

### Что означают RLS-политики
- **_read_all** — читать может ЛЮБОЙ (даже неавторизованный посетитель сайта). Это нужно, чтобы новости показывались обычным пользователям.
- **_write_auth** — вставлять / обновлять / удалять может только тот, кто вошёл через `auth.signInWithPassword`. Обычный посетитель не сможет.

> RLS (Row Level Security) — это защита на уровне БД. Даже если кто-то узнает `anon key` и попытается через консоль браузера удалить новости — Supabase откажет, потому что он не авторизован.

---

## Часть 4. Проверка работы

### Шаг 9. Тест авторизации
1. Откройте свой сайт → кнопка **«Войти»** в шапке.
2. Введите email и пароль админа.
3. Должно появиться сообщение «Успешный вход», модалка закроется, кнопка станет **«Выйти»**.
4. На страницах должны появиться скрытые ранее элементы: **«＋ Добавить новость»**, **«✎ Редактировать документ»** и т.п.

**Если не работает:**
- Откройте DevTools (F12) → Console. Ищите ошибки.
- «Invalid API key» → неверный `anonKey` в `config.js`.
- «Invalid login credentials» → неверный email/пароль или пользователь не подтверждён.
- «Email not confirmed» → в Supabase → Users → откройте пользователя → **Confirm email**.

### Шаг 10. Тест новости
1. На странице «Новости» → **＋ Добавить новость**.
2. Заполните: заголовок, дату, необязательно URL картинки, краткое описание, полный текст.
3. **Сохранить**. Через секунду страница обновится, новость появится.
4. Кликните на неё → откроется модалка с полным текстом.
5. Проверьте в Supabase: **Table Editor** → **news** → там ваша запись.

### Шаг 11. Тест устава
1. На странице «Уставы» → откройте любой устав → **✎ Редактировать документ**.
2. Добавьте главу, статью, примечание.
3. **Сохранить**. Устав перерендерится сразу с новыми данными.
4. Проверьте в Supabase → **Table Editor** → **ustavy** → там строка с вашим slug и JSON контентом.

---

## Часть 5. Диагностика

### Открыть логи запросов
Supabase → **Logs** → **API Edge** — видно все запросы с сайта, статусы, ошибки.

### Проверить RLS вручную
Supabase → **Authentication** → **Policies** → выберите таблицу — там визуально видны политики. Можно добавить/убрать.

### Если хочется всё удалить и начать заново

```sql
drop table if exists public.news cascade;
drop table if exists public.ustavy cascade;
```

Затем заново выполните шаги 7 и 8.

### Полезные ссылки
- Docs: https://supabase.com/docs
- Discord поддержки: https://discord.supabase.com
- Status: https://status.supabase.com

---

## Часть 6. Что можно добавить в будущем

### Загрузка изображений (Storage)
Сейчас изображения новостей — по URL. Чтобы админ мог загружать файлы:

1. Supabase → **Storage** → **New bucket** → имя `news-images` → **Public bucket**: ВКЛ.
2. В HTML заменить `<input type="url" name="image">` на `<input type="file">`.
3. В `news.html` в submit-обработчик добавить:
   ```js
   if (fileInput.files[0]) {
     const path = `${Date.now()}_${fileInput.files[0].name}`;
     await s.client.storage.from('news-images').upload(path, fileInput.files[0]);
     payload.image = s.client.storage.from('news-images').getPublicUrl(path).data.publicUrl;
   }
   ```

### Автопарк в БД (обязательно для редактирования техники админом)

```sql
create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  purpose text,
  image text,
  crew text,
  speed text,
  price text,
  rank text,
  created_at timestamptz default now()
);

alter table public.vehicles enable row level security;

create policy "veh_read_all"
  on public.vehicles for select
  to anon, authenticated
  using (true);

create policy "veh_write_auth"
  on public.vehicles for all
  to authenticated
  using (true) with check (true);
```

Страница `autopark.html` уже подключена к этой таблице. Пока в БД нет строк — показываются 9 демо-единиц. Как только админ добавит первую свою — демо исчезают, работают только записи из БД.

**Если у вас была старая таблица `vehicles` с полями `role`/`year`**, выполните:
```sql
alter table public.vehicles add column if not exists price text;
alter table public.vehicles add column if not exists rank text;
```

### Роли (админ / модератор)

```sql
alter table auth.users add column role text default 'user';

update auth.users set role='admin' where email='admin@vsrf-12132.ru';

create policy "news_admin_only" on public.news for delete
  to authenticated
  using (auth.jwt() ->> 'role' = 'admin');
```

### Резервное копирование
Supabase → **Database** → **Backups** — на Free-плане автоматические ежедневные бэкапы 7 дней. Можно скачать SQL-дамп.

---

## Итого — минимальный чек-лист

- [ ] Создан проект в Supabase
- [ ] Скопирован `Project URL` и `anon key`
- [ ] Заполнен файл `config.js` на сайте
- [ ] Отключена публичная регистрация
- [ ] Создан пользователь-админ (Auto Confirm ✅)
- [ ] Выполнен SQL для таблицы `news`
- [ ] Выполнен SQL для таблицы `ustavy`
- [ ] Проверен вход, добавление новости, редактирование устава

После этого админка полностью рабочая. Если что-то не срослось — F12 → Console → присылайте ошибку, разберём.
