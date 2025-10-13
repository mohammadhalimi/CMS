import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'vip' | 'moderator';
  createdAt?: Date;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const fetchUsers = async (): Promise<void> => {
    try {
      const token = Cookies.get('adminToken');
      
      if (!token) {
        throw new Error('توکن احراز هویت یافت نشد');
      }

      const response = await fetch('http://localhost:4000/admin/allUsers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data: User[] = await response.json();
        setUsers(data);
        setMessage({ type: 'success', text: 'لیست کاربران با موفقیت دریافت شد' });
      } else {
        throw new Error('خطا در دریافت لیست کاربران');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'خطا در دریافت لیست کاربران' 
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'vip': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'moderator': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      default: return 'bg-gradient-to-r from-gray-600 to-gray-800';
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-300 text-lg">در حال دریافت لیست کاربران...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* هدر */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">مدیریت کاربران</h1>
              <p className="text-gray-300 mt-2">مدیریت و مشاهده تمام کاربران سیستم</p>
            </div>
            <button
              onClick={fetchUsers}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl border border-purple-500/30"
            >
              بروزرسانی لیست
            </button>
          </div>

          {/* فیلترها و جستجو */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6 border border-purple-500/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  جستجوی کاربر
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="جستجو بر اساس نام یا ایمیل..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  فیلتر بر اساس نقش
                </label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white"
                >
                  <option value="all" className="bg-slate-800">همه کاربران</option>
                  <option value="user" className="bg-slate-800">کاربر عادی</option>
                  <option value="vip" className="bg-slate-800">کاربر ویژه</option>
                  <option value="moderator" className="bg-slate-800">ناظر</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* پیام */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border-l-4 backdrop-blur-sm ${
            message.type === 'success' 
              ? 'bg-green-500/10 border-green-400 text-green-300' 
              : 'bg-red-500/10 border-red-400 text-red-300'
          }`}>
            <div className="flex items-center">
              <span className="text-lg mr-2">
                {message.type === 'success' ? '✅' : '❌'}
              </span>
              {message.text}
            </div>
          </div>
        )}

        {/* آمار */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 text-center border border-blue-500/20">
            <div className="text-3xl font-bold text-blue-400">{users.length}</div>
            <div className="text-gray-300 mt-2">کل کاربران</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 text-center border border-green-500/20">
            <div className="text-3xl font-bold text-green-400">
              {users.filter(u => u.role === 'user').length}
            </div>
            <div className="text-gray-300 mt-2">کاربران عادی</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 text-center border border-purple-500/20">
            <div className="text-3xl font-bold text-purple-400">
              {users.filter(u => u.role === 'vip').length}
            </div>
            <div className="text-gray-300 mt-2">کاربران ویژه</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 text-center border border-cyan-500/20">
            <div className="text-3xl font-bold text-cyan-400">
              {users.filter(u => u.role === 'moderator').length}
            </div>
            <div className="text-gray-300 mt-2">ناظران</div>
          </div>
        </div>

        {/* جدول کاربران */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-purple-500/20">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">
              لیست کاربران ({filteredUsers.length})
            </h2>
          </div>

          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      کاربر
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      ایمیل
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      نقش
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      تاریخ عضویت
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      اقدامات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredUsers.map((user) => (
                    <tr 
                      key={user._id}
                      className="hover:bg-slate-700/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div className="mr-4">
                            <div className="text-sm font-medium text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              ID: {user._id.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getRoleBadgeColor(user.role || 'user')}`}>
                          {user.role === 'vip' && '⭐ '}
                          {user.role === 'moderator' && '🛡️ '}
                          {user.role || 'user'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fa-IR') : 'نامشخص'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-3">
                          <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:scale-110">
                            ویرایش
                          </button>
                          <button className="text-red-400 hover:text-red-300 transition-colors duration-200 hover:scale-110">
                            حذف
                          </button>
                          <button className="text-green-400 hover:text-green-300 transition-colors duration-200 hover:scale-110">
                            جزئیات
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😕</div>
              <h3 className="text-xl font-medium text-white mb-2">هیچ کاربری یافت نشد</h3>
              <p className="text-gray-400">
                {searchTerm || roleFilter !== 'all' 
                  ? 'لطفاً فیلترهای جستجو را تغییر دهید' 
                  : 'هنوز کاربری در سیستم ثبت نشده است'}
              </p>
            </div>
          )}
        </div>

        {/* فوتر */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>سیستم مدیریت کاربران • آخرین بروزرسانی: {new Date().toLocaleTimeString('fa-IR')}</p>
        </div>
      </div>
    </div>
  );
};

export default UsersList;