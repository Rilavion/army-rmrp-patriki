# Подключение Supabase к сайту ВС РФ (в/ч №12132)

## Шаг 1: Регистрация в Supabase

1. Перейдите на [supabase.com](https://supabase.com)
2. Нажмите "Start your project"
3. Зарегистрируйтесь через GitHub или Email
4. Создайте новый проект:
   - **Organization**: Create new → укажите название (например, "VS RF")
   - **Name**: vsrf-site
   - **Database Region**: выберите ближайший регион (Frankfurt или Singapore)
   - **Pricing Plan**: Free tier достаточно для начала

## Шаг 2: Получение ключей API

После создания проекта:

1. Перейдите в **Settings** → **API**
2. Скопируйте:
   - **Project URL** (например: `https://xxxxx.supabase.co`)
   - **anon public** ключ (начинается с `eyJ...`)

## Шаг 3: Настройка index.html

Откройте `index.html` и найдите строки:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

Вставьте после них:

```html
<script>
    const SUPABASE_URL = 'YOUR_SUPABASE_URL';
    const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
</script>
```

Замените `YOUR_SUPABASE_URL` и `YOUR_SUPABASE_ANON_KEY` на реальные значения из настроек проекта.

## Шаг 4: Создание таблиц в базе данных

### Таблица профилей пользователей

1. В Supabase Dashboard перейдите в **SQL Editor**
2. Выполните следующий SQL:

```sql
-- Создание таблицы профилей
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    callsign TEXT NOT NULL,
    rank TEXT DEFAULT 'Рядовой',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Политика: пользователи видят только свой профиль
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- Политика: пользователи могут обновлять только свой профиль
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Политика: только авторизованные пользователи могут создавать профили
CREATE POLICY "Users can create own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);
```

### Таблица новостей

```sql
-- Создание таблицы новостей
CREATE TABLE news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category TEXT DEFAULT 'Общее',
    author_id UUID REFERENCES auth.users(id),
    author_name TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Политика: все видят новости
CREATE POLICY "Anyone can read news" ON news
    FOR SELECT USING (true);

-- Политика: только авторизованные пользователи могут добавлять новости
CREATE POLICY "Authenticated users can insert news" ON news
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Политика: только автор или админ могут удалять новости
CREATE POLICY "Authors can delete own news" ON news
    FOR DELETE USING (auth.uid() = author_id);
```

### Таблица уставов (для будущего расширения)

```sql
-- Создание таблицы документов
CREATE TABLE documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    category TEXT DEFAULT 'general',
    author_id UUID REFERENCES auth.users(id),
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Политика: все видят опубликованные документы
CREATE POLICY "Anyone can read published documents" ON documents
    FOR SELECT USING (is_published = true OR auth.uid() IS NOT NULL);

-- Политика: только авторизованные могут создавать
CREATE POLICY "Authenticated users can insert documents" ON documents
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Политика: авторы могут обновлять свои документы
CREATE POLICY "Authors can update own documents" ON documents
    FOR UPDATE USING (auth.uid() = author_id);
```

### Таблица автопарка

```sql
-- Создание таблицы транспорта
CREATE TABLE vehicles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    callsign TEXT,
    status TEXT DEFAULT 'active',
    crew_count TEXT,
    armament TEXT,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Политика: все видят транспорт
CREATE POLICY "Anyone can read vehicles" ON vehicles
    FOR SELECT USING (true);

-- Политика: авторизованные могут добавлять
CREATE POLICY "Authenticated users can insert vehicles" ON vehicles
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Политика: авторизованные могут обновлять
CREATE POLICY "Authenticated users can update vehicles" ON vehicles
    FOR UPDATE USING (auth.uid() IS NOT NULL);
```

## Шаг 5: Настройка аутентификации

1. Перейдите в **Authentication** → **Settings**
2. Настройте параметры:
   - **Site URL**: `https://yourusername.github.io` (или ваш домен)
   - **Redirect URLs**: добавьте `https://yourusername.github.io/*`
3. Включите **Email auth** если не включен
4. Можно настроить **OAuth providers** (Google, GitHub) для удобства

## Шаг 6: Развёртывание на GitHub Pages

### Option A: Публичный репозиторий

1. Создайте репозиторий на GitHub: `vsrf-site`
2. Загрузите файлы: `index.html`, `styles.css`, `app.js`
3. Перейдите в **Settings** → **Pages**
4. Source: **Deploy from a branch** → **main** → **/ (root)**
5. Через минуту сайт будет доступен: `https://yourusername.github.io/vsrf-site/`

### Option B: Приватный репозиторий (рекомендуется для военных RP)

1. Создайте приватный репозиторий
2. Для развёртывания можно использовать:
   - **GitHub Codespaces** (бесплатно 60ч/мес)
   - **GitHub Actions** с деплоем на Netlify/Vercel
   - **GitHub Actions** с развёртыванием на Pages (нужен GitHub Pro)

### CI/CD через GitHub Actions

Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    concurrency:
      group: "pages"
      cancel-in-progress: false
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Шаг 7: Обновление приложения

После подключения Supabase, обновите `app.js`:

1. Замените константы на реальные значения:
```javascript
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

2. Функции `handleAddNews` и `deleteNews` уже настроены для работы с Supabase

## Структура данных

### Profiles
| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | ID пользователя |
| callsign | text | Позывной/ник |
| rank | text | Звание |
| created_at | timestamp | Дата создания |

### News
| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | ID новости |
| title | text | Заголовок |
| content | text | Текст |
| excerpt | text | Краткое описание |
| category | text | Категория |
| author_id | UUID | ID автора |
| author_name | text | Имя автора |
| image_url | text | URL изображения |
| created_at | timestamp | Дата публикации |

### Vehicles
| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | ID техники |
| name | text | Название |
| type | text | Тип (танк, БТР и т.д.) |
| callsign | text | Позывной |
| status | text | Статус |
| crew_count | text | Экипаж |
| armament | text | Вооружение |

## Безопасность

1. **RLS (Row Level Security)** - включено на всех таблицах
2. **anon key** - безопасен для клиентского кода
3. **service role key** - никогда не публикуйте в клиентском коде
4. Для критических операций добавьте проверку в RLS policies

## Тестирование

1. Зарегистрируйте нового пользователя через форму
2. Проверьте, что профиль создаётся в таблице `profiles`
3. Опубликуйте тестовую новость
4. Проверьте, что новость отображается на странице новостей

## Дополнительные возможности

### Realtime подписки
```javascript
// Слушать новые новости
supabase
    .channel('news')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'news' }, 
        payload => { console.log('New news:', payload.new); })
    .subscribe();
```

### Storage для изображений
1. Создайте bucket "images" в Supabase Storage
2. Настройте политики доступа
3. Загружайте изображения так:
```javascript
const { data, error } = await supabase.storage
    .from('images')
    .upload('news/' + file.name, file);
```

## Troubleshooting

**Ошибка CORS**: Добавьте домен в Allowed Origins в настройках Supabase

**Ошибка 401**: Проверьте, что RLS policies правильно настроены

**Не приходит email**: Проверьте папку спам, настройте email templates в Authentication
