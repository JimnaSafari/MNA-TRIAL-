import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  BriefcaseIcon,
  DocumentIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const stats = [
    {
      name: 'Active Cases',
      value: '12',
      icon: BriefcaseIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Documents',
      value: '48',
      icon: DocumentIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Appointments',
      value: '5',
      icon: CalendarIcon,
      color: 'bg-yellow-500',
    },
    {
      name: 'Pending Bills',
      value: '8',
      icon: CurrencyDollarIcon,
      color: 'bg-red-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.username}!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your law firm today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${item.color}`}>
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {item.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activities
          </h2>
          <div className="space-y-4">
            {/* Add recent activities list here */}
            <p className="text-gray-500">No recent activities</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Upcoming Appointments
          </h2>
          <div className="space-y-4">
            {/* Add upcoming appointments list here */}
            <p className="text-gray-500">No upcoming appointments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 