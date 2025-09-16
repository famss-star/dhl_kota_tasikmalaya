import { useState, useEffect } from 'react';

interface ProfilData {
  siteName: string;
  siteDescription: string;
  visi: string;
  misi: string;
  tentangKami: string;
  totalStaff: number;
  employeeStatistics: Record<string, Array<Record<string, unknown>>>;
  summary: {
    bidangUtama: number;
    seksiOperasional: number;
    asnKompeten: number;
    monitoringLingkungan: string;
  };
}

interface UseProfilReturn {
  data: ProfilData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProfil(): UseProfilReturn {
  const [data, setData] = useState<ProfilData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/profil');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch profil data');
      }
      
      setData(result.data);
    } catch (err) {
      console.error('Error fetching profil data:', err);
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