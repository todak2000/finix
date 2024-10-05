/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  type User,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

import { firebaseAuth, provider } from '..';
import Collection from '../db';
import CRUDOperation from '../functions/CRUDOperation';
import { createSession, removeSession } from '@/lib/serverActions/auth';

const userOperation = new CRUDOperation(Collection.Users);

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, provider);

    if (result && result.user) {
      const userData = {
        id: result.user.uid as string,
        createdAt: Timestamp.fromDate(new Date()),
        email: result.user.email as string,
        displayName: result.user.displayName as string,
        fullname: (result.user.displayName as string) ?? '',
      };

      const existingUser = await userOperation.getUserData(
        result.user.uid as string
      );

      if (!existingUser) {
        await userOperation.add(userData);
      }
      createSession(result.user.uid);

      return {
        status: 200,
        message: 'Successful!',
        user:
          existingUser && existingUser.length === 1
            ? existingUser[0]
            : userData,
        userId: result.user.uid,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      status: 500,
      message: `Error signing in with Google: ${error.message}`,
    };
  }
};

export const signOutWithGoogle = async () => {
  try {
    await firebaseAuth.signOut();
    removeSession();
    return {
      status: 200,
      message: 'Sign out successfull!',
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      status: 500,
      message: `Error signing out with Google: ${error.message}`,
    };
  }
};

export const getUserData = async (userId: string) => {
  if (!userId) {
    return {
      status: 400,
      message: 'User ID is empty/null',
    };
  }

  try {
    const user = await userOperation.getUserData(userId);
    if (user && user.length === 1) {
      return {
        status: 200,
        data: user,
        message: 'user data fetched successfully!',
      };
    }
    return {
      status: 404,
      message: 'User not found',
    };
  } catch (error: any) {
    return {
      status: 500,
      message: `Error fetching user data:${error.message}`,
    };
  }
};

export const getUser = async (userId: string) => {
  if (!userId) {
    return {
      status: 400,
      message: 'User ID is empty/null',
    };
  }

  try {
    const user = await userOperation.getUserData(userId);
    if (user && user.length === 1) {
      return {
        status: 200,
        data: user,
        message: 'user data fetched successfully!',
      };
    }
    return {
      status: 404,
      message: 'User not found',
    };
  } catch (error: any) {
    return {
      status: 500,
      message: `Error fetching user data:${error.message}`,
    };
  }
};
