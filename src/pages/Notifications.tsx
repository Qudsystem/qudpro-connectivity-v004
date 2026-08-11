import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { initials, timeAgo } from "@/lib/format";

const Notifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["notifications", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("id, type, message, read_at, created_at, actor_id, actor:profiles!notifications_actor_fkey(id, full_name, avatar_url)")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data ?? [];
    },
  });

  useEffect(() => {
    if (!user || items.length === 0) return;
    const unread = items.filter((n: any) => !n.read_at).map((n: any) => n.id);
    if (unread.length === 0) return;
    supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .in("id", unread)
      .then(() => queryClient.invalidateQueries({ queryKey: ["notifications", user.id] }));
  }, [items, user, queryClient]);

  if (!user) {
    return (
      <Layout>
        <Card className="p-8 text-center">سجّل الدخول لعرض إشعاراتك.</Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold">الإشعارات</h1>
        {isLoading && <Loader2 className="mx-auto h-6 w-6 animate-spin" />}
        {!isLoading && items.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">
            <Bell className="mx-auto mb-3 h-6 w-6" />
            لا توجد إشعارات بعد
          </Card>
        )}
        <div className="space-y-2">
          {items.map((n: any) => (
            <Card key={n.id} className={`flex items-center gap-3 p-4 ${n.read_at ? "" : "border-primary/40"}`}>
              <Avatar className="h-10 w-10">
                <AvatarImage src={n.actor?.avatar_url ?? undefined} alt={n.actor?.full_name ?? ""} />
                <AvatarFallback>{initials(n.actor?.full_name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 text-sm">
                <p>
                  {n.actor ? (
                    <Link to={`/profile/${n.actor.id}`} className="font-medium hover:underline">
                      {n.actor.full_name}
                    </Link>
                  ) : (
                    <span className="font-medium">QudPro</span>
                  )}{" "}
                  {n.message}
                </p>
                <span className="text-xs text-muted-foreground">{timeAgo(n.created_at)}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
