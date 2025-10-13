'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import DashboardSection from '@/components/DashboardSection';
import PostsSection from '@/components/PostsSection';
import MediaSection from '@/components/MediaSection';
import CategoriesSection from '@/components/CategoriesSection';
import CommentsSection from '@/components/CommentsSection';
import UsersSection from '@/components/UsersSection';
import MenuSection from '@/components/MenuSection';
import AppearanceSection from '@/components/AppearanceSection';
import SettingsSection from '@/components/SettingsSection';
import AdminSection from '@/components/AdminSection';
import UsersList from '@/components/UserSection';

interface AdminUser {
  name: string;
  email: string;
  role: string;
  id: string;
}

export default function AdminDashboard() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('adminToken');
    const userData = Cookies.get('adminUser');

    if (!token || !userData) {
      router.push('/Admin/login');
      return;
    }

    setAdminUser(JSON.parse(userData));
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('adminToken');
    Cookies.remove('adminUser');
    router.push('/Admin/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // تابع برای رندر کردن بخش فعال
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'posts':
        return <PostsSection />;
      case 'pages':
        return <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-6">
          <h1 className="text-2xl font-bold text-white mb-4">مدیریت صفحات</h1>
          <p className="text-gray-300">این بخش به زودی اضافه خواهد شد</p>
        </div>;
      case 'media':
        return <MediaSection />;
      case 'categories':
        return <CategoriesSection />;
      case 'comments':
        return <CommentsSection />;
      case 'users':
        return <UsersSection />;
      case 'menu':
        return <MenuSection />;
      case 'appearance':
        return <AppearanceSection />;
      case 'settings':
        return <SettingsSection />;
        case 'admins':
        return <AdminSection />;
      case 'userList':
        return <UsersList />;
      default:
        return <DashboardSection />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" dir="rtl">
      <AdminHeader
        adminUser={adminUser}
        onLogout={handleLogout}
        onToggleSidebar={toggleSidebar}
        currentSection={activeSection}
      />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar - Fixed on large screens */}
        <div className="hidden lg:block fixed right-0 top-0 h-full z-40">
          <AdminSidebar
            isOpen={true}
            onClose={() => setSidebarOpen(false)}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:mr-64 transition-all duration-300">
          <div className="container mx-auto px-6 py-8">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
}