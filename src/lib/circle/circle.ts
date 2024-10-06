import { v4 as uuidv4 } from 'uuid';

import { fetchUserIP } from '../utils/ipAddress';

import { defaultCurrency, transferType } from './constants';

const CIRCLE_API_BASE_URL = 'https://api-sandbox.circle.com';
const CIRCLE_API_KEY =process.env.NEXT_PUBLIC_CIRCLE_API_KEY;

if (!CIRCLE_API_KEY) {
  throw new Error('CIRCLE_API_KEY is not set in environment variables');
}

async function circleApiRequest(
  endpoint: string,
  method: string = 'GET',
  body?: unknown
) {
  const url = `${CIRCLE_API_BASE_URL}${endpoint}`;
  const headers = {
    Authorization: `Bearer ${CIRCLE_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Circle API request failed: ${response.statusText}`);
  }

  return response.json();
}

export async function createWallet(
  idempotencyKey: string,
  description: string
) {
  return circleApiRequest('/v1/wallets', 'POST', {
    idempotencyKey,
    description,
  });
}

export async function getWalletBalance(walletId: string) {
  return circleApiRequest(`/v1/wallets/${walletId}`);
}

export async function createTransferWalletToWallet(params: {
  sourceWalletId: string;
  destinationWalletId: string;
  amount: string;
}) {
  const data = {
    idempotencyKey: uuidv4(),
    source: { type: transferType.wallet, id: params.sourceWalletId },
    destination: { type: transferType.wallet, id: params.destinationWalletId },
    amount: { amount: params.amount, currency: defaultCurrency },
  };
  return circleApiRequest('/v1/transfers', 'POST', data);
}

export async function getWireAccounts() {
  return circleApiRequest(`/v1/businessAccount/banks/wires`);
}

export async function getWireInstructions(wireId: string) {
  return circleApiRequest(
    `/v1/businessAccount/banks/wires/${wireId}/instructions`
  );
}

export async function makeMockDeposit(data: {
  amount: string;
  accountNumber: string;
  trackingRef: string;
}) {
  const dataa = {
    amount: {
      currency: defaultCurrency,
      amount: data.amount,
    },
    beneficiaryBank: {
      accountNumber: data.accountNumber,
    },
    trackingRef: data.trackingRef,
  };
  return circleApiRequest('/v1/mocks/payments/wire', 'POST', dataa);
}

export async function createCardPayment(data: {
  amount: string;
  email: string;
  hashSessionId: string;
  cardId?: string;
}) {
  // const sessionId = hashString(uuidv4());
  const ipAddress = await fetchUserIP();
  const dataa = {
    metadata: {
      email: data.email,
      ipAddress,
      sessionId: data.hashSessionId,
    },
    amount: {
      currency: defaultCurrency,
      amount: data.amount,
    },
    autoCapture: true,
    verification: 'none',
    source: {
      type: 'card',
      id: data.cardId ?? uuidv4(),
    },
    idempotencyKey: uuidv4(),
  };
  return circleApiRequest('/v1/payments', 'POST', dataa);
}

export async function getEncryptionKey() {
  return circleApiRequest(`/v1/encryption/public`);
}

export async function createCard(data: {
  amount: string;
  name: string;
  email: string;
  city: string;
  country: string;
  postalCode: string;
  street: string;
  phone: string;
  hashSessionId: string;
  encryptedData: string;
  expMonth: number;
  expYear: number;
  keyId: string;
}) {
  const ipAddress = await fetchUserIP();

  const dataa = {
    billingDetails: {
      name: data.name,
      city: data.city,
      country: data.country,
      postalCode: data.postalCode,
      line1: data.street,
    },
    metadata: {
      email: data.email,
      phoneNumber: data.phone,
      ipAddress,
      sessionId: data.hashSessionId,
    },
    idempotencyKey: uuidv4(),
    keyId: data.keyId,
    encryptedData: data.encryptedData,
    expMonth: data.expMonth,
    expYear: data.expYear,
  };

  return circleApiRequest('/v1/cards', 'POST', dataa);
}
