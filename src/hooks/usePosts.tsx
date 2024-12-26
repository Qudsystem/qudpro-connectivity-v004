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
        ...generateRandomPost(Date.now()),
        ...post,
      });
    }, 1000);
  });
};

const updatePost = async (post: Post): Promise<Post> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(post);
    }, 1000);
  });
};

const deletePost = async (postId: number): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};

export const usePosts = () => {
  const queryClient = useQueryClient();
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Query for fetching posts
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // Mutation for creating posts
  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(['posts'], (old: Post[] = []) => [newPost, ...old]);
      toast({
        description: "Post created successfully!",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        description: "Failed to create post. Please try again.",
        duration: 2000,
      });
    },
  });

  // Mutation for updating posts
  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(['posts'], (old: Post[] = []) => 
        old.map(post => post.id === updatedPost.id ? updatedPost : post)
      );
      setEditingPost(null);
      toast({
        description: "Post updated successfully!",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        description: "Failed to update post. Please try again.",
        duration: 2000,
      });
    },
  });

  // Mutation for deleting posts
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, postId) => {
      queryClient.setQueryData(['posts'], (old: Post[] = []) => 
        old.filter(post => post.id !== postId)
      );
      toast({
        description: "Post deleted successfully!",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        description: "Failed to delete post. Please try again.",
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