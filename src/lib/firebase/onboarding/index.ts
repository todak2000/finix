/* eslint-disable sonarjs/no-duplicate-string */
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
import { recordTransaction } from '../transactions';
import { createTransferWalletToWallet } from '@/lib/circle/circle';
import {
  merchantWalletID,
  paymentState,
  transactionType,
} from '@/lib/circle/constants';
import { createSession, removeSession } from '@/lib/serverActions/auth';
import { createCircleWallet } from '@/lib/serverActions/circle';

interface UserData {
  id: string;
  createdAt: Timestamp;
  email: string;
  displayName: string;
  fullname: string;
  walletId?: string | null; // Add walletId as an optional property
}

const userOperation = new CRUDOperation(Collection.Users);

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, provider);

    if (result && result.user) {
      let userData: UserData = {
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
        const walletId = (await createCircleWallet()) ?? null;
        userData = { ...userData, walletId };
        await userOperation.add(userData);
        walletId &&
          (await createTransferWalletToWallet({
            sourceWalletId: merchantWalletID,
            destinationWalletId: walletId as string,
            amount: '10',
          }));
        const txnData = {
          purpose: 'Welcome Bonus $10',
          userPurpose: '',
          paymentType: transactionType.credit as 'credit' | 'debit',
          amount: '10',
          fullname: result.user.displayName as string,
          sender: 'finix',
          reciever: walletId as string,
          paymentState: paymentState.successful as
            | 'pending'
            | 'successful'
            | 'failed',
          walletId: merchantWalletID,
        };
        walletId && (await recordTransaction(txnData));
      }
      createSession(result.user.uid);

      return {
        status: 200,
        message: existingUser
          ? 'Welcome!'
          : 'Yah! welcome on board, you have just recieved a welcome bonus of $10.',
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
export const getUserByEmail = async (email: string) => {
  if (!email) {
    return {
      status: 400,
      message: 'Email is empty/null',
    };
  }

  try {
    const user = await userOperation.getUserDataByEmail(email);
    if (user && user.length === 1) {
      return {
        status: 200,
        data: user[0],
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

export const addUserBank = async (data: {
  userId: string;
  bankData: Record<string, string | number>;
}) => {
  try {
    await userOperation.updateArr(data.userId, 'bankData', data.bankData);
    const { data: userData } = await getUser(data.userId as string);
    return {
      status: 200,
      data: userData,
      message: 'bank data added successfully!',
    };
  } catch (error: any) {
    return {
      status: 500,
      message: `Error updating bank data:${error.message}`,
    };
  }
};
