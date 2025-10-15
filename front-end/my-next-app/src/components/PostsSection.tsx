'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
interface Post {
  _id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft',
    coverImage: null as File | null,
    coverImagePreview: '',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchPosts = async () => {
    try {
      const token = Cookies.get('adminToken');
      const res = await fetch('http://localhost:4000/posts/all', {
        headers: { Authorization: `Bearer ${token}`
      },
      });
      const data = await res.json();
  
      if (res.ok) setPosts(data.data);
      else throw new Error(data.message || 'خطا در دریافت پست‌ها');
    } catch {
      setMessage({ type: 'error', text: 'خطا در دریافت لیست پست‌ها' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.name === 'coverImage') {
      const file = target.files?.[0];
      if (!file) return;

      // ایجاد پیش‌نمایش تصویر
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ 
          ...prev, 
          coverImagePreview: reader.result as string 
        }));
      };
      reader.readAsDataURL(file);

      setFormData(prev => ({ ...prev, coverImage: file }));
    } else {
      setFormData(prev => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('adminToken');

    try {
      const dataToSend = new FormData();
      dataToSend.append('title', formData.title);
      dataToSend.append('content', formData.content);
      dataToSend.append('status', formData.status);
      if (formData.coverImage) {
        dataToSend.append('coverImage', formData.coverImage);
      }

      const res = await fetch('http://localhost:4000/posts/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // توجه: هیچ Content-Type تعریف نکنید تا مرورگر خودش boundary را تنظیم کند
        },
        body: dataToSend,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'پست با موفقیت ایجاد شد' });
        resetForm();
        fetchPosts();
      } else {
        throw new Error(data.message || 'خطا در ایجاد پست');
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'خطا در ایجاد پست' });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      status: 'draft',
      coverImage: null,
      coverImagePreview: ''
    });
    setIsModalOpen(false);
  };
  if (loading) return <p className="text-gray-400">در حال بارگذاری...</p>;
   
  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-lg border ${message.type === 'success'
            ? 'bg-green-500/20 border-green-500 text-green-400'
            : 'bg-red-500/20 border-red-500 text-red-400'
            }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">مدیریت پست‌ها</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
        >
          + پست جدید
        </button>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-right py-3 px-6 text-gray-300 font-medium">تصویر</th>
              <th className="text-right py-3 px-6 text-gray-300 font-medium">عنوان</th>
              <th className="text-right py-3 px-6 text-gray-300 font-medium">وضعیت</th>
              <th className="text-right py-3 px-6 text-gray-300 font-medium">تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post._id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                <td className="py-4 px-6">
                  {post.coverImage ? (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                      <Image 
                        src={post.coverImage} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-slate-700/50 border border-white/10 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">بدون تصویر</span>
                    </div>
                  )}
                </td>
                <td className="py-4 px-6 text-white">{post.title}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${post.status === 'published'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                  >
                    {post.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString('fa-IR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {posts.length === 0 && (
          <div className="text-center text-gray-400 py-8">هیچ پستی وجود ندارد</div>
        )}
      </div>

      {/* Modal ایجاد پست جدید */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl border border-white/10 w-full max-w-md">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">پست جدید</h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">عنوان پست</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="عنوان پست را وارد کنید..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">محتوا</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none h-32"
                  placeholder="محتوای پست را وارد کنید..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">وضعیت</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="draft">پیش‌نویس</option>
                  <option value="published">منتشر شده</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">عکس کاور</label>
                
                {/* پیش‌نمایش تصویر */}
                {formData.coverImagePreview && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-300 mb-2">پیش‌نمایش:</p>
                    <div className="w-full h-48 rounded-lg overflow-hidden border border-white/10">
                      <img 
                        src={formData.coverImagePreview} 
                        alt="پیش‌نمایش تصویر"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full text-gray-300 bg-slate-700/50 border border-white/10 rounded-lg px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
                />
                <p className="text-xs text-gray-400 mt-1">فرمت‌های مجاز: JPG, PNG, GIF, WebP</p>
              </div>

              <div className="flex justify-end space-x-2 space-x-reverse pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 text-gray-300 hover:text-white transition-all border border-white/10 rounded-lg hover:bg-white/5"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg transition-all duration-300"
                >
                  ذخیره پست
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}