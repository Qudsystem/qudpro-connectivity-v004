import { supabase } from "@/integrations/supabase/client";

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

/** يرفع صورة إلى مساحة تخزين المستخدم ويعيد رابطًا موقّعًا طويل الأمد */
export const uploadImage = async (userId: string, file: File): Promise<string> => {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;

  const { data, error: signError } = await supabase.storage
    .from("media")
    .createSignedUrl(path, TEN_YEARS);
  if (signError || !data) throw signError ?? new Error("تعذّر إنشاء رابط الصورة");

  return data.signedUrl;
};

export const validateImage = (file: File): string | null => {
  if (!file.type.startsWith("image/")) return "الرجاء اختيار ملف صورة صالح";
  if (file.size > 5 * 1024 * 1024) return "يجب أن يكون حجم الصورة أقل من 5 ميجابايت";
  return null;
};
