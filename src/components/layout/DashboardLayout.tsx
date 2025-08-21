import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Users, 
  Bell, 
  Settings,
  LogOut,
  Shield,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  /* { name: 'Claims', href: '/claims', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Users', href: '/users', icon: Users }, */
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been securely logged out.",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-trust-blue-600 to-trust-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Smart Claim Assistant</h1>
                <p className="text-sm text-muted-foreground">Professional Insurance Dashboard</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-alert-orange rounded-full border-2 border-white"></span>
            </Button>
            
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-6 border-t border-neutral-100">
          <div className="flex space-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors duration-200",
                    isActive
                      ? "border-trust-blue-600 text-trust-blue-700 bg-trust-blue-50"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-neutral-300"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}