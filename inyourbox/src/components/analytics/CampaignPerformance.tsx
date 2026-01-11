// src/components/analytics/CampaignPerformance.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpRight, ArrowDownRight, MoreVertical, Download, Filter } from 'lucide-react';

const performanceData = [
  {
    id: 1,
    name: 'Welcome Series',
    sent: '1,250',
    opens: '548',
    clicks: '198',
    openRate: '43.8%',
    clickRate: '36.1%',
    status: 'active',
    trend: 'up' as const,
  },
  {
    id: 2,
    name: 'Product Launch',
    sent: '1,000',
    opens: '423',
    clicks: '142',
    openRate: '42.3%',
    clickRate: '33.6%',
    status: 'completed',
    trend: 'up' as const,
  },
  {
    id: 3,
    name: 'Weekly Newsletter',
    sent: '980',
    opens: '389',
    clicks: '124',
    openRate: '39.7%',
    clickRate: '31.9%',
    status: 'active',
    trend: 'down' as const,
  },
  {
    id: 4,
    name: 'Black Friday Sale',
    sent: '850',
    opens: '312',
    clicks: '89',
    openRate: '36.7%',
    clickRate: '28.5%',
    status: 'completed',
    trend: 'down' as const,
  },
  {
    id: 5,
    name: 'Holiday Special',
    sent: '720',
    opens: '287',
    clicks: '76',
    openRate: '39.9%',
    clickRate: '26.5%',
    status: 'scheduled',
    trend: 'up' as const,
  },
];

export function CampaignPerformance() {
  return (
    <Card className="border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Detailed metrics for each campaign</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opens</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Click Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {performanceData.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant={
                        campaign.status === 'active' ? 'success' : 
                        campaign.status === 'completed' ? 'default' : 
                        'secondary'
                      }
                    >
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{campaign.sent}</td>
                  <td className="px-6 py-4 text-gray-900">{campaign.opens}</td>
                  <td className="px-6 py-4 text-gray-900">{campaign.clicks}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-gray-900">{campaign.openRate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-gray-900">{campaign.clickRate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {campaign.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`ml-1 ${campaign.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {campaign.trend === 'up' ? '↑' : '↓'}
                      </span>
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
        
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {performanceData.length} of {performanceData.length} campaigns
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}