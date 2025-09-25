'use client';

import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';

// It is safe to import and use on the client.
const { firebaseApp, auth, firestore } = initializeFirebase();

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      auth={auth}
      firestore={firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
