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
