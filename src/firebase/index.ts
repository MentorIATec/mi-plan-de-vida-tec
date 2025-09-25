import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

auth = getAuth(firebaseApp);
firestore = getFirestore(firebaseApp);

export { firebaseApp, auth, firestore };

export function initializeFirebase() {
  return { firebaseApp, auth, firestore };
}

// Re-export hooks and providers
export { FirebaseProvider, useFirebaseApp, useAuth, useFirestore, useFirebase } from './provider';
export { useUser } from './auth/use-user';
export { FirebaseClientProvider } from './client-provider';
