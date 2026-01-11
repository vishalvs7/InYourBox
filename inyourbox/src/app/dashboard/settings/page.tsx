// src/app/dashboard/settings/page.tsx
'use client';

import { ApiConfiguration } from '@/components/settings/ApiConfiguration';
import { DomainVerification } from '@/components/settings/DomainVerification';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Switch } from '@/components/ui/Switch';
import { Settings, User, Bell, Shield, CreditCard, Users, Download,  CheckCircle, XCircle } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your account and preferences</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['General', 'API & Domain', 'Notifications', 'Team', 'Billing'].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                tab === 'API & Domain'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* API Configuration */}
          <ApiConfiguration />

          {/* Domain Verification */}
          <DomainVerification />

          {/* Compliance Section */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Compliance Checklist
              </CardTitle>
              <CardDescription>
                Ensure your email campaigns comply with regulations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { label: 'GDPR Compliance (EU)', checked: true },
                  { label: 'CAN-SPAM Act (US)', checked: true },
                  { label: 'India IT Act 2000', checked: true },
                  { label: 'Unsubscribe link in every email', checked: true },
                  { label: 'Physical address in footer', checked: false },
                  { label: 'Double opt-in enabled', checked: false },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {item.checked ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-300 mr-3" />
                      )}
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </div>
                    {!item.checked && (
                      <Button variant="outline" size="sm">
                        Setup
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Settings */}
        <div className="space-y-6">
          {/* User Profile */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Your Company" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" value="Asia/Kolkata (IST)" readOnly />
                </div>
                <Button className="w-full">Update Profile</Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-purple-500" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Email when campaign is sent', checked: true },
                { label: 'Weekly performance reports', checked: true },
                { label: 'Bounce & complaint alerts', checked: true },
                { label: 'New subscriber notifications', checked: false },
                { label: 'Credit limit warnings', checked: true },
                { label: 'Product updates & tips', checked: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <Switch checked={item.checked} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-500" />
                Account Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">Free Plan</div>
                <div className="text-4xl font-bold text-blue-600 my-2">₹0<span className="text-lg text-gray-600">/month</span></div>
                <p className="text-sm text-gray-600 mb-4">500 emails included</p>
                <Button className="w-full">Upgrade Plan</Button>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium mb-2">What's included:</p>
                <ul className="space-y-1">
                  <li>• 500 emails/month</li>
                  <li>• 1,000 contacts</li>
                  <li>• Basic analytics</li>
                  <li>• Email support</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}