// src/components/campaigns/CampaignTable.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Filter, Mail, Calendar, BarChart, MoreVertical, Play, Pause, Edit, Trash2 } from 'lucide-react';

const mockCampaigns = [
  { 
    id: 1, 
    name: 'Welcome Series', 
    status: 'active', 
    recipients: 150, 
    sentDate: '2024-01-15',
    openRate: 42,
    clickRate: 18,
    type: 'automation'
  },
  { 
    id: 2, 
    name: 'Product Launch', 
    status: 'scheduled', 
    recipients: 500, 
    sentDate: '2024-01-20',
    openRate: 0,
    clickRate: 0,
    type: 'regular'
  },
  { 
    id: 3, 
    name: 'Weekly Newsletter', 
    status: 'draft', 
    recipients: 0, 
    sentDate: '-',
    openRate: 0,
    clickRate: 0,
    type: 'regular'
  },
];

export function CampaignTable() {
  const [search, setSearch] = useState('');
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Table Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search campaigns..."
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
          <Mail className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockCampaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">
                        {campaign.type === 'automation' ? 'Automation' : 'Regular Campaign'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{campaign.recipients.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {campaign.sentDate}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">{campaign.openRate}%</div>
                      <div className="text-xs text-gray-500">Opens</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">{campaign.clickRate}%</div>
                      <div className="text-xs text-gray-500">Clicks</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {campaign.status === 'draft' && (
                      <Button variant="ghost" size="sm" title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {campaign.status === 'active' ? (
                      <Button variant="ghost" size="sm" title="Pause">
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : campaign.status === 'scheduled' && (
                      <Button variant="ghost" size="sm" title="Start">
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" title="View Analytics">
                      <BarChart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {mockCampaigns.length} of {mockCampaigns.length} campaigns
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}