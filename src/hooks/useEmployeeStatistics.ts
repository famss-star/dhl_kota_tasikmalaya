import { useState, useEffect } from 'react';

interface EmployeeStatistic {
  id: string;
  category: string;
  subcategory: string;
  count: number;
  description: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GroupedEmployeeStatistics {
  status: EmployeeStatistic[];
  education: EmployeeStatistic[];
  rank_iv: EmployeeStatistic[];
  rank_other: EmployeeStatistic[];
  age: EmployeeStatistic[];
}

export function useEmployeeStatistics() {
  const [statistics, setStatistics] = useState<GroupedEmployeeStatistics>({
    status: [],
    education: [],
    rank_iv: [],
    rank_other: [],
    age: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/employee-statistics');
      const data = await response.json();

      if (data.success) {
        setStatistics(data.data);
      } else {
        setError('Failed to fetch employee statistics');
      }
    } catch (err) {
      setError('Error fetching employee statistics');
      console.error('Error fetching employee statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTotalEmployees = () => {
    return statistics.status.reduce((total, stat) => total + stat.count, 0);
  };

  const getCategoryTotal = (category: keyof GroupedEmployeeStatistics) => {
    return statistics[category].reduce((total, stat) => total + stat.count, 0);
  };

  const getStatBySubcategory = (category: keyof GroupedEmployeeStatistics, subcategory: string) => {
    return statistics[category].find(stat => stat.subcategory === subcategory);
  };

  const refetch = () => {
    fetchStatistics();
  };

  return {
    statistics,
    loading,
    error,
    getTotalEmployees,
    getCategoryTotal,
    getStatBySubcategory,
    refetch
  };
}
