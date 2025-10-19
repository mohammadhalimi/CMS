'use client';

import { useState, useEffect } from 'react';
import { Post } from '../types/post';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL =  'http://localhost:4000';

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/posts/all`);
      if (!response.ok) throw new Error('خطا در دریافت پست‌ها');

      const result = await response.json();

      if (result.data && Array.isArray(result.data)) {
        setPosts(result.data);
      } else {
        throw new Error('فرمت داده‌ها نامعتبر است');
      }
    } catch (err) {
      console.error('Error in fetchPosts:', err);
      setError(err instanceof Error ? err.message : 'خطای ناشناخته');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, refetch: fetchPosts };
};
