import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, Briefcase, MessageCircle, Bell, LogOut, Settings, User as UserIcon, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const navItems = [
  { to: "/", label: "الرئيسية", icon: Home },
  { to: "/network", label: "شبكتي", icon: Users },
  { to: "/jobs", label: "الوظائف", icon: Briefcase },
  { to: "/messages", label: "الرسائل", icon: MessageCircle },
  { to: "/notifications", label: "الإشعارات", icon: Bell },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-primary">
          QudPro
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center rounded-md px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-primary",
                location.pathname === to && "text-primary font-semibold"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={profile?.avatar_url ?? undefined} alt={profile?.full_name ?? "المستخدم"} />
                    <AvatarFallback>{initials(profile?.full_name)}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{profile?.full_name || "مستخدم QudPro"}</p>
                  <p className="text-xs text-muted-foreground">{profile?.headline || "أضف مسماك الوظيفي"}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <UserIcon className="ml-2 h-4 w-4" /> ملفي الشخصي
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="ml-2 h-4 w-4" /> الإعدادات
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="ml-2 h-4 w-4" /> تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate("/auth")}>تسجيل الدخول</Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="القائمة">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navItems.map(({ to, label, icon: Icon }) => (
                <DropdownMenuItem key={to} onClick={() => navigate(to)}>
                  <Icon className="ml-2 h-4 w-4" /> {label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={() => navigate("/help")}>المساعدة</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-muted/40">
    <Navbar />
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    <footer className="border-t bg-card py-6 text-center text-sm text-muted-foreground">
      <p>QudPro — شبكة المحترفين في مصر</p>
      <p className="mt-1 text-xs">Powered by QudSystem</p>
    </footer>
  </div>
);

export default Layout;
