import React, { useState } from 'react';
import axios from 'axios';

function ResetWallet() {
    const [message, setMessage] = useState('');
    const handleDelete = async () => {
        try {
            var getWalletId = localStorage.getItem('getWalletId');
            const response = await fetch(`http://localhost:8080/api/v1/dompetku/owner/deleteWallet/${getWalletId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const getUserId = localStorage.getItem('getUserId');
                const getUsername = localStorage.getItem('getUsername');
                const getPassword = localStorage.getItem('getPassword');
                await axios.post(`http://localhost:8080/api/v1/dompetku/owner/addNewWallet/${getUserId}`);
                
                const response3 = await axios.get(`http://localhost:8080/api/v1/dompetku/owner?username=${getUsername}&password=${getPassword}`);
                const userDataNew = response3.data;
                localStorage.setItem('getWalletId', userDataNew.wallet.id);
                getWalletId = localStorage.getItem('getWalletId');     
                
                window.location.href = '/dashboard';     
            }else {
                const errorData = await response.json();
                setMessage(errorData.message);
              }

        } catch (error) {
            console.error('Error Reset Wallet:', error.message);
        }
    };

    return (
        <div className="font-14 btn-a blue-color" onClick={handleDelete}>Reset Wallet
        {message && <p className='font-12 red-color text-center'>{message}</p>}
        </div>
        
    );
}

export default ResetWallet;
