/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */

import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  collection,
  query,
  where,
  limit,
  orderBy,
  arrayUnion,
} from 'firebase/firestore';

import { db } from '..';

export const errMessage = 'An unknown error occurred.';

// - CRUD

export default class CRUDOperation<T> {
  // -- collection name
  collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  // -- add item

  async add(modelName: Record<string, string> | any) {
    try {
      const firestoreDoc = doc(db, this.collectionName, modelName.id);
      await setDoc(firestoreDoc, modelName);
    } catch (error: unknown) {
      throw new Error(errMessage);
    }
  }

  async addUnique(modelName: unknown, id: string) {
    try {
      const firestoreDoc = doc(db, this.collectionName, id);
      const snapShot = await getDoc(firestoreDoc);
      if (snapShot.exists()) {
        return {
          status: 401,
          message: 'Already Exists',
        };
      }
      await setDoc(firestoreDoc, modelName);
      return {
        status: 200,
        message: 'Succesful',
      };
    } catch (error: unknown) {
      throw new Error(errMessage);
    }
  }

  // -- get user details
  async getUserData(uid: string) {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, this.collectionName), where('id', '==', uid))
      );

      if (!querySnapshot.empty) {
        const userDetailsArray: Record<
          string,
          string | number | unknown | any
        >[] = [];

        querySnapshot.forEach((g) => {
          userDetailsArray.push({ ...g.data() });
        });

        return userDetailsArray;
      }

      return null;
    } catch (error: unknown) {
      throw new Error(errMessage);
    }
  }

  async getUserDataByEmail(email: string) {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, this.collectionName), where('email', '==', email))
      );

      if (!querySnapshot.empty) {
        const userDetailsArray: Record<
          string,
          string | number | unknown | any
        >[] = [];

        querySnapshot.forEach((g) => {
          userDetailsArray.push({ ...g.data() });
        });

        return userDetailsArray;
      }

      return null;
    } catch (error: unknown) {
      throw new Error(errMessage);
    }
  }

  // -- update
  async update(modelName: Record<string, string>) {
    try {
      const firestoreDoc = doc(db, this.collectionName, modelName.id);
      await setDoc(firestoreDoc, modelName, { merge: true });
    } catch (error: unknown) {
      throw new Error(errMessage);
    }
  }

  // -- delete
  async delete(id: string) {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
    } catch (error: unknown) {
      throw new Error(errMessage);
    }
  }

  async getUserTransactions(walletId: string) {
    try {
      const collRef = collection(db, this.collectionName);

      // Query for transactions where walletId is the sender
      const senderQuery = query(collRef, where('walletId', '==', walletId));
      const senderSnapshot = await getDocs(senderQuery);

      // Query for transactions where walletId is the receiver
      const receiverQuery = query(collRef, where('reciever', '==', walletId));
      const receiverSnapshot = await getDocs(receiverQuery);

      const items: unknown[] = [];

      // Merge results from sender query
      senderSnapshot.forEach((i) => {
        items.push({
          transactionId: i.id,
          ...i.data(),
        });
      });

      // Merge results from receiver query
      receiverSnapshot.forEach((i) => {
        items.push({
          transactionId: i.id,
          ...i.data(),
        });
      });

      // Sort items by createdAt in descending order
      (items as { createdAt: number }[]).sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB.getTime() - dateA.getTime();
      });

      return items ?? [];
    } catch (error: unknown) {
      throw new Error('An error occurred while fetching documents');
    }
  }

  async updateArr(id: string, key: string, newObject: any) {
    // Added key and newObject parameters
    try {
      const firestoreDoc = doc(db, this.collectionName, id);
      const docSnapshot = await getDoc(firestoreDoc); // Fetch the document snapshot

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (data && Array.isArray(data[key])) {
          // Check if the key exists and is an array
          await setDoc(
            firestoreDoc,
            { [key]: arrayUnion(newObject) },
            { merge: true }
          ); // Add to existing array
        } else {
          await setDoc(firestoreDoc, { [key]: [newObject] }, { merge: true }); // Create new array with the object
        }
      } else {
        await setDoc(firestoreDoc, { [key]: [newObject] }, { merge: true }); // Create new key with array if document doesn't exist
      }
    } catch (error: unknown) {
      throw new Error(errMessage);
    }
  }

  async getSingleTransaction(transactionId: string) {
    try {
      const firestoreDoc = doc(db, this.collectionName, transactionId); // Get the document reference
      const docSnapshot = await getDoc(firestoreDoc); // Fetch the document snapshot

      if (docSnapshot.exists()) {
        return {
          transactionId: docSnapshot.id,
          walletId: docSnapshot.data()?.walletId as string, // Ensure walletId is included
          amount: docSnapshot.data()?.amount as string,
          ...docSnapshot.data(), // Return the transaction data
        };
      }

      return null; // Return null if the document does not exist
    } catch (error: unknown) {
      throw new Error('An error occurred while fetching documents');
    }
  }

  async updateKey(
    id: string,
    key: string,
    value:
      | string
      | number
      | boolean
      | null
      | Record<string, string | number | boolean | object | null>
  ) {
    try {
      const firestoreDoc = doc(db, this.collectionName, id);
      const docSnapshot = await getDoc(firestoreDoc); // Fetch the document snapshot

      if (docSnapshot.exists()) {
        await setDoc(firestoreDoc, { [key]: value }, { merge: true }); // Update the document

        // Fetch the updated document snapshot
        const updatedDocSnapshot = await getDoc(firestoreDoc);
        return updatedDocSnapshot.data(); // Return the updated document data
      }
      return null; // Return null if the document does not exist
    } catch (error: unknown) {
      throw new Error(errMessage);
    }
  }
}
