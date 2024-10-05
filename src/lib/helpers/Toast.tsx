/* eslint-disable import/no-extraneous-dependencies */
import { toast } from 'react-hot-toast';

enum ToastPosition {
  TOPRIGHT = 'top-right',
  TOPLEFT = 'top-left',
  TOPCENTER = 'top-center',
  BOTTOMLEFT = 'bottom-left',
  BOTTOMRIGHT = 'bottom-right',
  BOTTOMCENTER = 'bottom-center',
}
interface ToastProps {
  msg: string;
  position?: ToastPosition;
}

const mtToastStyle = {
  style: {
    fontSize: '15px',
  },
};

export const Toast = {
  success: ({ msg, position = ToastPosition.TOPRIGHT }: ToastProps) =>
    toast.success(msg, {
      position,
      duration: 6000,
      ...mtToastStyle,
    }),

  error: ({ msg, position = ToastPosition.TOPRIGHT }: ToastProps) =>
    toast.error(msg, { duration: 6000, position, ...mtToastStyle }),
  warn: ({ msg, position = ToastPosition.TOPRIGHT }: ToastProps) =>
    toast.custom(msg, {
      position,
      duration: 6000,
      style: {
        backgroundColor: 'white',
        fontSize: '15px',
        color: 'blue',
      },
      className: 'bg-primary-60 text-neutral white',
    }),
};
