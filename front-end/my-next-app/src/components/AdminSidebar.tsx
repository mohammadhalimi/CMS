'use client';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', icon: '📊', label: 'داشبورد' },
  { id: 'posts', icon: '📝', label: 'مدیریت مطالب' },
  { id: 'pages', icon: '📄', label: 'مدیریت صفحات' },
  { id: 'media', icon: '🖼️', label: 'مدیریت مدیا' },
  { id: 'categories', icon: '📂', label: 'دسته‌بندی‌ها' },
  { id: 'comments', icon: '💬', label: 'نظرات' },
  { id: 'users', icon: '👥', label: 'کاربران' },
  { id: 'menu', icon: '🔗', label: 'منوها' },
  { id: 'appearance', icon: '🎨', label: 'ظاهر' },
  { id: 'settings', icon: '⚙️', label: 'تنظیمات' },
  { id: 'admins', icon: '👨‍💼', label: 'لیست مدیران' },
];

export default function AdminSidebar({ isOpen, onClose, activeSection, onSectionChange }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div className={`
        fixed right-0 top-0 h-full w-64 bg-slate-800/90 backdrop-blur-lg border-l border-white/10
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
        lg:translate-x-0 lg:relative lg:z-auto
      `}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">⚙️</span>
            </div>
            <div>
              <h2 className="text-white font-bold">پنل مدیریت</h2>
              <p className="text-gray-400 text-sm">CMS Pro</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                onClose();
              }}
              className={`
                w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg transition-all
                ${activeSection === item.id 
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
    </>
  );
}