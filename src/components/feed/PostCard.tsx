import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircle, Share2, Trash2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { initials, timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { FeedPost } from "@/hooks/usePosts";

export const PostCard = ({ post }: { post: FeedPost }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  const liked = post.likes.some((l) => l.user_id === user?.id);

  const toggleLike = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("سجّل الدخول للتفاعل مع المنشورات");
      if (liked) {
        const { error } = await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", post.id)
          .eq("user_id", user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("post_likes")
          .insert({ post_id: post.id, user_id: user.id });
        if (error) throw error;
        if (post.user_id !== user.id) {
          await supabase.from("notifications").insert({
            user_id: post.user_id,
            actor_id: user.id,
            type: "like",
            entity_id: post.id,
            message: "أعجب بمنشورك",
          });
        }
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    onError: (e: Error) => toast({ variant: "destructive", description: e.message }),
  });

  const { data: comments = [], isLoading: loadingComments } = useQuery({
    queryKey: ["comments", post.id],
    enabled: showComments,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("id, content, created_at, user_id, profiles(full_name, avatar_url, headline)")
        .eq("post_id", post.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const addComment = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("سجّل الدخول للتعليق");
      const value = comment.trim();
      if (!value) throw new Error("اكتب تعليقًا أولًا");
      if (value.length > 1000) throw new Error("التعليق طويل جدًا");
      const { error } = await supabase
        .from("comments")
        .insert({ post_id: post.id, user_id: user.id, content: value });
      if (error) throw error;
      if (post.user_id !== user.id) {
        await supabase.from("notifications").insert({
          user_id: post.user_id,
          actor_id: user.id,
          type: "comment",
          entity_id: post.id,
          message: "علّق على منشورك",
        });
      }
    },
    onSuccess: () => {
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["comments", post.id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (e: Error) => toast({ variant: "destructive", description: e.message }),
  });

  const deletePost = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("posts").delete().eq("id", post.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({ description: "تم حذف المنشور" });
    },
  });

  const share = () => {
    navigator.clipboard.writeText(`${window.location.origin}/?post=${post.id}`);
    toast({ description: "تم نسخ رابط المنشور" });
  };

  return (
    <Card className="mb-6 p-4">
      <div className="flex items-start justify-between">
        <Link to={`/profile/${post.user_id}`} className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={post.profiles?.avatar_url ?? undefined} alt={post.profiles?.full_name ?? ""} />
            <AvatarFallback>{initials(post.profiles?.full_name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.profiles?.full_name || "مستخدم"}</p>
            <p className="text-xs text-muted-foreground">
              {post.profiles?.headline || "عضو في QudPro"} · {timeAgo(post.created_at)}
            </p>
          </div>
        </Link>
        {user?.id === post.user_id && (
          <Button variant="ghost" size="icon" aria-label="حذف المنشور" onClick={() => deletePost.mutate()}>
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{post.content}</p>

      {post.image_url && (
        <img
          src={post.image_url}
          alt={`صورة منشور ${post.profiles?.full_name ?? ""}`}
          loading="lazy"
          className="mt-4 max-h-[500px] w-full rounded-lg object-cover"
        />
      )}

      <div className="mt-4 flex items-center gap-1 border-t pt-2">
        <Button variant="ghost" size="sm" onClick={() => toggleLike.mutate()}>
          <Heart className={cn("ml-2 h-4 w-4", liked && "fill-primary text-primary")} />
          {post.likes.length} إعجاب
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setShowComments((v) => !v)}>
          <MessageCircle className="ml-2 h-4 w-4" />
          {post.comments[0]?.count ?? 0} تعليق
        </Button>
        <Button variant="ghost" size="sm" onClick={share}>
          <Share2 className="ml-2 h-4 w-4" /> مشاركة
        </Button>
      </div>

      {showComments && (
        <div className="mt-4 space-y-3 border-t pt-4">
          {user && (
            <div className="flex gap-2">
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="اكتب تعليقًا..."
                maxLength={1000}
                onKeyDown={(e) => e.key === "Enter" && addComment.mutate()}
              />
              <Button onClick={() => addComment.mutate()} disabled={addComment.isPending}>
                إرسال
              </Button>
            </div>
          )}
          {loadingComments && <Loader2 className="mx-auto h-4 w-4 animate-spin" />}
          {comments.map((c: any) => (
            <div key={c.id} className="flex gap-3 rounded-md bg-muted/50 p-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={c.profiles?.avatar_url ?? undefined} alt={c.profiles?.full_name ?? ""} />
                <AvatarFallback>{initials(c.profiles?.full_name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  {c.profiles?.full_name} <span className="text-xs text-muted-foreground">{timeAgo(c.created_at)}</span>
                </p>
                <p className="text-sm text-muted-foreground">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default PostCard;
