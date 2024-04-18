import React, { useState } from 'react';
import axios from 'axios';

function AddBalance( ) {
    const [method, setMethod] = useState('');
    const [amount, setAmount] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdateData = async () => {
        try {
            let url = '';
            if (method === '1') {
                url = `http://localhost:8080/api/v1/dompetku/wallet/deposit/${ownerId}?amount=${amount}`;
            } else if (method === '2') {
                url = `http://localhost:8080/api/v1/dompetku/wallet/decrease/${ownerId}?amount=${amount}`;
            } else {
                // Handle invalid method
                console.error('Invalid method');
                return;
            }

            const response = await axios.put(url);
            if (response.status === 200) {
                // Reset form fields after successful update
                setMethod('');
                setAmount('');
                setMessage('Wallet updated successfully.');
            } else {
                throw new Error('Failed to update data');
            }
        } catch (error) {
            console.error('Error updating data:', error.message);
            setMessage('Error updating wallet. Please try again later.');
        }
};

  return (
    <>
    <div className="popup show">
       <div className="form-update">
         <div className="font-24 black-color" style={{ textAlign: 'center' }}>Update Balance</div>
         <div className="label-input black-color">
            <label for="ownerId">OwnerId</label>
            <input type="number" name="ownerId" value={ownerId} placeholder="OwnerId" onChange={e => setOwnerId(e.target.value)}/>
          </div>
         <div className="label-input black-color">
           <label htmlFor="Method">Method</label>
           <select name="Method" id="" value={method} onChange={(e) => setMethod(e.target.value)}>
                    <option value="-1">Select...</option>
                    <option value="1">Deposit</option>
                    <option value="2">Decrease</option>
                </select>
         </div>
         <div className="label-input black-color">
                <label htmlFor="Nominal">Nominal</label>
                <input type="number" name="Nominal" placeholder="Nominal" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
         <button className="btn-icon2 font-12" onClick={handleUpdateData}>Update Data</button>
         <a className="btn-icon2 btn-icon3 font-12 no-deco" href='/dashboard'>Cancel</a>

         {message && <p className='font-12 red-color text-center'>{message}</p>}
       </div>
     </div>

    </>
  );
}

export default AddBalance;
