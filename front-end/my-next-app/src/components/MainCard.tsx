import { ReactNode } from 'react';

const MainCard = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" dir="rtl">
            {children}
        </div>
    )
}

export default MainCard;