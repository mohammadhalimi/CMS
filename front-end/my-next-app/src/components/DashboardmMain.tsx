'use client';

import { useState } from 'react';

const statsData = [
  { title: 'تعداد مطالب', value: '124', icon: '📝', change: '+12%', color: 'from-blue-500 to-cyan-500' },
  { title: 'تعداد نظرات', value: '89', icon: '💬', change: '+5%', color: 'from-green-500 to-emerald-500' },
  { title: 'کاربران', value: '542', icon: '👥', change: '+8%', color: 'from-purple-500 to-pink-500' },
  { title: 'بازدید امروز', value: '1,243', icon: '👁️', change: '+15%', color: 'from-orange-500 to-red-500' },
];

const recentPosts = [
  { id: 1, title: 'آموزش ری‌اکت نکست‌جی‌اس', date: '1402/10/15', status: 'منتشر شده', views: 1243 },
  { id: 2, title: 'بهترین روش‌های سئو', date: '1402/10/14', status: 'پیش‌نویس', views: 0 },
  { id: 3, title: 'آموزش TypeScript', date: '1402/10/13', status: 'منتشر شده', views: 856 },
  { id: 4, title: 'بررسی فریمورک‌های Frontend', date: '1402/10/12', status: 'منتشر شده', views: 921 },
];

export default function DashboardMain() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-green-400 text-xs mt-1">{stat.change} از ماه گذشته</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">مطالب اخیر</h3>
            <button className="text-purple-400 hover:text-purple-300 text-sm transition-all">
              مشاهده همه
            </button>
          </div>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all">
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">{post.title}</h4>
                  <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-400">
                    <span>{post.date}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      post.status === 'منتشر شده' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {post.status}
                    </span>
                    <span>👁️ {post.views}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white transition-all p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-bold text-white mb-6">فعالیت‌های سریع</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-slate-700/30 hover:bg-slate-700/50 border border-white/10 rounded-lg p-4 transition-all text-center group">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-500/30 transition-all">
                <span className="text-2xl">📝</span>
              </div>
              <p className="text-white font-medium">مطلب جدید</p>
            </button>
            <button className="bg-slate-700/30 hover:bg-slate-700/50 border border-white/10 rounded-lg p-4 transition-all text-center group">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-green-500/30 transition-all">
                <span className="text-2xl">📄</span>
              </div>
              <p className="text-white font-medium">صفحه جدید</p>
            </button>
            <button className="bg-slate-700/30 hover:bg-slate-700/50 border border-white/10 rounded-lg p-4 transition-all text-center group">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-500/30 transition-all">
                <span className="text-2xl">🖼️</span>
              </div>
              <p className="text-white font-medium">آپلود مدیا</p>
            </button>
            <button className="bg-slate-700/30 hover:bg-slate-700/50 border border-white/10 rounded-lg p-4 transition-all text-center group">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-500/30 transition-all">
                <span className="text-2xl">👥</span>
              </div>
              <p className="text-white font-medium">مدیریت کاربران</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}