'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  status: 'published' | 'draft' | 'pending';
  author: string;
  publishDate: string;
  views: number;
  comments: number;
}

export default function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // شبیه‌سازی بارگذاری پست‌ها
  useEffect(() => {
    const loadPosts = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPosts([
        {
          id: 1,
          title: 'آموزش جامع Next.js 14 با ویژگی‌های جدید',
          status: 'published',
          author: 'علی محمدی',
          publishDate: '۱۴۰۲/۱۰/۱۵',
          views: 1245,
          comments: 23
        },
        {
          id: 2,
          title: 'بهترین روش‌های سئو در سال ۲۰۲۴',
          status: 'published',
          author: 'سارا احمدی',
          publishDate: '۱۴۰۲/۱۰/۱۴',
          views: 892,
          comments: 15
        },
        {
          id: 3,
          title: 'مدیریت state در برنامه‌های بزرگ React',
          status: 'draft',
          author: 'رضا کریمی',
          publishDate: '۱۴۰۲/۱۰/۱۳',
          views: 0,
          comments: 0
        },
        {
          id: 4,
          title: 'ایجاد API های امن با Node.js و Express',
          status: 'pending',
          author: 'علی محمدی',
          publishDate: '۱۴۰۲/۱۰/۱۲',
          views: 0,
          comments: 0
        },
        {
          id: 5,
          title: 'آموزش کامل TypeScript برای پروژه‌های enterprise',
          status: 'published',
          author: 'سارا احمدی',
          publishDate: '۱۴۰۲/۱۰/۱۱',
          views: 1567,
          comments: 31
        }
      ]);
      setLoading(false);
    };

    loadPosts();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'pending':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'منتشر شده';
      case 'draft':
        return 'پیش‌نویس';
      case 'pending':
        return 'در انتظار بررسی';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">مقالات اخیر</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-3 bg-white/10 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-white/10 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">مقالات اخیر</h2>
        <Link 
          href="/admin/posts"
          className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-lg transition-all flex items-center space-x-2 space-x-reverse text-sm"
        >
          <span>مشاهده همه</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 space-x-reverse mb-2">
                  <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(post.status)}`}>
                    {getStatusText(post.status)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 space-x-reverse text-gray-400 text-sm">
                  <span className="flex items-center space-x-1 space-x-reverse">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{post.author}</span>
                  </span>
                  <span className="flex items-center space-x-1 space-x-reverse">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{post.publishDate}</span>
                  </span>
                  {post.status === 'published' && (
                    <>
                      <span className="flex items-center space-x-1 space-x-reverse">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{post.views} بازدید</span>
                      </span>
                      <span className="flex items-center space-x-1 space-x-reverse">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{post.comments} نظر</span>
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Link 
                  href={`/admin/posts/edit/${post.id}`}
                  className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
                  title="ویرایش"
                >
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
                
                <button
                  className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
                  title="حذف"
                >
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}