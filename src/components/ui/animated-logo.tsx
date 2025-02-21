
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
}

export const AnimatedLogo = ({ className }: AnimatedLogoProps) => {
  return (
    <div className={cn("relative", className)}>
      <span className="font-bold text-3xl relative inline-block">
        <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 animate-text-shimmer bg-[200%_auto] bg-clip-text text-transparent">
          QudPro
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-text-shimmer-reverse bg-[200%_auto] bg-clip-text text-transparent opacity-50">
          QudPro
        </span>
        <span className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          QudPro
        </span>
      </span>
    </div>
  );
};
