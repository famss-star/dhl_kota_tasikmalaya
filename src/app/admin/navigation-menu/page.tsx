"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  EyeOff,
  Menu,
  ChevronDown,
  ChevronRight,
  GripVertical,
  Link as LinkIcon,
  Settings
} from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  href: string;
  icon?: string;
  order: number;
  isActive: boolean;
  isExternal: boolean;
  openInNewTab: boolean;
  description?: string;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  name: string;
  href: string;
  icon?: string;
  order: number;
  isActive: boolean;
  isExternal: boolean;
  openInNewTab: boolean;
  description?: string;
}

interface MenuHighlight {
  id: string;
  menuName: string;
  title: string;
  description: string;
  isActive: boolean;
}

export default function AdminNavigationMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuHighlights, setMenuHighlights] = useState<MenuHighlight[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showHighlightModal, setShowHighlightModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingSubmenu, setEditingSubmenu] = useState<{ parentId: string; item: SubMenuItem | null }>({ parentId: "", item: null });
  const [editingHighlight, setEditingHighlight] = useState<MenuHighlight | null>(null);
  const [activeTab, setActiveTab] = useState<"menu" | "highlights">("menu");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const [formData, setFormData] = useState({
    name: "",
    href: "",
    icon: "",
    order: 1,
    isActive: true,
    isExternal: false,
    openInNewTab: false,
    description: ""
  });

  const [highlightFormData, setHighlightFormData] = useState({
    menuName: "",
    title: "",
    description: "",
    isActive: true
  });

  // Mock data for navigation menu
  useEffect(() => {
    const mockMenuItems: MenuItem[] = [
      {
        id: "1",
        name: "Beranda",
        href: "/",
        icon: "home",
        order: 1,
        isActive: true,
        isExternal: false,
        openInNewTab: false,
        description: "Halaman utama website"
      },
      {
        id: "2",
        name: "Profil",
        href: "/profil",
        icon: "user",
        order: 2,
        isActive: true,
        isExternal: false,
        openInNewTab: false,
        description: "Informasi profil DLH",
        submenu: [
          {
            id: "2-1",
            name: "Tentang DLH",
            href: "/profil/tentang",
            icon: "info",
            order: 1,
            isActive: true,
            isExternal: false,
            openInNewTab: false,
            description: "Tentang Dinas Lingkungan Hidup"
          },
          {
            id: "2-2",
            name: "Visi & Misi",
            href: "/profil/visi-misi",
            icon: "target",
            order: 2,
            isActive: true,
            isExternal: false,
            openInNewTab: false,
            description: "Visi dan misi organisasi"
          },
          {
            id: "2-3",
            name: "Struktur Organisasi",
            href: "/profil/struktur-organisasi",
            icon: "network",
            order: 3,
            isActive: true,
            isExternal: false,
            openInNewTab: false,
            description: "Struktur organisasi DLH"
          }
        ]
      },
      {
        id: "3",
        name: "Layanan Publik",
        href: "/layanan",
        icon: "settings",
        order: 3,
        isActive: true,
        isExternal: false,
        openInNewTab: false,
        description: "Layanan untuk masyarakat",
        submenu: [
          {
            id: "3-1",
            name: "Pelayanan Umum",
            href: "/pelayanan",
            icon: "users",
            order: 1,
            isActive: true,
            isExternal: false,
            openInNewTab: false,
            description: "Layanan umum DLH"
          },
          {
            id: "3-2",
            name: "Perizinan",
            href: "/perizinan",
            icon: "file-check",
            order: 2,
            isActive: true,
            isExternal: false,
            openInNewTab: false,
            description: "Layanan perizinan lingkungan"
          }
        ]
      },
      {
        id: "4",
        name: "Informasi & Dokumen",
        href: "/informasi",
        icon: "file-text",
        order: 4,
        isActive: true,
        isExternal: false,
        openInNewTab: false,
        description: "Informasi dan dokumen publik",
        submenu: [
          {
            id: "4-1",
            name: "Berita",
            href: "/informasi/berita",
            icon: "newspaper",
            order: 1,
            isActive: true,
            isExternal: false,
            openInNewTab: false,
            description: "Berita terkini"
          },
          {
            id: "4-2",
            name: "Artikel",
            href: "/informasi/artikel",
            icon: "book-open",
            order: 2,
            isActive: true,
            isExternal: false,
            openInNewTab: false,
            description: "Artikel edukasi"
          }
        ]
      }
    ];

    const mockHighlights: MenuHighlight[] = [
      {
        id: "1",
        menuName: "Profil",
        title: "Profil Dinas",
        description: "Dinas Lingkungan Hidup Kota Tasikmalaya merupakan unsur pelaksana urusan pemerintahan di bidang lingkungan hidup.",
        isActive: true
      },
      {
        id: "2",
        menuName: "Layanan Publik",
        title: "Layanan Terbaik",
        description: "Kami menyediakan berbagai layanan publik di bidang lingkungan hidup untuk masyarakat Kota Tasikmalaya.",
        isActive: true
      }
    ];

    setMenuItems(mockMenuItems);
    setMenuHighlights(mockHighlights);
  }, []);

  const handleEditMenuItem = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      href: item.href,
      icon: item.icon || "",
      order: item.order,
      isActive: item.isActive,
      isExternal: item.isExternal,
      openInNewTab: item.openInNewTab,
      description: item.description || ""
    });
    setShowModal(true);
  };

  const handleAddMenuItem = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      href: "",
      icon: "",
      order: menuItems.length + 1,
      isActive: true,
      isExternal: false,
      openInNewTab: false,
      description: ""
    });
    setShowModal(true);
  };

  const handleEditSubmenu = (parentId: string, item: SubMenuItem | null) => {
    setEditingSubmenu({ parentId, item });
    if (item) {
      setFormData({
        name: item.name,
        href: item.href,
        icon: item.icon || "",
        order: item.order,
        isActive: item.isActive,
        isExternal: item.isExternal,
        openInNewTab: item.openInNewTab,
        description: item.description || ""
      });
    } else {
      const parent = menuItems.find(m => m.id === parentId);
      const nextOrder = parent?.submenu ? parent.submenu.length + 1 : 1;
      setFormData({
        name: "",
        href: "",
        icon: "",
        order: nextOrder,
        isActive: true,
        isExternal: false,
        openInNewTab: false,
        description: ""
      });
    }
    setShowModal(true);
  };

  const handleSubmitMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingSubmenu.parentId) {
        // Handle submenu
        setMenuItems(prev => prev.map(item => {
          if (item.id === editingSubmenu.parentId) {
            if (editingSubmenu.item) {
              // Edit existing submenu
              return {
                ...item,
                submenu: item.submenu?.map(sub => 
                  sub.id === editingSubmenu.item!.id 
                    ? { ...sub, ...formData }
                    : sub
                )
              };
            } else {
              // Add new submenu
              const newSubmenu: SubMenuItem = {
                id: Date.now().toString(),
                ...formData
              };
              return {
                ...item,
                submenu: [...(item.submenu || []), newSubmenu]
              };
            }
          }
          return item;
        }));
      } else {
        // Handle main menu
        if (editingItem) {
          setMenuItems(prev => prev.map(item => 
            item.id === editingItem.id 
              ? { ...item, ...formData }
              : item
          ));
        } else {
          const newMenuItem: MenuItem = {
            id: Date.now().toString(),
            ...formData,
            submenu: []
          };
          setMenuItems(prev => [...prev, newMenuItem]);
        }
      }

      setShowModal(false);
      setEditingItem(null);
      setEditingSubmenu({ parentId: "", item: null });
    } catch (error) {
      console.error('Error saving menu item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus menu ini?')) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setMenuItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubmenu = async (parentId: string, submenuId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus submenu ini?')) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setMenuItems(prev => prev.map(item => 
        item.id === parentId 
          ? { ...item, submenu: item.submenu?.filter(sub => sub.id !== submenuId) }
          : item
      ));
    } catch (error) {
      console.error('Error deleting submenu:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const iconOptions = [
    { value: "home", label: "Home" },
    { value: "user", label: "User" },
    { value: "users", label: "Users" },
    { value: "settings", label: "Settings" },
    { value: "file-text", label: "File Text" },
    { value: "newspaper", label: "Newspaper" },
    { value: "book-open", label: "Book Open" },
    { value: "info", label: "Info" },
    { value: "target", label: "Target" },
    { value: "network", label: "Network" },
    { value: "file-check", label: "File Check" },
    { value: "phone", label: "Phone" },
    { value: "mail", label: "Mail" }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Manajemen Menu Navigasi
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola struktur menu dan highlight navigasi website
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("menu")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "menu"
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <Menu className="w-4 h-4" />
              Struktur Menu
            </button>
            <button
              onClick={() => setActiveTab("highlights")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "highlights"
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <Settings className="w-4 h-4" />
              Menu Highlights
            </button>
          </nav>
        </div>
      </div>

      {/* Menu Structure Tab */}
      {activeTab === "menu" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Struktur Menu Navigasi
            </h3>
            <button
              onClick={handleAddMenuItem}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={20} />
              Tambah Menu
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              {menuItems.map((item) => (
                <div key={item.id} className="border border-gray-200 dark:border-gray-600 rounded-lg mb-4 last:mb-0">
                  {/* Main Menu Item */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical size={16} className="text-gray-400 cursor-move" />
                      <div className="flex items-center gap-2">
                        {item.submenu && item.submenu.length > 0 && (
                          <button
                            onClick={() => toggleExpanded(item.id)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            {expandedItems.has(item.id) ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </button>
                        )}
                        <div className="text-gray-400">📝</div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {item.href} • Order: {item.order}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.isActive ? (
                          <Eye size={16} className="text-green-500" />
                        ) : (
                          <EyeOff size={16} className="text-gray-400" />
                        )}
                        {item.isExternal && (
                          <LinkIcon size={16} className="text-blue-500" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.submenu && (
                        <button
                          onClick={() => handleEditSubmenu(item.id, null)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center gap-1"
                        >
                          <Plus size={12} />
                          Sub
                        </button>
                      )}
                      <button
                        onClick={() => handleEditMenuItem(item)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <Edit3 size={12} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMenuItem(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={12} />
                        Hapus
                      </button>
                    </div>
                  </div>

                  {/* Submenu Items */}
                  {expandedItems.has(item.id) && item.submenu && item.submenu.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                      {item.submenu.map((sub) => (
                        <div key={sub.id} className="p-3 pl-12 flex items-center justify-between border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                          <div className="flex items-center gap-3">
                            <div className="text-gray-400">└─</div>
                            <div className="text-gray-400">📄</div>
                            <div>
                              <div className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                                {sub.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {sub.href} • Order: {sub.order}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {sub.isActive ? (
                                <Eye size={14} className="text-green-500" />
                              ) : (
                                <EyeOff size={14} className="text-gray-400" />
                              )}
                              {sub.isExternal && (
                                <LinkIcon size={14} className="text-blue-500" />
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEditSubmenu(item.id, sub)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1"
                            >
                              <Edit3 size={10} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteSubmenu(item.id, sub.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1"
                            >
                              <Trash2 size={10} />
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Menu Highlights Tab */}
      {activeTab === "highlights" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Menu Highlights & Descriptions
            </h3>
            <button
              onClick={() => {
                setEditingHighlight(null);
                setHighlightFormData({
                  menuName: "",
                  title: "",
                  description: "",
                  isActive: true
                });
                setShowHighlightModal(true);
              }}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={20} />
              Tambah Highlight
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuHighlights.map((highlight) => (
              <div key={highlight.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {highlight.menuName}
                    </h4>
                    <h5 className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                      {highlight.title}
                    </h5>
                  </div>
                  <div className="flex items-center gap-1">
                    {highlight.isActive ? (
                      <Eye size={16} className="text-green-500" />
                    ) : (
                      <EyeOff size={16} className="text-gray-400" />
                    )}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {highlight.description}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingHighlight(highlight);
                      setHighlightFormData({
                        menuName: highlight.menuName,
                        title: highlight.title,
                        description: highlight.description,
                        isActive: highlight.isActive
                      });
                      setShowHighlightModal(true);
                    }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit3 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (!confirm('Apakah Anda yakin ingin menghapus highlight ini?')) return;
                      setMenuHighlights(prev => prev.filter(h => h.id !== highlight.id));
                    }}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 size={14} />
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Menu Item Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {editingItem ? "Edit Menu" : editingSubmenu.item ? "Edit Submenu" : editingSubmenu.parentId ? "Tambah Submenu" : "Tambah Menu"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitMenuItem}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Menu
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Contoh: Beranda"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL/Link
                  </label>
                  <input
                    type="text"
                    value={formData.href}
                    onChange={(e) => setFormData(prev => ({ ...prev, href: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Contoh: / atau /profil"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Pilih Icon</option>
                    {iconOptions.map((icon) => (
                      <option key={icon.value} value={icon.value}>
                        {icon.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi (Opsional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Deskripsi singkat untuk menu"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Urutan
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      min="1"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Tampilkan menu
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isExternal"
                      checked={formData.isExternal}
                      onChange={(e) => setFormData(prev => ({ ...prev, isExternal: e.target.checked }))}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isExternal" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Link eksternal
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="openInNewTab"
                      checked={formData.openInNewTab}
                      onChange={(e) => setFormData(prev => ({ ...prev, openInNewTab: e.target.checked }))}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="openInNewTab" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Buka di tab baru
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Highlight Modal */}
      {showHighlightModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {editingHighlight ? "Edit Highlight" : "Tambah Highlight"}
              </h3>
              <button
                onClick={() => setShowHighlightModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                if (editingHighlight) {
                  setMenuHighlights(prev => prev.map(h => 
                    h.id === editingHighlight.id 
                      ? { ...h, ...highlightFormData }
                      : h
                  ));
                } else {
                  const newHighlight: MenuHighlight = {
                    id: Date.now().toString(),
                    ...highlightFormData
                  };
                  setMenuHighlights(prev => [...prev, newHighlight]);
                }

                setShowHighlightModal(false);
                setEditingHighlight(null);
              } catch (error) {
                console.error('Error saving highlight:', error);
              } finally {
                setLoading(false);
              }
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Menu
                  </label>
                  <input
                    type="text"
                    value={highlightFormData.menuName}
                    onChange={(e) => setHighlightFormData(prev => ({ ...prev, menuName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Contoh: Profil"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Judul Highlight
                  </label>
                  <input
                    type="text"
                    value={highlightFormData.title}
                    onChange={(e) => setHighlightFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Contoh: Profil Dinas"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={highlightFormData.description}
                    onChange={(e) => setHighlightFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Deskripsi yang akan muncul saat hover menu"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="highlightActive"
                    checked={highlightFormData.isActive}
                    onChange={(e) => setHighlightFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="highlightActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Aktifkan highlight
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowHighlightModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
