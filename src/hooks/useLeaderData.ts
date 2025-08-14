import { useState, useEffect } from 'react';

interface Leader {
  id: string | null;
  name: string;
  position: string;
  greeting: string;
  photo: string;
  isActive: boolean;
}

export function useLeaderData() {
  const [leader, setLeader] = useState<Leader | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeader = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/leader');
      const data = await response.json();

      if (data.success) {
        setLeader(data.data);
      } else {
        setError(data.error || 'Failed to fetch leader data');
      }
    } catch (err) {
      console.error('Error fetching leader:', err);
      setError('Failed to fetch leader data');
    } finally {
      setLoading(false);
    }
  };

  const updateLeader = async (leaderData: {
    name: string;
    position: string;
    greeting: string;
    photo?: string;
  }) => {
    try {
      setLoading(true);
      const response = await fetch('/api/leader', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leaderData),
      });

      const data = await response.json();

      if (data.success) {
        setLeader(data.data);
        return { success: true, data: data.data };
      } else {
        setError(data.error || 'Failed to update leader data');
        return { success: false, error: data.error };
      }
    } catch (err) {
      console.error('Error updating leader:', err);
      const errorMessage = 'Failed to update leader data';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeader();
  }, []);

  return {
    leader,
    loading,
    error,
    fetchLeader,
    updateLeader,
  };
}
