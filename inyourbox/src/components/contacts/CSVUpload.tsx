// src/components/contacts/CSVUpload.tsx
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, Download, Trash2 } from 'lucide-react';
import Papa, { ParseResult, ParseError } from 'papaparse';

interface CSVContact {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  [key: string]: any;
}

interface CSVError {
  row: number;
  error: string;
}

export function CSVUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [contacts, setContacts] = useState<CSVContact[]>([]);
  const [errors, setErrors] = useState<CSVError[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isParsing, setIsParsing] = useState(false);
  const [previewRows, setPreviewRows] = useState<CSVContact[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.name.endsWith('.csv')) {
      alert('Please select a CSV file');
      return;
    }

    // Validate file size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
    parseCSV(selectedFile);
  };

  const parseCSV = (file: File) => {
    setIsParsing(true);
    setErrors([]);
    setContacts([]);
    setPreviewRows([]);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<any>) => {
        setIsParsing(false);
        
        if (results.errors.length > 0) {
          const parseErrors: CSVError[] = results.errors.map((error: ParseError, index: number) => ({
            row: error.row || index + 1,
            error: error.message || 'Parse error',
          }));
          setErrors(parseErrors);
          return;
        }

        const parsedContacts: CSVContact[] = results.data
          .slice(0, 10) // Preview first 10 rows
          .map((row: any, index: number) => {
            // Normalize column names
            const normalizedRow: CSVContact = {
              email: row.email || row.Email || row.EMAIL || '',
              firstName: row.firstName || row['First Name'] || row['first_name'] || row.FirstName || '',
              lastName: row.lastName || row['Last Name'] || row['last_name'] || row.LastName || '',
              phone: row.phone || row.Phone || row.PHONE || row.mobile || '',
              company: row.company || row.Company || row.COMPANY || '',
            };
            return normalizedRow;
          })
          .filter((contact: CSVContact) => contact.email); // Only rows with email

        setContacts(results.data as CSVContact[]);
        setPreviewRows(parsedContacts);

        // Validate contacts
        const validationErrors: CSVError[] = [];
        results.data.forEach((row: any, index: number) => {
          const email = row.email || row.Email || row.EMAIL;
          if (!email) {
            validationErrors.push({ row: index + 2, error: 'Missing email address' });
          } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            validationErrors.push({ row: index + 2, error: 'Invalid email format' });
          }
        });

        if (validationErrors.length > 0) {
          setErrors(validationErrors);
        }
      },
      error: (error: any) => {
        setIsParsing(false);
        setErrors([{ row: 0, error: `Parse error: ${error.message}` }]);
      },
    });
  };

  const handleUpload = async () => {
    if (!contacts.length || errors.length > 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // TODO: Actually save to Firestore
          console.log('Uploading contacts:', contacts);
          
          // Reset after successful upload
          setTimeout(() => {
            setFile(null);
            setContacts([]);
            setPreviewRows([]);
            setUploadProgress(0);
          }, 1000);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setContacts([]);
    setPreviewRows([]);
    setErrors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadTemplate = () => {
    const template = `email,firstName,lastName,phone,company
john@example.com,John,Doe,+911234567890,Example Corp
jane@startup.com,Jane,Smith,+919876543210,Startup Inc`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mailflow_contacts_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totalContacts = contacts.length;
  const validContacts = contacts.filter(c => c.email && /^\S+@\S+\.\S+$/.test(c.email)).length;

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-blue-500" />
          Import Contacts from CSV
        </CardTitle>
        <CardDescription>
          Upload a CSV file with your contacts. We'll validate and import them into your account.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".csv"
            className="hidden"
          />
          
          {!file ? (
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-full">
                <Upload className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Drag & drop your CSV file here</p>
                <p className="text-sm text-gray-500 mt-1">or click to browse</p>
              </div>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileText className="h-4 w-4 mr-2" />
                Select CSV File
              </Button>
              <div className="text-xs text-gray-500">
                Maximum file size: 10MB • Supports: email, firstName, lastName, phone, company columns
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • {totalContacts} contacts found
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              {isParsing ? (
                <div className="text-center py-4">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                  <p className="mt-2 text-sm text-gray-600">Parsing CSV file...</p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Download Template */}
        <div className="text-center">
          <Button variant="link" onClick={downloadTemplate}>
            <Download className="h-4 w-4 mr-2" />
            Download CSV Template
          </Button>
        </div>

        {/* Validation Results */}
        {errors.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>{errors.length} error(s) found:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                {errors.slice(0, 5).map((error, index) => (
                  <li key={index}>Row {error.row}: {error.error}</li>
                ))}
                {errors.length > 5 && (
                  <li>... and {errors.length - 5} more errors</li>
                )}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Preview Table */}
        {previewRows.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Preview ({previewRows.length} of {totalContacts} contacts)</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">{validContacts} valid</span>
                </div>
                {totalContacts - validContacts > 0 && (
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-gray-600">{totalContacts - validContacts} invalid</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">First Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {previewRows.map((contact, index) => {
                    const isValid = contact.email && /^\S+@\S+\.\S+$/.test(contact.email);
                    return (
                      <tr key={index} className={isValid ? 'bg-white' : 'bg-red-50'}>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center">
                            {isValid ? (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            )}
                            {contact.email || 'Missing'}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{contact.firstName || '-'}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{contact.lastName || '-'}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{contact.phone || '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Uploading contacts...</span>
              <span className="font-medium">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleRemoveFile}
            disabled={!file || isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file || contacts.length === 0 || errors.length > 0 || isUploading}
            className="min-w-[120px]"
          >
            {isUploading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Uploading...
              </>
            ) : (
              `Import ${contacts.length} Contacts`
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}