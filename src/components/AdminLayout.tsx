import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/useAuth';
import { 
  Settings, 
  User, 
  Contact, 
  Briefcase, 
  Palette,
  Eye,
  Save,
  RotateCcw,
  Home,
  Clock,
  Menu,
  X,
  LogOut
} from 'lucide-react';

interface AdminLayoutProps {
  onSave: () => void;
  onReset: () => void;
  onPreview: () => void;
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onSave, onReset, onPreview, children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { signOut, user } = useAuth();

  const navItems = [
    { href: '/admin', icon: User, label: 'Brand Info' },
    { href: '/admin/contact', icon: Contact, label: 'Contact' },
    { href: '/admin/services', icon: Briefcase, label: 'Services' },
    { href: '/admin/hours', icon: Clock, label: 'Working Hours' },
    { href: '/admin/theme', icon: Palette, label: 'Theme' },
    { href: '/admin/users', icon: Settings, label: 'Users' },
    { href: '/admin/content', icon: Settings, label: 'Content' },
  ];

  const NavContent = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <a 
          key={item.href}
          href={item.href} 
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={mobile ? () => setMobileMenuOpen(false) : undefined}
        >
          <item.icon className="w-4 h-4 flex-shrink-0" />
          {(!sidebarCollapsed || mobile) && <span className="text-sm font-medium">{item.label}</span>}
        </a>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      {/* Desktop Sidebar */}
      <div className={`hidden lg:block ${sidebarCollapsed ? 'w-16' : 'w-60'} bg-white border-r border-gray-200 transition-all duration-300`}>
        <div className="p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="mb-4 w-full justify-start"
          >
            <Menu className="w-4 h-4" />
            {!sidebarCollapsed && <span className="ml-2">Collapse</span>}
          </Button>
          <NavContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Admin Menu</h2>
            </div>
            <NavContent mobile />
          </div>
        </SheetContent>
      </Sheet>
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('/', '_blank')}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Site</span>
            </Button>
            
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-500">Manage your brand settings</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onPreview} className="hidden sm:flex">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={onReset}>
              <RotateCcw className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
            <Button size="sm" onClick={onSave}>
              <Save className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Save</span>
            </Button>
            <Button variant="outline" size="sm" onClick={signOut} className="text-destructive hover:text-destructive">
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};