"use client";

import { useState } from "react";
import Cookies from "js-cookie";

export default function CommentForm({ postId }: { postId: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const adminToken = Cookies.get("adminToken");
    const userToken = Cookies.get("userToken");

    // انتخاب توکن بر اساس نقش
    const token = adminToken || userToken;

    if (!token) {
      setMessage("لطفاً ابتدا وارد حساب کاربری شوید.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId, content }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "خطا در ثبت نظر");

      setMessage("✅ نظر شما با موفقیت ارسال شد.");
      setContent("");
    } catch (err: any) {
      setMessage(err.message || "خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-8 bg-slate-900/50 p-6 rounded-2xl border border-slate-700"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="نظر خود را بنویسید..."
        className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
        required
      ></textarea>

      <button
        type="submit"
        disabled={loading}
        className="self-end bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl transition-all duration-300"
      >
        {loading ? "در حال ارسال..." : "ارسال نظر"}
      </button>

      {message && (
        <p className="text-sm text-slate-300 bg-slate-800/70 p-2 rounded-lg border border-slate-700">
          {message}
        </p>
      )}
    </form>
  );
}
