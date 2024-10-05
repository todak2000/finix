/* eslint-disable no-console */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import type {
  DocumentData,
  Query,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
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
  startAfter,
  getCountFromServer,
  endBefore,
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

  // -- get all
  async getAll(
    page: number,
    pageSize: number,
    lastDocId: string | null = null,
    initialDocId: string | null = null
  ) {
    try {
      const collRef = collection(db, this.collectionName);
      let q;

      // next
      if (lastDocId) {
        const lastDocRef = doc(collRef, lastDocId);
        const lastDocSnapshot = await getDoc(lastDocRef);
        if (!lastDocSnapshot.exists()) {
          throw new Error('Last document does not exist');
        }

        q = query(
          collRef,
          orderBy('createdAt'),
          startAfter(lastDocSnapshot),
          limit(pageSize)
        );
      }
      // before
      else if (initialDocId) {
        const initialDocRef = doc(collRef, initialDocId);
        const initialDocSnapshot = await getDoc(initialDocRef);
        if (!initialDocSnapshot.exists()) {
          throw new Error('Last document does not exist');
        }

        q = query(
          collRef,
          orderBy('createdAt'),
          endBefore(initialDocSnapshot),
          limit(pageSize)
        );
      } else {
        q = query(collRef, orderBy('createdAt'), limit(pageSize));
      }

      const querySnapshot = await getDocs(q);
      const items: unknown[] = [];

      querySnapshot.forEach((i) => {
        items.push({
          id: i.id,
          ...i.data(),
        });
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      const firstVisible = querySnapshot.docs[0];
      const totalSnapshot = await getCountFromServer(collRef);
      const total = totalSnapshot.data().count;
      return {
        items,
        total,
        lastDocId: lastVisible ? lastVisible.id : null,
        initialDocId: firstVisible ? firstVisible.id : null,
        hasMore: Math.ceil(total / pageSize) - pageSize > 0,
      };
    } catch (error: unknown) {
      throw new Error(errMessage);
    }
  }

  // -- get all without pagination
  async getAllWithoutPagination() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));

      const items: unknown[] = [];

      querySnapshot.forEach((q) => {
        items.push({
          id: q.id,
          ...q.data(),
        });
      });

      return items;
    } catch (error: unknown) {
      throw new Error(errMessage);
    }
  }

  // -- search/filter
  async getPaginatedFilteredResults(
    userId: string,
    page: number,
    pageSize: number,
    filters: Record<string, string | number | Date>,
    search: { field: string; value: string | Date } | null,
    lastDocId: string | null = null
  ) {
    try {
      const collRef = collection(db, this.collectionName);
      let q = query(collRef, where('userId', '==', userId));

      for (const [key, value] of Object.entries(filters)) {
        if (key === 'startDate') {
          const d = new Date(value);
          const dSetHours = d.setUTCHours(0, 0, 0, 0);
          const dString = new Date(dSetHours);
          q = query(q, where(key, '>=', dString));
        } else if (key === 'endDate') {
          const d = new Date(value);
          const dSetHours = d.setUTCHours(23, 59, 59, 999);
          const dString = new Date(dSetHours);
          q = query(q, where(key, '<=', dString));
        } else {
          q = query(q, where(key, '>=', value.toString().toLowerCase()));
        }
      }
      if (search) {
        q = query(
          q,
          where(search.field, '==', search.value.toString().toLowerCase()),
          where(
            search.field,
            '<=',
            `${search.value.toString().toLowerCase()}\uf8ff`
          )
        );
      }

      if (lastDocId) {
        const lastDocRef = doc(collRef, lastDocId);
        const lastDocSnapshot = await getDoc(lastDocRef);
        if (!lastDocSnapshot.exists()) {
          throw new Error('Last document does not exist');
        }
        q = query(
          q,
          orderBy('id'),
          startAfter(lastDocSnapshot),
          limit(pageSize)
        );
      } else {
        q = query(q, orderBy('id'), limit(pageSize));
      }

      const querySnapshot = await getDocs(q);
      const items: unknown[] = [];

      querySnapshot.forEach((d) => {
        items.push({
          id: d.id,
          ...d.data(),
        });
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      return {
        items,
        lastDocId: lastVisible ? lastVisible.id : null,
        hasMore: querySnapshot.docs.length === pageSize,
      };
    } catch (error: unknown) {
      throw new Error(errMessage);
    }
  }

  // -- get detail
  async getDetail(id: string): Promise<T | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      }

      return null;
    } catch (error: unknown) {
      throw new Error(errMessage);
    }
  }

  // get details by slug
  async getDetailBySlug(slug: string): Promise<T | null> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('slug', '==', slug)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        return { id: docSnap.id, ...docSnap.data() } as T;
      }

      return null;
    } catch (error: unknown) {
      throw new Error(errMessage);
    }
  }

  // -- get user details
  async getUserDetail(userId: string, page: number, pageSize: number) {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('userId', '==', userId),
        orderBy('id'), // Ensure consistent ordering
        limit(pageSize)
      );

      const querySnapshot = await getDocs(q);
      const userDetailsArray: DocumentData[] = [];

      querySnapshot.forEach((c) => {
        userDetailsArray.push({
          id: c.id,
          ...c.data(),
        });
      });

      // Get the last visible document
      const lastVisible: QueryDocumentSnapshot<DocumentData> | null =
        querySnapshot.docs[querySnapshot.docs.length - 1];

      let hasMore = false;
      if (lastVisible) {
        const nextQuery = query(
          collection(db, this.collectionName),
          where('userId', '==', userId),
          orderBy('id'),
          startAfter(lastVisible),
          limit(pageSize)
        );
        const nextSnapshot = await getDocs(nextQuery);
        hasMore = !nextSnapshot.empty;
      }

      return {
        items: userDetailsArray,
        hasMore,
      };
    } catch (error: unknown) {
      throw new Error(errMessage);
    }
  }

  // -- get user details without pagination
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

  async checkIfDocumentExists(documentId: string) {
    const firestoreDoc = doc(db, this.collectionName, documentId);
    const documentSnapshot = await getDoc(firestoreDoc);

    return documentSnapshot.exists();
  }

  async checkIfEmailExists(email: string) {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('email', '==', email)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        return { id: userDoc.id, ...userDoc.data() };
      }
      return null;
    } catch (error: any) {
      console.error('Error fetching user by email:', error.message);
      return null;
    }
  }

  async searchProperties(searchParams: {
    propertyMarketType?: string;
    propertyType?: string;
    addressState?: string;
    minMarketPrice?: number;
    maxMarketPrice?: number;
  }): Promise<unknown[]> {
    let q: Query<DocumentData, DocumentData> = collection(
      db,
      this.collectionName
    );

    q = query(q, where('marketStatus', '==', 'available'));

    if (
      searchParams.propertyMarketType &&
      searchParams.propertyMarketType !== 'all'
    ) {
      q = query(
        q,
        where(
          'propertyMarketType',
          '==',
          searchParams.propertyMarketType.toLocaleLowerCase()
        )
      );
    }

    if (searchParams.propertyType && searchParams.propertyType !== 'all') {
      q = query(
        q,
        where(
          'propertyType',
          '==',
          searchParams.propertyType.toLocaleLowerCase()
        )
      );
    }

    if (searchParams.addressState && searchParams.addressState !== 'all') {
      q = query(
        q,
        where(
          'address.state',
          '==',
          searchParams.addressState.toLocaleLowerCase()
        )
      );
    }

    if (searchParams.minMarketPrice) {
      q = query(
        q,
        where(
          'marketPrice',
          '>=',
          Number.isNaN(searchParams.minMarketPrice)
            ? Number(searchParams.minMarketPrice)
            : searchParams.minMarketPrice
        )
      );
    }

    if (searchParams.maxMarketPrice) {
      q = query(
        q,
        where(
          'marketPrice',
          '<=',
          Number.isNaN(searchParams.maxMarketPrice)
            ? Number(searchParams.minMarketPrice)
            : searchParams.maxMarketPrice
        )
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data() as unknown);
  }

  async getAllProperties(
    page: number,
    pageSize: number,
    lastDocId: string | null = null,
    initialDocId: string | null = null
  ) {
    try {
      const collRef = collection(db, this.collectionName);
      let q;

      // Apply the initial filter to exclude documents where marketStatus is 'available'
      const baseQuery = query(
        collRef,
        where('marketStatus', '==', 'available')
      );

      // next
      if (lastDocId) {
        const lastDocRef = doc(collRef, lastDocId);
        const lastDocSnapshot = await getDoc(lastDocRef);
        if (!lastDocSnapshot.exists()) {
          throw new Error('Last document does not exist');
        }

        q = query(
          baseQuery,
          orderBy('createdAt'),
          startAfter(lastDocSnapshot),
          limit(pageSize)
        );
      }
      // before
      else if (initialDocId) {
        const initialDocRef = doc(collRef, initialDocId);
        const initialDocSnapshot = await getDoc(initialDocRef);
        if (!initialDocSnapshot.exists()) {
          throw new Error('Initial document does not exist');
        }

        q = query(
          baseQuery,
          orderBy('createdAt'),
          endBefore(initialDocSnapshot),
          limit(pageSize)
        );
      } else {
        q = query(baseQuery, orderBy('createdAt'), limit(pageSize));
      }

      const querySnapshot = await getDocs(q);
      const items: unknown[] = [];

      querySnapshot.forEach((i) => {
        items.push({
          id: i.id,
          ...i.data(),
        });
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      const firstVisible = querySnapshot.docs[0];
      const totalSnapshot = await getCountFromServer(collRef);
      const total = totalSnapshot.data().count;
      return {
        items,
        total,
        lastDocId: lastVisible ? lastVisible.id : null,
        initialDocId: firstVisible ? firstVisible.id : null,
        hasMore: Math.ceil(total / pageSize) - pageSize > 0,
      };
    } catch (error: unknown) {
      throw new Error('An error occurred while fetching documents');
    }
  }
}
