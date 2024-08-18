import { v4 as uuidv4 } from 'uuid';

export const generateVerificationToken = async (email: string) => {
    try {
        // Generate a random token
        const token = uuidv4();
        const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 hour

        // Create a new verification token
        const createTokenResponse = await fetch('/api/createToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                token,
                expires: new Date(expires).toISOString(),
            }),
        });

        if (!createTokenResponse.ok) {
            const errorData = await createTokenResponse.json();
            throw new Error(errorData.error || 'Failed to create verification token');
        }

        // Optionally, return some data from the response
        return await createTokenResponse.json();
    } catch (error) {
        console.error('Error generating verification token:', error);
        throw error;
    }
};
