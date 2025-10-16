import Image from 'next/image';
import { Admin } from './types/admin';

interface AdminListProps {
  admins: Admin[];
  currentAdmin: Admin | null;
  onAddAdmin: () => void;
}

export function AdminList({ admins, currentAdmin, onAddAdmin }: AdminListProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">لیست مدیران</h1>
        <AddAdminButton onClick={onAddAdmin} />
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
        {admins.length === 0 ? (
          <EmptyState onAddAdmin={onAddAdmin} />
        ) : (
          <AdminTable admins={admins} currentAdmin={currentAdmin} />
        )}
      </div>
    </>
  );
}

function AddAdminButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 space-x-reverse shadow-lg hover:shadow-purple-500/25"
    >
      <PlusIcon />
      <span>اضافه کردن مدیر جدید</span>
    </button>
  );
}

function PlusIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function AdminTable({ admins, currentAdmin }: { admins: Admin[]; currentAdmin: Admin | null }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-right py-4 px-6 text-gray-300 font-medium">نام</th>
            <th className="text-right py-4 px-6 text-gray-300 font-medium">ایمیل</th>
            <th className="text-right py-4 px-6 text-gray-300 font-medium">نقش</th>
            <th className="text-right py-4 px-6 text-gray-300 font-medium">تاریخ عضویت</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <AdminTableRow 
              key={admin._id} 
              admin={admin} 
              isCurrentUser={admin._id === currentAdmin?._id} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminTableRow({ admin, isCurrentUser }: { admin: Admin; isCurrentUser: boolean }) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-all">
      <td className="py-4 px-6 text-white">
        <div className="flex items-center space-x-3 space-x-reverse">
          <Image
            src={admin.profileImage || '/image.png'}
            alt={admin.name}
            width={32}
            height={32}
            className="rounded-lg border border-white/10"
          />
          <span>{admin.name}</span>
        </div>
      </td>
      <td className="py-4 px-6 text-gray-300">{admin.email}</td>
      <td className="py-4 px-6">
        <RoleBadge role={admin.role} isCurrentUser={isCurrentUser} />
      </td>
      <td className="py-4 px-6 text-gray-300">
        {new Date(admin.createdAt).toLocaleDateString('fa-IR')}
      </td>
    </tr>
  );
}

function RoleBadge({ role, isCurrentUser }: { role: string; isCurrentUser: boolean }) {
  const badgeClass = isCurrentUser
    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
    : 'bg-blue-500/20 text-blue-400';

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${badgeClass}`}>
      {role}
      {isCurrentUser && ' (شما)'}
    </span>
  );
}

function EmptyState({ onAddAdmin }: { onAddAdmin: () => void }) {
  return (
    <div className="text-center text-gray-400 py-12">
      <UsersIcon />
      <p>هنوز مدیری ثبت نشده است</p>
      <button
        onClick={onAddAdmin}
        className="text-purple-400 hover:text-purple-300 mt-2"
      >
        اولین مدیر را اضافه کنید
      </button>
    </div>
  );
}

function UsersIcon() {
  return (
    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  );
}