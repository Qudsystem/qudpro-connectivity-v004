import { useState } from 'react';
import { aiService } from '../services/ai';
import { useToast } from './use-toast';

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateContent = async (prompt: string) => {
    setIsLoading(true);
    try {
      const result = await aiService.generateContent(prompt);
      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again later.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async (prompt: string) => {
    setIsLoading(true);
    try {
      const result = await aiService.generateImage(prompt);
      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again later.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateContent,
    generateImage,
    isLoading,
  };
};