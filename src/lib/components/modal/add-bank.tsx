/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoaderSpin from '../loaders/LoaderSpin';
import { addUserBank } from '@/lib/firebase/onboarding';
import { Toast } from '@/lib/helpers/Toast';
import { user } from '@/lib/store';
import { setModal } from '@/lib/store/slices/modal';
import { setUser } from '@/lib/store/slices/user';

const AddBank = () => {
  const userr = useSelector(user);

  const userData = userr as {
    displayName: string;
    walletId: string;
    id: string;
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [bankData, setBankData] = useState({
    accountNumber: '',
    accountName: '',
    bankName: '',
    country: '',
    routingCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return Object.values(bankData).every((field) => field.trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (validateForm()) {
      console.log(bankData);
      const { data, status } = await addUserBank({
        userId: userData.id,
        bankData,
      });
      if (data && status === 200) {
        dispatch(
          setUser({
            ...data[0],
            createdAt: data[0]?.createdAt?.toDate().toISOString(),
          })
        );
        setLoading(false);
        dispatch(setModal({ open: false, type: '' }));
        Toast.success({ msg: 'Bank Data added successfully' });
      } else {
        setLoading(false);
        Toast.error({ msg: 'oops! an error occured' });
      }
      // You can call initiateDeposit() here if needed
    } else {
      setLoading(false);
      Toast.error({ msg: 'Please fill in all fields.' });
    }
  };

  // Define the fields for the bank data
  const bankFields = [
    { name: 'accountNumber', placeholder: 'Account Number' },
    { name: 'accountName', placeholder: 'Account Name' },
    { name: 'bankName', placeholder: 'Bank Name' },
    { name: 'country', placeholder: 'Country' },
    { name: 'routingCode', placeholder: 'Routing Code' },
  ];

  return (
    <div className="font-roboto flex min-w-[300px] max-w-[320px] flex-col items-center justify-center gap-6 md:max-w-[500px]">
      <h5 className="font-merry text-center text-sm dark:invert">
        Enter Bank Details
      </h5>
      <div className="w-full bg-white py-6">
        <form onSubmit={handleSubmit}>
          {bankFields.map((field) => (
            <input
              key={field.name}
              type="text"
              name={field.name}
              placeholder={field.placeholder}
              value={bankData[field.name as keyof typeof bankData]} // Type assertion added
              onChange={handleChange}
              className="mb-4 w-full rounded border-none bg-[#71b2e72c] p-2 text-gray-500 focus:border-[#3F5AB3] focus:ring-[#3F5AB3] dark:invert"
              required
            />
          ))}
          <button
            type="submit"
            disabled={loading}
            className="btn-gradient flex w-full flex-row items-center justify-center rounded px-4 py-2 font-bold text-white hover:opacity-70 dark:invert"
          >
            {loading ? <LoaderSpin /> : `Submit`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBank;
