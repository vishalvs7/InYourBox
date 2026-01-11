// src/components/contacts/ContactTable.tsx (simple version)
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, UserPlus, Filter, MoreVertical, Mail, Phone, Calendar } from 'lucide-react';

const mockContacts = [
  { id: 1, email: 'john@example.com', name: 'John Doe', status: 'subscribed', createdAt: '2024-01-15' },
  { id: 2, email: 'jane@company.com', name: 'Jane Smith', status: 'subscribed', createdAt: '2024-01-10' },
  { id: 3, email: 'bob@startup.com', name: 'Bob Wilson', status: 'unsubscribed', createdAt: '2024-01-05' },
];

export function ContactTable() {
  const [search, setSearch] = useState('');
  
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Table Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search contacts..."
              className="pl-10 w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added</th>
              <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {contact.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{contact.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {contact.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    contact.status === 'subscribed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {contact.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {contact.createdAt}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing 3 of 3 contacts
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}