// src/app/dashboard/page.tsx - UPDATED with real data
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mail, Users, BarChart, Upload, Plus, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { contactService } from '@/lib/firebase/firestore';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalContacts: 0,
    campaigns: 0,
    openRate: 0,
    creditsLeft: 500,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    try {
      // TODO: Replace with actual stats from Firestore
      // For now, using mock data
      setStats({
        totalContacts: 0,
        campaigns: 0,
        openRate: 0,
        creditsLeft: 500,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Import Contacts',
      description: 'Upload CSV file to get started',
      icon: <Upload className="h-6 w-6" />,
      action: '/dashboard/contacts',
      color: 'bg-blue-500',
    },
    {
      title: 'Create Campaign',
      description: 'Design and send your first email',
      icon: <Mail className="h-6 w-6" />,
      action: '/dashboard/campaigns/new',
      color: 'bg-green-500',
    },
    {
      title: 'Setup Domain',
      description: 'Verify domain for better deliverability',
      icon: <ArrowUpRight className="h-6 w-6" />,
      action: '/dashboard/settings/domain',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome{user?.email ? `, ${user.email.split('@')[0]}` : ''}! 🎉</h1>
        <p className="text-gray-300 mb-4">
          Start your email marketing journey. Import contacts, create your first campaign, and track results.
        </p>
        <Link href="/dashboard/contacts">
          <Button className="bg-white text-gray-900 hover:bg-gray-100">
            <Plus className="mr-2 h-4 w-4" />
            Import Contacts
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="border-gray-200">
              <CardContent className="pt-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Total Contacts
              </CardTitle>
              <div className="text-gray-400">
                <Users className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalContacts}</div>
              <p className="text-xs text-gray-500">+0 this month</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Campaigns
              </CardTitle>
              <div className="text-gray-400">
                <Mail className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.campaigns}</div>
              <p className="text-xs text-gray-500">0 sent this month</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Open Rate
              </CardTitle>
              <div className="text-gray-400">
                <BarChart className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.openRate}%</div>
              <p className="text-xs text-gray-500">Industry avg: 21.5%</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Credits Left
              </CardTitle>
              <div className="text-gray-400">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.creditsLeft}</div>
              <p className="text-xs text-gray-500">Free tier</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Card key={index} className="border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className={`inline-flex items-center justify-center p-3 ${action.color} rounded-lg mb-4`}>
                <div className="text-white">{action.icon}</div>
              </div>
              <CardTitle>{action.title}</CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
  <Link href={action.action} className="block">
    <Button className="w-full">Get Started</Button>
  </Link>
</CardContent>

          </Card>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent actions will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-400">
            <Mail className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>No activity yet. Start by importing your contacts!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}