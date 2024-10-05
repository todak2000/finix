/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { signInWithGoogle } from '../firebase/onboarding';
import { Toast } from '../helpers/Toast';

export const handleGoogle = async (
  router: (href: string, options?: NavigateOptions | undefined) => void
) => {
  try {
    const res = await signInWithGoogle();
    if (res && res?.status === 200) {
      Toast.success({ msg: res?.message });
      router('/dashboard');
    } else {
      Toast.error({ msg: res?.message as string });
    }
    return res;
  } catch (error: any) {
    Toast.error({ msg: error.message ?? 'Oops! an error occured' });
  }
};
