// src/lib/firebase/config.ts
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

/**
 * Firebase configuration object
 * These values are obtained from Firebase Console > Project Settings
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Singleton class to manage Firebase instances
 * Prevents multiple Firebase instances in development
 */
class FirebaseService {
  private static instance: FirebaseService;
  public app: FirebaseApp;
  public auth: Auth;
  public db: Firestore;

  private constructor() {
    // Initialize Firebase only if no app exists
    this.app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
    
    // For development with emulators (optional)
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_EMULATORS === 'true') {
      this.connectEmulators();
    }
  }

  private connectEmulators() {
    try {
      // Import emulators dynamically to avoid SSR issues
      import('firebase/auth').then(({ connectAuthEmulator }) => {
        connectAuthEmulator(this.auth, 'http://localhost:9099');
      });
      import('firebase/firestore').then(({ connectFirestoreEmulator }) => {
        connectFirestoreEmulator(this.db, 'localhost', 8080);
      });
      console.log('Connected to Firebase emulators');
    } catch (error) {
      console.log('Emulators not available');
    }
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }
}

// Export singleton instance and individual services
export const firebaseService = FirebaseService.getInstance();
export const auth = firebaseService.auth;
export const db = firebaseService.db;