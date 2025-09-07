import { useState, useEffect } from 'react';

interface TupoksiData {
  tugasPokok: string;
  kepalaDinas: {
    deskripsi: string;
    tugas: string[];
  };
  sekretariat: {
    deskripsi: string;
    tugas: string[];
  };
  subUmum: {
    deskripsi: string;
    tugas: string[];
  };
  subKeuangan: {
    deskripsi: string;
    tugas: string[];
  };
}

interface TentangData {
  visi: string;
  misi: string[];
  tentangKami: string;
  tupoksi: TupoksiData;
}

interface UseTentangReturn {
  data: TentangData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useTentang(): UseTentangReturn {
  const [data, setData] = useState<TentangData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/tentang');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setData(result);
    } catch (err) {
      console.error('Error fetching tentang data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}
