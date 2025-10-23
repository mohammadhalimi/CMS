import { User, Mail, Shield, Contact } from 'lucide-react';

interface AdminInfoCardProps {
  icon: 'user' | 'mail' | 'shield' | 'contact';
  label: string;
  value: string;
  color: 'purple' | 'blue' | 'green' | 'orange';
}

const iconMap = {
  user: User,
  mail: Mail,
  shield: Shield,
  contact: Contact
};

const colorClasses = {
  purple: 'bg-purple-500/20 text-purple-400',
  blue: 'bg-blue-500/20 text-blue-400',
  green: 'bg-green-500/20 text-green-400',
  orange: 'bg-orange-500/20 text-orange-400',
};

export function AdminInfoCard({ icon, label, value, color }: AdminInfoCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <div className="flex items-center space-x-3 space-x-reverse p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
      <div className={`p-1.5 rounded-md ${colorClasses[color]}`}>
        <IconComponent size={16} />
      </div>
      <div>
        <p className="text-slate-400 text-xs">{label}</p>
        <p className="text-white font-medium text-sm">{value}</p>
      </div>
    </div>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}