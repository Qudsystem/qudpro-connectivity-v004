import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FeedPost {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  created_at: string;
  profiles: { full_name: string; avatar_url: string | null; headline: string } | null;
  likes: { user_id: string }[];
  comments: { count: number }[];
}

const POST_SELECT =
  "id, user_id, content, image_url, created_at, profiles(full_name, avatar_url, headline), likes:post_likes(user_id), comments(count)";

export const usePosts = (userId?: string) =>
  useQuery({
    queryKey: ["posts", userId ?? "all"],
    queryFn: async () => {
      let query = supabase.from("posts").select(POST_SELECT).order("created_at", { ascending: false }).limit(50);
      if (userId) query = query.eq("user_id", userId);
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as unknown as FeedPost[];
    },
  });
