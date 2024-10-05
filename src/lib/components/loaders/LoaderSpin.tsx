/* eslint-disable import/no-extraneous-dependencies */
import type React from 'react';
import { ImSpinner2 } from 'react-icons/im';

const LoaderSpin: React.FC = () => {
  return <ImSpinner2 className="h-4 w-4 animate-spin" />;
};

export default LoaderSpin;
