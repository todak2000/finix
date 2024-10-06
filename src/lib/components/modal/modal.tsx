import type { FC, ReactNode } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto dark:invert">
      <div className="flex h-full min-h-screen w-full items-center justify-center px-4 pb-20 pt-4 sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        <div className="z-10 flex flex-col items-center justify-start rounded-3xl bg-white p-4">
          <div className="flex w-full flex-row items-center justify-end">
            <button
              type="button"
              aria-label="Close"
              className="flex h-6 w-6 flex-row items-center justify-center rounded-full hover:bg-gray-300"
              onClick={onClose}
            >
              <IoCloseOutline className="text-black" />
            </button>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
