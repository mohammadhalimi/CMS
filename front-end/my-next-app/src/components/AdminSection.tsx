'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { Camera, User, Mail, Shield, Edit, Save, X } from 'lucide-react';

interface Admin {
    _id: string;
    name: string;
    email: string;
    role: string;
    profileImage?: string;
    createdAt: string;
}

export default function AdminSection() {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [editFormData, setEditFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const fetchCurrentAdmin = async () => {
        try {
            const token = Cookies.get('adminToken');
            const userData = Cookies.get('adminUser');

            if (userData) {
                const adminData = JSON.parse(userData);
                setCurrentAdmin(adminData);
                // پر کردن فرم ویرایش با داده‌های فعلی
                setEditFormData({
                    name: adminData.name,
                    email: adminData.email,
                    password: ''
                });
            }
        } catch (error) {
            console.error('Error fetching current admin:', error);
        } finally {
            setProfileLoading(false);
        }
    };

    // تابع برای دریافت لیست مدیران
    const fetchAdmins = async () => {
        try {
            const token = Cookies.get('adminToken');
            const response = await fetch('http://localhost:4000/admin/all', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAdmins(data);
            } else {
                throw new Error('خطا در دریافت لیست مدیران');
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'خطا در دریافت لیست مدیران' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentAdmin();
        fetchAdmins();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setMessage({ type: 'error', text: 'حجم فایل نباید بیشتر از ۵ مگابایت باشد' });
                return;
            }
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleProfileUpload = async () => {
        if (!selectedFile || !currentAdmin) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('profileImage', selectedFile);

        const token = Cookies.get('adminToken');

        try {
            const res = await fetch('http://localhost:4000/admin/upload-profile', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'عکس پروفایل با موفقیت آپلود شد ✅' });
                const updatedAdmin = { ...currentAdmin, profileImage: data.profileImage };

                // آپدیت currentAdmin
                setCurrentAdmin(updatedAdmin);
                Cookies.set('adminUser', JSON.stringify(updatedAdmin));

                // رفرش لیست ادمین‌ها
                fetchAdmins();

                setPreview(null);
                setSelectedFile(null);
            } else {
                setMessage({ type: 'error', text: data.message || 'خطا در آپلود عکس' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'خطا در ارتباط با سرور' });
        } finally {
            setIsUploading(false);
        }
    };

    // تابع برای آپدیت پروفایل
    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditLoading(true);
        setMessage(null);

        try {
            const token = Cookies.get('adminToken');
            
            // ایجاد آبجکت برای ارسال (فقط فیلدهایی که پر شده‌اند)
            const updateData: any = {};
            if (editFormData.name && editFormData.name !== currentAdmin?.name) {
                updateData.name = editFormData.name;
            }
            if (editFormData.email && editFormData.email !== currentAdmin?.email) {
                updateData.email = editFormData.email;
            }
            if (editFormData.password) {
                updateData.password = editFormData.password;
            }

            // اگر هیچ داده‌ای برای آپدیت نیست
            if (Object.keys(updateData).length === 0) {
                setMessage({ type: 'error', text: 'هیچ داده‌ای برای آپدیت وارد نشده است' });
                setEditLoading(false);
                return;
            }

            const response = await fetch('http://localhost:4000/admin/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'پروفایل با موفقیت بروزرسانی شد ✅' });
                
                // آپدیت currentAdmin با داده‌های جدید
                const updatedAdmin = { 
                    ...currentAdmin, 
                    ...updateData 
                };
                setCurrentAdmin(updatedAdmin);
                Cookies.set('adminUser', JSON.stringify(updatedAdmin));
                
                // آپدیت لیست admins
                setAdmins(prevAdmins => 
                    prevAdmins.map(admin => 
                        admin._id === currentAdmin?._id 
                            ? { ...admin, ...updateData }
                            : admin
                    )
                );
                fetchAdmins();
                setIsEditModalOpen(false);
                // ریست کردن پسورد در فرم
                setEditFormData(prev => ({ ...prev, password: '' }));
            } else {
                setMessage({ type: 'error', text: data.message || 'خطا در بروزرسانی پروفایل' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'خطا در ارتباط با سرور' });
        } finally {
            setEditLoading(false);
        }
    };

    const cancelUpload = () => {
        setSelectedFile(null);
        setPreview(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitLoading(true);
        setMessage(null);

        try {
            const token = Cookies.get('adminToken');
            const response = await fetch('http://localhost:4000/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'مدیر جدید با موفقیت اضافه شد' });
                setFormData({ name: '', email: '', password: '' });
                setIsModalOpen(false);
                fetchAdmins();
            } else {
                setMessage({ type: 'error', text: data.message || 'خطا در ثبت مدیر' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'خطا در ارتباط با سرور' });
        } finally {
            setSubmitLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fa-IR');
    };

    if (loading || profileLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white">لیست مدیران</h1>
                    <div className="h-10 w-40 bg-slate-700 rounded-lg animate-pulse"></div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                        <div className="h-4 bg-slate-700 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {message && (
                <div className={`p-4 rounded-lg border ${message.type === 'success'
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : 'bg-red-500/20 border-red-500 text-red-400'
                    }`}>
                    {message.text}
                </div>
            )}
            {currentAdmin && (
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">پروفایل من</h2>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="flex items-center space-x-2 space-x-reverse bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg transition-all duration-300 border border-blue-500/30"
                        >
                            <Edit size={16} />
                            <span>ویرایش پروفایل</span>
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative group">
                                <Image
                                    src={preview || currentAdmin.profileImage || '/image.png'}
                                    alt="Profile"
                                    width={100}
                                    height={100}
                                    className="rounded-2xl border-2 border-purple-500/50 object-cover shadow-lg transition-all duration-300 group-hover:scale-105"
                                />
                                <label className="absolute bottom-2 left-2 bg-purple-600 p-1.5 rounded-full cursor-pointer transition-all duration-300 hover:bg-purple-700 hover:scale-110 shadow-lg">
                                    <Camera size={14} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {selectedFile && (
                                <div className="flex space-x-2 space-x-reverse animate-fade-in">
                                    <button
                                        onClick={handleProfileUpload}
                                        disabled={isUploading}
                                        className="flex items-center space-x-1 space-x-reverse bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-3 py-1.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-xs"
                                    >
                                        {isUploading ? (
                                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : null}
                                        <span>{isUploading ? 'در حال آپلود...' : 'ذخیره'}</span>
                                    </button>

                                    <button
                                        onClick={cancelUpload}
                                        className="px-3 py-1.5 border border-slate-600 hover:border-slate-500 rounded-lg transition-all duration-300 text-xs"
                                    >
                                        انصراف
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* اطلاعات ادمین فعلی */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3 space-x-reverse p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
                                <div className="bg-purple-500/20 p-1.5 rounded-md">
                                    <User size={16} className="text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs">نام کامل</p>
                                    <p className="text-white font-medium text-sm">{currentAdmin.name}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 space-x-reverse p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
                                <div className="bg-blue-500/20 p-1.5 rounded-md">
                                    <Mail size={16} className="text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs">ایمیل</p>
                                    <p className="text-white font-medium text-sm">{currentAdmin.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 space-x-reverse p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
                                <div className="bg-green-500/20 p-1.5 rounded-md">
                                    <Shield size={16} className="text-green-400" />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs">نقش</p>
                                    <p className="text-white font-medium text-sm">{currentAdmin.role}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 space-x-reverse p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
                                <div className="bg-orange-500/20 p-1.5 rounded-md">
                                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs">تاریخ عضویت</p>
                                    <p className="text-white font-medium text-sm">{formatDate(currentAdmin.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* بقیه کد (لیست مدیران و مودال اضافه کردن مدیر) */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">لیست مدیران</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 space-x-reverse shadow-lg hover:shadow-purple-500/25"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>اضافه کردن مدیر جدید</span>
                </button>
            </div>

            {/* جدول لیست مدیران */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-right py-4 px-6 text-gray-300 font-medium">نام</th>
                                <th className="text-right py-4 px-6 text-gray-300 font-medium">ایمیل</th>
                                <th className="text-right py-4 px-6 text-gray-300 font-medium">نقش</th>
                                <th className="text-right py-4 px-6 text-gray-300 font-medium">تاریخ عضویت</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin) => (
                                <tr key={admin._id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                                    <td className="py-4 px-6 text-white">
                                        <div className="flex items-center space-x-3 space-x-reverse">
                                            <Image
                                                src={admin.profileImage || '/image.png'}
                                                alt={admin.name}
                                                width={32}
                                                height={32}
                                                className="rounded-lg border border-white/10"
                                            />
                                            <span>{admin.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-300">{admin.email}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-sm ${admin._id === currentAdmin?._id
                                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                            : 'bg-blue-500/20 text-blue-400'
                                            }`}>
                                            {admin.role}
                                            {admin._id === currentAdmin?._id && ' (شما)'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-gray-300">{formatDate(admin.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {admins.length === 0 && (
                    <div className="text-center text-gray-400 py-12">
                        <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <p>هنوز مدیری ثبت نشده است</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-purple-400 hover:text-purple-300 mt-2"
                        >
                            اولین مدیر را اضافه کنید
                        </button>
                    </div>
                )}
            </div>

            {/* مودال ویرایش پروفایل */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 rounded-2xl border border-white/10 w-full max-w-md transform transition-all">
                        <div className="p-6 border-b border-white/10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white">ویرایش پروفایل</h3>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="text-gray-400 hover:text-white transition-all p-1 rounded-lg hover:bg-white/10"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <form onSubmit={handleProfileUpdate} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    نام کامل
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleEditInputChange}
                                    className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="نام جدید را وارد کنید"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    ایمیل
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editFormData.email}
                                    onChange={handleEditInputChange}
                                    className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="ایمیل جدید را وارد کنید"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    رمز عبور جدید (اختیاری)
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={editFormData.password}
                                    onChange={handleEditInputChange}
                                    minLength={6}
                                    className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="رمز عبور جدید (حداقل ۶ کاراکتر)"
                                />
                                <p className="text-xs text-gray-400 mt-1">در صورت عدم تمایل به تغییر رمز عبور، این فیلد را خالی بگذارید</p>
                            </div>
                            
                            <div className="flex items-center justify-end space-x-3 space-x-reverse pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-6 py-3 text-gray-300 hover:text-white transition-all border border-white/10 hover:border-white/20 rounded-lg"
                                >
                                    انصراف
                                </button>
                                <button
                                    type="submit"
                                    disabled={editLoading}
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 space-x-reverse"
                                >
                                    {editLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>در حال بروزرسانی...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            <span>ذخیره تغییرات</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* مودال اضافه کردن مدیر جدید */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 rounded-2xl border border-white/10 w-full max-w-md transform transition-all">
                        <div className="p-6 border-b border-white/10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white">افزودن مدیر جدید</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-white transition-all p-1 rounded-lg hover:bg-white/10"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    نام کامل
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="نام مدیر را وارد کنید"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    ایمیل
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="example@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    رمز عبور
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    minLength={6}
                                    className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="حداقل ۶ کاراکتر"
                                />
                            </div>
                            <div className="flex items-center justify-end space-x-3 space-x-reverse pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 text-gray-300 hover:text-white transition-all border border-white/10 hover:border-white/20 rounded-lg"
                                >
                                    انصراف
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitLoading}
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 space-x-reverse"
                                >
                                    {submitLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>در حال ثبت...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            <span>ثبت مدیر</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}