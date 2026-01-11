// src/app/dashboard/campaigns/new/page.tsx - UPDATED
'use client';

import { useState } from 'react';
import { CampaignEditor } from '@/components/campaigns/CampaignEditor';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Mail, Users, Calendar, ArrowLeft, Save, Send } from 'lucide-react';
import Link from 'next/link';

export default function NewCampaignPage() {
  const [campaignName, setCampaignName] = useState('');
  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [contactList, setContactList] = useState('');
  const [segment, setSegment] = useState('');
  const [scheduleType, setScheduleType] = useState('immediately');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [timezone, setTimezone] = useState('asia-kolkata');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/campaigns">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Campaign</h1>
            <p className="text-gray-600">Design and schedule your email campaign</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Schedule Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Campaign Details */}
        <div className="lg:col-span-2 space-y-6">
          <CampaignEditor />
        </div>

        {/* Right Column - Settings & Actions */}
        <div className="space-y-6">
          {/* Campaign Settings */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
              <CardDescription>Configure your campaign details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name *</Label>
                <Input 
                  id="campaign-name" 
                  placeholder="e.g., Welcome Series" 
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="from-name">From Name *</Label>
                <Input 
                  id="from-name" 
                  placeholder="Your Company Name" 
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="from-email">From Email *</Label>
                <Input 
                  id="from-email" 
                  type="email" 
                  placeholder="noreply@yourdomain.com" 
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reply-to">Reply To Email</Label>
                <Input 
                  id="reply-to" 
                  type="email" 
                  placeholder="support@yourdomain.com" 
                  value={replyTo}
                  onChange={(e) => setReplyTo(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Recipient Selection */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Recipients</CardTitle>
              <CardDescription>Choose who receives this campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-list">Select Contact List</Label>
                <Select 
                  id="contact-list"
                  value={contactList}
                  onChange={(e) => setContactList(e.target.value)}
                >
                  <option value="">All Contacts (0)</option>
                  <option value="list1">Subscribers (0)</option>
                  <option value="list2">Customers (0)</option>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="segment">Segment (Optional)</Label>
                <Textarea 
                  id="segment" 
                  placeholder="e.g., status = 'subscribed' AND tags INCLUDES 'customer'"
                  className="min-h-[80px] text-sm"
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                />
                <p className="text-xs text-gray-500">Leave empty to send to entire list</p>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Recipients:</span>
                <span className="font-medium">0 contacts</span>
              </div>
            </CardContent>
          </Card>

          {/* Scheduling */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>When should this campaign be sent?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schedule-type">Schedule Type</Label>
                <Select 
                  id="schedule-type"
                  value={scheduleType}
                  onChange={(e) => setScheduleType(e.target.value)}
                >
                  <option value="immediately">Send Immediately</option>
                  <option value="scheduled">Schedule for Later</option>
                  <option value="draft">Save as Draft</option>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date-time">Date & Time</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input 
                    id="date" 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <Input 
                    id="time" 
                    type="time" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select 
                  id="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  <option value="asia-kolkata">Asia/Kolkata (IST)</option>
                  <option value="utc">UTC</option>
                  <option value="america-new_york">America/New_York (EST)</option>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="sticky top-6 space-y-3">
            <Button className="w-full" size="lg">
              <Send className="h-4 w-4 mr-2" />
              Schedule Campaign
            </Button>
            <Button variant="outline" className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button variant="outline" className="w-full">
              <Users className="h-4 w-4 mr-2" />
              Send Test Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}