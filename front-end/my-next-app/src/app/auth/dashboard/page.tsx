// components/UserDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import DashboardTab from '@/components/UserDashboard';
import PostsTab from '@/components/UserPosts';
import ProfileTab from '@/components/ProfileUser';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  bio: string;
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();

  // دریافت اطلاعات کاربر از کوکی
  useEffect(() => {
    const userDataFromCookie = Cookies.get('userData');
    const userToken = Cookies.get('userToken');

    if (!userToken) {
      router.push('/auth/login');
      return;
    }

    if (userDataFromCookie) {
      try {
        const userData = JSON.parse(userDataFromCookie);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/auth');
      }
    } else {
      router.push('/auth/login');
    }
    
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('userToken');
    Cookies.remove('userData');
    router.push('/auth/login');
  };

  // دریافت حروف اول نام برای آواتار
  const getUserInitials = () => {
    if (!user?.name) return '?';
    return user.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
  };

  // ترجمه نقش کاربر
  const getRoleText = (role: string) => {
    switch(role) {
      case 'admin': return 'مدیر';
      case 'author': return 'نویسنده';
      case 'editor': return 'ویرایشگر';
      case 'user': return 'کاربر';
      default: return role;
    }
  };

  // رندر محتوای تب فعال
  const renderActiveTab = () => {
    if (!user) return null;

    switch(activeTab) {
      case 'dashboard':
        return <DashboardTab user={user} />;
      case 'posts':
        return <PostsTab />;
      case 'new-post':
        return <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-4">ایجاد مقاله جدید</h2>
          <p className="text-slate-400">این بخش به زودی اضافه خواهد شد</p>
        </div>;
      case 'profile':
        return <ProfileTab user={user} />;
      default:
        return <DashboardTab user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg mb-4">خطا در بارگذاری اطلاعات کاربر</p>
          <button 
            onClick={() => router.push('/auth')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-all"
          >
            بازگشت به صفحه ورود
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" dir="rtl">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur-lg sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Right Section - Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Center Section - Logo */}
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">📝</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">پنل کاربری CMS</h1>
                <p className="text-gray-400 text-sm">
                  {getRoleText(user.role)}
                </p>
              </div>
            </div>

            {/* Left Section - User Menu */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="hidden sm:flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  {getUserInitials()}
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{user.name}</p>
                  <p className="text-gray-400 text-xs">{user.email}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-all flex items-center space-x-2 space-x-reverse"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:block">خروج</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed right-0 top-0 h-full w-64 bg-slate-800/90 backdrop-blur-lg border-l border-white/10
          transform transition-transform duration-300 ease-in-out z-40
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} 
          lg:translate-x-0 lg:static lg:z-auto
        `}>
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {getUserInitials()}
              </div>
              <div>
                <h2 className="text-white font-bold">{user.name}</h2>
                <p className="text-gray-400 text-sm">
                  {user.email}
                </p>
                <p className="text-purple-400 text-xs mt-1">
                  {getRoleText(user.role)}
                </p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', icon: '📊', label: 'داشبورد' },
              { id: 'posts', icon: '📝', label: 'مقالات من' },
              { id: 'new-post', icon: '✏️', label: 'مقاله جدید' },
              { id: 'profile', icon: '👤', label: 'پروفایل' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg transition-all
                  ${activeTab === item.id 
                    ? 'bg-purple-500/20 text-purple-400 border-r-2 border-purple-500' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:mr-64 transition-all duration-300">
          <div className="container mx-auto px-6 py-8">
            {renderActiveTab()}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}