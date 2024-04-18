import React from 'react';

function DeleteSlot({ slotId, onDelete }) {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/dompetku/wallet/deleteSlot/${slotId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete slot');
            }

            // Notify parent component of successful deletion
            onDelete(slotId);
        } catch (error) {
            console.error('Error deleting slot:', error.message);
            // Handle error
        }
    };

    return (
        <a className="font-12" href='/dashboard' onClick={handleDelete}>Delete</a>
    );
}

export default DeleteSlot;
