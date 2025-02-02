import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export const SupportButton = () => {
  return (
    <a 
      href="https://www.patreon.com/qudpro" 
      target="_blank" 
      rel="noopener noreferrer"
      className="support-button"
    >
      <Heart className="w-4 h-4" />
      <span>ادعم المنصة</span>
    </a>
  );
};