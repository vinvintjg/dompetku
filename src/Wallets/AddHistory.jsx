import React, { useState } from 'react';
import axios from 'axios';

function AddHistory({ slotId, onUpdate }) {
    const [method, setMethod] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    

    const handleUpdateData = async () => {
        try {
            let url = '';
            if (method === '1') {
                url = `http://localhost:8080/api/v1/dompetku/slot/deposit/${slotId}?amount=${amount}`;
            } else if (method === '2') {
                url = `http://localhost:8080/api/v1/dompetku/slot/decrease/${slotId}?amount=${amount}&description=${description}`;
            } else {
                // Handle invalid method
                console.error('Invalid method');
                return;
            }

            const response = await axios.put(url);
            if (response.status === 200) {
                onUpdate();
                // Reset form fields after successful update
                setMethod('');
                setAmount('');
                setDescription('');
            } else {
                throw new Error('Failed to update data');
            }
        } catch (error) {
            console.error('Error updating data:', error.message);
            // Handle error
        }
    };

    return (
        <div className="form-update">
            <div className="label-input black-color">
                <label htmlFor="Method">Method</label>
                <select name="Method" value={method} onChange={(e) => setMethod(e.target.value)}>
                    <option value="-1">Select...</option>
                    <option value="1">Deposit</option>
                    <option value="2">Decrease</option>
                </select>
            </div>
            <div className="label-input black-color">
                <label htmlFor="Nominal">Nominal</label>
                <input type="number" name="Nominal" placeholder="Nominal" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="label-input black-color">
                <label htmlFor="Deskripsi">Deskripsi</label>
                <input 
                    type="text" 
                    name="Deskripsi" 
                    placeholder="Deskripsi" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    readOnly={method === "1"}
                />
            </div>
            <button className="btn-icon2 font-12" onClick={handleUpdateData}>Update Data</button>
        </div>
    );
}

export default AddHistory;
