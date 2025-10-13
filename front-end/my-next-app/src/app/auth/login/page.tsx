// components/AuthPage.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            // اعتبارسنجی‌های اولیه
            if (!isLogin && formData.password !== formData.confirmPassword) {
                setMessage({ type: 'error', text: 'رمز عبور و تکرار آن مطابقت ندارند' });
                setLoading(false);
                return;
            }

            const endpoint = isLogin
                ? 'http://localhost:4000/user/login'
                : 'http://localhost:4000/user/register';

            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : { name: formData.name, email: formData.email, password: formData.password };
            console.log('Sending payload:', payload);
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'خطا در ورود');
            }
            if (response.ok) {
                if (isLogin) {
                    // ذخیره توکن و اطلاعات کاربر
                    Cookies.set('userToken', data.token);
                    Cookies.set('userData', JSON.stringify(data.user));
                    setMessage({ type: 'success', text: 'خوش آمدید! در حال انتقال...' });
                    setTimeout(() => router.push('/auth/dashboard'), 2000);
                } else {
                    setMessage({ type: 'success', text: 'ثبت‌نام با موفقیت انجام شد. لطفاً وارد شوید.' });
                    setIsLogin(true);
                    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                }
            } else {
                setMessage({ type: 'error', text: data.message || 'خطا در انجام عملیات' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'خطا در ارتباط با سرور' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4" dir="rtl">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 ">
                        {isLogin ? 'خوش آمدید' : 'حساب کاربری جدید'}
                    </h1>
                    <p className="text-gray-400">
                        {isLogin ? 'لطفاً وارد حساب کاربری خود شوید' : 'برای شروع اطلاعات خود را وارد کنید'}
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-xl">
                    {/* Tabs */}
                    <div className="flex bg-slate-700/30 rounded-lg p-1 mb-6">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all cursor-pointer ${isLogin
                                ? 'bg-purple-500 text-white shadow-lg'
                                : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            ورود
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all cursor-pointer ${!isLogin
                                ? 'bg-purple-500 text-white shadow-lg'
                                : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            ثبت‌نام
                        </button>
                    </div>

                    {/* Messages */}
                    {message && (
                        <div className={`p-4 rounded-lg border mb-6 ${message.type === 'success'
                            ? 'bg-green-500/20 border-green-500 text-green-400'
                            : 'bg-red-500/20 border-red-500 text-red-400'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
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
                                    placeholder="نام و نام خانوادگی"
                                />
                            </div>
                        )}

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

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    تکرار رمز عبور
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    minLength={6}
                                    className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="تکرار رمز عبور"
                                />
                            </div>
                        )}

                        {isLogin && (
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center space-x-2 space-x-reverse">
                                    <input type="checkbox" className="rounded bg-slate-700/50 border-white/10 text-purple-500 focus:ring-purple-500" />
                                    <span className="text-gray-300">مرا به خاطر بسپار</span>
                                </label>
                                <button type="button" className="text-purple-400 hover:text-purple-300 transition-all">
                                    رمز عبور را فراموش کرده‌اید؟
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse shadow-lg hover:shadow-purple-500/25 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>{isLogin ? 'در حال ورود...' : 'در حال ثبت‌نام...'}</span>
                                </>
                            ) : (
                                <span>{isLogin ? 'ورود به حساب' : 'ایجاد حساب کاربری'}</span>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-slate-800 text-gray-400">یا</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center space-x-2 space-x-reverse p-3 bg-slate-700/30 hover:bg-slate-700/50 border border-white/10 rounded-lg transition-all text-gray-300 hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span>Google</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 space-x-reverse p-3 bg-slate-700/30 hover:bg-slate-700/50 border border-white/10 rounded-lg transition-all text-gray-300 hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                            <span>Twitter</span>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-gray-400 text-sm">
                        {isLogin ? 'حساب کاربری ندارید؟ ' : 'قبلاً حساب کاربری دارید؟ '}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-purple-400 hover:text-purple-300 transition-all font-medium"
                        >
                            {isLogin ? 'ثبت‌نام کنید' : 'وارد شوید'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}