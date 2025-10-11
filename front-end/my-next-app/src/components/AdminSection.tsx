'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface Admin {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export default function AdminSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [submitLoading, setSubmitLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // تابع برای دریافت لیست مدیران
    const fetchAdmins = async () => {
        try {
            const token = Cookies.get('adminToken'); // یا از cookies استفاده کن
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
        fetchAdmins();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
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
                fetchAdmins(); // رفرش لیست بعد از اضافه کردن
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

    if (loading) {
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
                                    <td className="py-4 px-6 text-white">{admin.name}</td>
                                    <td className="py-4 px-6 text-gray-300">{admin.email}</td>
                                    <td className="py-4 px-6">
                                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                                            {admin.role}
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
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
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
                                    disabled={loading}
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 space-x-reverse"
                                >
                                    {loading ? (
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