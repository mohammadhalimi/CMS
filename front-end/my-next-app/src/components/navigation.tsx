import Link from "next/link"

const Navigation = () => {
    return (
        <nav className="border-b border-white/10">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
                        <span className="text-xl font-bold text-white">محتوا پلاس</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8 space-x-reverse">
                        <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">بلاگ</Link>
                        <Link href="/About" className="text-gray-300 hover:text-white transition-colors">درباره ما</Link>
                        <Link href="/Contact" className="text-gray-300 hover:text-white transition-colors">تماس با ما</Link>
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
    )
}

export default Navigation;