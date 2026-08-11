import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, UserPlus, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { initials } from "@/lib/format";

const Network = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: people = [] } = useQuery({
    queryKey: ["people", search, user?.id],
    queryFn: async () => {
      let query = supabase.from("profiles").select("id, full_name, headline, avatar_url, location").limit(30);
      if (search.trim()) query = query.ilike("full_name", `%${search.trim()}%`);
      if (user) query = query.neq("id", user.id);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: connections = [] } = useQuery({
    queryKey: ["connections", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("connections")
        .select(
          "id, status, requester_id, addressee_id, requester:profiles!connections_requester_fkey(id, full_name, headline, avatar_url), addressee:profiles!connections_addressee_fkey(id, full_name, headline, avatar_url)"
        )
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const respond = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "accepted" | "rejected" }) => {
      const { error } = await supabase.from("connections").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      toast({ description: "تم تحديث طلب الاتصال" });
    },
  });

  const sendRequest = useMutation({
    mutationFn: async (targetId: string) => {
      if (!user) throw new Error("سجّل الدخول أولًا");
      const { error } = await supabase
        .from("connections")
        .insert({ requester_id: user.id, addressee_id: targetId });
      if (error) throw error;
      await supabase.from("notifications").insert({
        user_id: targetId,
        actor_id: user.id,
        type: "connection",
        message: "أرسل لك طلب اتصال",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      toast({ description: "تم إرسال طلب الاتصال" });
    },
    onError: (e: Error) =>
      toast({ variant: "destructive", description: e.message.includes("duplicate") ? "سبق أن أرسلت طلبًا" : e.message }),
  });

  const pending = connections.filter((c: any) => c.status === "pending" && c.addressee_id === user?.id);
  const accepted = connections.filter((c: any) => c.status === "accepted");

  const PersonRow = ({ person, action }: { person: any; action?: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-3 border-b py-3 last:border-0">
      <Link to={`/profile/${person.id}`} className="flex min-w-0 items-center gap-3">
        <Avatar>
          <AvatarImage src={person.avatar_url ?? undefined} alt={person.full_name} />
          <AvatarFallback>{initials(person.full_name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate font-medium">{person.full_name}</p>
          <p className="truncate text-xs text-muted-foreground">{person.headline || "عضو في QudPro"}</p>
        </div>
      </Link>
      {action}
    </div>
  );

  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-bold">شبكتي</h1>

        <Tabs defaultValue="discover">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discover">اكتشف</TabsTrigger>
            <TabsTrigger value="requests">الطلبات ({pending.length})</TabsTrigger>
            <TabsTrigger value="connections">اتصالاتي ({accepted.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="discover">
            <Card className="mt-4 p-4">
              <div className="relative mb-2">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ابحث عن محترفين بالاسم..."
                  className="pr-9"
                />
              </div>
              {people.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">لا توجد نتائج</p>}
              {people.map((person) => (
                <PersonRow
                  key={person.id}
                  person={person}
                  action={
                    user && (
                      <Button size="sm" variant="outline" onClick={() => sendRequest.mutate(person.id)}>
                        <UserPlus className="ml-2 h-4 w-4" /> اتصال
                      </Button>
                    )
                  }
                />
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card className="mt-4 p-4">
              {pending.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">لا توجد طلبات جديدة</p>}
              {pending.map((c: any) => (
                <PersonRow
                  key={c.id}
                  person={c.requester}
                  action={
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => respond.mutate({ id: c.id, status: "accepted" })}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => respond.mutate({ id: c.id, status: "rejected" })}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  }
                />
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="connections">
            <Card className="mt-4 p-4">
              {accepted.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">لا توجد اتصالات بعد</p>}
              {accepted.map((c: any) => {
                const other = c.requester_id === user?.id ? c.addressee : c.requester;
                return (
                  <PersonRow
                    key={c.id}
                    person={other}
                    action={
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/messages?to=${other.id}`}>مراسلة</Link>
                      </Button>
                    }
                  />
                );
              })}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Network;
