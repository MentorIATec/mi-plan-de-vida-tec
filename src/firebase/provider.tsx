'use client';

import { createContext, useContext } from 'react';
import type { Auth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { User } from 'firebase/auth';

export type FirebaseContextValue = {
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
  user: User | null;
};

export const FirebaseContext = createContext<FirebaseContextValue | null>(null);

export function FirebaseProvider({
  children,
  ...value
}: {
  children: React.ReactNode;
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}) {
  return (
    <FirebaseContext.Provider value={{ ...value, user: null }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === null) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useFirebaseApp = () => useFirebase()?.firebaseApp ?? null;
export const useAuth = () => useFirebase()?.auth ?? null;
export const useFirestore = () => useFirebase()?.firestore ?? null;
