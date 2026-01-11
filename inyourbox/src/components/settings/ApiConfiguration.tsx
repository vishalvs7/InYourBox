// src/components/settings/ApiConfiguration.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Key, CheckCircle, XCircle, AlertCircle, Eye, EyeOff, RefreshCw } from 'lucide-react';

export function ApiConfiguration() {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      setErrorMessage('Please enter your Brevo API key');
      setConnectionStatus('error');
      return;
    }

    setIsTesting(true);
    setConnectionStatus('idle');
    setErrorMessage('');

    // Simulate API test
    setTimeout(() => {
      setIsTesting(false);
      // Mock response - in real app, this would call Brevo API
      if (apiKey.includes('test') || apiKey.length < 10) {
        setConnectionStatus('error');
        setErrorMessage('Invalid API key. Please check your key and try again.');
      } else {
        setConnectionStatus('success');
      }
    }, 1500);
  };

  const handleSave = () => {
    // In real app, save to Firestore
    console.log('Saving API key:', apiKey ? '***' + apiKey.slice(-4) : 'empty');
    alert('API key saved successfully (mock)');
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5 text-blue-500" />
          Brevo API Configuration
        </CardTitle>
        <CardDescription>
          Connect your Brevo account to send emails. Get your API key from Brevo dashboard.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* API Key Input */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Brevo API Key
            </label>
            <div className="relative">
              <Input
                type={showApiKey ? 'text' : 'password'}
                placeholder="xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxx"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Your API key is encrypted and stored securely. Never share it publicly.
            </p>
          </div>

          {/* Connection Test */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Connection Status</span>
              <div className="flex items-center gap-2">
                {connectionStatus === 'success' && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Connected</span>
                  </div>
                )}
                {connectionStatus === 'error' && (
                  <div className="flex items-center text-red-600">
                    <XCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Connection Failed</span>
                  </div>
                )}
                {connectionStatus === 'idle' && (
                  <div className="text-sm text-gray-500">Not tested</div>
                )}
              </div>
            </div>

            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleTestConnection}
                disabled={isTesting}
              >
                {isTesting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  'Test Connection'
                )}
              </Button>
              <Button
                onClick={handleSave}
                disabled={!apiKey.trim() || connectionStatus === 'error'}
              >
                Save API Key
              </Button>
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Usage Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Emails Sent (Monthly)</p>
              <p className="text-2xl font-bold text-gray-900">0 / 500</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">API Calls Used</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-xs text-gray-500 mt-1">Limit: 300/day</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Plan</p>
              <p className="text-2xl font-bold text-gray-900">Free</p>
              <p className="text-xs text-gray-500 mt-1">Upgrade for more limits</p>
            </div>
          </div>
        </div>

        {/* Help Links */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Need Help?</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a 
                href="https://www.brevo.com/api-key/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                ↗ How to get Brevo API key
              </a>
            </li>
            <li>
              <a 
                href="https://developers.brevo.com/docs/getting-started" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                ↗ Brevo API Documentation
              </a>
            </li>
            <li>
              <a 
                href="mailto:support@mailflow.com" 
                className="text-blue-600 hover:underline"
              >
                ↗ Contact MailFlow Support
              </a>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}