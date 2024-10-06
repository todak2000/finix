export const transferType = {
  wallet: 'wallet',
  blockchain: 'blockchain_address',
};

export const defaultCurrency = 'USD';
export const defaultUserWalletID = '1017206288';
export const merchantWalletID = '1017206232';
export const keyId = 'key1';

export const purpose = {
  fundBank: 'Fund Wallet (Bank)',
  fundCrypto: 'Fund Wallet (Crypto)',
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
