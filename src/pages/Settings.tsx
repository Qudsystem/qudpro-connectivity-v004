import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Moon,
  Sun,
  Globe,
  Lock,
  Mail,
  Shield,
  Smartphone,
  Volume2,
  Languages,
  LogOut,
} from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const {
    darkMode,
    setDarkMode,
    language,
    setLanguage,
    emailNotifications,
    setEmailNotifications,
    pushNotifications,
    setPushNotifications,
    soundEnabled,
    setSoundEnabled,
    twoFactorEnabled,
    setTwoFactorEnabled,
    visibility,
    setVisibility,
  } = useSettings();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // Clear settings
    localStorage.clear();
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل خروجك بنجاح",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-foreground mb-8">الإعدادات</h1>

        {/* المظهر والتخصيص */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sun className="h-5 w-5" />
            المظهر والتخصيص
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span>الوضع الليلي</span>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4" />
                <span>اللغة</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border rounded p-1"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </Card>

        {/* الإشعارات */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            الإشعارات
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>إشعارات البريد الإلكتروني</span>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>إشعارات الجوال</span>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <span>الأصوات</span>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>
          </div>
        </Card>

        {/* الخصوصية والأمان */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            الخصوصية والأمان
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>المصادقة الثنائية</span>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>من يمكنه رؤية نشاطي</span>
              </div>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="border rounded p-1"
              >
                <option value="everyone">الجميع</option>
                <option value="connections">جهات الاتصال فقط</option>
                <option value="none">لا أحد</option>
              </select>
            </div>
          </div>
        </Card>

        {/* أزرار الإجراءات */}
        <div className="flex justify-between items-center">
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;