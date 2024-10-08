'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { signOutWithGoogle } from '@/lib/firebase/onboarding';
import { key } from '@/lib/helpers/uniqueKey';
import { setModal } from '@/lib/store/slices/modal';

const SignOut = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [text, setText] = useState<string>('');

  const closeModal = () => {
    dispatch(setModal({ open: false, type: '' }));
  };
  const signOutNumber = async () => {
    setText('Logging out...');
    await signOutWithGoogle();
    setTimeout(() => {
      closeModal();
      push('/');
    }, 2000);
  };
  const arr = [
    {
      onclick: closeModal,
      name: 'No',
      class:
        'flex h-10 dark:invert w-1/3 font-bold border-spacing-2 flex-row items-center justify-center rounded-lg btn-gradient text-white hover:opacity-80',
    },
    {
      onclick: signOutNumber,
      name: 'Yes',
      class:
        'flex h-10 w-1/3 dark:invert border-spacing-2 flex-row items-center justify-center rounded-lg bg-gray-200 text-[#3F5AB3] font-bold hover:opacity-80',
    },
  ];
  return (
    <div className="flex min-w-[300px] flex-col items-center justify-center gap-6">
      <h5 className="text-center text-sm dark:invert">Want to Sign out?</h5>

      <div className="flex h-[40%] w-full flex-row items-center justify-center gap-14">
        {text !== '' ? (
          <p className="text-sm">{text}</p>
        ) : (
          <>
            {arr.map((i) => {
              return (
                <button
                  key={key()}
                  onClick={i.onclick}
                  type="button"
                  aria-label={i.name}
                  className={i.class}
                >
                  {i.name}
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default SignOut;
