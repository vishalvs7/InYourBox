// src/components/templates/TemplateCard.tsx
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Eye, Copy, Star, Mail } from 'lucide-react';

interface TemplateCardProps {
  template: {
    id: number;
    name: string;
    description: string;
    category: string;
    thumbnailColor: string;
    isFavorite: boolean;
    usedCount: number;
  };
  onSelect: () => void;
  onPreview: () => void;
  onDuplicate: () => void;
}

export function TemplateCard({ template, onSelect, onPreview, onDuplicate }: TemplateCardProps) {
  return (
    <Card className="border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Thumbnail */}
      <div 
        className={`h-40 ${template.thumbnailColor} relative`}
        style={{ 
          background: template.thumbnailColor.startsWith('#') 
            ? template.thumbnailColor 
            : undefined 
        }}
      >
        {/* Template preview content */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 w-full max-w-[80%] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="h-2 w-16 rounded-full bg-gray-300"></div>
            </div>
            <div className="space-y-1">
              <div className="h-2 w-full rounded-full bg-gray-200"></div>
              <div className="h-2 w-3/4 rounded-full bg-gray-200"></div>
              <div className="h-2 w-1/2 rounded-full bg-gray-200"></div>
            </div>
            <div className="mt-3 h-6 w-20 rounded bg-blue-500 mx-auto"></div>
          </div>
        </div>
        
        {/* Favorite badge */}
        {template.isFavorite && (
          <div className="absolute top-3 right-3">
            <div className="bg-yellow-500 text-white p-1 rounded-full">
              <Star className="h-3 w-3 fill-current" />
            </div>
          </div>
        )}
      </div>
      
      {/* Template info */}
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-gray-900">{template.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{template.description}</p>
          </div>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
            {template.category}
          </span>
        </div>
        
        {/* Usage stats */}
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <Mail className="h-3 w-3 mr-1" />
          <span>Used {template.usedCount} times</span>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onPreview}
          >
            <Eye className="h-3 w-3 mr-1" />
            Preview
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onDuplicate}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={onSelect}
          >
            Use Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}