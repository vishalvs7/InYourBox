// src/components/dashboard/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Mail, 
  BarChart3, 
  Settings,
  FileText,
  HelpCircle,
  LogOut,
  
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/hooks/useAuth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Contacts', href: '/dashboard/contacts', icon: Users },
  { name: 'Campaigns', href: '/dashboard/campaigns', icon: Mail },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
   { name: 'Templates', href: '/dashboard/templates', icon: FileText },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      {/* Sidebar container */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Mail<span className="text-blue-600">Flow</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`
                          group flex gap-x-3 rounded-lg p-2 text-sm font-semibold leading-6
                          ${isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }
                        `}
                      >
                        <item.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            {/* Bottom section */}
            <li className="mt-auto">
              <ul role="list" className="-mx-2 space-y-1">
                <li>
                  <Link
                    href="/help"
                    className="group flex gap-x-3 rounded-lg p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <HelpCircle className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-600" />
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => logout()}
                  >
                    <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                    Logout
                  </Button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}