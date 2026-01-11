// src/components/templates/TemplateGallery.tsx
'use client';

import { useState } from 'react';
import { TemplateCard } from './TemplateCard';
import { TemplateCategories } from './TemplateCategories';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Filter, Grid, List, Plus, Mail } from 'lucide-react';

const mockTemplates = [
  {
    id: 1,
    name: 'Welcome Email',
    description: 'Perfect for new subscribers',
    category: 'welcome',
    thumbnailColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
    isFavorite: true,
    usedCount: 142,
  },
  {
    id: 2,
    name: 'Weekly Newsletter',
    description: 'Clean layout for updates',
    category: 'newsletter',
    thumbnailColor: 'bg-gradient-to-br from-green-100 to-green-200',
    isFavorite: false,
    usedCount: 89,
  },
  {
    id: 3,
    name: 'Product Launch',
    description: 'Announce new products',
    category: 'promotional',
    thumbnailColor: 'bg-gradient-to-br from-purple-100 to-purple-200',
    isFavorite: true,
    usedCount: 56,
  },
  {
    id: 4,
    name: 'Order Confirmation',
    description: 'Transactional email template',
    category: 'transactional',
    thumbnailColor: 'bg-gradient-to-br from-orange-100 to-orange-200',
    isFavorite: false,
    usedCount: 203,
  },
  {
    id: 5,
    name: 'Black Friday Sale',
    description: 'Promotional campaign template',
    category: 'promotional',
    thumbnailColor: 'bg-gradient-to-br from-red-100 to-red-200',
    isFavorite: false,
    usedCount: 34,
  },
  {
    id: 6,
    name: 'Holiday Greetings',
    description: 'Festive season emails',
    category: 'holiday',
    thumbnailColor: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
    isFavorite: true,
    usedCount: 27,
  },
  {
    id: 7,
    name: 'Account Verification',
    description: 'Email verification template',
    category: 'transactional',
    thumbnailColor: 'bg-gradient-to-br from-gray-100 to-gray-200',
    isFavorite: false,
    usedCount: 178,
  },
  {
    id: 8,
    name: 'Monthly Digest',
    description: 'Monthly summary email',
    category: 'newsletter',
    thumbnailColor: 'bg-gradient-to-br from-indigo-100 to-indigo-200',
    isFavorite: false,
    usedCount: 45,
  },
];

export function TemplateGallery() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewTemplate, setPreviewTemplate] = useState<number | null>(null);

  const handleSelectTemplate = (templateId: number) => {
    console.log('Selected template:', templateId);
    // In real app: navigate to campaign editor with this template
    alert(`Template ${templateId} selected (mock). Would open campaign editor.`);
  };

  const handlePreviewTemplate = (templateId: number) => {
    setPreviewTemplate(templateId);
    // In real app: open modal with full preview
    alert(`Preview template ${templateId} (mock). Would open preview modal.`);
  };

  const handleDuplicateTemplate = (templateId: number) => {
    console.log('Duplicate template:', templateId);
    alert(`Template ${templateId} duplicated (mock). Would create copy.`);
  };

  return (
    <div className="space-y-6">
      {/* Header with search and controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <div className="flex border border-gray-300 rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-r-none"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-l-none border-l border-gray-300"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      {/* Categories */}
      <TemplateCategories />

      {/* Template Grid */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        : 'space-y-4'
      }>
        {mockTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={() => handleSelectTemplate(template.id)}
            onPreview={() => handlePreviewTemplate(template.id)}
            onDuplicate={() => handleDuplicateTemplate(template.id)}
          />
        ))}
      </div>

      {/* Empty state (if needed) */}
      {mockTemplates.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
            <Mail className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or create a new template</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create First Template
          </Button>
        </div>
      )}
    </div>
  );
}