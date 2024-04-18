import React, { useState } from 'react';

function EditProfile() {
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
    <>
    <div id="" class="popup show">
      <div class="form-update">
        <div class="font-24 black-color" style={{ textAlign: 'center' }}>Update Profile</div>
          <div class="label-input black-color">
              <label for="name">Name</label>
              <input type="text" name="name" value={newUsername} placeholder="Name" onChange={e => setNewUsername(e.target.value)}/>
          </div>
          <div class="label-input black-color">
            <label for="number">Password</label>
            <input type="password" name="password" placeholder="Password" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
          </div>
          <button className="btn-icon2 font-12" onClick={handleEdit} >Update</button>
          <a className="btn-icon2 btn-icon3 font-12 no-deco" href="/profile">Cancel</a>

          {message && <p className='font-12 red-color text-center'>{message}</p>}
      </div>
    </div>
    </>
  );
}

export default EditProfile;
