'use client';

import { useState, useEffect } from 'react';

export default function DashBoardStats() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    totalComments: 0,
    pendingComments: 0
  });

  // شبیه‌سازی بارگذاری داده‌ها
  useEffect(() => {
    const loadStats = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats({
        totalPosts: 124,
        publishedPosts: 98,
        totalComments: 95,
        pendingComments: 23
      });
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: 'کل مقالات',
      value: stats.totalPosts,
      icon: '📝',
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      title: 'مقالات منتشر شده',
      value: stats.publishedPosts,
      icon: '✅',
      color: 'from-green-500 to-green-600',
      change: '+8%'
    },
    {
      title: 'کل نظرات',
      value: stats.totalComments,
      icon: '💬',
      color: 'from-purple-500 to-purple-600',
      change: '+15%'
    },
    {
      title: 'نظرات در انتظار',
      value: stats.pendingComments,
      icon: '⏳',
      color: 'from-yellow-500 to-yellow-600',
      change: '-3%'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">آمار کلی</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                stat.change.startsWith('+') 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            
            <div className="text-3xl font-bold text-white mb-2">
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm">
              {stat.title}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-1000 group-hover:scale-105`}
                  style={{ width: `${(stat.value / (stat.title.includes('کل') ? 200 : 100)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}