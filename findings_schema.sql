-- 1. Create the findings table
create table public.findings (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  finding_type text check (finding_type in ('지적', '권고')),
  tags text[] default '{}',
  year text,
  description text,
  violation_clause text,
  solution text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete set null
);

-- 2. Enable Row Level Security (RLS)
alter table public.findings enable row level security;

-- 3. Create Policy: Everyone can view findings (Public Read)
create policy "Public can view all findings" on findings
  for select using (true);

-- 4. Create Policy: Authenticated users can insert their own findings
create policy "Authenticated users can insert findings" on findings
  for insert with check (auth.role() = 'authenticated');

-- 5. Create Policy: Users can update their own findings
create policy "Users can update own findings" on findings
  for update using (auth.uid() = user_id);

-- 6. Create Policy: Users can delete their own findings
create policy "Users can delete own findings" on findings
  for delete using (auth.uid() = user_id);
