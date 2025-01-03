import { Link } from "react-router-dom";
import React from "react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  count?: number;
  to: string;
}

export const NavItem = ({ icon, label, active = false, count, to }: NavItemProps) => {
  return (
    <Link to={to} className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-qudpro-primary dark:hover:text-white relative">
      <div className={`p-1 rounded-lg ${active ? 'text-qudpro-primary dark:text-white' : ''}`}>
        {icon}
        {count && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {count}
          </span>
        )}
      </div>
      <span className="text-xs mt-0.5">{label}</span>
    </Link>
  );
};