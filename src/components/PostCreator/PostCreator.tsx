import { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { usePosts } from '@/hooks/usePosts';

export const PostCreator = () => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createPost } = usePosts();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Error",
          description: "Image size should be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() && !selectedImage) {
      toast({
        description: "Please add some content or an image to post",
        duration: 3000,
      });
      return;
    }

    try {
      const newPost = {
        description: content,
        imageUrl: imagePreview || 'https://source.unsplash.com/random/800x600/?egypt,business',
        author: {
          name: 'John Doe',
          role: 'Software Engineer at QudSystem',
          avatar: 'https://github.com/shadcn.png'
        }
      };

      await createPost(newPost);
      setContent('');
      setSelectedImage(null);
      setImagePreview(null);
      
      toast({
        description: "Post created successfully!",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <div className="flex items-center space-x-4 mb-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="JD" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts or photos..."
          className="min-h-[60px] flex-1"
        />
      </div>

      {imagePreview && (
        <div className="relative mb-4">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-[300px] w-full object-cover rounded-lg"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-gray-800/70 rounded-full text-white hover:bg-gray-900/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="h-5 w-5 mr-2" />
            Add Photo
          </Button>
        </div>
        <Button onClick={handleSubmit}>
          Post
        </Button>
      </div>
    </div>
  );
};