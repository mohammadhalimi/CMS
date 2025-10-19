// app/posts/page.tsx
import Link from "next/link";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getPosts() {
  const res = await fetch(`${API_URL}/api/posts/all`, { cache: "no-store" });
  if (!res.ok) throw new Error("خطا در دریافت پست‌ها");
  const data = await res.json();
  const filter = data.data.filter((x: { status: string; }) => x.status == 'published')
  return filter;
}

export default async function PostsPage() {
  const posts = await getPosts();

  // تابع برای تبدیل وضعیت به فارسی
  const getStatusText = (status: string) => {
    switch(status) {
      case 'draft':
        return 'پیش‌نویس';
      case 'published':
        return 'منتشر شده';
      default:
        return status;
    }
  };

  // تابع برای گرفتن رنگ وضعیت
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
      case 'published':
        return 'bg-green-500/20 text-green-300 border border-green-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
    }
  };

  // تابع برای فرمت تاریخ به فارسی
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // تابع برای فرمت تاریخ کامل به فارسی
  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // تابع برای گرفتن نام نویسنده
  const getAuthorName = (post: any) => {
    if (post.authorId && typeof post.authorId === 'object' && post.authorId.name) {
      return post.authorId.name;
    }
    return 'نویسنده';
  };

  // تابع برای گرفتن عکس پروفایل نویسنده
  const getAuthorProfileImage = (post: any) => {
    if (post.authorId && typeof post.authorId === 'object' && post.authorId.profileImage) {
      return post.authorId.profileImage;
    }
    return null;
  };
   
  // تابع برای گرفتن حروف اول نام نویسنده
  const getAuthorInitials = (post: any) => {
    const name = getAuthorName(post);
    if (name === 'نویسنده') return 'ن';
    
    // استخراج حروف اول از نام
    const words = name.split(' ');
    if (words.length === 1) {
      return words[0].charAt(0);
    } else {
      return words[0].charAt(0) + words[words.length - 1].charAt(0);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* هدر صفحه */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            لیست پست‌ها
          </h1>
          <p className="text-slate-300 text-lg">
            جدیدترین مقالات و مطالب منتشر شده
          </p>
        </div>

        {/* گرید پست‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post: any) => (
            <div key={post._id} className="group">
              <Link href={`/posts/${post._id}`}>
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden transition-all duration-500 group-hover:border-purple-500/50 group-hover:shadow-2xl group-hover:shadow-purple-500/20 h-full flex flex-col transform group-hover:-translate-y-2">
                  
                  {/* تصویر کاور */}
                  <div className="relative h-48 overflow-hidden">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-12 h-12 text-purple-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-slate-400 text-sm">بدون تصویر</span>
                        </div>
                      </div>
                    )}
                    
                    {/* گرادیانت روی تصویر */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                    
                    {/* وضعیت پست */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${getStatusColor(post.status)}`}>
                        {getStatusText(post.status)}
                      </span>
                    </div>
                    
                    {/* تاریخ ایجاد */}
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* محتوای پست */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h2 className="text-lg font-bold text-white line-clamp-2 mb-3 group-hover:text-purple-300 transition-colors duration-300">
                      {post.title}
                    </h2>
                    
                    {/* محتوای خلاصه */}
                    <div className="mb-4 flex-1">
                      <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
                        {post.content ? post.content.replace(/\r\n/g, ' ').substring(0, 120) + '...' : 'بدون محتوای متنی'}
                      </p>
                    </div>
                    
                    {/* تگ‌ها */}
                    {post.tags && post.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag: string, index: number) => (
                          <span 
                            key={index}
                            className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-lg border border-purple-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="bg-slate-700/50 text-slate-300 text-xs px-2 py-1 rounded-lg">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="mb-4">
                        <span className="bg-slate-700/50 text-slate-400 text-xs px-2 py-1 rounded-lg">
                          بدون تگ
                        </span>
                      </div>
                    )}
                    
                    {/* اطلاعات پایینی */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50">
                      <div className="flex items-center gap-2">
                        {/* عکس پروفایل نویسنده */}
                        <div className="relative">
                          {getAuthorProfileImage(post) ? (
                            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-purple-500/30">
                              <Image
                                src={getAuthorProfileImage(post)}
                                alt={getAuthorName(post)}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-purple-500/30">
                              <span className="text-white text-xs font-bold">
                                {getAuthorInitials(post)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-slate-400 text-xs">نویسنده</span>
                          <span className="text-white text-sm font-medium leading-none">
                            {getAuthorName(post)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end text-slate-400 text-xs">
                        <div className="text-[10px] text-slate-500 mb-1">تاریخ انتشار</div>
                        <div className="flex items-center text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors">
                          {formatFullDate(post.createdAt)}
                          <svg className="w-4 h-4 mr-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* وضعیت خالی */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 max-w-md mx-auto">
              <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-bold text-slate-300 mb-2">پستی یافت نشد</h3>
              <p className="text-slate-400">هنوز هیچ پستی منتشر نشده است.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}