'use client'

import { useState, useEffect } from 'react';
import { Check, X, Eye, Search, Calendar, FileText } from 'lucide-react';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Comment {
  _id: string;
  postId: string;
  authorId: string;
  authorModel: string;
  content: string;
  status: string;
  createdAt: string;
  author: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
  post?: {
    _id: string;
    title: string;
  };
}

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');

  const adminToken = Cookies.get("adminToken");

  // دریافت نظرات از API
  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/comments/pending`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setComments(data.data || []);
      } else {
        console.error('Failed to fetch comments:', res.status);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  // تایید نظر
  const approveComment = async (commentId: string) => {
    try {
      const res = await fetch(`${API_URL}/comments/${commentId}/approve`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });
      
      if (res.ok) {
        setComments(comments.filter(comment => comment._id !== commentId));
      } else {
        console.error('Failed to approve comment:', res.status);
      }
    } catch (error) {
      console.error('Error approving comment:', error);
    }
  };

  // رد نظر
  const rejectComment = async (commentId: string) => {
    try {
      const res = await fetch(`${API_URL}/comments/${commentId}/reject`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });
      
      if (res.ok) {
        setComments(comments.filter(comment => comment._id !== commentId));
      } else {
        console.error('Failed to reject comment:', res.status);
      }
    } catch (error) {
      console.error('Error rejecting comment:', error);
    }
  };

  useEffect(() => {
    if (adminToken) {
      fetchComments();
    }
  }, [adminToken]);

  // فرمت تاریخ
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // فیلتر نظرات
  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (comment.post?.title && comment.post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // اگر توکن وجود ندارد
  if (!adminToken) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">مدیریت نظرات</h1>
        </div>
        <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6 text-center">
          <p className="text-red-300">دسترسی غیرمجاز! لطفاً ابتدا وارد شوید.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">مدیریت نظرات</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">مدیریت نظرات</h1>
          <p className="text-slate-400 mt-1">مدیریت و بررسی نظرات کاربران</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchComments}
            className="bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 px-4 py-2 rounded-xl border border-slate-600/50 transition-all duration-300"
          >
            بروزرسانی
          </button>
          <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
            {comments.length} نظر در انتظار تایید
          </span>
        </div>
      </div>

      {/* فیلتر و جستجو */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* جستجو */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="جستجو در نظرات، نویسندگان یا پست‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl pl-4 pr-10 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

          {/* فیلتر وضعیت */}
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
            >
              <option value="pending">در انتظار تایید</option>
              <option value="approved">تایید شده</option>
              <option value="rejected">رد شده</option>
              <option value="all">همه</option>
            </select>
          </div>
        </div>
      </div>

      {/* لیست نظرات */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
        {filteredComments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-slate-400 text-lg">هیچ نظری یافت نشد</p>
            <p className="text-slate-500 text-sm mt-2">
              {searchTerm || statusFilter !== 'all' ? 'سعی کنید فیلترها را تغییر دهید' : 'هیچ نظری برای نمایش وجود ندارد'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700/50">
            {filteredComments.map((comment) => (
              <div key={comment._id} className="p-6 hover:bg-slate-700/30 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* اطلاعات کاربر */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-purple-500/30">
                        <span className="text-white text-sm font-bold">
                          {comment.author.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-right">
                        <h3 className="text-white font-semibold">{comment.author.name}</h3>
                        <p className="text-slate-400 text-sm">{comment.author.email}</p>
                      </div>
                    </div>

                    {/* محتوای نظر */}
                    <div className="mb-4">
                      <p className="text-slate-300 leading-7 text-justify">{comment.content}</p>
                    </div>

                    {/* متادیتا */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(comment.createdAt)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-purple-300">
                          {comment.post?.title || 'پست حذف شده'}
                        </span>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-xs ${
                        comment.status === 'pending' 
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          : comment.status === 'approved'
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        {comment.status === 'pending' ? 'در انتظار تایید' : 
                         comment.status === 'approved' ? 'تایید شده' : 'رد شده'}
                      </div>

                      <div className={`px-3 py-1 rounded-full text-xs bg-slate-700/50 border border-slate-600/50`}>
                        نقش: {comment.authorModel === 'Admin' ? 'مدیر' : 
                              comment.authorModel === 'User' ? 'کاربر' : 
                              comment.authorModel === 'Editor' ? 'ویرایشگر' : comment.authorModel}
                      </div>
                    </div>
                  </div>

                  {/* دکمه‌های اکشن */}
                  <div className="flex items-center gap-2 mr-4">
                    {comment.status === 'pending' && (
                      <>
                        <button
                          onClick={() => approveComment(comment._id)}
                          className="bg-green-500/20 hover:bg-green-500/30 text-green-300 p-2 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105"
                          title="تایید نظر"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => rejectComment(comment._id)}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-300 p-2 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 transform hover:scale-105"
                          title="رد نظر"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <button
                      className="bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 p-2 rounded-xl border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300"
                      title="مشاهده جزئیات"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* پاگیشن */}
      {filteredComments.length > 0 && (
        <div className="flex items-center justify-between bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4">
          <div className="text-slate-400 text-sm">
            نمایش {filteredComments.length} از {comments.length} نظر
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 px-3 py-2 rounded-lg border border-slate-600/50 transition-colors">
              قبلی
            </button>
            <button className="bg-purple-500/20 text-purple-300 px-3 py-2 rounded-lg border border-purple-500/30">
              1
            </button>
            <button className="bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 px-3 py-2 rounded-lg border border-slate-600/50 transition-colors">
              بعدی
            </button>
          </div>
        </div>
      )}
    </div>
  );
}