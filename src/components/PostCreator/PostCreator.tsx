import { useState, useRef } from 'react';
import { Camera, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { usePosts } from '@/hooks/usePosts';

export const PostCreator = () => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createPost } = usePosts();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "خطأ",
          description: "يجب أن يكون حجم الصورة أقل من 5 ميجابايت",
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
        description: "يرجى إضافة محتوى أو صورة للمنشور",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const newPost = {
        description: content,
        imageUrl: imagePreview || 'https://source.unsplash.com/random/800x600/?egypt,business',
        author: {
          name: 'المستخدم الحالي',
          role: 'عضو في QudPro',
          avatar: 'https://github.com/shadcn.png'
        },
        likes: 0,
        comments: [],
        timeAgo: 'الآن',
        category: 'عام',
        title: content.slice(0, 50),
        analysis: {
          engagement: Math.floor(Math.random() * 100),
          reach: Math.floor(Math.random() * 1000),
          sentiment: "positive" as const,
          topics: ['QudPro', 'مصر'],
          timestamp: new Date().toISOString()
        }
      };

      await createPost(newPost);
      setContent('');
      setSelectedImage(null);
      setImagePreview(null);
      
      toast({
        description: "تم نشر المنشور بنجاح!",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في إنشاء المنشور. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <div className="flex items-center space-x-4 mb-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="المستخدم الحالي" />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="شارك أفكارك أو صورك..."
          className="min-h-[60px] flex-1"
          disabled={isSubmitting}
        />
      </div>

      {imagePreview && (
        <div className="relative mb-4">
          <img
            src={imagePreview}
            alt="معاينة"
            className="max-h-[300px] w-full object-cover rounded-lg"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-gray-800/70 rounded-full text-white hover:bg-gray-900/70 transition-colors"
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isSubmitting}
          >
            <Camera className="h-5 w-5 mr-2" />
            إضافة صورة
          </Button>
        </div>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              جارٍ النشر...
            </>
          ) : (
            'نشر'
          )}
        </Button>
      </div>
    </div>
  );
};