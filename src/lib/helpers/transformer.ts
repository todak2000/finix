export interface OriginalTransactionProps {
  amount: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  fullname: string;
  id: string;
  paymentState: string;
  paymentType: string;
  purpose: string;
  sender: string;
  reciever: string;
  transactionId: string;
  userPurpose: string;
  walletId: string;
}
export const transformTransactions = (
  originalTransactions: OriginalTransactionProps[]
) => {
  return originalTransactions.map((transaction) => ({
    amount: transaction.amount,
    createdAt: transaction.createdAt.seconds, // Transforming createdAt
    fullname: transaction.fullname,
    id: transaction.id,
    paymentState: transaction.paymentState,
    paymentType: transaction.paymentType,
    purpose: transaction.purpose,
    sender: transaction.sender,
    reciever: transaction.reciever,
    transactionId: transaction.transactionId,
    userPurpose: transaction.userPurpose,
    walletId: transaction.walletId,
  }));
};

export const sanitizeAmount = (value: string): string => {
  // Remove all non-numeric characters except for the first decimal point
  const sanitizedValue = value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
  const parts = sanitizedValue.split('.'); // Split by decimal point

  // If there are multiple decimal points, keep only the first one
  if (parts.length > 2) {
    return `${parts[0]}.${parts.slice(1).join('').replace(/\./g, '')}`; // Join the first part with the rest, removing extra decimals
  }

  return sanitizedValue; // Return sanitized value
};
