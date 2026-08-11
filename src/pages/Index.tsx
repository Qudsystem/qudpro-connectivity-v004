import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Users, Briefcase, FileText, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import PostComposer from "@/components/feed/PostComposer";
import PostCard from "@/components/feed/PostCard";
import { usePosts } from "@/hooks/usePosts";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initials } from "@/lib/format";

const Index = () => {
  const { user, profile } = useAuth();
  const { data: posts = [], isLoading } = usePosts();

  const { data: stats } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: async () => {
      const [members, jobs, articles] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("jobs").select("id", { count: "exact", head: true }),
        supabase.from("posts").select("id", { count: "exact", head: true }),
      ]);
      return {
        members: members.count ?? 0,
        jobs: jobs.count ?? 0,
        articles: articles.count ?? 0,
      };
    },
  });

  const { data: suggestions = [] } = useQuery({
    queryKey: ["suggested-people", user?.id],
    queryFn: async () => {
      const query = supabase.from("profiles").select("id, full_name, headline, avatar_url").limit(5);
      const { data } = user ? await query.neq("id", user.id) : await query;
      return data ?? [];
    },
  });

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <aside className="space-y-6 lg:col-span-1">
          <Card className="overflow-hidden">
            <div className="h-16 bg-primary/10" />
            <div className="-mt-8 flex flex-col items-center p-4 text-center">
              <Avatar className="h-16 w-16 border-4 border-card">
                <AvatarImage src={profile?.avatar_url ?? undefined} alt={profile?.full_name ?? "زائر"} />
                <AvatarFallback>{initials(profile?.full_name)}</AvatarFallback>
              </Avatar>
              <h2 className="mt-2 font-semibold">{profile?.full_name || "مرحبًا بك في QudPro"}</h2>
              <p className="text-xs text-muted-foreground">
                {profile?.headline || "انضم إلى شبكة المحترفين في مصر"}
              </p>
              {user ? (
                <Button asChild variant="outline" size="sm" className="mt-3 w-full">
                  <Link to="/profile">عرض ملفي الشخصي</Link>
                </Button>
              ) : (
                <Button asChild size="sm" className="mt-3 w-full">
                  <Link to="/auth">إنشاء حساب</Link>
                </Button>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="mb-3 font-semibold">إحصائيات المنصة</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4" /> {stats?.members ?? 0} محترف
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" /> {stats?.jobs ?? 0} وظيفة
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> {stats?.articles ?? 0} منشور
              </li>
            </ul>
          </Card>
        </aside>

        <section className="lg:col-span-2">
          <h1 className="sr-only">QudPro — شبكة المحترفين في مصر</h1>
          {user ? (
            <PostComposer />
          ) : (
            <Card className="mb-6 flex items-center justify-between p-4">
              <p className="text-sm">سجّل الدخول للمشاركة والتفاعل مع المجتمع.</p>
              <Button asChild size="sm">
                <Link to="/auth">تسجيل الدخول</Link>
              </Button>
            </Card>
          )}

          {isLoading &&
            [1, 2, 3].map((i) => (
              <Card key={i} className="mb-6 space-y-4 p-4">
                <div className="flex gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-40 w-full" />
              </Card>
            ))}

          {!isLoading && posts.length === 0 && (
            <Card className="p-8 text-center text-muted-foreground">
              <Sparkles className="mx-auto mb-3 h-6 w-6" />
              لا توجد منشورات بعد — كن أول من يشارك!
            </Card>
          )}

          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>

        <aside className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="mb-4 font-semibold">أشخاص قد تعرفهم</h3>
            <div className="space-y-4">
              {suggestions.length === 0 && (
                <p className="text-sm text-muted-foreground">لا توجد اقتراحات حاليًا</p>
              )}
              {suggestions.map((person) => (
                <Link key={person.id} to={`/profile/${person.id}`} className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={person.avatar_url ?? undefined} alt={person.full_name} />
                    <AvatarFallback>{initials(person.full_name)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{person.full_name}</p>
                    <p className="truncate text-xs text-muted-foreground">{person.headline || "عضو"}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </Layout>
  );
};

export default Index;
