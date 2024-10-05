'use client';

import { usePathname } from 'next/navigation';
import { type ReactElement, type ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { ModalChild } from '@/lib/components/modal';
import Modal from '@/lib/components/modal/modal';
import DashboardWrapper from '@/lib/pages/dashboard/wrapper';
import { modal } from '@/lib/store';
import { setModal } from '@/lib/store/slices/modal';

import { Footer } from './footer';
import { Header } from './header';

const WrapperComponent = ({
  children,
  session,
}: {
  children: ReactElement | ReactNode;
  session: string | null;
}) => {
  const dispatch = useDispatch();
  const modall = useSelector(modal);
  const path = usePathname();
  const isHome = path === '/';
  const closeModal = () => {
    dispatch(setModal({ open: false, type: '' }));
  };
  return (
    <div className="flex min-h-screen flex-col">
      <Modal isOpen={modall.open} onClose={closeModal}>
        {ModalChild(modall.type, modall.data)}
      </Modal>
      <Toaster />
      {!session || (session && isHome) ? (
        <>
          <Header isHome={isHome} session={session} />
          <main className="md:wrapper">{children}</main>
          <Footer />
        </>
      ) : (
        <DashboardWrapper session={session}>{children}</DashboardWrapper>
      )}
    </div>
  );
};

export default WrapperComponent;
