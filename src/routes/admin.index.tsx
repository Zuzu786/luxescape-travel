import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Mail, CalendarCheck, Loader2 } from "lucide-react";

interface Booking {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  travel_date: string | null;
  guests: number | null;
  message: string | null;
  status: string;
  created_at: string;
}
interface ContactMsg {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard · Luxescape" }] }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [tab, setTab] = useState<"bookings" | "messages">("bookings");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate({ to: "/admin/login" });
        return;
      }
      setEmail(user.email ?? "");
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");
      const ok = (roles?.length ?? 0) > 0;
      if (!mounted) return;
      setIsAdmin(ok);
      if (ok) {
        const [{ data: b }, { data: m }] = await Promise.all([
          supabase.from("bookings").select("*").order("created_at", { ascending: false }),
          supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
        ]);
        setBookings((b as Booking[]) ?? []);
        setMessages((m as ContactMsg[]) ?? []);
      }
      setLoading(false);
    })();

    // Realtime subscriptions
    const ch = supabase
      .channel("admin-rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, (payload) => {
        setBookings((prev) => {
          if (payload.eventType === "INSERT") return [payload.new as Booking, ...prev];
          if (payload.eventType === "DELETE") return prev.filter((x) => x.id !== (payload.old as Booking).id);
          return prev.map((x) => (x.id === (payload.new as Booking).id ? (payload.new as Booking) : x));
        });
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "contact_messages" }, (payload) => {
        setMessages((prev) => [payload.new as ContactMsg, ...prev]);
      })
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(ch);
    };
  }, [navigate]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }

  if (loading) {
    return <div className="min-h-screen grid place-items-center bg-charcoal text-ivory"><Loader2 className="animate-spin text-gold" /></div>;
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center bg-charcoal text-ivory px-6">
        <div className="max-w-md text-center border border-gold/30 p-10">
          <h1 className="font-display text-3xl">Not an admin</h1>
          <p className="text-ivory/60 mt-3 text-sm">Your account <b>{email}</b> needs the admin role. Run this in Supabase SQL:</p>
          <code className="block mt-4 bg-ivory/5 p-3 text-gold/80 text-[11px] break-all">
            insert into user_roles (user_id, role) values ((select id from auth.users where email='{email}'), 'admin');
          </code>
          <button onClick={signOut} className="btn-gold mt-6 w-full justify-center">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-ivory">
      <header className="border-b border-gold/20 px-6 lg:px-12 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center border border-gold text-gold font-display text-xl">L</span>
          <div>
            <p className="font-display text-lg leading-none">Luxescape</p>
            <p className="eyebrow mt-1">Admin Console</p>
          </div>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-ivory/60 hidden sm:inline">{email}</span>
          <button onClick={signOut} className="flex items-center gap-2 text-ivory/70 hover:text-gold"><LogOut size={16} /> Sign out</button>
        </div>
      </header>

      <div className="px-6 lg:px-12 py-10">
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
          <Stat icon={CalendarCheck} label="Bookings" value={bookings.length} active={tab === "bookings"} onClick={() => setTab("bookings")} />
          <Stat icon={Mail} label="Messages" value={messages.length} active={tab === "messages"} onClick={() => setTab("messages")} />
        </div>

        <div className="mt-10 border border-gold/20">
          <table className="w-full text-sm">
            <thead className="bg-ivory/5 text-left text-gold uppercase tracking-[0.2em] text-xs">
              {tab === "bookings" ? (
                <tr><Th>Created</Th><Th>Name</Th><Th>Email</Th><Th>Phone</Th><Th>Date</Th><Th>Guests</Th><Th>Status</Th></tr>
              ) : (
                <tr><Th>Created</Th><Th>Name</Th><Th>Email</Th><Th>Subject</Th><Th>Message</Th></tr>
              )}
            </thead>
            <tbody>
              {tab === "bookings" && bookings.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-ivory/40">No bookings yet — they appear here instantly.</td></tr>}
              {tab === "messages" && messages.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-ivory/40">No messages yet.</td></tr>}
              {tab === "bookings" && bookings.map((b) => (
                <tr key={b.id} className="border-t border-ivory/10 hover:bg-ivory/5">
                  <Td>{new Date(b.created_at).toLocaleDateString()}</Td>
                  <Td>{b.full_name}</Td><Td>{b.email}</Td><Td>{b.phone ?? "—"}</Td>
                  <Td>{b.travel_date ?? "—"}</Td><Td>{b.guests ?? 1}</Td>
                  <Td><span className="text-gold uppercase tracking-[0.2em] text-xs">{b.status}</span></Td>
                </tr>
              ))}
              {tab === "messages" && messages.map((m) => (
                <tr key={m.id} className="border-t border-ivory/10 hover:bg-ivory/5">
                  <Td>{new Date(m.created_at).toLocaleDateString()}</Td>
                  <Td>{m.name}</Td><Td>{m.email}</Td><Td>{m.subject ?? "—"}</Td>
                  <Td className="max-w-md truncate">{m.message}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, active, onClick }: { icon: React.FC<{ size?: number }>; label: string; value: number; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`text-left p-6 border transition ${active ? "border-gold bg-gold/5" : "border-ivory/15 hover:border-gold/50"}`}>
      <Icon size={22} />
      <p className="font-display text-4xl mt-3">{value}</p>
      <p className="eyebrow mt-1">{label}</p>
    </button>
  );
}
const Th = ({ children }: { children: React.ReactNode }) => <th className="px-4 py-3 font-medium">{children}</th>;
const Td = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <td className={`px-4 py-3 ${className}`}>{children}</td>;
