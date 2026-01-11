// src/components/templates/TemplateCategories.tsx
'use client';

import { Button } from '@/components/ui/Button';
import { useState } from 'react';

const categories = [
  { id: 'all', name: 'All Templates', count: 24 },
  { id: 'welcome', name: 'Welcome Series', count: 6 },
  { id: 'newsletter', name: 'Newsletters', count: 8 },
  { id: 'promotional', name: 'Promotional', count: 5 },
  { id: 'transactional', name: 'Transactional', count: 3 },
  { id: 'holiday', name: 'Holiday', count: 2 },
];

export function TemplateCategories() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory(category.id)}
        >
          {category.name}
          <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded text-xs">
            {category.count}
          </span>
        </Button>
      ))}
    </div>
  );
}