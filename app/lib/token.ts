import { v4 as uuidv4 } from 'uuid';

export const deleteVerificationToken = async (email: string) => {
    try {
        // Generate a random token
        const token = uuidv4();
        const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 hour

        // Check if a token already exists for the user
        const existingTokenResponse = await fetch(`/api/checkForToken/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (existingTokenResponse.status === 200) {
            // Delete the document from the database
            const deleteResponse = await fetch(`/api/checkForToken/${email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const deleteData = await deleteResponse.json();
            console.log('Delete response data:', deleteData);
        }

    //     // Create a new verification token
    //     const createTokenResponse = await fetch('/api/createToken', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             email,
    //             token,
    //             expires: new Date(expires).toISOString(),
    //         }),
    //     });

    //     if (!createTokenResponse.ok) {
    //         const errorData = await createTokenResponse.json();
    //         throw new Error(errorData.error || 'Failed to create verification token');
    //     }

    //     // Optionally, return some data from the response
    //     return await createTokenResponse.json();
    } catch (error) {
        console.error('Error generating verification token:', error);
        throw error;
    }
};
