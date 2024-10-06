/* eslint-disable no-console */
import { v4 as uuidv4 } from 'uuid';

export const createCircleWallet = async () => {
  try {
    const response = await fetch('/api/circle/wallet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idempotencyKey: uuidv4(),
        description: 'Finix Wallet',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create wallet');
    }

    const data = await response.json();
    return data.data.walletId;
  } catch (error) {
    console.error('Error creating wallet:', error);
    return error;
  }
};
