/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import type { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getUser, onAuthStateChanged } from '../firebase/onboarding';
import { createSession, removeSession } from '../serverActions/auth';
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
          dispatch(
            setUser({
              ...data[0],
              createdAt: data[0]?.createdAt?.toDate().toISOString(),
            })
          );
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
