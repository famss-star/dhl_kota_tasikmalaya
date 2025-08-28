"use client";

import { useState } from "react";
import { 
  Users, 
  Save, 
  Eye, 
  EyeOff, 
  TrendingUp,
  GraduationCap,
  Award,
  BarChart3,
  Plus,
  Minus,
  Edit3
} from "lucide-react";

interface StatistikPegawai {
  total_pegawai: number;
  pns: number;
  pppk: number;
  honorer: number;
}

interface PendidikanData {
  tingkat: string;
  jumlah: number;
  warna: string;
}

interface GolonganData {
  golongan: string;
  pangkat: string;
  jumlah: number;
}

export default function AdminStatistikPegawaiPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'statistik' | 'pendidikan' | 'golongan' | 'preview'>('statistik');

  // State untuk Statistik Dasar
  const [statistikData, setStatistikData] = useState<StatistikPegawai>({
    total_pegawai: 45,
    pns: 38,
    pppk: 5,
    honorer: 2
  });

  // State untuk Data Pendidikan
  const [pendidikanData, setPendidikanData] = useState<PendidikanData[]>([
    { tingkat: "S3", jumlah: 2, warna: "purple" },
    { tingkat: "S2", jumlah: 15, warna: "blue" },
    { tingkat: "S1", jumlah: 20, warna: "green" },
    { tingkat: "SMA/SMK", jumlah: 6, warna: "amber" },
    { tingkat: "SMP", jumlah: 2, warna: "red" }
  ]);

  // State untuk Data Golongan
  const [golonganData, setGolonganData] = useState<GolonganData[]>([
    { golongan: "IV/e", pangkat: "Pembina Utama Madya", jumlah: 1 },
    { golongan: "IV/d", pangkat: "Pembina Utama Muda", jumlah: 2 },
    { golongan: "IV/c", pangkat: "Pembina Utama", jumlah: 3 },
    { golongan: "IV/b", pangkat: "Pembina Tingkat I", jumlah: 4 },
    { golongan: "IV/a", pangkat: "Pembina", jumlah: 5 },
    { golongan: "III/d", pangkat: "Penata Tingkat I", jumlah: 8 },
    { golongan: "III/c", pangkat: "Penata", jumlah: 7 },
    { golongan: "III/b", pangkat: "Penata Muda Tingkat I", jumlah: 6 },
    { golongan: "III/a", pangkat: "Penata Muda", jumlah: 4 },
    { golongan: "II/d", pangkat: "Pengatur Tingkat I", jumlah: 3 },
    { golongan: "II/c", pangkat: "Pengatur", jumlah: 2 }
  ]);

  const handleSaveStatistik = async () => {
    setIsLoading(true);
    try {
      console.log('Saving statistik data...', statistikData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Data statistik berhasil disimpan!');
    } catch (error) {
      alert('Gagal menyimpan data statistik');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePendidikan = async () => {
    setIsLoading(true);
    try {
      console.log('Saving pendidikan data...', pendidikanData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Data pendidikan berhasil disimpan!');
    } catch (error) {
      alert('Gagal menyimpan data pendidikan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveGolongan = async () => {
    setIsLoading(true);
    try {
      console.log('Saving golongan data...', golonganData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Data golongan berhasil disimpan!');
    } catch (error) {
      alert('Gagal menyimpan data golongan');
    } finally {
      setIsLoading(false);
    }
  };

  const addPendidikan = () => {
    setPendidikanData(prev => [...prev, { tingkat: "", jumlah: 0, warna: "gray" }]);
  };

  const removePendidikan = (index: number) => {
    setPendidikanData(prev => prev.filter((_, i) => i !== index));
  };

  const updatePendidikan = (index: number, field: keyof PendidikanData, value: any) => {
    setPendidikanData(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const addGolongan = () => {
    setGolonganData(prev => [...prev, { golongan: "", pangkat: "", jumlah: 0 }]);
  };

  const removeGolongan = (index: number) => {
    setGolonganData(prev => prev.filter((_, i) => i !== index));
  };

  const updateGolongan = (index: number, field: keyof GolonganData, value: any) => {
    setGolonganData(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const getColorClass = (color: string) => {
    const colorMap = {
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
      red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
      gray: 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  const getGradientClass = (color: string) => {
    const gradientMap = {
      purple: 'from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30',
      blue: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
      green: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30',
      amber: 'from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30',
      red: 'from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30',
      gray: 'from-gray-100 to-gray-200 dark:from-gray-900/30 dark:to-gray-800/30'
    };
    return gradientMap[color as keyof typeof gradientMap] || gradientMap.gray;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-amber-600" />
              Statistik Pegawai
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Kelola data statistik dan komposisi pegawai DLH Kota Tasikmalaya
            </p>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? 'Sembunyikan Preview' : 'Preview Halaman'}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex">
            {[
              { id: 'statistik', label: 'Statistik Dasar', icon: TrendingUp },
              { id: 'pendidikan', label: 'Data Pendidikan', icon: GraduationCap },
              { id: 'golongan', label: 'Data Golongan', icon: Award },
              { id: 'preview', label: 'Preview', icon: Eye }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Tab: Statistik Dasar */}
          {activeTab === 'statistik' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Total Pegawai</h3>
                  </div>
                  <input
                    type="number"
                    value={statistikData.total_pegawai}
                    onChange={(e) => setStatistikData(prev => ({ ...prev, total_pegawai: parseInt(e.target.value) || 0 }))}
                    className="w-full text-3xl font-bold text-blue-600 dark:text-blue-400 bg-transparent border-b-2 border-blue-300 dark:border-blue-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">PNS</h3>
                  </div>
                  <input
                    type="number"
                    value={statistikData.pns}
                    onChange={(e) => setStatistikData(prev => ({ ...prev, pns: parseInt(e.target.value) || 0 }))}
                    className="w-full text-3xl font-bold text-green-600 dark:text-green-400 bg-transparent border-b-2 border-green-300 dark:border-green-600 focus:outline-none focus:border-green-500"
                  />
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg p-6 border border-amber-200 dark:border-amber-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                    <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300">PPPK</h3>
                  </div>
                  <input
                    type="number"
                    value={statistikData.pppk}
                    onChange={(e) => setStatistikData(prev => ({ ...prev, pppk: parseInt(e.target.value) || 0 }))}
                    className="w-full text-3xl font-bold text-amber-600 dark:text-amber-400 bg-transparent border-b-2 border-amber-300 dark:border-amber-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-6 border border-orange-200 dark:border-orange-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300">Honorer</h3>
                  </div>
                  <input
                    type="number"
                    value={statistikData.honorer}
                    onChange={(e) => setStatistikData(prev => ({ ...prev, honorer: parseInt(e.target.value) || 0 }))}
                    className="w-full text-3xl font-bold text-orange-600 dark:text-orange-400 bg-transparent border-b-2 border-orange-300 dark:border-orange-600 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveStatistik}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Menyimpan...' : 'Simpan Statistik'}
                </button>
              </div>
            </div>
          )}

          {/* Tab: Data Pendidikan */}
          {activeTab === 'pendidikan' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Komposisi Berdasarkan Pendidikan
                </h3>
                <button
                  onClick={addPendidikan}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Tingkat
                </button>
              </div>

              <div className="grid gap-4">
                {pendidikanData.map((item, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Tingkat Pendidikan
                        </label>
                        <input
                          type="text"
                          value={item.tingkat}
                          onChange={(e) => updatePendidikan(index, 'tingkat', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="S1, S2, S3, dll"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Jumlah
                        </label>
                        <input
                          type="number"
                          value={item.jumlah}
                          onChange={(e) => updatePendidikan(index, 'jumlah', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          min="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Warna
                        </label>
                        <select
                          value={item.warna}
                          onChange={(e) => updatePendidikan(index, 'warna', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="purple">Purple</option>
                          <option value="blue">Blue</option>
                          <option value="green">Green</option>
                          <option value="amber">Amber</option>
                          <option value="red">Red</option>
                          <option value="gray">Gray</option>
                        </select>
                      </div>

                      <div className="flex items-end justify-between">
                        <div className={`px-3 py-2 rounded-lg text-sm font-bold ${getColorClass(item.warna)}`}>
                          {item.jumlah} orang
                        </div>
                        <button
                          onClick={() => removePendidikan(index)}
                          className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSavePendidikan}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Menyimpan...' : 'Simpan Data Pendidikan'}
                </button>
              </div>
            </div>
          )}

          {/* Tab: Data Golongan */}
          {activeTab === 'golongan' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Komposisi Berdasarkan Golongan
                </h3>
                <button
                  onClick={addGolongan}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Golongan
                </button>
              </div>

              <div className="grid gap-4">
                {golonganData.map((item, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Golongan
                        </label>
                        <input
                          type="text"
                          value={item.golongan}
                          onChange={(e) => updateGolongan(index, 'golongan', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="IV/a, III/d, dll"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Pangkat
                        </label>
                        <input
                          type="text"
                          value={item.pangkat}
                          onChange={(e) => updateGolongan(index, 'pangkat', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Pembina, Penata, dll"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Jumlah
                        </label>
                        <input
                          type="number"
                          value={item.jumlah}
                          onChange={(e) => updateGolongan(index, 'jumlah', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          min="0"
                        />
                      </div>

                      <div className="flex items-end justify-between">
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-3 py-2 rounded-lg text-sm font-bold">
                          {item.jumlah} orang
                        </div>
                        <button
                          onClick={() => removeGolongan(index)}
                          className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveGolongan}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Menyimpan...' : 'Simpan Data Golongan'}
                </button>
              </div>
            </div>
          )}

          {/* Tab: Preview */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-lg p-8 text-center">
                <h2 className="text-3xl font-bold mb-2">Profil Pegawai</h2>
                <p className="text-lg opacity-90">Dinas Lingkungan Hidup Kota Tasikmalaya</p>
              </div>

              {/* Statistik Kepegawaian Preview */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center border-b-4 border-amber-500 pb-4">
                  Statistik Kepegawaian
                </h3>
                
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{statistikData.total_pegawai}</div>
                    <div className="text-gray-700 dark:text-gray-300 font-semibold">Total Pegawai</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{statistikData.pns}</div>
                    <div className="text-gray-700 dark:text-gray-300 font-semibold">PNS</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">{statistikData.pppk}</div>
                    <div className="text-gray-700 dark:text-gray-300 font-semibold">PPPK</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">{statistikData.honorer}</div>
                    <div className="text-gray-700 dark:text-gray-300 font-semibold">Honorer</div>
                  </div>
                </div>
              </div>

              {/* Komposisi Pendidikan Preview */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 border-b-4 border-amber-500 pb-2">
                  Komposisi Berdasarkan Pendidikan
                </h3>
                
                <div className="space-y-4">
                  {pendidikanData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{item.tingkat}</span>
                      <span className={`px-3 py-1 rounded-full font-bold ${getColorClass(item.warna)}`}>
                        {item.jumlah} orang
                      </span>
                    </div>
                  ))}
                  
                  <div className="bg-gradient-to-r from-amber-50 to-amber-50 dark:from-amber-900/20 dark:to-amber-900/20 rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      Total: <span className="text-amber-600 dark:text-amber-400">{statistikData.total_pegawai} Pegawai</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Komposisi Golongan Preview */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 border-b-4 border-amber-500 pb-2">
                  Komposisi Berdasarkan Golongan
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">Golongan IV</h4>
                    <div className="space-y-3">
                      {golonganData
                        .filter(item => item.golongan.startsWith('IV'))
                        .map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <span className="text-gray-700 dark:text-gray-300">{item.golongan} ({item.pangkat})</span>
                            <span className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-sm">{item.jumlah}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">Golongan III & II</h4>
                    <div className="space-y-3">
                      {golonganData
                        .filter(item => item.golongan.startsWith('III') || item.golongan.startsWith('II'))
                        .map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <span className="text-gray-700 dark:text-gray-300">{item.golongan} ({item.pangkat})</span>
                            <span className="bg-green-600 text-white px-2 py-1 rounded font-bold text-sm">{item.jumlah}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
