import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Send, MessageSquare, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { initials, timeAgo } from "@/lib/format";

interface Msg {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  created_at: string;
  sender: { id: string; full_name: string; avatar_url: string | null } | null;
  recipient: { id: string; full_name: string; avatar_url: string | null } | null;
}

const Messages = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [params] = useSearchParams();
  const [activeId, setActiveId] = useState<string | null>(params.get("to"));
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select(
          "id, sender_id, recipient_id, content, created_at, sender:profiles!messages_sender_fkey(id, full_name, avatar_url), recipient:profiles!messages_recipient_fkey(id, full_name, avatar_url)"
        )
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as Msg[];
    },
  });

  const { data: activePerson } = useQuery({
    queryKey: ["chat-person", activeId],
    enabled: !!activeId,
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, headline")
        .eq("id", activeId!)
        .maybeSingle();
      return data;
    },
  });

  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("messages-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, () => {
        queryClient.invalidateQueries({ queryKey: ["messages", user.id] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);

  const threads = useMemo(() => {
    const map = new Map<string, { person: Msg["sender"]; last: Msg }>();
    messages.forEach((m) => {
      const other = m.sender_id === user?.id ? m.recipient : m.sender;
      if (!other) return;
      map.set(other.id, { person: other, last: m });
    });
    return Array.from(map.values());
  }, [messages, user]);

  const thread = messages.filter(
    (m) =>
      (m.sender_id === user?.id && m.recipient_id === activeId) ||
      (m.recipient_id === user?.id && m.sender_id === activeId)
  );

  const send = async () => {
    const content = text.trim();
    if (!content || !user || !activeId) return;
    if (content.length > 2000) {
      toast({ variant: "destructive", description: "الرسالة طويلة جدًا" });
      return;
    }
    setSending(true);
    const { error } = await supabase
      .from("messages")
      .insert({ sender_id: user.id, recipient_id: activeId, content });
    setSending(false);
    if (error) {
      toast({ variant: "destructive", description: "تعذّر إرسال الرسالة" });
      return;
    }
    setText("");
    queryClient.invalidateQueries({ queryKey: ["messages", user.id] });
  };

  if (!user) {
    return (
      <Layout>
        <Card className="p-8 text-center">سجّل الدخول لعرض رسائلك.</Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-2xl font-bold">الرسائل</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-3 md:col-span-1">
            {isLoading && <Loader2 className="mx-auto my-6 h-5 w-5 animate-spin" />}
            {!isLoading && threads.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">لا توجد محادثات بعد</p>
            )}
            {threads.map(({ person, last }) => (
              <button
                key={person!.id}
                onClick={() => setActiveId(person!.id)}
                className={`flex w-full items-center gap-3 rounded-md p-2 text-right transition-colors hover:bg-muted ${
                  activeId === person!.id ? "bg-muted" : ""
                }`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={person!.avatar_url ?? undefined} alt={person!.full_name} />
                  <AvatarFallback>{initials(person!.full_name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{person!.full_name}</p>
                  <p className="truncate text-xs text-muted-foreground">{last.content}</p>
                </div>
              </button>
            ))}
          </Card>

          <Card className="flex h-[60vh] flex-col md:col-span-2">
            {activeId ? (
              <>
                <div className="border-b p-4 font-semibold">{activePerson?.full_name ?? "محادثة"}</div>
                <div className="flex-1 space-y-3 overflow-y-auto p-4">
                  {thread.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground">ابدأ المحادثة الآن</p>
                  )}
                  {thread.map((m) => (
                    <div key={m.id} className={`flex ${m.sender_id === user.id ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                          m.sender_id === user.id ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{m.content}</p>
                        <span className="mt-1 block text-[10px] opacity-70">{timeAgo(m.created_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 border-t p-3">
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="اكتب رسالة..."
                  />
                  <Button onClick={send} disabled={sending || !text.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
                <MessageSquare className="mb-2 h-8 w-8" />
                اختر محادثة للبدء
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
