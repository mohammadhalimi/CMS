'use client';

import { useState, useEffect } from 'react';
import { Post } from '../types/post';

export const usePost = (postId: string | null) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:4000';

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setLoading(false);
        setError('شناسه پست ارائه نشده است');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/posts/${postId}`);
        if (!response.ok) throw new Error('خطا در دریافت پست');

        const result = await response.json();

        if (result.data) {
          setPost(result.data);
        } else {
          throw new Error('فرمت داده‌ها نامعتبر است');
        }
      } catch (err) {
        console.error('Error in fetchPost:', err);
        setError(err instanceof Error ? err.message : 'خطای ناشناخته');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, loading, error };
};
