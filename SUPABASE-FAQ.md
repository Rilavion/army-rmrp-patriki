# FAQ таблица (опционально)

Если хотите чтобы FAQ хранился в Supabase (а не в localStorage браузера), выполните:

```sql
create table if not exists public.faq(
  id text primary key,
  cat text default 'Общее',
  q text not null,
  a text not null,
  sort bigint default 0,
  updated_at timestamptz default now()
);

alter table public.faq enable row level security;

create policy "public read faq" on public.faq for select using (true);
create policy "auth write faq"  on public.faq for insert with check (auth.role() = 'authenticated');
create policy "auth update faq" on public.faq for update using (auth.role() = 'authenticated');
create policy "auth delete faq" on public.faq for delete using (auth.role() = 'authenticated');
```

Без таблицы всё работает через localStorage — просто вопросы будут «жить» только в браузере админа, который их создал.
