import Link from "next/link"

const Hero = () => {
    return (
        <section className = "container mx-auto px-6 py-20" >
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
      </section >
    )
}

export default Hero;