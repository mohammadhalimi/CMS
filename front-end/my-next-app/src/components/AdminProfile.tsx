import { Admin } from './types/admin';
import { AdminInfoCard } from './AdminInfoCard';
import { ProfileImageUploader } from './ProfileImageUploader';
import { Edit } from 'lucide-react';

interface AdminProfileProps {
  currentAdmin: Admin;
  onEditProfile: () => void;
  onAdminsUpdate: () => void;
}

export function AdminProfile({ currentAdmin, onEditProfile, onAdminsUpdate }: AdminProfileProps) {
  console.log(currentAdmin)
  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">پروفایل من</h2>
        <button
          onClick={onEditProfile}
          className="flex items-center space-x-2 space-x-reverse bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg transition-all duration-300 border border-blue-500/30"
        >
          <Edit size={16} />
          <span>ویرایش پروفایل</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <ProfileImageUploader 
          currentAdmin={currentAdmin} 
          onAdminsUpdate={onAdminsUpdate}
        />
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminInfoCard
            icon="user"
            label="نام کامل"
            value={currentAdmin.name}
            color="purple"
          />
          
          <AdminInfoCard
            icon="mail"
            label="ایمیل"
            value={currentAdmin.email}
            color="blue"
          />
          <AdminInfoCard
            icon="contact"
            label="مشخصات"
            value={currentAdmin.bio}
            color="orange"
          />
          
          <AdminInfoCard
            icon="shield"
            label="نقش"
            value={currentAdmin.role}
            color="green"
          />
        </div>
      </div>
    </div>
  );
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fa-IR');
};