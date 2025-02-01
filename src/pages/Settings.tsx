import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Moon,
  Sun,
  Volume2,
  Languages,
  LogOut,
  ArrowLeft,
  Lock,
  Eye,
  Shield,
} from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { settings, updateSettings } = useSettings();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleThemeChange = () => {
    updateSettings({ ...settings, darkMode: !settings.darkMode });
    toast({
      title: !settings.darkMode ? "تم تفعيل الوضع الداكن" : "تم تفعيل الوضع الفاتح",
      duration: 2000,
    });
  };

  const handleLanguageChange = (value: string) => {
    updateSettings({ ...settings, language: value });
    toast({
      title: "تم تغيير اللغة",
      description: `تم تغيير اللغة إلى ${value === 'ar' ? 'العربية' : value === 'en' ? 'الإنجليزية' : 'الفرنسية'}`,
      duration: 2000,
    });
  };

  const handleNotificationChange = (type: 'email' | 'push' | 'sound', value: boolean) => {
    updateSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [type]: value
      }
    });
    toast({
      title: "تم تحديث إعدادات الإشعارات",
      duration: 2000,
    });
  };

  const handlePrivacyChange = (type: 'profileVisibility' | 'twoFactorAuth', value: boolean) => {
    updateSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [type]: value
      }
    });
    toast({
      title: "تم تحديث إعدادات الخصوصية",
      duration: 2000,
    });
  };

  const handleLogout = () => {
    // Add logout logic here
    toast({
      title: "تم تسجيل الخروج بنجاح",
      duration: 2000,
    });
    navigate('/login');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center gap-2 hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>رجوع</span>
          </Button>
          <h1 className="text-3xl font-bold text-foreground">الإعدادات</h1>
        </div>

        {/* المظهر والتخصيص */}
        <Card className="p-6 bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-4">المظهر والتخصيص</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {settings.darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span>الوضع الداكن</span>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={handleThemeChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                <span>اللغة</span>
              </div>
              <Select value={settings.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر اللغة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* الإشعارات */}
        <Card className="p-6 bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-4">الإشعارات</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <span>إشعارات البريد الإلكتروني</span>
              </div>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={(checked) => handleNotificationChange('email', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <span>الإشعارات المنبثقة</span>
              </div>
              <Switch
                checked={settings.notifications.push}
                onCheckedChange={(checked) => handleNotificationChange('push', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                <span>صوت الإشعارات</span>
              </div>
              <Switch
                checked={settings.notifications.sound}
                onCheckedChange={(checked) => handleNotificationChange('sound', checked)}
              />
            </div>
          </div>
        </Card>

        {/* الخصوصية والأمان */}
        <Card className="p-6 bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-4">الخصوصية والأمان</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span>إخفاء الملف الشخصي</span>
              </div>
              <Switch
                checked={settings.privacy.profileVisibility}
                onCheckedChange={(checked) => handlePrivacyChange('profileVisibility', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>المصادقة الثنائية</span>
              </div>
              <Switch
                checked={settings.privacy.twoFactorAuth}
                onCheckedChange={(checked) => handlePrivacyChange('twoFactorAuth', checked)}
              />
            </div>
          </div>
        </Card>

        {/* تسجيل الخروج */}
        <Card className="p-6 bg-card text-card-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-destructive">
              <LogOut className="h-5 w-5" />
              <span>تسجيل الخروج</span>
            </div>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="hover:bg-destructive/90"
            >
              تسجيل الخروج
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;