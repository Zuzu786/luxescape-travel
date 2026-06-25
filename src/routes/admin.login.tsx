import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin · Luxescape" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        setErr("Account created. If email confirmation is enabled, check your inbox, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Authentication failed";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-charcoal text-ivory px-4">
      <div className="w-full max-w-md border border-gold/30 p-10">
        <p className="eyebrow">Luxescape</p>
        <h1 className="font-display text-4xl mt-3">Admin Access</h1>
        <p className="text-ivory/60 text-sm mt-2">{mode === "signin" ? "Sign in to manage bookings" : "Create an admin account"}</p>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <div>
            <label className="eyebrow">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-ivory/30 focus:border-gold outline-none py-3 mt-2" />
          </div>
          <div>
            <label className="eyebrow">Password</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-ivory/30 focus:border-gold outline-none py-3 mt-2" />
          </div>
          {err && <p className="text-sm text-gold border border-gold/40 px-4 py-3">{err}</p>}
          <button type="submit" disabled={loading} className="btn-gold w-full justify-center">
            {loading ? <Loader2 className="animate-spin" size={16} /> : mode === "signin" ? "Sign in" : "Create account"}
          </button>
          <button type="button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setErr(null); }}
            className="block mx-auto text-xs uppercase tracking-[0.25em] text-ivory/60 hover:text-gold pt-4">
            {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
