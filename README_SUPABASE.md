# Luxescape Travel — Supabase Setup

This project connects to your own Supabase project (`cfefaameowmukkhusdhm`).

## 1. Run the SQL

Open the [Supabase SQL editor](https://supabase.com/dashboard/project/cfefaameowmukkhusdhm/sql/new) and paste/run the contents of `SUPABASE_SETUP.sql`.

This creates:

- `profiles` — auto-populated on signup
- `user_roles` (with `app_role` enum + `has_role()` security-definer fn)
- `tours`, `services`, `gallery_items` (public read, admin write)
- `bookings`, `contact_messages` (public insert, admin read)
- Realtime enabled on `bookings`, `contact_messages`, `tours`
- Seeded with all tours & services

## 2. Create the admin account

1. Visit `/admin/login` on the site and click **Sign up** with your email + password.
2. Confirm email if confirmation is on, or disable it in Supabase Auth → Providers → Email.
3. Promote yourself to admin in the SQL editor:

```sql
insert into public.user_roles (user_id, role)
values ((select id from auth.users where email = 'YOUR_EMAIL'), 'admin');
```

4. Sign in at `/admin/login` → you land on `/admin`.

## 3. Secrets

The Supabase URL and anon key are in `.env`. For edge functions or service-role
work, store secrets in the Supabase dashboard (Project Settings → Edge Functions → Secrets).
