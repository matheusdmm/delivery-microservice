create table orders (
  id uuid default uuid_generate_v4() primary key,
  customer text not null,
  items jsonb not null,
  address text not null,
  payment_method text not null,
  estimated_time text not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
