
-- Revoke EXECUTE on SECURITY DEFINER trigger function from public roles (it's only used by trigger)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- has_role is used inside RLS policies; security definer execution by signed-in users is required for RLS checks via SQL,
-- but we don't need anon to call it directly.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Tighten permissive INSERT policies that use WITH CHECK (true)
DROP POLICY IF EXISTS "bookings public insert" ON public.bookings;
CREATE POLICY "bookings public insert"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    full_name IS NOT NULL AND length(btrim(full_name)) BETWEEN 1 AND 200
    AND email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND length(email) <= 320
    AND (phone IS NULL OR length(phone) <= 40)
    AND (message IS NULL OR length(message) <= 5000)
  );

DROP POLICY IF EXISTS "contact public insert" ON public.contact_messages;
CREATE POLICY "contact public insert"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND length(btrim(name)) BETWEEN 1 AND 200
    AND email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND length(email) <= 320
    AND message IS NOT NULL AND length(btrim(message)) BETWEEN 1 AND 5000
  );
