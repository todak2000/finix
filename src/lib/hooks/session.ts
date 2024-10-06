/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import type { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getWalletBalance } from '../circle/circle';
import { getUser, onAuthStateChanged } from '../firebase/onboarding';
import { getUserTransaction } from '../firebase/transactions';
import type { OriginalTransactionProps } from '../helpers/transformer';
import { transformTransactions } from '../helpers/transformer';
import { createSession, removeSession } from '../serverActions/auth';
import { setBalance } from '../store/slices/balance';
import { setTransactions } from '../store/slices/transactions';
import { setUser } from '../store/slices/user';

export function useUserSession(InitSession?: string | null) {
  const [userUid, setUserUid] = useState<string | null>(InitSession ?? null);
  const dispatch = useDispatch();
  // Listen for changes to the user session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser: User | null) => {
      if (authUser) {
        const { data } = await getUser(authUser.uid);

        if (data) {
          const { data: txnData } = await getUserTransaction(
            data[0]?.walletId as string
          );
          const { data: walletData } = await getWalletBalance(
            data[0]?.walletId as string
          );

          dispatch(
            setUser({
              ...data[0],
              createdAt: data[0]?.createdAt?.toDate().toISOString(),
            })
          );
          dispatch(
            setTransactions(
              transformTransactions(txnData as OriginalTransactionProps[])
            )
          );
          const balanceAmount =
            walletData.balances.length > 0 ? walletData.balances[0].amount : 0;
          dispatch(setBalance({ value: Number(balanceAmount) }));
        }

        !userUid && createSession(authUser.uid);
        setUserUid(authUser.uid);
      } else {
        setUserUid(null);
        removeSession();
      }
    });

    // Return a cleanup function that unsubscribes
    return () => {
      unsubscribe(); // Call the unsubscribe function
    };
  }, [InitSession]); // Empty dependency array

  return userUid;
}
