import { useState, useEffect, useCallback } from "react";
import { 
  AMDALData, 
  IPLCData, 
  SPPLData, 
  UKLUPLData, 
  PerizinanStats 
} from "@/types/perizinan";
import { calculateStats, filterPerizinanData } from "@/lib/perizinan-utils";

// Generic hook untuk data perizinan
export function usePerizinanData<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result.data || []);
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      setError(error instanceof Error ? error.message : "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [endpoint, fetchData]);

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      return false;
    }

    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setData(prevData => prevData.filter(item => (item as { id: string }).id !== id));
        return true;
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Gagal menghapus data");
      return false;
    }
  };

  return { 
    data, 
    isLoading, 
    error, 
    refetch: fetchData, 
    handleDelete 
  };
}

// Specific hooks untuk setiap jenis perizinan
export function useAMDALData() {
  return usePerizinanData<AMDALData>("/api/perizinan/amdal");
}

export function useIPLCData() {
  return usePerizinanData<IPLCData>("/api/perizinan/iplc");
}

export function useSPPLData() {
  return usePerizinanData<SPPLData>("/api/perizinan/sppl");
}

export function useUKLUPLData() {
  return usePerizinanData<UKLUPLData>("/api/perizinan/ukl-upl");
}

// Hook untuk filtering dan statistics
export function useFilteredPerizinanData<T extends { status: string }>(
  data: T[],
  searchTerm: string,
  statusFilter: string,
  additionalFilter?: { key: string; value: string }
) {
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [stats, setStats] = useState<PerizinanStats>({
    total: 0,
    approved: 0,
    pending: 0,
    review: 0,
    rejected: 0,
    expired: 0
  });

  useEffect(() => {
    const filtered = filterPerizinanData(
      data, 
      searchTerm, 
      statusFilter, 
      additionalFilter
    ) as T[];
    setFilteredData(filtered);
    setStats(calculateStats(data));
  }, [data, searchTerm, statusFilter, additionalFilter]);

  return { filteredData, stats };
}

// Hook untuk single data fetch
export function useSinglePerizinanData<T>(endpoint: string, id: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${endpoint}/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error(`Error fetching data from ${endpoint}/${id}:`, error);
        setError(error instanceof Error ? error.message : "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, id]);

  return { data, isLoading, error };
}

// Hook untuk form submission
export function usePerizinanForm<T>(endpoint: string, isEdit: boolean = false) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (formData: T, id?: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const url = isEdit && id ? `${endpoint}/${id}` : endpoint;
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }

      return true;
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error instanceof Error ? error.message : 'Failed to submit form');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitForm, isLoading, error };
}
