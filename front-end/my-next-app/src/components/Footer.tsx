import Link from "next/link";

const Footer = () => {
    return (
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
    )
}

export default Footer;