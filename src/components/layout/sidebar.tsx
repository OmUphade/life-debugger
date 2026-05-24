import { LayoutDashboard, Search, Activity, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-10 text-white">Life Debugger</h2>

        <nav className="space-y-3">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <SidebarItem icon={<Search size={18} />} label="Investigations" />
          <SidebarItem icon={<Activity size={18} />} label="Timeline" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </div>

      <div className="flex items-center gap-2 text-sm text-white/40">
        <div className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>

          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400"></span>
        </div>
        AI Behavioral Analysis Active
      </div>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-white/70 hover:bg-white/10 hover:text-white transition-all">
      {icon}
      <span>{label}</span>
    </button>
  );
}
