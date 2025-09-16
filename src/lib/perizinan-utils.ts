// Utility functions untuk format dan badge status

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount || 0);
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const getStatusBadgeConfig = (status: string) => {
  switch (status) {
    case "approved":
      return {
        className: "flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-sm font-medium",
        icon: "CheckCircle",
        text: "Disetujui"
      };
    case "pending":
      return {
        className: "flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-full text-sm font-medium",
        icon: "Clock",
        text: "Menunggu"
      };
    case "review":
      return {
        className: "flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium",
        icon: "Eye",
        text: "Review"
      };
    case "rejected":
      return {
        className: "flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full text-sm font-medium",
        icon: "XCircle",
        text: "Ditolak"
      };
    case "expired":
      return {
        className: "flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300 rounded-full text-sm font-medium",
        icon: "AlertTriangle",
        text: "Expired"
      };
    default:
      return {
        className: "flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300 rounded-full text-sm font-medium",
        icon: "Eye",
        text: status || "Unknown"
      };
  }
};

// Tahap badge config khusus untuk AMDAL
export const getTahapBadgeConfig = (tahap: string) => {
  const tahapConfig = {
    kerangka_acuan: {
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300",
      label: "Kerangka Acuan",
    },
    andal: {
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300",
      label: "ANDAL",
    },
    rencana: {
      color: "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300",
      label: "RKL-RPL",
    },
    selesai: {
      color: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300",
      label: "Selesai",
    },
  };

  const config = tahapConfig[tahap as keyof typeof tahapConfig];

  return config || {
    color: "bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300",
    label: tahap || "Unknown"
  };
};

// Skala usaha badge config khusus untuk UKL-UPL
export const getSkalaUsahaBadgeConfig = (skala: string) => {
  const colors = {
    'kecil': 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300',
    'menengah': 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300',
    'besar': 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
  };

  return {
    className: `px-2 py-1 rounded text-xs font-medium ${colors[skala as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300'}`,
    text: skala ? skala.charAt(0).toUpperCase() + skala.slice(1) : 'Unknown'
  };
};

// Fungsi untuk menghitung statistik
export const calculateStats = (data: Array<{ status: string }>) => {
  return {
    total: data.length,
    approved: data.filter((item) => item.status === "approved").length,
    pending: data.filter((item) => item.status === "pending").length,
    review: data.filter((item) => item.status === "review").length,
    rejected: data.filter((item) => item.status === "rejected").length,
    expired: data.filter((item) => item.status === "expired").length,
  };
};

interface PerizinanItem {
  pemohon?: string;
  nomor_surat?: string;
  nama_kegiatan?: string;
  jenis_usaha?: string;
  status: string;
  [key: string]: unknown;
}

// Fungsi filtering data
export const filterPerizinanData = (
  data: PerizinanItem[],
  searchTerm: string,
  statusFilter: string,
  additionalFilter?: { key: string; value: string }
) => {
  return data.filter((item) => {
    const matchesSearch =
      item.pemohon?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nomor_surat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nama_kegiatan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jenis_usaha?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    
    const matchesAdditionalFilter = !additionalFilter || 
      additionalFilter.value === "all" || 
      item[additionalFilter.key] === additionalFilter.value;
    
    return matchesSearch && matchesStatus && matchesAdditionalFilter;
  });
};
