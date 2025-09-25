
'use server';

import { firestore } from '@/firebase/server-init';
import type { IkigaiAnswers, UserInfo } from '@/lib/context/questionnaire-context';
import { collection, addDoc, serverTimestamp, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

export interface LifePlanData {
  id?: string;
  user: UserInfo;
  answers: IkigaiAnswers;
  purposeStatement: string;
  purposeImage?: string; // Optional base64 image string
  createdAt?: any;
}

export async function saveLifePlan(data: LifePlanData) {
  const lifePlansCollection = collection(firestore, 'lifePlans');
  
  try {
    const dataToSave: Omit<LifePlanData, 'id' | 'createdAt'> & { updatedAt: any, createdAt?: any } = {
      user: data.user,
      answers: data.answers,
      purposeStatement: data.purposeStatement,
      updatedAt: serverTimestamp(),
    };

    if (data.purposeImage) {
      dataToSave.purposeImage = data.purposeImage;
    }
    
    if (data.id) {
        // This is an update
        const docRef = doc(firestore, 'lifePlans', data.id);
        await updateDoc(docRef, {
            ...dataToSave,
            user: JSON.stringify(dataToSave.user),
            answers: JSON.stringify(dataToSave.answers),
        });
        return { ...data, id: data.id };
    } else {
        // This is a new document
        dataToSave.createdAt = serverTimestamp();
        const docRef = await addDoc(lifePlansCollection, {
            ...dataToSave,
            user: JSON.stringify(dataToSave.user),
            answers: JSON.stringify(dataToSave.answers),
        });
        return { ...data, id: docRef.id };
    }
  } catch (error) {
    console.error("Error writing document: ", error);
    throw new Error('Could not save life plan to Firestore.');
  }
}

export async function getLifePlans(): Promise<LifePlanData[]> {
    try {
        const lifePlansCollection = collection(firestore, 'lifePlans');
        const q = query(lifePlansCollection);
        const querySnapshot = await getDocs(q);
        
        const lifePlans: LifePlanData[] = [];
        querySnapshot.forEach((doc) => {
            const docData = doc.data();
            const createdAt = docData.createdAt?.toDate ? docData.createdAt.toDate().toISOString() : null;

            lifePlans.push({ 
                id: doc.id,
                user: JSON.parse(docData.user),
                answers: JSON.parse(docData.answers),
                purposeStatement: docData.purposeStatement,
                purposeImage: docData.purposeImage,
                createdAt: createdAt,
             });
        });

        return lifePlans;
    } catch (error) {
        console.error("Error fetching documents: ", error);
        return [];
    }
}

export async function getLifePlanByStudentId(studentId: string): Promise<LifePlanData | null> {
    try {
        const lifePlansCollection = collection(firestore, 'lifePlans');
        
        const q = query(lifePlansCollection);
        const querySnapshot = await getDocs(q);
        
        let foundPlan: LifePlanData | null = null;
        querySnapshot.forEach((doc) => {
            if (foundPlan) return; // Already found a match
            
            const docData = doc.data();
            const user = JSON.parse(docData.user) as UserInfo;
            if (user.studentId === studentId) {
                const createdAt = docData.createdAt?.toDate ? docData.createdAt.toDate().toISOString() : null;
                foundPlan = {
                    id: doc.id,
                    user: user,
                    answers: JSON.parse(docData.answers),
                    purposeStatement: docData.purposeStatement,
                    purposeImage: docData.purposeImage,
                    createdAt: createdAt,
                };
            }
        });
        
        return foundPlan;

    } catch (error) {
        console.error("Error fetching document by student ID: ", error);
        return null;
    }
}
