// src/components/analytics/PerformanceChart.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Download, Filter } from 'lucide-react';

// Install recharts: npm install recharts

const opensData = [
  { date: 'Jan 1', opens: 120, clicks: 42 },
  { date: 'Jan 8', opens: 98, clicks: 35 },
  { date: 'Jan 15', opens: 156, clicks: 58 },
  { date: 'Jan 22', opens: 142, clicks: 49 },
  { date: 'Jan 29', opens: 189, clicks: 72 },
  { date: 'Feb 5', opens: 210, clicks: 84 },
  { date: 'Feb 12', opens: 198, clicks: 76 },
];

const campaignData = [
  { name: 'Welcome Series', opens: 548, clicks: 198, ctr: '36.1%' },
  { name: 'Product Launch', opens: 423, clicks: 142, ctr: '33.6%' },
  { name: 'Weekly Newsletter', opens: 389, clicks: 124, ctr: '31.9%' },
  { name: 'Black Friday', opens: 312, clicks: 89, ctr: '28.5%' },
  { name: 'Holiday Sale', opens: 287, clicks: 76, ctr: '26.5%' },
];

export function PerformanceChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Opens Over Time Chart */}
      <Card className="border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Opens Over Time</CardTitle>
            <CardDescription>Last 30 days performance</CardDescription>
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
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={opensData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Line type="monotone" dataKey="opens" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm text-gray-600">Opens</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">Clicks</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Performance Chart */}
      <Card className="border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Top campaigns by engagement</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Compare
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" angle={-45} textAnchor="end" height={60} />
                <YAxis stroke="#666" />
                <Tooltip />
                <Bar dataKey="opens" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicks" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm text-gray-600">Opens</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">Clicks</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}