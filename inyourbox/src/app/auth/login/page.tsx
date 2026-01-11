// src/app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Chrome } from 'lucide-react';

/**
 * Login page component
 * - Email/password login
 * - Google OAuth login
 * - Form validation
 * - Error handling
 */
export default function LoginPage() {
  const router = useRouter();
  const { loginWithEmail, loginWithGoogle, error, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormError(''); // Clear errors on input change
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setFormError('Email is required');
      return false;
    }
    if (!formData.password.trim()) {
      setFormError('Password is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await loginWithEmail(formData.email, formData.password);
      // Navigation happens automatically via auth state change
    } catch (error) {
      // Error is already set in useAuth hook
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // Navigation happens automatically via auth state change
    } catch (error) {
      // Error is already set in useAuth hook
    }
  };

  return (
    <Card className="w-full max-w-md border-gray-200 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Sign in to your MailFlow account
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Error Display */}
        {(error || formError) && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || formError}</AlertDescription>
          </Alert>
        )}

        {/* Google Login Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full mb-6"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 dark:bg-gray-950 dark:text-gray-400">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                className="pl-10"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="pl-10 pr-10"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
            isLoading={loading}
            disabled={loading}
          >
            Sign In
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 pt-0">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/register"
            className="font-medium text-blue-500 hover:text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500 text-center">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="underline">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}