// src/components/settings/DomainVerification.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, XCircle, AlertCircle, Copy, Globe, Shield, Mail } from 'lucide-react';

export function DomainVerification() {
  const [domain, setDomain] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const verificationStatus = {
    spf: { verified: false, value: 'v=spf1 include:spf.brevo.com ~all' },
    dkim: { verified: false, value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...' },
    dmarc: { verified: false, value: 'v=DMARC1; p=none; rua=mailto:reports@yourdomain.com' },
  };

  const handleVerify = async () => {
    if (!domain.trim()) return;
    
    setIsVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      alert(`Domain ${domain} verification started (mock). In real app, this would check DNS records.`);
    }, 2000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could show toast notification
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-500" />
          Domain Verification
        </CardTitle>
        <CardDescription>
          Verify your domain to improve email deliverability and sender reputation
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Domain Input */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Your Domain
            </label>
            <div className="flex gap-3">
              <Input
                placeholder="yourdomain.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleVerify}
                disabled={!domain.trim() || isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify Domain'}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Enter your domain without http:// or https://
            </p>
          </div>

          {/* Verification Status */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Verification Status</h3>
            
            {/* SPF Record */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">SPF Record</span>
                </div>
                <Badge variant={verificationStatus.spf.verified ? "success" : "destructive"}>
                  {verificationStatus.spf.verified ? 'Verified' : 'Not Verified'}
                </Badge>
              </div>
              <div className="bg-gray-50 p-3 rounded font-mono text-sm relative">
                {verificationStatus.spf.value}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy(verificationStatus.spf.value)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Add this TXT record to your DNS settings
              </p>
            </div>

            {/* DKIM Record */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">DKIM Record</span>
                </div>
                <Badge variant={verificationStatus.dkim.verified ? "success" : "destructive"}>
                  {verificationStatus.dkim.verified ? 'Verified' : 'Not Verified'}
                </Badge>
              </div>
              <div className="bg-gray-50 p-3 rounded font-mono text-sm relative">
                <div className="truncate">{verificationStatus.dkim.value}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy(verificationStatus.dkim.value)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Add this CNAME record to your DNS: mail._domainkey.yourdomain.com
              </p>
            </div>

            {/* DMARC Record */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">DMARC Record</span>
                </div>
                <Badge variant={verificationStatus.dmarc.verified ? "success" : "destructive"}>
                  {verificationStatus.dmarc.verified ? 'Verified' : 'Not Verified'}
                </Badge>
              </div>
              <div className="bg-gray-50 p-3 rounded font-mono text-sm relative">
                {verificationStatus.dmarc.value}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy(verificationStatus.dmarc.value)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Add this TXT record: _dmarc.yourdomain.com
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">📚 How to verify your domain:</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Log in to your domain registrar (GoDaddy, Namecheap, etc.)</li>
              <li>Go to DNS management section</li>
              <li>Add the records above as TXT/CNAME records</li>
              <li>DNS changes can take up to 48 hours to propagate</li>
              <li>Click "Verify Domain" after adding records</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}