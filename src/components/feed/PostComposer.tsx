import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Camera, Loader2, X } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { uploadImage, validateImage } from "@/lib/upload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { initials } from "@/lib/format";

const contentSchema = z.string().trim().min(1, "اكتب شيئًا قبل النشر").max(3000, "المنشور طويل جدًا");

export const PostComposer = () => {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("يجب تسجيل الدخول");
      const parsed = contentSchema.safeParse(content);
      if (!parsed.success) throw new Error(parsed.error.issues[0].message);
      const imageUrl = file ? await uploadImage(user.id, file) : null;
      const { error } = await supabase
        .from("posts")
        .insert({ user_id: user.id, content: parsed.data, image_url: imageUrl });
      if (error) throw error;
    },
    onSuccess: () => {
      setContent("");
      setFile(null);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({ description: "تم نشر منشورك بنجاح!" });
    },
    onError: (error: Error) =>
      toast({ variant: "destructive", title: "تعذّر النشر", description: error.message }),
  });

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    const error = validateImage(selected);
    if (error) {
      toast({ variant: "destructive", description: error });
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  if (!user) return null;

  return (
    <Card className="mb-6 p-4">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={profile?.avatar_url ?? undefined} alt={profile?.full_name ?? ""} />
          <AvatarFallback>{initials(profile?.full_name)}</AvatarFallback>
        </Avatar>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="شارك فكرة أو خبرة مع شبكتك المهنية..."
          className="min-h-[70px] resize-none"
          maxLength={3000}
        />
      </div>

      {preview && (
        <div className="relative mt-4">
          <img src={preview} alt="معاينة الصورة المرفقة" className="max-h-80 w-full rounded-lg object-cover" />
          <button
            type="button"
            onClick={() => {
              setFile(null);
              setPreview(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="absolute left-2 top-2 rounded-full bg-background/80 p-1"
            aria-label="إزالة الصورة"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onSelectFile} />
        <Button variant="ghost" size="sm" onClick={() => inputRef.current?.click()}>
          <Camera className="ml-2 h-4 w-4" /> إضافة صورة
        </Button>
        <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
          {mutation.isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />} نشر
        </Button>
      </div>
    </Card>
  );
};

export default PostComposer;
