// src/firebase/server-init.ts
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Initialize Firebase for server-side usage
let firebaseApp: FirebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

const firestore: Firestore = getFirestore(firebaseApp);

export { firestore };
