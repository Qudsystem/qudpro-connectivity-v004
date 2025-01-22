import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "@/components/ui/use-toast";
import type { Post } from '@/types';
import { generateRandomPost } from '@/components/PhotoGrid/PostGenerator';

// Mock API functions (replace with real API calls in production)
const fetchPosts = async (): Promise<Post[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: 5 }, (_, index) => generateRandomPost(index)));
    }, 1000);
  });
};

const createPost = async (post: Partial<Post>): Promise<Post> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        ...generateRandomPost(Date.now()),
        ...post,
      });
    }, 1000);
  });
};

const updatePost = async (post: Post): Promise<Post> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(post);
    }, 1000);
  });
};

const deletePost = async (postId: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};

export const usePosts = () => {
  const queryClient = useQueryClient();
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // Add new post at the beginning of the list
      queryClient.setQueryData(['posts'], (old: Post[] = []) => [newPost, ...old]);
      toast({
        description: "تم إنشاء المنشور بنجاح!",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        description: "فشل في إنشاء المنشور. حاول مرة أخرى.",
        duration: 2000,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(['posts'], (old: Post[] = []) => 
        old.map(post => post.id === updatedPost.id ? updatedPost : post)
      );
      setEditingPost(null);
      toast({
        description: "تم تحديث المنشور بنجاح!",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        description: "فشل في تحديث المنشور. حاول مرة أخرى.",
        duration: 2000,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, postId) => {
      queryClient.setQueryData(['posts'], (old: Post[] = []) => 
        old.filter(post => post.id !== postId)
      );
      toast({
        description: "تم حذف المنشور بنجاح!",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        description: "فشل في حذف المنشور. حاول مرة أخرى.",
        duration: 2000,
      });
    },
  });

  return {
    posts,
    isLoading,
    editingPost,
    setEditingPost,
    createPost: createMutation.mutate,
    updatePost: updateMutation.mutate,
    deletePost: deleteMutation.mutate,
  };
};