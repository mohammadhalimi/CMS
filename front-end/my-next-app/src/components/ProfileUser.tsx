// components/dashboard/ProfileTab.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ProfileTabProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    bio: string;
    profileImage: string;
  };
}

export default function ProfileTab({ user }: ProfileTabProps) {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    password: "",
    bio: user.bio || "",
  });
  const [profileImage, setProfileImage] = useState(user.profileImage || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'security'>('info');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      name: user.name || "",
      email: user.email || "",
      bio: user.bio || ""
    }));
    setProfileImage(user.profileImage || "");
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'لطفاً فقط فایل تصویر انتخاب کنید' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'حجم فایل نباید بیشتر از 5 مگابایت باشد' });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('profileImage', file);

    const token = Cookies.get("userToken");

    try {
      const res = await fetch(`${API_URL}/user/upload-profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setProfileImage(data.profileImage || data.imageUrl);
        setMessage({ type: 'success', text: '✅ عکس پروفایل با موفقیت آپلود شد' });

        const userData = JSON.parse(Cookies.get('userData') || '{}');
        const updatedUser = {
          ...userData,
          profileImage: data.profileImage || data.imageUrl
        };
        Cookies.set('userData', JSON.stringify(updatedUser));
      } else {
        setMessage({ type: 'error', text: data.message || '❌ خطا در آپلود عکس' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '❌ خطا در ارتباط با سرور' });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = async () => {
    const token = Cookies.get("userToken");

    try {
      const res = await fetch(`${API_URL}/user/remove-profile-image`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setProfileImage("");
        setMessage({ type: 'success', text: '✅ عکس پروفایل با موفقیت حذف شد' });

        const userData = JSON.parse(Cookies.get('userData') || '{}');
        const updatedUser = {
          ...userData,
          profileImage: ""
        };
        Cookies.set('userData', JSON.stringify(updatedUser));
      } else {
        setMessage({ type: 'error', text: data.message || '❌ خطا در حذف عکس' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '❌ خطا در ارتباط با سرور' });
    }
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
        setMessage({ type: 'success', text: '✅ پروفایل با موفقیت بروزرسانی شد' });
        setIsEditing(false);

        const userData = JSON.parse(Cookies.get('userData') || '{}');
        const updatedUser = {
          ...userData,
          name: form.name,
          email: form.email,
          bio: form.bio
        };
        Cookies.set('userData', JSON.stringify(updatedUser));

        setForm(prev => ({ ...prev, password: '' }));
      } else {
        setMessage({ type: 'error', text: data.message || '❌ خطا در بروزرسانی پروفایل' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '❌ خطا در ارتباط با سرور' });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
      bio: user.bio || "",
    });
    setMessage(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getRoleBadge = (role: string) => {
    const roles = {
      admin: { label: 'مدیر سیستم', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
      author: { label: 'نویسنده', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      user: { label: 'کاربر', color: 'bg-green-500/20 text-green-400 border-green-500/30' }
    };
    
    const roleInfo = roles[role as keyof typeof roles] || roles.user;
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${roleInfo.color}`}>
        {roleInfo.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* هدر */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="flex items-center space-x-4 space-x-reverse mb-4 lg:mb-0">
            <div className="p-3 bg-purple-500/20 rounded-2xl backdrop-blur-lg border border-purple-500/30">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">پروفایل کاربری</h1>
              <p className="text-gray-400 mt-1">مدیریت اطلاعات حساب کاربری</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 font-semibold"
          >
            {isEditing ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                لغو ویرایش
              </>
            ) : (
              <>
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                ویرایش پروفایل
              </>
            )}
          </button>
        </div>

        {/* پیام */}
        {message && (
          <div className={`p-4 rounded-2xl border backdrop-blur-lg mb-8 transform transition-all duration-300 ${message.type === 'success'
            ? 'bg-green-500/20 border-green-500/50 text-green-400 shadow-lg shadow-green-500/10'
            : 'bg-red-500/20 border-red-500/50 text-red-400 shadow-lg shadow-red-500/10'
            }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${message.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {message.type === 'success' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* سایدبار */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sticky top-8">
              {/* کارت پروفایل */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl shadow-purple-500/20">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* دکمه‌های اکشن */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <button
                      onClick={triggerFileInput}
                      disabled={isUploading}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg"
                      title="تغییر عکس"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      </svg>
                    </button>
                    
                    {profileImage && (
                      <button
                        onClick={handleRemoveImage}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg"
                        title="حذف عکس"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-2">{user.name}</h2>
                <p className="text-gray-400 text-sm mb-3">{user.email}</p>
                <div className="mb-4">
                  {getRoleBadge(user.role)}
                </div>
                
                <div className="bg-slate-700/50 rounded-xl p-3">
                  <p className="text-gray-400 text-xs mb-1">آیدی کاربر</p>
                  <p className="text-white font-mono text-sm">{user.id}</p>
                </div>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {/* آپلودر */}
              <div className="space-y-4">
                <button
                  onClick={triggerFileInput}
                  disabled={isUploading}
                  className="w-full bg-slate-700/50 hover:bg-slate-600/50 border border-dashed border-white/20 hover:border-purple-500/50 text-white px-4 py-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-sm">در حال آپلود...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span className="text-sm">تغییر عکس پروفایل</span>
                    </>
                  )}
                </button>
                
                <div className="text-center">
                  <p className="text-gray-400 text-xs">
                    فرمت‌های مجاز: JPG, PNG, GIF
                  </p>
                  <p className="text-gray-400 text-xs">
                    حداکثر حجم: 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* محتوای اصلی */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-300">
                        نام کامل
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full bg-slate-700/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="نام و نام خانوادگی"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-300">
                        ایمیل
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-slate-700/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="example@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-300">
                        رمز عبور جدید
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full bg-slate-700/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="رمز عبور جدید (اختیاری)"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-semibold text-gray-300">
                        بیوگرافی
                      </label>
                      <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-slate-700/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="درباره خودتان بنویسید..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 font-semibold"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      ذخیره تغییرات
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/10"
                    >
                      لغو
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-8">
                  {/* اطلاعات کاربر */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/30 rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <p className="text-gray-400 text-sm">نام کامل</p>
                      </div>
                      <p className="text-white font-semibold text-lg">{user.name}</p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/30 rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-400 text-sm">ایمیل</p>
                      </div>
                      <p className="text-white font-semibold text-lg">{user.email}</p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/30 rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <p className="text-gray-400 text-sm">نقش</p>
                      </div>
                      {getRoleBadge(user.role)}
                    </div>

                    <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/30 rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-orange-500/20 rounded-lg">
                          <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                        </div>
                        <p className="text-gray-400 text-sm">آیدی کاربر</p>
                      </div>
                      <p className="text-white font-mono text-sm bg-slate-600/50 rounded-lg px-3 py-2">{user.id}</p>
                    </div>
                  </div>

                  {/* بیوگرافی */}
                  {form.bio && (
                    <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/30 rounded-2xl p-6 border border-white/5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-pink-500/20 rounded-lg">
                          <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-400 text-sm">بیوگرافی</p>
                      </div>
                      <p className="text-white leading-7 text-justify">{form.bio}</p>
                    </div>
                  )}

                  {/* نکات مهم */}
                  <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-blue-400 font-semibold">نکات مهم</h4>
                    </div>
                    <ul className="text-blue-300 text-sm space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        برای تغییر رمز عبور، فیلد مربوطه را پر کنید
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        در صورت خالی گذاشتن فیلد رمز عبور، رمز قبلی حفظ می‌شود
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        بیوگرافی اختیاری است و می‌توانید آن را خالی بگذارید
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        برای تغییر عکس پروفایل، روی آیکون دوربین کلیک کنید
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}