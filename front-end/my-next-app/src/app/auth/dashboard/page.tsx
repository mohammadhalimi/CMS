// components/UserDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'author' | 'editor';
  joinDate: string;
  postsCount: number;
  commentsCount: number;
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // داده‌های نمونه
  const sampleUser: User = {
    id: '1',
    name: 'علی محمدی',
    email: 'ali@example.com',
    role: 'author',
    joinDate: '2024-01-15',
    postsCount: 12,
    commentsCount: 45
  };

  useEffect(() => {
    setUser(sampleUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    router.push('/auth');
  };

  const stats = [
    { 
      title: 'مقالات منتشر شده', 
      value: '0', 
      icon: '📝', 
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      title: 'نظرات ارسال شده', 
      value:'0', 
      icon: '💬', 
      color: 'from-green-500 to-emerald-500' 
    },
    { 
      title: 'بازدید مقالات', 
      value: '۱,۲۵۰', 
      icon: '👁️', 
      color: 'from-purple-500 to-pink-500' 
    },
    { 
      title: 'روزهای عضویت', 
      value: '۴۵', 
      icon: '📅', 
      color: 'from-orange-500 to-yellow-500' 
    },
  ];

  const recentPosts = [
    { 
      id: 1, 
      title: 'آموزش کار با سیستم مدیریت محتوا', 
      status: 'منتشر شده', 
      date: '۱۴۰۲/۱۰/۱۵', 
      views: 245,
      comments: 12 
    },
    { 
      id: 2, 
      title: 'بهترین روش‌های سئو در سال ۲۰۲۴', 
      status: 'در انتظار تایید', 
      date: '۱۴۰۲/۱۰/۱۴', 
      views: 0,
      comments: 0 
    },
    { 
      id: 3, 
      title: 'بررسی جدیدترین قالب‌های وردپرس', 
      status: 'منتشر شده', 
      date: '۱۴۰۲/۱۰/۱۲', 
      views: 189,
      comments: 8 
    },
  ];

  const recentComments = [
    {
      id: 1,
      postTitle: 'آموزش کار با سیستم مدیریت محتوا',
      content: 'مقاله بسیار عالی و کاربردی بود. ممنون از زحمات شما...',
      date: '۲ ساعت پیش',
      status: 'تایید شده'
    },
    {
      id: 2,
      postTitle: 'بررسی جدیدترین قالب‌های وردپرس',
      content: 'من از قالب X استفاده کردم واقعا عالی بود...',
      date: '۱ روز پیش',
      status: 'در انتظار تایید'
    },
  ];

  const quickActions = [
    { title: 'مقاله جدید', icon: '📝', color: 'from-blue-500 to-cyan-500', href: '/user/posts/new' },
    { title: 'ویرایش پروفایل', icon: '👤', color: 'from-green-500 to-emerald-500', href: '/user/profile' },
    { title: 'مدیریت نظرات', icon: '💬', color: 'from-purple-500 to-pink-500', href: '/user/comments' },
    { title: 'آمار و گزارشات', icon: '📊', color: 'from-orange-500 to-red-500', href: '/user/analytics' },
  ];

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
                  {user?.role === 'author' ? 'نویسنده' : 
                   user?.role === 'editor' ? 'ویرایشگر' : 'کاربر'}
                </p>
              </div>
            </div>

            {/* Left Section - User Menu */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="hidden sm:flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0)}
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{user?.name}</p>
                  <p className="text-gray-400 text-xs">{user?.email}</p>
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
                {user?.name?.charAt(0)}
              </div>
              <div>
                <h2 className="text-white font-bold">{user?.name}</h2>
                <p className="text-gray-400 text-sm">
                  {user?.role === 'author' ? 'نویسنده' : 'کاربر'}
                </p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', icon: '📊', label: 'داشبورد' },
              { id: 'posts', icon: '📝', label: 'مقالات من' },
              { id: 'new-post', icon: '✏️', label: 'مقاله جدید' },
              { id: 'comments', icon: '💬', label: 'نظرات من' },
              { id: 'profile', icon: '👤', label: 'پروفایل' },
              { id: 'media', icon: '🖼️', label: 'کتابخانه مدیا' },
              { id: 'settings', icon: '⚙️', label: 'تنظیمات' },
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
            
            {/* آمار سریع */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-6 hover:transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-xl">{stat.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* مقالات اخیر */}
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">مقالات اخیر</h3>
                  <button className="text-purple-400 hover:text-purple-300 text-sm transition-all">
                    مشاهده همه
                  </button>
                </div>
                
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-white font-medium text-sm flex-1">{post.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.status === 'منتشر شده' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>📅 {post.date}</span>
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <span>👁️ {post.views}</span>
                          <span>💬 {post.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* نظرات اخیر */}
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">نظرات اخیر</h3>
                  <button className="text-purple-400 hover:text-purple-300 text-sm transition-all">
                    مشاهده همه
                  </button>
                </div>
                
                <div className="space-y-4">
                  {recentComments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all">
                      <h4 className="text-white font-medium text-sm mb-2">{comment.postTitle}</h4>
                      <p className="text-gray-300 text-xs mb-3 line-clamp-2">{comment.content}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{comment.date}</span>
                        <span className={`px-2 py-1 rounded-full ${
                          comment.status === 'تایید شده' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {comment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* اقدامات سریع */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-white mb-6">اقدامات سریع</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-6 hover:transform hover:scale-105 transition-all duration-300 group"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all`}>
                      <span className="text-2xl">{action.icon}</span>
                    </div>
                    <h4 className="text-white font-bold text-center">{action.title}</h4>
                  </button>
                ))}
              </div>
            </div>

            {/* وضعیت سیستم */}
            <div className="mt-8 bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">وضعیت سیستم</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                  <div className="text-2xl mb-2">🟢</div>
                  <p className="text-green-400 font-medium">سیستم فعال</p>
                </div>
                <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <div className="text-2xl mb-2">📊</div>
                  <p className="text-blue-400 font-medium">پایگاه داده متصل</p>
                </div>
                <div className="p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
                  <div className="text-2xl mb-2">🛡️</div>
                  <p className="text-purple-400 font-medium">امنیت فعال</p>
                </div>
              </div>
            </div>
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