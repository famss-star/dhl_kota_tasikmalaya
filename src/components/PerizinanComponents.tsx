import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Upload, 
  Eye, 
  Edit3, 
  Trash2, 
  BarChart3,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import { PerizinanStats } from "@/types/perizinan";

// Statistics Cards Component
export const StatisticsCards = ({ 
  stats, 
  title 
}: { 
  stats: PerizinanStats; 
  title: string; 
}) => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <BarChart3 className="w-8 h-8 text-blue-600" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.total}
          </p>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <CheckCircle className="w-8 h-8 text-green-600" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Disetujui
          </p>
          <p className="text-2xl font-bold text-green-600">
            {stats.approved}
          </p>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <Clock className="w-8 h-8 text-yellow-600" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Menunggu
          </p>
          <p className="text-2xl font-bold text-yellow-600">
            {stats.pending}
          </p>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <Eye className="w-8 h-8 text-blue-600" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Review</p>
          <p className="text-2xl font-bold text-blue-600">{stats.review}</p>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <XCircle className="w-8 h-8 text-red-600" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ditolak
          </p>
          <p className="text-2xl font-bold text-red-600">
            {stats.rejected}
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Page Header Component
export const PageHeader = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  gradient = "from-green-600 to-emerald-600" 
}: {
  title: string;
  subtitle: string;
  icon: any;
  gradient?: string;
}) => (
  <div className={`bg-gradient-to-r ${gradient} text-white py-16`}>
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
          <Icon className="w-9 h-9 text-white" />
          {title}
        </h1>
        <p className="text-xl md:text-2xl opacity-90">
          {subtitle}
        </p>
      </div>
    </div>
  </div>
);

// Search and Filter Component
export const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  additionalFilters = [],
  onExport,
  onImport,
  onAdd,
  addButtonText
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  additionalFilters?: Array<{
    icon: any;
    value: string;
    onChange: (value: string) => void;
    options: Array<{ value: string; label: string }>;
  }>;
  onExport?: () => void;
  onImport?: () => void;
  onAdd?: () => void;
  addButtonText?: string;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari pemohon, nomor surat, atau nama kegiatan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Menunggu</option>
            <option value="review">Review</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>

        {additionalFilters.map((filter, index) => (
          <div key={index} className="relative">
            <filter.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {onExport && (
          <button 
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        )}
        {onImport && (
          <button 
            onClick={onImport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Upload className="w-4 h-4" />
            Import
          </button>
        )}
        {onAdd && addButtonText && (
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow"
          >
            <Plus className="w-5 h-5" />
            {addButtonText}
          </button>
        )}
      </div>
    </div>
  </div>
);

// Action Buttons Component
export const ActionButtons = ({
  id,
  onView,
  onEdit,
  onDelete,
  basePath
}: {
  id: string;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  basePath: string;
}) => (
  <div className="flex gap-2">
    <button
      onClick={() => onView(id)}
      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded"
      title="Lihat Detail"
    >
      <Eye className="w-4 h-4" />
    </button>
    <button
      onClick={() => onEdit(id)}
      className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1 rounded"
      title="Edit"
    >
      <Edit3 className="w-4 h-4" />
    </button>
    <button
      onClick={() => onDelete(id)}
      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
      title="Hapus"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
);
