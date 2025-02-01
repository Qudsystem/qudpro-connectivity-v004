import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  count?: number;
}

export const NavItem = ({ to, icon, label, active, count }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "relative flex flex-col items-center justify-center px-3 py-2 text-sm font-medium transition-colors",
        "hover:text-primary",
        active
          ? "text-primary"
          : "text-gray-600 dark:text-gray-300",
        "group"
      )}
    >
      <div className="relative">
        {icon}
        {count !== undefined && count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
            {count}
          </span>
        )}
      </div>
      <span className="mt-1 text-xs hidden sm:block">{label}</span>
    </Link>
  );
};