import { useState, useEffect, useCallback } from 'react';

interface BidangData {
  id: number;
  slug: string;
  name: string;
  aboutTitle: string;
  aboutDescription: string;
  tugasPokokTitle: string;
  tugasPokok: string[];
  fungsiTitle: string;
  fungsi: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useBidangData(slug: string) {
  const [bidangData, setBidangData] = useState<BidangData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBidangData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/bidang/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Bidang tidak ditemukan');
        }
        throw new Error('Gagal mengambil data bidang');
      }
      
      const result = await response.json();
      const data = result.data || result; // Handle both wrapped and unwrapped responses
      
      // Ensure tugasPokok and fungsi are always arrays
      let tugasPokok = data.tugasPokok;
      let fungsi = data.fungsi;
      
      if (typeof tugasPokok === 'string') {
        try {
          tugasPokok = JSON.parse(tugasPokok);
        } catch {
          tugasPokok = [];
        }
      }
      if (!Array.isArray(tugasPokok)) {
        tugasPokok = [];
      }
      
      if (typeof fungsi === 'string') {
        try {
          fungsi = JSON.parse(fungsi);
        } catch {
          fungsi = [];
        }
      }
      if (!Array.isArray(fungsi)) {
        fungsi = [];
      }
      
      // Convert data to proper format
      const transformedData: BidangData = {
        ...data,
        tugasPokok,
        fungsi
      };
      
      setBidangData(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  const updateBidangData = async (updatedData: Partial<BidangData>) => {
    try {
      if (!bidangData) return;
      
      // Convert arrays to JSON strings for API
      const dataToSend = {
        ...updatedData,
        tugasPokok: updatedData.tugasPokok ? JSON.stringify(updatedData.tugasPokok) : undefined,
        fungsi: updatedData.fungsi ? JSON.stringify(updatedData.fungsi) : undefined
      };

      const response = await fetch(`/api/bidang/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Gagal menyimpan data bidang');
      }

      const result = await response.json();
      const data = result.data || result; // Handle both wrapped and unwrapped responses
      
      // Ensure tugasPokok and fungsi are always arrays after update
      let tugasPokok = data.tugasPokok;
      let fungsi = data.fungsi;
      
      if (typeof tugasPokok === 'string') {
        try {
          tugasPokok = JSON.parse(tugasPokok);
        } catch {
          tugasPokok = [];
        }
      }
      if (!Array.isArray(tugasPokok)) {
        tugasPokok = [];
      }
      
      if (typeof fungsi === 'string') {
        try {
          fungsi = JSON.parse(fungsi);
        } catch {
          fungsi = [];
        }
      }
      if (!Array.isArray(fungsi)) {
        fungsi = [];
      }
      
      // Update local state with new data
      const transformedData: BidangData = {
        ...data,
        tugasPokok,
        fungsi
      };
      
      setBidangData(transformedData);
      return transformedData;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Gagal menyimpan data');
    }
  };

  useEffect(() => {
    if (slug) {
      fetchBidangData();
    }
  }, [slug, fetchBidangData]);

  return {
    bidangData,
    setBidangData,
    isLoading,
    error,
    refetch: fetchBidangData,
    updateBidangData
  };
}
