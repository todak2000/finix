import { createHash } from 'crypto'; // Import the crypto module

// Function to hash a string
export const hashString = (input: string): string => {
  return createHash('sha256').update(input).digest('hex'); // Hashing using SHA-256
};
