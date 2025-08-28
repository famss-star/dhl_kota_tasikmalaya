"use client";

import { useState } from "react";
import { 
  Settings, 
  Save, 
  Upload,
  Download,
  Bell,
  Clock,
  Users,
  Shield,
  Globe,
  Palette,
  Database,
  Mail,
  MessageSquare,
  Zap,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit3,
  Key,
  Lock,
  Unlock,
  RefreshCw
} from "lucide-react";

interface NotificationSettings {
  email_notifications: boolean;
  sms_notifications: boolean;
  push_notifications: boolean;
  escalation_alerts: boolean;
  daily_reports: boolean;
  weekly_summaries: boolean;
  notification_frequency: 'instant' | 'hourly' | 'daily';
  quiet_hours_start: string;
  quiet_hours_end: string;
}

interface WorkflowSettings {
  auto_assignment: boolean;
  priority_auto_escalation: boolean;
  response_time_limits: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  resolution_time_limits: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  auto_closure_days: number;
  require_supervisor_approval: boolean;
  enable_public_tracking: boolean;
}

interface SecuritySettings {
  two_factor_auth: boolean;
  password_complexity: boolean;
  session_timeout: number; // minutes
  max_login_attempts: number;
  ip_whitelist_enabled: boolean;
  audit_log_retention: number; // days
  data_encryption: boolean;
  backup_frequency: 'daily' | 'weekly' | 'monthly';
}

interface IntegrationSettings {
  whatsapp_api: {
    enabled: boolean;
    api_key: string;
    webhook_url: string;
    business_account_id: string;
  };
  email_smtp: {
    enabled: boolean;
    host: string;
    port: number;
    username: string;
    password: string;
    encryption: 'tls' | 'ssl' | 'none';
  };
  sms_gateway: {
    enabled: boolean;
    provider: string;
    api_key: string;
    sender_id: string;
  };
  external_apis: {
    weather_api: boolean;
    maps_integration: boolean;
    document_scanner: boolean;
  };
}

interface SystemSettings {
  maintenance_mode: boolean;
  debug_mode: boolean;
  max_file_size: number; // MB
  allowed_file_types: string[];
  cache_duration: number; // hours
  database_backup_time: string;
  system_timezone: string;
  language_default: string;
  max_concurrent_users: number;
}

