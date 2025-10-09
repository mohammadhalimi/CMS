interface StatCardProps {
  number: string;
  label: string;
}

export default function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all group">
      <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
        {number}
      </div>
      <div className="text-gray-300 text-sm">{label}</div>
    </div>
  );
}