// src/components/campaigns/CampaignEditor.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Bold, Italic, Link as LinkIcon, List, AlignLeft, Image, Eye, Code } from 'lucide-react';

export function CampaignEditor() {
  const [activeTab, setActiveTab] = useState('wysiwyg');
  const [subject, setSubject] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [htmlContent, setHtmlContent] = useState('<p>Hello {firstName},</p><p>Welcome to our newsletter!</p><p>Best regards,<br/>The Team</p>');
  const [wysiwygContent, setWysiwygContent] = useState('Hello {firstName},\n\nWelcome to our newsletter!\n\nBest regards,\nThe Team');

  const formatText = (command: string) => {
    document.execCommand(command, false);
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle>Email Content</CardTitle>
        <CardDescription>Design your email using WYSIWYG editor or raw HTML</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Subject & Preview */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Subject Line *</label>
            <Input
              placeholder="Enter your email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <p className="text-xs text-gray-500">Use personalization like {`{firstName}`} for better engagement</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Preview Text</label>
            <Input
              placeholder="Preview text shown in email inbox"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
            />
            <p className="text-xs text-gray-500">Recommended: 85-100 characters</p>
          </div>
        </div>

        {/* Editor Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wysiwyg" className="flex items-center gap-2">
              <AlignLeft className="h-4 w-4" />
              Visual Editor
            </TabsTrigger>
            <TabsTrigger value="html" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              HTML Editor
            </TabsTrigger>
          </TabsList>
          
          {/* WYSIWYG Editor */}
          <TabsContent value="wysiwyg" className="space-y-4 pt-4">
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              {/* Toolbar */}
              <div className="border-b border-gray-300 bg-gray-50 p-2 flex flex-wrap gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('bold')}
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('italic')}
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('insertUnorderedList')}
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('createLink')}
                  title="Insert Link"
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText('insertImage')}
                  title="Insert Image"
                >
                  <Image className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Content Editable Area */}
              <div
                contentEditable
                className="min-h-[300px] p-4 prose max-w-none focus:outline-none"
                dangerouslySetInnerHTML={{ __html: wysiwygContent }}
                onInput={(e) => setWysiwygContent(e.currentTarget.innerHTML)} // Basic implementation
              />
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-1">Personalization Tags:</p>
              <div className="flex flex-wrap gap-2">
                {['{firstName}', '{lastName}', '{email}', '{company}'].map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      document.execCommand('insertText', false, tag);
                    }}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* HTML Editor */}
          <TabsContent value="html" className="pt-4">
            <div className="space-y-4">
              <Textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
                placeholder="Enter your HTML content here..."
              />
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Use {`{firstName}`}, {`{lastName}`}, {`{email}`} for personalization
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview HTML
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Email Preview */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Email Preview</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                Mobile
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                Desktop
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mobile Preview */}
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <div className="text-center text-sm text-gray-500 mb-2">Mobile Preview</div>
              <div className="mx-auto w-64 border-4 border-gray-800 rounded-3xl overflow-hidden bg-white">
                <div className="h-8 bg-gray-800 flex items-center justify-center">
                  <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
                </div>
                <div className="p-4 h-64 overflow-y-auto">
                  <div className="space-y-3">
                    <div className="font-bold">{subject || 'Email Subject'}</div>
                    <div className="text-gray-600 text-sm">{previewText || 'Preview text appears here...'}</div>
                    <div className="border-t pt-3">
                      <div dangerouslySetInnerHTML={{ __html: wysiwygContent || '<p>Email content...</p>' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Desktop Preview */}
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <div className="text-center text-sm text-gray-500 mb-2">Desktop Preview</div>
              <div className="border border-gray-300 rounded bg-white p-6 min-h-[300px]">
                <div className="space-y-4">
                  <div className="font-bold text-lg">{subject || 'Email Subject'}</div>
                  <div className="text-gray-600">{previewText || 'Preview text appears here...'}</div>
                  <div className="border-t pt-4">
                    <div dangerouslySetInnerHTML={{ __html: wysiwygContent || '<p>Email content...</p>' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}