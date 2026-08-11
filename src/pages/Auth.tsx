import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const emailSchema = z.string().trim().email({ message: "بريد إلكتروني غير صالح" }).max(255);
const passwordSchema = z.string().min(6, { message: "كلمة المرور يجب ألا تقل عن 6 أحرف" }).max(72);
const nameSchema = z.string().trim().min(2, { message: "الاسم قصير جدًا" }).max(100);

const Auth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [tab, setTab] = useState(params.get("mode") === "signup" ? "signup" : "login");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedEmail = emailSchema.safeParse(email);
    const parsedPassword = passwordSchema.safeParse(password);
    if (!parsedEmail.success || !parsedPassword.success) {
      toast({
        variant: "destructive",
        description: parsedEmail.error?.issues[0]?.message ?? parsedPassword.error?.issues[0]?.message,
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsedEmail.data,
      password: parsedPassword.data,
    });
    setLoading(false);
    if (error) {
      toast({ variant: "destructive", title: "تعذّر تسجيل الدخول", description: error.message });
      return;
    }
    toast({ description: "مرحبًا بعودتك إلى QudPro!" });
    navigate("/");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedEmail = emailSchema.safeParse(email);
    const parsedPassword = passwordSchema.safeParse(password);
    const parsedName = nameSchema.safeParse(fullName);
    if (!parsedEmail.success || !parsedPassword.success || !parsedName.success) {
      toast({
        variant: "destructive",
        description:
          parsedName.error?.issues[0]?.message ??
          parsedEmail.error?.issues[0]?.message ??
          parsedPassword.error?.issues[0]?.message,
      });
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: parsedEmail.data,
      password: parsedPassword.data,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: parsedName.data },
      },
    });
    setLoading(false);
    if (error) {
      toast({ variant: "destructive", title: "تعذّر إنشاء الحساب", description: error.message });
      return;
    }
    if (!data.session) {
      toast({
        title: "تحقّق من بريدك الإلكتروني",
        description: "أرسلنا لك رسالة تأكيد لتفعيل حسابك.",
        duration: 6000,
      });
      return;
    }
    navigate("/");
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setLoading(false);
      toast({ variant: "destructive", description: "تعذّر تسجيل الدخول عبر Google" });
      return;
    }
    if (result.redirected) return;
    navigate("/");
  };

  const handleForgotPassword = async () => {
    const parsedEmail = emailSchema.safeParse(email);
    if (!parsedEmail.success) {
      toast({ variant: "destructive", description: "اكتب بريدك الإلكتروني أولًا" });
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(parsedEmail.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    toast({
      description: error ? error.message : "أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك.",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-primary">QudPro</h1>
          <p className="mt-2 text-sm text-muted-foreground">شبكة المحترفين في مصر</p>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
            <TabsTrigger value="signup">حساب جديد</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">البريد الإلكتروني</Label>
                <Input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">كلمة المرور</Label>
                <Input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />} تسجيل الدخول
              </Button>
              <button type="button" onClick={handleForgotPassword} className="w-full text-sm text-primary hover:underline">
                نسيت كلمة المرور؟
              </button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">الاسم الكامل</Label>
                <Input id="signup-name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">البريد الإلكتروني</Label>
                <Input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">كلمة المرور</Label>
                <Input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />} إنشاء الحساب
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">أو</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button variant="outline" className="w-full" onClick={handleGoogle} disabled={loading}>
          المتابعة باستخدام Google
        </Button>

        <p className="mt-6 text-center text-xs text-muted-foreground">Powered by QudSystem</p>
      </Card>
    </div>
  );
};

export default Auth;
