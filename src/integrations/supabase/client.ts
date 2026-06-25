import { createClient } from "@supabase/supabase-js";

const url =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://cfefaameowmukkhusdhm.supabase.co";
const anon =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZWZhYW1lb3dtdWtraHVzZGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0MDY3MDksImV4cCI6MjA5Nzk4MjcwOX0.osPwHGN7ZtV0MiBhF30n_u7oZI8251TnkLM9riZYOCg";

export const supabase = createClient(url, anon, {
  auth: {
    persistSession: typeof window !== "undefined",
    autoRefreshToken: true,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  },
});
