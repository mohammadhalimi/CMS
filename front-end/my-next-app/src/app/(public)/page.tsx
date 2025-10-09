import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" dir="rtl">
      {/* نویگیشن */}
      <nav className="border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold text-white">محتوا پلاس</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">بلاگ</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">درباره ما</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">تماس با ما</Link>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Link 
                href="/auth/login" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                ورود
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
              >
                شروع کنید
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* بخش هیرو */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            سیستم مدیریت محتوای
            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mt-2">
              مدرن و حرفه‌ای
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-8">
            یک پلتفرم مدیریت محتوای نسل جدید که با تکنولوژی‌های روز دنیا ساخته شده است.
            محتوا ایجاد کنید، مدیریت کنید و با سرعت و elegance بی‌نظیر منتشر کنید.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/admin/dashboard"
              className="bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105 text-lg"
            >
              🚀 مشاهده داشبورد
            </Link>
            <Link 
              href="/blog"
              className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all text-lg"
            >
              📖 مطالعه بلاگ
            </Link>
          </div>
        </div>
      </section>

      {/* ویژگی‌های کلیدی */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          چرا <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">کنتنت هاب</span>؟
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* ویژگی ۱ */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">سریع و بهینه</h3>
            <p className="text-gray-400 leading-7">
              ساخته شده با Next.js 14 برای عملکرد فوق‌العاده و سئوی بی‌نظیر
            </p>
          </div>

          {/* ویژگی ۲ */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mb-6 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">امن و مطمئن</h3>
            <p className="text-gray-400 leading-7">
              امنیت در سطح سازمانی با احراز هویت JWT و مدیریت دسترسی مبتنی بر نقش
            </p>
          </div>

          {/* ویژگی ۳ */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">تکنولوژی روز</h3>
            <p className="text-gray-400 leading-7">
              Next.js، Node.js، MongoDB و Tailwind CSS برای بنیانی آینده‌نگر
            </p>
          </div>
        </div>
      </section>

      {/* آمار و ارقام */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">در اعداد و ارقام</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-white mb-2">+۱۰۰۰</div>
              <div className="text-gray-400">مقاله منتشر شده</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">%۹۹.۹</div>
              <div className="text-gray-400">آپ‌تایم</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">۵۰ms</div>
              <div className="text-gray-400">زمان پاسخگویی</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">۲۴/۷</div>
              <div className="text-gray-400">پشتیبانی</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            آماده شروع هستید؟
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            همین حالا به جامعه ما بپیوندید و تجربه مدیریت محتوای مدرن را احساس کنید
          </p>
          <Link 
            href="/auth/register"
            className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105 text-lg"
          >
            🚀 ثبت‌نام رایگان
          </Link>
        </div>
      </section>

      {/* فوتر */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
            <span className="text-lg font-bold text-white"> محتوا پلاس</span>
          </div>
          <p className="text-gray-400 mb-4">
            ساخته شده با ❤️ توسط تیم ایرانی با استفاده از مدرن‌ترین تکنولوژی‌های وب
          </p>
          <div className="flex justify-center space-x-6 space-x-reverse text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors">حریم خصوصی</Link>
            <Link href="/terms" className="hover:text-white transition-colors">قوانین</Link>
            <Link href="/contact" className="hover:text-white transition-colors">پشتیبانی</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}