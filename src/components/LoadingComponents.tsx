// Loading components untuk konsistensi UI
export const TableRowSkeleton = () => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="animate-pulse h-4 bg-gray-300 rounded w-3/4"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="animate-pulse h-4 bg-gray-300 rounded w-2/3"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="animate-pulse h-6 bg-gray-300 rounded-full w-20"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="animate-pulse flex gap-2">
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
      </div>
    </td>
  </tr>
);

export const StatisticsCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
    <div className="animate-pulse flex items-center gap-3">
      <div className="w-8 h-8 bg-gray-300 rounded"></div>
      <div>
        <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-8"></div>
      </div>
    </div>
  </div>
);

export const PageHeaderSkeleton = () => (
  <div className="bg-gradient-to-r from-gray-400 to-gray-500 text-white py-16">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center animate-pulse">
        <div className="h-12 bg-gray-300 rounded-lg mx-auto mb-4 max-w-2xl"></div>
        <div className="h-6 bg-gray-300 rounded-lg mx-auto max-w-lg"></div>
      </div>
    </div>
  </div>
);

export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: any; 
  title: string; 
  description: string; 
}) => (
  <div className="text-center py-12">
    <Icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-gray-500 dark:text-gray-400">{description}</p>
  </div>
);

export const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin`}></div>
    </div>
  );
};
