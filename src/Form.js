import React, { useState } from 'react';

function EditOwnerForm() {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/dompetku/owner/edit/1?username=${newUsername}&password=${newPassword}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setMessage('Owner information updated successfully.');
      } else {
        const data = await response.json();
        setMessage(data.message); // Assuming the API returns an error message
      }
    } catch (error) {
      console.error('Error editing owner:', error);
      setMessage('Error editing owner. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Edit Owner</h2>
      <label>
        New Username:
        <input type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)} />
      </label>
      <br />
      <label>
        New Password:
        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleEdit}>Edit Owner</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EditOwnerForm;
