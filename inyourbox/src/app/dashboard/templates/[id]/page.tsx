// src/app/dashboard/templates/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowLeft, Edit, Copy, Trash2, Eye, Mail } from 'lucide-react';

export default function TemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params.id as string;

  // Mock template data - in real app, fetch from API
  const template = {
    id: parseInt(templateId),
    name: 'Welcome Email Template',
    description: 'Perfect for welcoming new subscribers to your list',
    category: 'Welcome Series',
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Welcome to Our Community!</h1>
        <p>Hello {firstName},</p>
        <p>Thank you for subscribing to our newsletter. We're excited to have you on board!</p>
        <p>Here's what you can expect:</p>
        <ul>
          <li>Weekly tips and updates</li>
          <li>Exclusive offers for subscribers</li>
          <li>Latest industry news</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Get Started</a>
        </div>
        <p>Best regards,<br/>The Team</p>
      </div>
    `,
    createdAt: '2024-01-15',
    usedCount: 142,
    isFavorite: true,
  };

  const handleUseTemplate = () => {
    // In real app: navigate to campaign editor with this template
    router.push(`/dashboard/campaigns/new?template=${templateId}`);
  };

  const handleDuplicate = () => {
    alert(`Template ${templateId} duplicated (mock)`);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this template?')) {
      alert(`Template ${templateId} deleted (mock)`);
      router.push('/dashboard/templates');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard/templates')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{template.name}</h1>
            <p className="text-gray-600">{template.description}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleDuplicate}>
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          <Button onClick={handleUseTemplate}>
            <Mail className="h-4 w-4 mr-2" />
            Use This Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Template Preview */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Template Preview</CardTitle>
              <CardDescription>How your email will look to recipients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                {/* Email Client Header */}
                <div className="bg-gray-100 border-b border-gray-300 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-sm text-gray-600">Email Preview</div>
                  <div className="w-20"></div>
                </div>
                
                {/* Email Content */}
                <div className="p-6 bg-white">
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: template.content }}
                  />
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mt-6">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Mobile View
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Desktop View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit HTML
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* HTML Source (Collapsible) */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>HTML Source Code</CardTitle>
              <CardDescription>Raw HTML of the template</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{template.content}</pre>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium mb-2">Personalization Tags Available:</p>
                <div className="flex flex-wrap gap-2">
                  {['{firstName}', '{lastName}', '{email}', '{company}', '{unsubscribeUrl}'].map((tag) => (
                    <code key={tag} className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {tag}
                    </code>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Template Details & Actions */}
        <div className="space-y-6">
          {/* Template Details */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Template Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-medium">{template.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="font-medium">{template.createdAt}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Times Used</p>
                <p className="font-medium">{template.usedCount} campaigns</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-medium">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {template.isFavorite ? 'Favorite' : 'Active'}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={handleUseTemplate}>
                <Mail className="h-4 w-4 mr-2" />
                Create Campaign with This Template
              </Button>
              <Button variant="outline" className="w-full" onClick={handleDuplicate}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate Template
              </Button>
              <Button variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit Template
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Template
              </Button>
            </CardContent>
          </Card>

          {/* Usage Tips */}
          <Card className="border-gray-200 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="font-medium text-blue-900 mb-3">💡 Using This Template</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Replace placeholder text with your content</li>
                <li>• Personalize using {`{firstName}`} tokens</li>
                <li>• Test with different email clients</li>
                <li>• Update links to point to your website</li>
                <li>• Always include unsubscribe link</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}