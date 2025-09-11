import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
  Menu
} from 'lucide-react';

interface AdminLayoutProps {
  onSave: () => void;
  onReset: () => void;
  onPreview: () => void;
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onSave, onReset, onPreview, children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-60'} bg-white border-r border-gray-200 transition-all duration-300`}>
        <div className="p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="mb-4"
          >
            <Menu className="w-4 h-4" />
          </Button>
          
          <nav className="space-y-2">
            <a href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
              <User className="w-4 h-4" />
              {!sidebarCollapsed && <span>Brand Info</span>}
            </a>
            <a href="/admin/contact" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
              <Contact className="w-4 h-4" />
              {!sidebarCollapsed && <span>Contact</span>}
            </a>
            <a href="/admin/services" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
              <Briefcase className="w-4 h-4" />
              {!sidebarCollapsed && <span>Services</span>}
            </a>
            <a href="/admin/hours" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
              <Clock className="w-4 h-4" />
              {!sidebarCollapsed && <span>Working Hours</span>}
            </a>
            <a href="/admin/theme" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
              <Palette className="w-4 h-4" />
              {!sidebarCollapsed && <span>Theme</span>}
            </a>
          </nav>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('/', '_blank')}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Site
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-500">Manage your brand settings</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onPreview}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={onReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button size="sm" onClick={onSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};