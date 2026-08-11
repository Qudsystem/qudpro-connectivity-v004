import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MapPin, Building2, Globe, Loader2, Camera, MessageCircle, UserPlus } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { usePosts } from "@/hooks/usePosts";
import { uploadImage, validateImage } from "@/lib/upload";
import Layout from "@/components/Layout";
import PostCard from "@/components/feed/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { initials } from "@/lib/format";

const profileSchema = z.object({
  full_name: z.string().trim().min(2, "الاسم قصير جدًا").max(100),
  headline: z.string().trim().max(150).optional(),
  company: z.string().trim().max(100).optional(),
  location: z.string().trim().max(100).optional(),
  website: z.string().trim().max(255).optional(),
  bio: z.string().trim().max(2000).optional(),
});

const Profile = () => {
  const { userId } = useParams();
  const { user, profile: myProfile, refreshProfile } = useAuth();
  const queryClient = useQueryClient();
  const targetId = userId ?? user?.id;
  const isOwn = targetId === user?.id;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", targetId],
    enabled: !!targetId,
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", targetId!).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: posts = [] } = usePosts(targetId);

  const { data: connectionsCount = 0 } = useQuery({
    queryKey: ["connections-count", targetId],
    enabled: !!targetId,
    queryFn: async () => {
      const { count } = await supabase
        .from("connections")
        .select("id", { count: "exact", head: true })
        .eq("status", "accepted")
        .or(`requester_id.eq.${targetId},addressee_id.eq.${targetId}`);
      return count ?? 0;
    },
  });

  const connect = useMutation({
    mutationFn: async () => {
      if (!user || !targetId) throw new Error("سجّل الدخول أولًا");
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
    onSuccess: () => toast({ description: "تم إرسال طلب الاتصال" }),
    onError: (e: Error) => toast({ variant: "destructive", description: e.message }),
  });

  const openEdit = () => {
    setForm({
      full_name: profile?.full_name ?? "",
      headline: profile?.headline ?? "",
      company: profile?.company ?? "",
      location: profile?.location ?? "",
      website: profile?.website ?? "",
      bio: profile?.bio ?? "",
    });
    setOpen(true);
  };

  const save = async () => {
    const parsed = profileSchema.safeParse(form);
    if (!parsed.success) {
      toast({ variant: "destructive", description: parsed.error.issues[0].message });
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("profiles").update(parsed.data).eq("id", user!.id);
    setSaving(false);
    if (error) {
      toast({ variant: "destructive", description: error.message });
      return;
    }
    setOpen(false);
    await refreshProfile();
    queryClient.invalidateQueries({ queryKey: ["profile", targetId] });
    toast({ description: "تم تحديث ملفك الشخصي" });
  };

  const changeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    const validationError = validateImage(file);
    if (validationError) {
      toast({ variant: "destructive", description: validationError });
      return;
    }
    try {
      const url = await uploadImage(user.id, file);
      const { error } = await supabase.from("profiles").update({ avatar_url: url }).eq("id", user.id);
      if (error) throw error;
      await refreshProfile();
      queryClient.invalidateQueries({ queryKey: ["profile", targetId] });
      toast({ description: "تم تحديث صورتك الشخصية" });
    } catch (err) {
      toast({ variant: "destructive", description: "تعذّر رفع الصورة" });
    }
  };

  if (!targetId) {
    return (
      <Layout>
        <Card className="p-8 text-center">
          <p className="mb-4">سجّل الدخول لعرض ملفك الشخصي.</p>
          <Button asChild>
            <Link to="/auth">تسجيل الدخول</Link>
          </Button>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      {isLoading ? (
        <Loader2 className="mx-auto h-6 w-6 animate-spin" />
      ) : (
        <div className="mx-auto max-w-3xl">
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-l from-primary/30 to-primary/5" />
            <div className="-mt-12 px-6 pb-6">
              <div className="relative w-fit">
                <Avatar className="h-24 w-24 border-4 border-card">
                  <AvatarImage src={profile?.avatar_url ?? undefined} alt={profile?.full_name ?? ""} />
                  <AvatarFallback>{initials(profile?.full_name)}</AvatarFallback>
                </Avatar>
                {isOwn && (
                  <label className="absolute bottom-0 left-0 cursor-pointer rounded-full bg-primary p-1.5 text-primary-foreground">
                    <Camera className="h-4 w-4" />
                    <input type="file" accept="image/*" className="hidden" onChange={changeAvatar} />
                    <span className="sr-only">تغيير الصورة الشخصية</span>
                  </label>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold">{profile?.full_name || "مستخدم"}</h1>
                  <p className="text-muted-foreground">{profile?.headline || "عضو في QudPro"}</p>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {profile?.company && (
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" /> {profile.company}
                      </span>
                    )}
                    {profile?.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {profile.location}
                      </span>
                    )}
                    {profile?.website && (
                      <a href={profile.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-primary">
                        <Globe className="h-4 w-4" /> الموقع
                      </a>
                    )}
                    <span>{connectionsCount} اتصال</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isOwn ? (
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={openEdit}>تعديل الملف</Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>تعديل الملف الشخصي</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {[
                            { key: "full_name", label: "الاسم الكامل" },
                            { key: "headline", label: "المسمى الوظيفي" },
                            { key: "company", label: "الشركة" },
                            { key: "location", label: "المدينة" },
                            { key: "website", label: "الموقع الإلكتروني" },
                          ].map(({ key, label }) => (
                            <div key={key} className="space-y-2">
                              <Label htmlFor={key}>{label}</Label>
                              <Input
                                id={key}
                                value={form[key] ?? ""}
                                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                              />
                            </div>
                          ))}
                          <div className="space-y-2">
                            <Label htmlFor="bio">نبذة عني</Label>
                            <Textarea
                              id="bio"
                              rows={5}
                              value={form.bio ?? ""}
                              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                            />
                          </div>
                          <Button onClick={save} className="w-full" disabled={saving}>
                            {saving && <Loader2 className="ml-2 h-4 w-4 animate-spin" />} حفظ التغييرات
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    user && (
                      <>
                        <Button onClick={() => connect.mutate()} disabled={connect.isPending}>
                          <UserPlus className="ml-2 h-4 w-4" /> اتصال
                        </Button>
                        <Button asChild variant="outline">
                          <Link to={`/messages?to=${targetId}`}>
                            <MessageCircle className="ml-2 h-4 w-4" /> رسالة
                          </Link>
                        </Button>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </Card>

          {profile?.bio && (
            <Card className="mt-6 p-6">
              <h2 className="mb-2 font-semibold">نبذة</h2>
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">{profile.bio}</p>
            </Card>
          )}

          <h2 className="mb-4 mt-6 font-semibold">المنشورات</h2>
          {posts.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground">لا توجد منشورات بعد</Card>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      )}
    </Layout>
  );
};

export default Profile;
