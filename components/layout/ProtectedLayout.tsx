'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';

interface ProtectedLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

export default function ProtectedLayout({
  children,
  currentPage,
  onNavigate,
  onLogout,
}: ProtectedLayoutProps) {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard';
      case 'products':
        return 'Products';
      case 'product-detail':
        return 'Product Detail';
      case 'categories':
        return 'Categories';
      default:
        return 'Dashboard';
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'products', label: 'Products' },
    { id: 'categories', label: 'Categories' },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold">ProductHub</h1>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-800">
          <Button
            onClick={onLogout}
            variant="outline"
            size="sm"
            className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">{getPageTitle()}</h2>
          <Avatar>
            <AvatarFallback className="bg-indigo-100 text-indigo-700">US</AvatarFallback>
          </Avatar>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">{children}</div>
      </div>
    </div>
  );
}
