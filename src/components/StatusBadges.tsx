import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Eye, 
  AlertTriangle 
} from "lucide-react";
import { 
  getStatusBadgeConfig, 
  getTahapBadgeConfig, 
  getSkalaUsahaBadgeConfig 
} from "@/lib/perizinan-utils";

// Status Badge Component
export const StatusBadge = ({ status }: { status: string }) => {
  const config = getStatusBadgeConfig(status);
  
  const iconMap = {
    CheckCircle,
    Clock,
    Eye,
    XCircle,
    AlertTriangle
  };
  
  const IconComponent = iconMap[config.icon as keyof typeof iconMap] || Eye;

  return (
    <span className={config.className}>
      <IconComponent className="w-4 h-4" />
      {config.text}
    </span>
  );
};

// Tahap Badge Component khusus untuk AMDAL
export const TahapBadge = ({ tahap }: { tahap: string }) => {
  const config = getTahapBadgeConfig(tahap);

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

// Skala Usaha Badge Component khusus untuk UKL-UPL
export const SkalaUsahaBadge = ({ skala }: { skala: string }) => {
  const config = getSkalaUsahaBadgeConfig(skala);

  return (
    <span className={config.className}>
      {config.text}
    </span>
  );
};
