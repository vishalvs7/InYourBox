// src/lib/hooks/useAuth.ts
'use client';

import { useState, useEffect } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  AuthError
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

/**
 * Custom hook for managing authentication state and operations
 * Provides login, registration, logout, and auth state monitoring
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setLoading(false);
        setError(null);
      },
      // Fix: Use any type to bypass strict type checking
      (error: any) => {
        setError(error.message || 'Authentication error');
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  /**
   * Login with email and password
   * @param email - User's email address
   * @param password - User's password
   */
  const loginWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error.code);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register new user with email and password
   * @param email - User's email address
   * @param password - User's password
   */
  const registerWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error.code);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login with Google OAuth
   */
  const loginWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      const provider = new GoogleAuthProvider();
      // Add scopes if needed
      provider.addScope('email');
      provider.addScope('profile');
      
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error.code);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout current user
   */
  const logout = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error.code);
      setError(errorMessage);
      throw error;
    }
  };

  return {
    user,
    loading,
    error,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    logout,
  };
}

/**
 * Maps Firebase auth error codes to user-friendly messages
 * @param code - Firebase error code
 * @returns User-friendly error message
 */
function getAuthErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later';
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled';
    case 'auth/popup-blocked':
      return 'Popup was blocked by your browser';
    default:
      return 'An error occurred. Please try again';
  }
}