export default function PengaturanSistemPage() {
  const [activeTab, setActiveTab] = useState<'notifikasi' | 'workflow' | 'keamanan' | 'integrasi' | 'sistem'>('notifikasi');
  const [showPasswords, setShowPasswords] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email_notifications: true,
    sms_notifications: false,
    push_notifications: true,
    escalation_alerts: true,
    daily_reports: true,
    weekly_summaries: true,
    notification_frequency: 'instant',
    quiet_hours_start: '22:00',
    quiet_hours_end: '07:00'
  });

  const [workflowSettings, setWorkflowSettings] = useState<WorkflowSettings>({
    auto_assignment: true,
    priority_auto_escalation: true,
    response_time_limits: {
      low: 24,
      medium: 12,
      high: 4,
      critical: 1
    },
    resolution_time_limits: {
      low: 7,
      medium: 5,
      high: 3,
      critical: 1
    },
    auto_closure_days: 30,
    require_supervisor_approval: false,
    enable_public_tracking: true
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    two_factor_auth: true,
    password_complexity: true,
    session_timeout: 120,
    max_login_attempts: 3,
    ip_whitelist_enabled: false,
    audit_log_retention: 90,
    data_encryption: true,
    backup_frequency: 'daily'
  });

  const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings>({
    whatsapp_api: {
      enabled: true,
      api_key: '****-****-****-8901',
      webhook_url: 'https://api.dlh.tasikmalayakota.go.id/webhook/whatsapp',
      business_account_id: '123456789012345'
    },
    email_smtp: {
      enabled: true,
      host: 'smtp.gmail.com',
      port: 587,
      username: 'sistem@dlh.tasikmalayakota.go.id',
      password: '****-****-****',
      encryption: 'tls'
    },
    sms_gateway: {
      enabled: false,
      provider: 'Twilio',
      api_key: '****-****-****',
      sender_id: 'DLH-TSM'
    },
    external_apis: {
      weather_api: true,
      maps_integration: true,
      document_scanner: false
    }
  });

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    maintenance_mode: false,
    debug_mode: false,
    max_file_size: 10,
    allowed_file_types: ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'],
    cache_duration: 24,
    database_backup_time: '02:00',
    system_timezone: 'Asia/Jakarta',
    language_default: 'id',
    max_concurrent_users: 100
  });

  const handleSaveSettings = (section: string) => {
    console.log(`Menyimpan pengaturan ${section}:`, {
      notificationSettings,
      workflowSettings,
      securitySettings,
      integrationSettings,
      systemSettings
    });
    alert(`Pengaturan ${section} berhasil disimpan!`);
  };

  const handleTestConnection = (service: string) => {
    console.log(`Testing connection for ${service}`);
    alert(`Menguji koneksi ${service}...`);
  };

  const handleBackupNow = () => {
    console.log("Memulai backup manual");
    alert("Backup manual dimulai. Anda akan mendapat notifikasi saat selesai.");
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'text-green-600 bg-green-100 dark:bg-green-900/20',
      medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      high: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20',
      critical: 'text-red-600 bg-red-100 dark:bg-red-900/20'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Pengaturan Sistem</h1>
            <p className="text-gray-100">Konfigurasi sistem pengaduan dan bantuan</p>
          </div>
          <div className="flex items-center gap-2">
            {systemSettings.maintenance_mode ? (
              <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">Maintenance Mode</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">System Online</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto">
            {[
              { id: 'notifikasi', label: 'Notifikasi', icon: Bell },
              { id: 'workflow', label: 'Workflow', icon: Zap },
              { id: 'keamanan', label: 'Keamanan', icon: Shield },
              { id: 'integrasi', label: 'Integrasi', icon: Globe },
              { id: 'sistem', label: 'Sistem', icon: Database }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-gray-500 text-gray-600 dark:text-gray-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Tab: Notifikasi */}
          {activeTab === 'notifikasi' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pengaturan Notifikasi</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Jenis Notifikasi</h3>
                  
                  {[
                    { key: 'email_notifications', label: 'Email Notifications', icon: Mail },
                    { key: 'sms_notifications', label: 'SMS Notifications', icon: MessageSquare },
                    { key: 'push_notifications', label: 'Push Notifications', icon: Bell },
                    { key: 'escalation_alerts', label: 'Escalation Alerts', icon: AlertTriangle },
                    { key: 'daily_reports', label: 'Daily Reports', icon: Clock },
                    { key: 'weekly_summaries', label: 'Weekly Summaries', icon: Users }
                  ].map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                          <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings[item.key as keyof NotificationSettings] as boolean}
                            onChange={(e) => setNotificationSettings(prev => ({
                              ...prev,
                              [item.key]: e.target.checked
                            }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Pengaturan Waktu</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Frekuensi Notifikasi
                    </label>
                    <select
                      value={notificationSettings.notification_frequency}
                      onChange={(e) => setNotificationSettings(prev => ({
                        ...prev,
                        notification_frequency: e.target.value as any
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="instant">Instant</option>
                      <option value="hourly">Setiap Jam</option>
                      <option value="daily">Harian</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Quiet Hours Start
                      </label>
                      <input
                        type="time"
                        value={notificationSettings.quiet_hours_start}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          quiet_hours_start: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Quiet Hours End
                      </label>
                      <input
                        type="time"
                        value={notificationSettings.quiet_hours_end}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          quiet_hours_end: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Informasi</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-200">
                      Quiet hours akan menunda notifikasi non-urgent. Notifikasi darurat tetap akan dikirim.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Workflow */}
          {activeTab === 'workflow' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pengaturan Workflow</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Automation Settings</h3>
                  
                  {[
                    { key: 'auto_assignment', label: 'Auto Assignment', desc: 'Otomatis assign ke petugas tersedia' },
                    { key: 'priority_auto_escalation', label: 'Priority Auto Escalation', desc: 'Eskalasi otomatis berdasarkan prioritas' },
                    { key: 'require_supervisor_approval', label: 'Require Supervisor Approval', desc: 'Memerlukan persetujuan supervisor' },
                    { key: 'enable_public_tracking', label: 'Enable Public Tracking', desc: 'Izinkan tracking publik' }
                  ].map((item) => (
                    <div key={item.key} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={workflowSettings[item.key as keyof WorkflowSettings] as boolean}
                            onChange={(e) => setWorkflowSettings(prev => ({
                              ...prev,
                              [item.key]: e.target.checked
                            }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Auto Closure (hari tidak ada aktivitas)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="90"
                      value={workflowSettings.auto_closure_days}
                      onChange={(e) => setWorkflowSettings(prev => ({
                        ...prev,
                        auto_closure_days: parseInt(e.target.value) || 30
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Time Limits</h3>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Response Time Limits (jam)</h4>
                    <div className="space-y-3">
                      {Object.entries(workflowSettings.response_time_limits).map(([priority, hours]) => (
                        <div key={priority} className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded text-sm font-medium capitalize ${getPriorityColor(priority)}`}>
                            {priority}
                          </span>
                          <input
                            type="number"
                            min="1"
                            max="72"
                            value={hours}
                            onChange={(e) => setWorkflowSettings(prev => ({
                              ...prev,
                              response_time_limits: {
                                ...prev.response_time_limits,
                                [priority]: parseInt(e.target.value) || 1
                              }
                            }))}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <span className="text-sm text-gray-500 dark:text-gray-400">jam</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Resolution Time Limits (hari)</h4>
                    <div className="space-y-3">
                      {Object.entries(workflowSettings.resolution_time_limits).map(([priority, days]) => (
                        <div key={priority} className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded text-sm font-medium capitalize ${getPriorityColor(priority)}`}>
                            {priority}
                          </span>
                          <input
                            type="number"
                            min="1"
                            max="30"
                            value={days}
                            onChange={(e) => setWorkflowSettings(prev => ({
                              ...prev,
                              resolution_time_limits: {
                                ...prev.resolution_time_limits,
                                [priority]: parseInt(e.target.value) || 1
                              }
                            }))}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <span className="text-sm text-gray-500 dark:text-gray-400">hari</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Keamanan */}
          {activeTab === 'keamanan' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pengaturan Keamanan</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Authentication & Access</h3>
                  
                  {[
                    { key: 'two_factor_auth', label: '2FA Authentication', icon: Key },
                    { key: 'password_complexity', label: 'Password Complexity', icon: Lock },
                    { key: 'ip_whitelist_enabled', label: 'IP Whitelist', icon: Shield },
                    { key: 'data_encryption', label: 'Data Encryption', icon: Lock }
                  ].map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                          <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={securitySettings[item.key as keyof SecuritySettings] as boolean}
                            onChange={(e) => setSecuritySettings(prev => ({
                              ...prev,
                              [item.key]: e.target.checked
                            }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Security Policies</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Session Timeout (menit)
                    </label>
                    <input
                      type="number"
                      min="15"
                      max="480"
                      value={securitySettings.session_timeout}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        session_timeout: parseInt(e.target.value) || 120
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      min="3"
                      max="10"
                      value={securitySettings.max_login_attempts}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        max_login_attempts: parseInt(e.target.value) || 3
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Audit Log Retention (hari)
                    </label>
                    <input
                      type="number"
                      min="30"
                      max="365"
                      value={securitySettings.audit_log_retention}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        audit_log_retention: parseInt(e.target.value) || 90
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Backup Frequency
                    </label>
                    <select
                      value={securitySettings.backup_frequency}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        backup_frequency: e.target.value as any
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="daily">Harian</option>
                      <option value="weekly">Mingguan</option>
                      <option value="monthly">Bulanan</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Integrasi */}
          {activeTab === 'integrasi' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pengaturan Integrasi</h2>
              
              <div className="space-y-6">
                {/* WhatsApp API */}
                <div className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">WhatsApp Business API</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={integrationSettings.whatsapp_api.enabled}
                          onChange={(e) => setIntegrationSettings(prev => ({
                            ...prev,
                            whatsapp_api: { ...prev.whatsapp_api, enabled: e.target.checked }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                      <button
                        onClick={() => handleTestConnection('WhatsApp')}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors duration-200"
                      >
                        Test
                      </button>
                    </div>
                  </div>

                  {integrationSettings.whatsapp_api.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          API Key
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords ? "text" : "password"}
                            value={integrationSettings.whatsapp_api.api_key}
                            onChange={(e) => setIntegrationSettings(prev => ({
                              ...prev,
                              whatsapp_api: { ...prev.whatsapp_api, api_key: e.target.value }
                            }))}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(!showPasswords)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Business Account ID
                        </label>
                        <input
                          type="text"
                          value={integrationSettings.whatsapp_api.business_account_id}
                          onChange={(e) => setIntegrationSettings(prev => ({
                            ...prev,
                            whatsapp_api: { ...prev.whatsapp_api, business_account_id: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Webhook URL
                        </label>
                        <input
                          type="url"
                          value={integrationSettings.whatsapp_api.webhook_url}
                          onChange={(e) => setIntegrationSettings(prev => ({
                            ...prev,
                            whatsapp_api: { ...prev.whatsapp_api, webhook_url: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Email SMTP */}
                <div className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email SMTP</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={integrationSettings.email_smtp.enabled}
                          onChange={(e) => setIntegrationSettings(prev => ({
                            ...prev,
                            email_smtp: { ...prev.email_smtp, enabled: e.target.checked }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                      <button
                        onClick={() => handleTestConnection('Email')}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors duration-200"
                      >
                        Test
                      </button>
                    </div>
                  </div>

                  {integrationSettings.email_smtp.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          SMTP Host
                        </label>
                        <input
                          type="text"
                          value={integrationSettings.email_smtp.host}
                          onChange={(e) => setIntegrationSettings(prev => ({
                            ...prev,
                            email_smtp: { ...prev.email_smtp, host: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Port
                        </label>
                        <input
                          type="number"
                          value={integrationSettings.email_smtp.port}
                          onChange={(e) => setIntegrationSettings(prev => ({
                            ...prev,
                            email_smtp: { ...prev.email_smtp, port: parseInt(e.target.value) || 587 }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Username
                        </label>
                        <input
                          type="email"
                          value={integrationSettings.email_smtp.username}
                          onChange={(e) => setIntegrationSettings(prev => ({
                            ...prev,
                            email_smtp: { ...prev.email_smtp, username: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Encryption
                        </label>
                        <select
                          value={integrationSettings.email_smtp.encryption}
                          onChange={(e) => setIntegrationSettings(prev => ({
                            ...prev,
                            email_smtp: { ...prev.email_smtp, encryption: e.target.value as any }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="tls">TLS</option>
                          <option value="ssl">SSL</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Sistem */}
          {activeTab === 'sistem' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pengaturan Sistem</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">System Status</h3>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">Maintenance Mode</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={systemSettings.maintenance_mode}
                          onChange={(e) => setSystemSettings(prev => ({
                            ...prev,
                            maintenance_mode: e.target.checked
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Aktifkan mode maintenance untuk mencegah akses user
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">Debug Mode</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={systemSettings.debug_mode}
                          onChange={(e) => setSystemSettings(prev => ({
                            ...prev,
                            debug_mode: e.target.checked
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Tampilkan informasi debug untuk troubleshooting
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max File Size (MB)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={systemSettings.max_file_size}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        max_file_size: parseInt(e.target.value) || 10
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max Concurrent Users
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="1000"
                      value={systemSettings.max_concurrent_users}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        max_concurrent_users: parseInt(e.target.value) || 100
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">System Configuration</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timezone
                    </label>
                    <select
                      value={systemSettings.system_timezone}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        system_timezone: e.target.value
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                      <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                      <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Default Language
                    </label>
                    <select
                      value={systemSettings.language_default}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        language_default: e.target.value
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="id">Bahasa Indonesia</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cache Duration (jam)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="168"
                      value={systemSettings.cache_duration}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        cache_duration: parseInt(e.target.value) || 24
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Database Backup Time
                    </label>
                    <input
                      type="time"
                      value={systemSettings.database_backup_time}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        database_backup_time: e.target.value
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleBackupNow}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Database className="w-4 h-4" />
                      Backup Now
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
                      <RefreshCw className="w-4 h-4" />
                      Clear Cache
                    </button>
                  </div>
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
            <Download className="w-4 h-4" />
            Export Config
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Upload className="w-4 h-4" />
            Import Config
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            Reset Default
          </button>
          <button 
            onClick={() => handleSaveSettings(activeTab)}
            className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
            Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>
  );
}
