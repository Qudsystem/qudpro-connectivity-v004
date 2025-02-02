import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface SettingsContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  language: string;
  setLanguage: (value: string) => void;
  emailNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
  pushNotifications: boolean;
  setPushNotifications: (value: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (value: boolean) => void;
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (value: boolean) => void;
  visibility: string;
  setVisibility: (value: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'ar';
  });
  const [emailNotifications, setEmailNotifications] = useState(() => {
    const saved = localStorage.getItem('emailNotifications');
    return saved ? JSON.parse(saved) : true;
  });
  const [pushNotifications, setPushNotifications] = useState(() => {
    const saved = localStorage.getItem('pushNotifications');
    return saved ? JSON.parse(saved) : true;
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved ? JSON.parse(saved) : true;
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(() => {
    const saved = localStorage.getItem('twoFactorEnabled');
    return saved ? JSON.parse(saved) : false;
  });
  const [visibility, setVisibility] = useState(() => {
    const saved = localStorage.getItem('visibility');
    return saved || 'everyone';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
    localStorage.setItem('emailNotifications', JSON.stringify(emailNotifications));
    localStorage.setItem('pushNotifications', JSON.stringify(pushNotifications));
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
    localStorage.setItem('twoFactorEnabled', JSON.stringify(twoFactorEnabled));
    localStorage.setItem('visibility', visibility);

    toast({
      title: "تم حفظ الإعدادات",
      description: "تم تحديث إعداداتك بنجاح",
    });
  }, [language, emailNotifications, pushNotifications, soundEnabled, twoFactorEnabled, visibility, toast]);

  return (
    <SettingsContext.Provider value={{
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
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};