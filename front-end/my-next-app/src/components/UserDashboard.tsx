// components/dashboard/DashboardTab.tsx
interface DashboardTabProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    bio: string;
  };
}

export default function DashboardTab({ user }: DashboardTabProps) {
  const stats = [
    { 
      title: 'مقالات منتشر شده', 
      value: '۰', 
      icon: '📝', 
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      title: 'نظرات ارسال شده', 
      value: '۰', 
      icon: '💬', 
      color: 'from-green-500 to-emerald-500' 
    },
    { 
      title: 'بازدید مقالات', 
      value: '۰', 
      icon: '👁️', 
      color: 'from-purple-500 to-pink-500' 
    },
    { 
      title: 'روزهای عضویت', 
      value: '۱', 
      icon: '📅', 
      color: 'from-orange-500 to-yellow-500' 
    },
  ];

  return (
    <div>
      {/* خوش آمدگویی */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              سلام، {user.name}!
            </h2>
            <p className="text-gray-400">
              به پنل کاربری خود خوش آمدید. از اینجا می‌توانید حساب کاربری خود را مدیریت کنید.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-purple-500/20 border border-purple-500/30 text-purple-400 px-4 py-2 rounded-lg">
              نقش: {user.role === 'admin' ? 'مدیر' : user.role === 'author' ? 'نویسنده' : 'کاربر'}
            </div>
          </div>
        </div>
      </div>
      
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

      {/* اطلاعات حساب کاربری */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-6">
        <h3 className="text-lg font-bold text-white mb-4">اطلاعات حساب کاربری</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm">نام کامل</p>
            <p className="text-white font-medium">{user.name}</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm">ایمیل</p>
            <p className="text-white font-medium">{user.email}</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm">نقش</p>
            <p className="text-white font-medium">
              {user.role === 'admin' ? 'مدیر' : user.role === 'author' ? 'نویسنده' : 'کاربر'}
            </p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm">آیدی کاربر</p>
            <p className="text-white font-medium text-sm">{user.id}</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm">بیوگرافی کاربر</p>
            <p className="text-white font-medium text-sm">{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}