import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  BriefcaseIcon,
  DocumentIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BellIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Cases', href: '/cases', icon: BriefcaseIcon },
  { name: 'Documents', href: '/documents', icon: DocumentIcon },
  { name: 'Appointments', href: '/appointments', icon: CalendarIcon },
  { name: 'Billing', href: '/billing', icon: CurrencyDollarIcon },
  { name: 'Leaves', href: '/leaves', icon: ClockIcon },
  { name: 'Reminders', href: '/reminders', icon: BellIcon },
  { name: 'Clients', href: '/clients', icon: UserGroupIcon },
];

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="h-full px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 