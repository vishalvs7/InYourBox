// src/app/dashboard/templates/page.tsx
import { TemplateGallery } from '@/components/templates/TemplateGallery';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { FileText, Star, TrendingUp, Users, Plus } from 'lucide-react';
import Link from 'next/link';

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
          <p className="text-gray-600">Choose from professional templates or create your own</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Star className="h-4 w-4 mr-2" />
            Favorites
          </Button>
          <Link href="/dashboard/campaigns/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Templates</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Favorites</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Most Used</p>
                <p className="text-2xl font-bold">Welcome Email</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Campaigns Using</p>
                <p className="text-2xl font-bold">142</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Template Gallery */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Template Gallery</CardTitle>
          <CardDescription>
            Select a template to start your campaign. All templates are mobile-responsive.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TemplateGallery />
        </CardContent>
      </Card>

      {/* Custom Templates Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Your Custom Templates</CardTitle>
          <CardDescription>
            Templates you've created or customized
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No custom templates yet</h3>
            <p className="text-gray-600 mb-4">Create your first custom template to reuse across campaigns</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Custom Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card className="border-gray-200 bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-blue-900">💡 Template Best Practices</h3>
              <p className="text-blue-700 text-sm mt-1">
                • Use personalization tokens like {`{firstName}`} for better engagement<br/>
                • Keep subject lines under 50 characters<br/>
                • Always include an unsubscribe link<br/>
                • Test templates across different email clients
              </p>
            </div>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}