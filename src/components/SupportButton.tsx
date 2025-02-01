import { Heart } from 'lucide-react';
import { Button } from './ui/button';

export const SupportButton = () => {
  const handleSupport = () => {
    window.open('https://www.patreon.com/qudpro', '_blank');
  };

  return (
    <Button
      onClick={handleSupport}
      className="support-button"
      variant="default"
    >
      <Heart className="w-4 h-4" />
      <span>دعم المنصة</span>
    </Button>
  );
};