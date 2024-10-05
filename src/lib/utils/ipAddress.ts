export const fetchUserIP = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log('User IP Address:', data.ip);
        return data.ip; // Return the IP address
    } catch (error) {
        console.error('Error fetching IP address:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};
