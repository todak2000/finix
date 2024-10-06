/* eslint-disable no-useless-catch */
/* eslint-disable sonarjs/no-useless-catch */
export const fetchUserIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    throw error;
  }
};
