"use client";

import { useState } from "react";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  Star,
  AlertTriangle,
  CheckCircle,
  Filter,
  Eye,
  FileText,
  PieChart,
  Activity,
  Target,
  Zap,
  MessageSquare,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

interface PerformanceMetrics {
  periode: string;
  total_pengaduan: number;
  total_bantuan: number;
  rata_waktu_respon: number; // jam
  rata_waktu_penyelesaian: number; // hari
  tingkat_kepuasan: number; // persen
  first_call_resolution: number; // persen
  escalation_rate: number; // persen
  kategori_terbanyak: string;
  channel_terpopuler: string;
}

interface TrendAnalysis {
  bulan: string;
  pengaduan: number;
  bantuan: number;
  kepuasan: number;
  waktu_respon: number;
}

interface CategoryBreakdown {
  kategori: string;
  jumlah: number;
  persentase: number;
  trend: 'naik' | 'turun' | 'stabil';
  rata_penyelesaian: number;
  tingkat_kepuasan: number;
  warna: string;
}

interface ChannelAnalysis {
  channel: string;
  total_request: number;
  response_time: number;
  satisfaction: number;
  utilization: number;
  effectiveness: number;
  peak_hours: string;
}

export default function LaporanAnalisisPengaduanPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("bulan_ini");
  const [selectedChart, setSelectedChart] = useState<'overview' | 'trend' | 'kategori' | 'channel'>('overview');

  const performanceData: PerformanceMetrics = {
    periode: "Bulan Ini (Januari 2024)",
    total_pengaduan: 1247,
    total_bantuan: 892,
    rata_waktu_respon: 2.3,
    rata_waktu_penyelesaian: 4.2,
    tingkat_kepuasan: 89.5,
    first_call_resolution: 76.8,
    escalation_rate: 12.4,
    kategori_terbanyak: "Pencemaran Air",
    channel_terpopuler: "WhatsApp"
  };

  const trendData: TrendAnalysis[] = [
    { bulan: "Jul 2023", pengaduan: 980, bantuan: 720, kepuasan: 85.2, waktu_respon: 3.1 },
    { bulan: "Agu 2023", pengaduan: 1050, bantuan: 780, kepuasan: 86.8, waktu_respon: 2.9 },
    { bulan: "Sep 2023", pengaduan: 1120, bantuan: 820, kepuasan: 87.5, waktu_respon: 2.7 },
    { bulan: "Okt 2023", pengaduan: 1180, bantuan: 850, kepuasan: 88.2, waktu_respon: 2.5 },
    { bulan: "Nov 2023", pengaduan: 1210, bantuan: 870, kepuasan: 88.8, waktu_respon: 2.4 },
    { bulan: "Des 2023", pengaduan: 1195, bantuan: 885, kepuasan: 89.1, waktu_respon: 2.3 },
    { bulan: "Jan 2024", pengaduan: 1247, bantuan: 892, kepuasan: 89.5, waktu_respon: 2.3 }
  ];

  const categoryData: CategoryBreakdown[] = [
    { 
      kategori: "Pencemaran Air", 
      jumlah: 456, 
      persentase: 36.6, 
      trend: 'naik', 
      rata_penyelesaian: 3.8, 
      tingkat_kepuasan: 88.5,
      warna: "bg-blue-500"
    },
    { 
      kategori: "Pencemaran Udara", 
      jumlah: 312, 
      persentase: 25.0, 
      trend: 'stabil', 
      rata_penyelesaian: 4.2, 
      tingkat_kepuasan: 90.1,
      warna: "bg-green-500"
    },
    { 
      kategori: "Sampah & Limbah", 
      jumlah: 289, 
      persentase: 23.2, 
      trend: 'turun', 
      rata_penyelesaian: 5.1, 
      tingkat_kepuasan: 87.9,
      warna: "bg-yellow-500"
    },
    { 
      kategori: "Kebisingan", 
      jumlah: 125, 
      persentase: 10.0, 
      trend: 'naik', 
      rata_penyelesaian: 2.8, 
      tingkat_kepuasan: 92.3,
      warna: "bg-purple-500"
    },
    { 
      kategori: "Lainnya", 
      jumlah: 65, 
      persentase: 5.2, 
      trend: 'stabil', 
      rata_penyelesaian: 4.5, 
      tingkat_kepuasan: 85.7,
      warna: "bg-gray-500"
    }
  ];

  const channelData: ChannelAnalysis[] = [
    {
      channel: "WhatsApp",
      total_request: 487,
      response_time: 15,
      satisfaction: 92.3,
      utilization: 78.5,
      effectiveness: 88.9,
      peak_hours: "09:00-12:00"
    },
    {
      channel: "Website Portal",
      total_request: 423,
      response_time: 25,
      satisfaction: 87.8,
      utilization: 65.2,
      effectiveness: 85.4,
      peak_hours: "08:00-10:00"
    },
    {
      channel: "Tatap Muka",
      total_request: 231,
      response_time: 8,
      satisfaction: 94.1,
      utilization: 82.3,
      effectiveness: 91.6,
      peak_hours: "10:00-14:00"
    },
    {
      channel: "Email",
      total_request: 156,
      response_time: 45,
      satisfaction: 84.6,
      utilization: 45.7,
      effectiveness: 79.2,
      peak_hours: "08:00-09:00"
    },
    {
      channel: "Hotline Darurat",
      total_request: 42,
      response_time: 3,
      satisfaction: 96.8,
      utilization: 25.8,
      effectiveness: 97.3,
      peak_hours: "24 Jam"
    }
  ];

  const getTrendIcon = (trend: 'naik' | 'turun' | 'stabil') => {
    if (trend === 'naik') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'turun') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Activity className="w-4 h-4 text-gray-600" />;
  };

  const getPerformanceColor = (value: number, type: 'time' | 'percentage') => {
    if (type === 'percentage') {
      if (value >= 90) return 'text-green-600';
      if (value >= 80) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (value <= 2) return 'text-green-600';
      if (value <= 4) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  const exportReport = () => {
    console.log("Mengexport laporan dengan data:", {
      periode: selectedPeriod,
      chart: selectedChart,
      performance: performanceData,
      trends: trendData,
      categories: categoryData,
      channels: channelData
    });
    alert("Laporan berhasil diexport!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Laporan & Analisis</h1>
              <p className="text-indigo-100">Pengaduan & Bantuan DLH Kota Tasikmalaya</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
            >
              <option value="hari_ini" className="text-gray-900">Hari Ini</option>
              <option value="minggu_ini" className="text-gray-900">Minggu Ini</option>
              <option value="bulan_ini" className="text-gray-900">Bulan Ini</option>
              <option value="kuartal_ini" className="text-gray-900">Kuartal Ini</option>
              <option value="tahun_ini" className="text-gray-900">Tahun Ini</option>
              <option value="custom" className="text-gray-900">Custom Period</option>
            </select>
            <button
              onClick={exportReport}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Pengaduan</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{performanceData.periode}</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {performanceData.total_pengaduan.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600">+12.5%</span>
            <span className="text-gray-500 dark:text-gray-400">vs bulan lalu</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Bantuan</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{performanceData.periode}</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {performanceData.total_bantuan.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600">+8.3%</span>
            <span className="text-gray-500 dark:text-gray-400">vs bulan lalu</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Waktu Respon</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Rata-rata</p>
            </div>
          </div>
          <div className={`text-3xl font-bold mb-2 ${getPerformanceColor(performanceData.rata_waktu_respon, 'time')}`}>
            {performanceData.rata_waktu_respon} jam
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <span className="text-green-600">-0.2 jam</span>
            <span className="text-gray-500 dark:text-gray-400">vs bulan lalu</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kepuasan</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tingkat kepuasan</p>
            </div>
          </div>
          <div className={`text-3xl font-bold mb-2 ${getPerformanceColor(performanceData.tingkat_kepuasan, 'percentage')}`}>
            {performanceData.tingkat_kepuasan}%
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600">+1.2%</span>
            <span className="text-gray-500 dark:text-gray-400">vs bulan lalu</span>
          </div>
        </div>
      </div>

      {/* Chart Selection & Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Analisis Detail</h2>
            <div className="flex gap-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'trend', label: 'Trend', icon: TrendingUp },
                { id: 'kategori', label: 'Kategori', icon: PieChart },
                { id: 'channel', label: 'Channel', icon: MessageSquare }
              ].map((chart) => {
                const IconComponent = chart.icon;
                return (
                  <button
                    key={chart.id}
                    onClick={() => setSelectedChart(chart.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                      selectedChart === chart.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {chart.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Overview Chart */}
          {selectedChart === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Performance Indicators</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900 dark:text-white">First Call Resolution</span>
                      </div>
                      <div className={`text-lg font-bold ${getPerformanceColor(performanceData.first_call_resolution, 'percentage')}`}>
                        {performanceData.first_call_resolution}%
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        <span className="font-medium text-gray-900 dark:text-white">Escalation Rate</span>
                      </div>
                      <div className="text-lg font-bold text-orange-600">
                        {performanceData.escalation_rate}%
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-900 dark:text-white">Waktu Penyelesaian</span>
                      </div>
                      <div className={`text-lg font-bold ${getPerformanceColor(performanceData.rata_waktu_penyelesaian, 'time')}`}>
                        {performanceData.rata_waktu_penyelesaian} hari
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Insights</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 rounded">
                      <div className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                        Kategori Terpopuler
                      </div>
                      <div className="text-blue-700 dark:text-blue-200">
                        {performanceData.kategori_terbanyak} (36.6% dari total pengaduan)
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 rounded">
                      <div className="font-medium text-green-900 dark:text-green-100 mb-1">
                        Channel Terfavorit
                      </div>
                      <div className="text-green-700 dark:text-green-200">
                        {performanceData.channel_terpopuler} dengan tingkat kepuasan 92.3%
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 rounded">
                      <div className="font-medium text-purple-900 dark:text-purple-100 mb-1">
                        Peningkatan Performa
                      </div>
                      <div className="text-purple-700 dark:text-purple-200">
                        Waktu respon membaik 0.2 jam dibanding bulan lalu
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trend Chart */}
          {selectedChart === 'trend' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trend 6 Bulan Terakhir</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Volume Pengaduan & Bantuan</h4>
                  <div className="space-y-3">
                    {trendData.slice(-6).map((data, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="w-16 text-sm font-medium text-gray-600 dark:text-gray-300">
                          {data.bulan}
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Pengaduan</div>
                            <div className="font-semibold text-blue-600">{data.pengaduan}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Bantuan</div>
                            <div className="font-semibold text-green-600">{data.bantuan}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Kepuasan & Response Time</h4>
                  <div className="space-y-3">
                    {trendData.slice(-6).map((data, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="w-16 text-sm font-medium text-gray-600 dark:text-gray-300">
                          {data.bulan}
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Kepuasan</div>
                            <div className="font-semibold text-purple-600">{data.kepuasan}%</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Response</div>
                            <div className="font-semibold text-yellow-600">{data.waktu_respon}h</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Category Analysis */}
          {selectedChart === 'kategori' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analisis per Kategori</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Distribusi Kategori</h4>
                  <div className="space-y-3">
                    {categoryData.map((category, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded ${category.warna}`}></div>
                            <span className="font-medium text-gray-900 dark:text-white">{category.kategori}</span>
                            {getTrendIcon(category.trend)}
                          </div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {category.persentase}%
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Jumlah: </span>
                            <span className="font-medium text-gray-900 dark:text-white">{category.jumlah}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Avg: </span>
                            <span className="font-medium text-gray-900 dark:text-white">{category.rata_penyelesaian}d</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Rating: </span>
                            <span className="font-medium text-gray-900 dark:text-white">{category.tingkat_kepuasan}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Performance per Kategori</h4>
                  <div className="space-y-3">
                    {categoryData.map((category, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-gray-900 dark:text-white">{category.kategori}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            category.tingkat_kepuasan >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                            category.tingkat_kepuasan >= 85 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                          }`}>
                            {category.tingkat_kepuasan}% kepuasan
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Volume</span>
                            <span className="font-medium text-gray-900 dark:text-white">{category.jumlah} kasus</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Penyelesaian</span>
                            <span className="font-medium text-gray-900 dark:text-white">{category.rata_penyelesaian} hari</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Trend</span>
                            <div className="flex items-center gap-1">
                              {getTrendIcon(category.trend)}
                              <span className="font-medium text-gray-900 dark:text-white capitalize">{category.trend}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Channel Analysis */}
          {selectedChart === 'channel' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analisis per Channel</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Channel</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Total Request</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Response Time</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Satisfaction</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Utilization</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Effectiveness</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Peak Hours</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {channelData.map((channel, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {channel.channel === 'WhatsApp' && <MessageSquare className="w-4 h-4 text-green-600" />}
                            {channel.channel === 'Website Portal' && <Eye className="w-4 h-4 text-blue-600" />}
                            {channel.channel === 'Tatap Muka' && <Users className="w-4 h-4 text-purple-600" />}
                            {channel.channel === 'Email' && <Mail className="w-4 h-4 text-orange-600" />}
                            {channel.channel === 'Hotline Darurat' && <Phone className="w-4 h-4 text-red-600" />}
                            <span className="font-medium text-gray-900 dark:text-white">{channel.channel}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{channel.total_request}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`${getPerformanceColor(channel.response_time, 'time')}`}>
                            {channel.response_time} mnt
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`${getPerformanceColor(channel.satisfaction, 'percentage')}`}>
                            {channel.satisfaction}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{channel.utilization}%</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`${getPerformanceColor(channel.effectiveness, 'percentage')}`}>
                            {channel.effectiveness}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{channel.peak_hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Channel Terbaik (Kepuasan)</h4>
                  <div className="text-lg font-bold text-blue-700 dark:text-blue-200">Hotline Darurat</div>
                  <div className="text-sm text-blue-600 dark:text-blue-300">96.8% tingkat kepuasan</div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Channel Tercepat</h4>
                  <div className="text-lg font-bold text-green-700 dark:text-green-200">Hotline Darurat</div>
                  <div className="text-sm text-green-600 dark:text-green-300">3 menit response time</div>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-600">
                  <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Channel Terpopuler</h4>
                  <div className="text-lg font-bold text-purple-700 dark:text-purple-200">WhatsApp</div>
                  <div className="text-sm text-purple-600 dark:text-purple-300">487 total request</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <Calendar className="w-4 h-4" />
            Jadwalkan Laporan
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Eye className="w-4 h-4" />
            Preview Dashboard
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            Refresh Data
          </button>
          <button 
            onClick={exportReport}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            Export Laporan
          </button>
        </div>
      </div>
    </div>
  );
}
