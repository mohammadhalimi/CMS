// app/admins/[id]/page.tsx
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getAdmin(id: string) {
  const res = await fetch(`${API_URL}/admin/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("ادمین یافت نشد");
  return res.json();
}

interface AdminProfileProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProfile({ params }: AdminProfileProps) {
  const { id } = await params;
  const data = await getAdmin(id);
  const admin = data.data;

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16"
      dir="rtl"
    >
      <div className="max-w-3xl mx-auto bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 shadow-2xl text-center">
        <div className="flex flex-col items-center mb-6">
          {admin.profileImage ? (
            <Image
              src={admin.profileImage}
              alt={admin.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-purple-500/30 shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {admin.name.charAt(0)}
            </div>
          )}
          <h1 className="text-3xl font-bold text-white mt-4">{admin.name}</h1>
          <p className="text-slate-400">{admin.email}</p>
          <p className="text-slate-300 mt-4 text-sm leading-7 whitespace-pre-line">
            {admin.bio || "بیوگرافی هنوز نوشته نشده 😅"}
          </p>
        </div>

        <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50 mt-6">
          <h2 className="text-xl font-semibold text-purple-300 mb-3">
            اطلاعات ادمین
          </h2>
          <p className="text-slate-300 text-sm">
            نقش:{" "}
            <span className="font-medium text-purple-400">{admin.role}</span>
          </p>
          <p className="text-slate-400 text-xs mt-2">
            تاریخ عضویت:{" "}
            {new Date(admin.createdAt).toLocaleDateString("fa-IR")}
          </p>
        </div>
      </div>
    </main>
  );
}
