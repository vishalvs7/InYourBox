// src/app/dashboard/analytics/page.tsx
import { MetricsCards } from '@/components/analytics/MetricsCards';
import { PerformanceChart } from '@/components/analytics/PerformanceChart';
import { CampaignPerformance } from '@/components/analytics/CampaignPerformance';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Calendar, Download, Filter, TrendingUp } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your email campaign performance</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overall Metrics */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Overall Performance</CardTitle>
              <CardDescription>Summary of your email marketing metrics</CardDescription>
            </div>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-5 w-5 mr-1" />
              <span className="font-medium">+8.2% from last month</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <MetricsCards />
        </CardContent>
      </Card>

      {/* Charts Section */}
      <PerformanceChart />

      {/* Campaign Performance Table */}
      <CampaignPerformance />

      {/* Insights & Recommendations */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Insights & Recommendations</CardTitle>
          <CardDescription>Based on your campaign performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">📈 Top Performing Campaign</h3>
                <p className="text-blue-700">
                  <strong>Welcome Series</strong> has the highest engagement with 43.8% open rate.
                  Consider creating similar content for future campaigns.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">🕒 Best Sending Time</h3>
                <p className="text-green-700">
                  Your emails perform best when sent on <strong>Tuesdays at 10 AM</strong>.
                  Open rates are 22% higher during this time slot.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-yellow-900 mb-2">⚠️ Improvement Opportunity</h3>
                <p className="text-yellow-700">
                  <strong>Click-through rates</strong> decreased by 0.5% this month.
                  Consider adding more compelling call-to-action buttons.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-2">🎯 Audience Insight</h3>
                <p className="text-purple-700">
                  Subscribers from <strong>India</strong> have 18% higher engagement.
                  Consider segmenting campaigns by geographic location.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}