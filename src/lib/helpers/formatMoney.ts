/* eslint-disable no-restricted-globals */
export const formatAsMoney = (n: number | string) => {
  // Check if the input can be converted to a number
  if (isNaN(Number(n))) {
    return n;
  }
  // Convert to number, format with 2 decimal places, and add commas
  return Number(n)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const finixFees = (
  amount: string | number
): { fees: number; paidAmount: number } => {
  let numericAmount: number;

  if (typeof amount === 'number') {
    numericAmount = amount;
  } else if (typeof amount === 'string' && !isNaN(Number(amount))) {
    numericAmount = Number(amount);
  } else {
    return { fees: 0, paidAmount: 0 }; // Return null values if the amount is not a valid number
  }

  const fees = numericAmount * 0.06;
  const paidAmount = numericAmount - fees;

  return { fees, paidAmount };
};
