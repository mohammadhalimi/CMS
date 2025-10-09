const Statistics = () => {
    return (
        < section className = "container mx-auto px-6 py-20" >
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
      </section >
    )
}

export default Statistics