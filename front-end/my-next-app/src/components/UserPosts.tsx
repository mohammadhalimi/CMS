// components/dashboard/PostsTab.tsx
import { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  views: number;
  comments: number;
}

export default function PostsTab() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // داده‌های نمونه - بعداً با API واقعی جایگزین کن
  useEffect(() => {
    setTimeout(() => {
      setPosts([
        { 
          id: '1', 
          title: 'آموزش کار با سیستم مدیریت محتوا', 
          status: 'published', 
          createdAt: '2024-01-15', 
          views: 245,
          comments: 12 
        },
        { 
          id: '2', 
          title: 'بهترین روش‌های سئو در سال ۲۰۲۴', 
          status: 'pending', 
          createdAt: '2024-01-14', 
          views: 0,
          comments: 0 
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">مقالات من</h2>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-all">
          + مقاله جدید
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <p className="text-slate-400 text-lg">هنوز مقاله‌ای ایجاد نکرده‌اید</p>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg mt-4 transition-all">
            ایجاد اولین مقاله
          </button>
        </div>
      ) : (
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
          <div className="divide-y divide-slate-700/50">
            {posts.map((post) => (
              <div key={post.id} className="p-6 hover:bg-slate-700/30 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>📅 {formatDate(post.createdAt)}</span>
                      <span>👁️ {post.views} بازدید</span>
                      <span>💬 {post.comments} نظر</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'published' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {post.status === 'published' ? 'منتشر شده' : 'در انتظار تایید'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mr-4">
                    <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1 rounded-lg text-sm transition-all">
                      ویرایش
                    </button>
                    <button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1 rounded-lg text-sm transition-all">
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}