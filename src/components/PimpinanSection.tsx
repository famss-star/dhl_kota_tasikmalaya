import React, { useState, useEffect } from "react";
import Image from "next/image";

interface StaffMember {
  id: string;
  name: string;
  position: string;
  type: 'KEPALA_DINAS' | 'WAKIL' | 'SEKRETARIS' | 'KABID' | 'STAFF';
  greeting?: string;
  photo?: string;
  employmentStatus: 'PNS' | 'PPPK' | 'HONORER';
  education: 'SMP' | 'SMA_SMK' | 'DIPLOMA' | 'S1' | 'S2' | 'S3';
  rank?: string;
  birthDate?: string;
  isActive: boolean;
  isPublished: boolean;
}

export default function PimpinanSection() {
  const [leader, setLeader] = useState<StaffMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeader = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/staff-members');
        
        if (response.ok) {
          const staffMembers = await response.json();
          // Find the KEPALA_DINAS staff member who is active and published
          const kepalaDinas = staffMembers.find((staff: StaffMember) => 
            staff.type === 'KEPALA_DINAS' && staff.isActive && staff.isPublished
          );
          setLeader(kepalaDinas || null);
        } else {
          setError('Failed to fetch leader data');
        }
      } catch (err) {
        console.error('Error fetching leader:', err);
        setError('Failed to fetch leader data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeader();
  }, []);

  if (loading) {
    return (
      <section className="w-full my-12 px-0 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row items-center justify-between gap-8 transition-all">
            <div className="md:basis-3/4 basis-full text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-800 dark:text-green-300">Sambutan Kepala Dinas</h2>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1 w-1/2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
              </div>
            </div>
            <div className="md:basis-1/4 basis-full flex justify-center md:justify-end">
              <div className="relative w-32 md:w-40 aspect-[3/4]">
                <div className="absolute w-28 h-28 md:w-40 md:h-35 bg-gray-300 dark:bg-gray-600 animate-pulse z-0 rounded-t-md left-1/2 bottom-0 -translate-x-1/2" />
                <div className="relative bg-gray-300 dark:bg-gray-600 animate-pulse w-full h-full z-10 overflow-hidden rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Leader data error:', error);
  }

  return (
    <section className="w-full my-12 px-0 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row items-center justify-between gap-8 transition-all">
          <div className="md:basis-3/4 basis-full text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-800 dark:text-green-300">Sambutan Kepala Dinas</h2>
            <p className="text-gray-700 dark:text-gray-200 text-base md:text-lg mb-4">
              &quot;{leader?.greeting || "Selamat datang di portal Dinas Lingkungan Hidup Kota Tasikmalaya. Kami berkomitmen untuk mewujudkan lingkungan yang bersih, sehat, dan lestari melalui kolaborasi dengan masyarakat. Mari bersama menjaga dan mencintai lingkungan demi masa depan yang lebih baik."}&quot;
            </p>
            <div className="font-semibold text-green-700 dark:text-green-200">{leader?.name || "Drs. Nama Pimpinan"}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{leader?.position || "Kepala Dinas Lingkungan Hidup"}</div>
          </div>
          <div className="md:basis-1/4 basis-full flex justify-center md:justify-end">
            <div className="relative w-32 md:w-40 aspect-[3/4]">
              {/* Persegi di belakang gambar */}
              <div className="absolute w-28 h-28 md:w-40 md:h-35 bg-transparent border-2 border-b-0 border-gray-300 dark:border-green-700 z-0 rounded-t-md left-1/2 bottom-0 -translate-x-1/2" />
              {/* Gambar tetap aspect 3/4 */}
              <div className="relative bg-transparent w-full h-full z-10 overflow-hidden">
                <Image
                  src={leader?.photo || "/pemimpin-placeholder.svg"}
                  alt="Foto Kepala Dinas"
                  fill
                  className="object-cover object-top"
                  priority
                  onError={(e) => {
                    console.error('Image error:', e);
                    const target = e.target as HTMLImageElement;
                    target.src = "/pemimpin-placeholder.svg";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
