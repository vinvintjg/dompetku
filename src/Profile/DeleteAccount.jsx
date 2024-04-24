import React from 'react';

function DeleteAccount() {
    const getUserId = localStorage.getItem('getUserId');
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/dompetku/owner/delete/${getUserId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete Account');
            }

        } catch (error) {
            console.error('Error deleting Account:', error.message);
        }
    };

    return (
        <a className="font-14 btn-a red-color" href='/login' onClick={handleDelete}>Delete Account</a>
    );
}

export default DeleteAccount;
