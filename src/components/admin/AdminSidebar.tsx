import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  TrendingUp,
  FileText,
  Armchair,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';

type AdminSidebarProps = {
  sidebarOpen: boolean;
};

export function AdminSidebar({ sidebarOpen }: AdminSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: TrendingUp, label: 'Dashboard' },
    { path: '/admin/applications', icon: FileText, label: 'Applications' },
    { path: '/admin/seats', icon: Armchair, label: 'Seat Management' },
    { 
      path: '/admin/ar-content', 
      icon: null, 
      label: 'AR Content',
      customIcon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    { path: '/admin/notifications', icon: Bell, label: 'Notifications' },
  ];

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-slate-200 transition-all duration-300 overflow-hidden`}>
      <div className="p-6">
        <h2 className="text-purple-900">Admin Portal</h2>
        <p className="text-slate-600 text-sm">Dr. M.G.R. Institute</p>
      </div>
      <nav className="px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-purple-50 text-purple-900'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {Icon ? <Icon className="h-5 w-5" /> : item.customIcon}
              {item.label}
            </Link>
          );
        })}
        <a href="#settings" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
          <Settings className="h-5 w-5" />
          Settings
        </a>
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <Button variant="outline" className="w-full justify-start gap-2 text-slate-700" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
