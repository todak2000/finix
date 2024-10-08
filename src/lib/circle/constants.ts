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
  confirmed: 'confirmed',
  paid: 'paid',
};

export const mockCards = [
  {
    id: '306b7ff5-55a2-42d4-98f1-2378b25f3864',
    status: 'complete',
    billingDetails: {
      district: 'MA',
      country: 'US',
      valid: false,
    },
    expMonth: 1,
    expYear: 2025,
    network: 'MASTERCARD',
    bin: '510242',
    issuerCountry: 'US',
    fundingType: 'credit',
    fingerprint: '879bb8e0-d6a1-4327-a274-2bd0573f101d',
    verification: {
      cvv: 'pass',
      avs: 'Y',
    },
    createDate: '2024-10-06T22:20:05.655Z',
    updateDate: '2024-10-06T22:21:17.678Z',
  },
  {
    id: '8fd4a99a-9a29-4280-b671-3a3b5e17e3e8',
    status: 'complete',
    billingDetails: {
      district: 'MA',
      country: 'US',
      valid: false,
    },
    expMonth: 1,
    expYear: 2025,
    network: 'VISA',
    bin: '475714',
    issuerCountry: 'GB',
    fundingType: 'debit',
    fingerprint: 'bb672f3f-40ae-4eab-959b-2a1b4bb82f95',
    verification: {
      cvv: 'pending',
      avs: 'pending',
    },
    createDate: '2024-09-25T00:48:28.009Z',
    updateDate: '2024-09-25T00:50:53.724Z',
  },
  {
    id: '704b5d0a-6447-42eb-a22a-d02e706c0eb8',
    status: 'complete',
    billingDetails: {
      district: 'MA',
      country: 'US',
      valid: false,
    },
    expMonth: 1,
    expYear: 2025,
    network: 'VISA',
    bin: '400740',
    issuerCountry: 'ES',
    fundingType: 'debit',
    fingerprint: '603b2185-1901-4eae-9b98-cc20c32d0709',
    verification: {
      cvv: 'pending',
      avs: 'pending',
    },
    createDate: '2024-09-25T00:19:33.159Z',
    updateDate: '2024-09-25T00:21:28.707Z',
  },
  {
    id: 'afbcf99d-bd61-4960-a985-0cb55073b539',
    status: 'complete',
    billingDetails: {
      district: 'MA',
      country: 'US',
      valid: false,
    },
    expMonth: 1,
    expYear: 2025,
    network: 'MASTERCARD',
    bin: '510242',
    issuerCountry: 'US',
    fundingType: 'credit',
    fingerprint: '879bb8e0-d6a1-4327-a274-2bd0573f101d',
    verification: {
      cvv: 'pending',
      avs: 'pending',
    },
    createDate: '2024-09-25T00:05:10.765Z',
    updateDate: '2024-09-25T00:07:12.786Z',
  },
];
