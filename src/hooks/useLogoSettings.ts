import { useState, useEffect } from 'react';

interface LogoSettings {
  logoHeader: string;
  logoFooter: string;
  siteName: string;
  siteDescription: string;
}

const defaultSettings: LogoSettings = {
  logoHeader: '/logo-dlh.png',
  logoFooter: '/logo-white-footer.png',
  siteName: 'Dinas Lingkungan Hidup Kota Tasikmalaya',
  siteDescription: 'Website resmi Dinas Lingkungan Hidup Kota Tasikmalaya'
};

export function useLogoSettings() {
  const [settings, setSettings] = useState<LogoSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/settings');
      const data = await response.json();

      if (data.success) {
        const settingsMap = data.data.reduce((acc: Record<string, string>, setting: { key: string; value: string }) => {
          acc[setting.key] = setting.value;
          return acc;
        }, {});

        setSettings({
          logoHeader: settingsMap.logo_header || defaultSettings.logoHeader,
          logoFooter: settingsMap.logo_footer || defaultSettings.logoFooter,
          siteName: settingsMap.site_name || defaultSettings.siteName,
          siteDescription: settingsMap.site_description || defaultSettings.siteDescription,
        });
      } else {
        setError('Failed to fetch settings');
        setSettings(defaultSettings);
      }
    } catch (err) {
      setError('Error fetching settings');
      setSettings(defaultSettings);
      console.error('Error fetching logo settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchSettings();
  };

  return {
    settings,
    loading,
    error,
    refetch
  };
}

// Hook untuk mendapatkan setting tertentu
export function useSetting(key: string, defaultValue: string = '') {
  const [value, setValue] = useState<string>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const response = await fetch(`/api/settings?key=${key}`);
        const data = await response.json();

        if (data.success) {
          setValue(data.data.value);
        } else {
          setValue(defaultValue);
        }
      } catch (error) {
        console.error(`Error fetching setting ${key}:`, error);
        setValue(defaultValue);
      } finally {
        setLoading(false);
      }
    };

    fetchSetting();
  }, [key, defaultValue]);

  return { value, loading };
}
