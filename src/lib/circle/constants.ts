export const transferType = {
  wallet: 'wallet',
  blockchain: 'blockchain_address',
};

export const defaultCurrency = 'USD';
export const defaultUserWalletID = '1017206288';
export const merchantWalletID = '1017206232';
export const keyId = 'key1';
export const defaultCardSource = {
  id: '306b7ff5-55a2-42d4-98f1-2378b25f3864',
  type: 'card',
};
export const defaultMetadata = {
  email: 'customer-0005@circle.com',
  phoneNumber: '+12025550180',
  sessionId: 'xxx',
  ipAddress: '172.33.222.1',
};

export const purpose = {
  fundBank: 'Fund Wallet (Bank)',
  fundCard: 'Fund Wallet (Card)',
  debitBank: 'Withdraw from Wallet (Bank)',
  debitCrypto: 'Withdraw from Wallet (Crypto)',
  debitTransfer: 'Transfer to Wallet (finix)',
};

export const paymentWarning = `Ensure to enter the <strong>exact amount</strong>, <strong>account number</strong>, and <strong>tracking reference ID</strong> when making the payment. Failure to do so may result in the loss of your funds. <strong>Your Wallet</strong> will automatically be <strong>funded</strong> as soon as payment is <strong>confirmed</strong>.`;

export const transactionType = {
  debit: 'debit',
  credit: 'credit',
};
export const paymentState = {
  pending: 'pending',
  successful: 'successful',
  failed: 'failed',
};
