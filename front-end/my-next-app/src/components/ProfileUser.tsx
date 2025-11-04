// components/dashboard/ProfileTab.tsx
"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ProfileTabProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export default function ProfileTab({ user }: ProfileTabProps) {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    password: "",
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // وقتی user تغییر کرد، فرم رو آپدیت کن
    setForm(prev => ({
      ...prev,
      name: user.name || "",
      email: user.email || ""
    }));
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = Cookies.get("userToken");

    try {
      const res = await fetch(`${API_URL}/user/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage({ type: 'success', text: data.message || 'پروفایل با موفقیت بروزرسانی شد' });
        setIsEditing(false);
        
        // آپدیت اطلاعات کاربر در کوکی
        const updatedUser = {
          ...user,
          name: form.name,
          email: form.email
        };
        Cookies.set('userData', JSON.stringify(updatedUser));
        
        // پاک کردن فیلد رمز عبور
        setForm(prev => ({ ...prev, password: '' }));
      } else {
        setMessage({ type: 'error', text: data.message || 'خطا در بروزرسانی پروفایل' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'خطا در ارتباط با سرور' });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
      bio: "",
    });
    setMessage(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">پروفایل کاربری</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          {isEditing ? 'لغو ویرایش' : 'ویرایش پروفایل'}
        </button>
      </div>

      {/* نمایش پیام */}
      {message && (
        <div className={`p-4 rounded-lg border mb-6 ${
          message.type === 'success' 
            ? 'bg-green-500/20 border-green-500 text-green-400' 
            : 'bg-red-500/20 border-red-500 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  نام کامل
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="نام و نام خانوادگی"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ایمیل
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  رمز عبور جدید
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="رمز عبور جدید (اختیاری)"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  بیوگرافی
                </label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="درباره خودتان بنویسید..."
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                ذخیره تغییرات
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all"
              >
                لغو
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            {/* اطلاعات کاربر */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">نام کامل</p>
                <p className="text-white font-medium text-lg">{user.name}</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">ایمیل</p>
                <p className="text-white font-medium text-lg">{user.email}</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">نقش</p>
                <p className="text-white font-medium text-lg">
                  {user.role === 'admin' ? 'مدیر' : user.role === 'author' ? 'نویسنده' : 'کاربر'}
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">آیدی کاربر</p>
                <p className="text-white font-medium text-sm">{user.id}</p>
              </div>
            </div>

            {/* بیوگرافی */}
            {form.bio && (
              <div className="bg-slate-700/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">بیوگرافی</p>
                <p className="text-white leading-7">{form.bio}</p>
              </div>
            )}

            {/* نکات */}
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">نکات مهم:</h4>
              <ul className="text-blue-300 text-sm space-y-1">
                <li>• برای تغییر رمز عبور، فیلد مربوطه را پر کنید</li>
                <li>• در صورت خالی گذاشتن فیلد رمز عبور، رمز قبلی حفظ می‌شود</li>
                <li>• بیوگرافی اختیاری است و می‌توانید آن را خالی بگذارید</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}