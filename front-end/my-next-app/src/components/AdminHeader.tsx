// components/AdminHeader.tsx
'use client';

interface AdminHeaderProps {
  adminUser: {
    name: string;
    email: string;
    role: string;
    id: string;
  } | null;
  onLogout: () => void;
  onToggleSidebar: () => void;
  currentSection: string;
}

const sectionTitles: { [key: string]: string } = {
  dashboard: 'داشبورد',
  posts: 'مدیریت مطالب',
  pages: 'مدیریت صفحات',
  media: 'مدیریت مدیا',
  categories: 'دسته‌بندی‌ها',
  comments: 'نظرات',
  users: 'مدیریت کاربران',
  menu: 'مدیریت منوها',
  appearance: 'تنظیمات ظاهر',
  settings: 'تنظیمات سیستم'
};

export default function AdminHeader({ adminUser, onLogout, onToggleSidebar, currentSection }: AdminHeaderProps) {
  return (
    <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur-lg sticky top-0 z-30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-around">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-4 space-x-reverse text-center">
            <h1 className="text-xl font-bold text-white ">
              {sectionTitles[currentSection] || 'پنل مدیریت'}
            </h1>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="text-right hidden sm:block">
              <p className="text-white text-sm font-medium">{adminUser?.name}</p>
              <p className="text-gray-400 text-xs">{adminUser?.role}</p>
            </div>
            
            <button
              onClick={onLogout}
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
  );
}