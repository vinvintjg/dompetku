import React, { useState } from 'react';
import Dompet3D from '../Assets/Dompet3D.png';
import DompetkuLogo from '../Assets/DompetkuLogo.svg';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataToSend = {
      username,
      password,
      wallet: null
    };
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/v1/dompetku/owner/saveOwner', requestOptions);
      if (response.ok) {

        const response2 = await axios.get(`http://localhost:8080/api/v1/dompetku/owner?username=${username}&password=${password}`);
        const userData = response2.data;
        localStorage.setItem('getUsername', userData.username);
        localStorage.setItem('getUserId', userData.id);
        localStorage.setItem('getPassword', userData.password);
        console.log(userData.id)

        // Add new wallet for the registered user
        await axios.post(`http://localhost:8080/api/v1/dompetku/owner/addNewWallet/${userData.id}`);
        const response3= await axios.get(`http://localhost:8080/api/v1/dompetku/owner?username=${username}&password=${password}`);
        const userDataNew = response3.data;
  
        localStorage.setItem('getWalletId', userDataNew.wallet.id);
        window.location.href = '/dashboard';
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      setMessage(`Failed Registration: ${error.message}`);
      console.error('Failed Registration:', error.message);
      // Handle error display or any other necessary action
      alert(error.message); // Show error message to the user
    }
  };
  
  

  return (
    <>
      <div className='container'>
        <img className="dompet3D" src={Dompet3D} alt="error" />
        <form className="auth" onSubmit={handleSubmit}>
          <img className="dompetkuLogo pb12" src={DompetkuLogo} alt="error" height={42} width={213} />
          <div className='font-16-r pb32'>Register New Account</div>
          <div className="label-input black-color pb12">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
          </div>
          <div className="label-input black-color pb24">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <div className='pb12'>
            <button type="submit" className="btn-icon2 font-14 w100">Register</button>
          </div>
          <div className="label-input black-color space-between">
            <div className='font-12 black-color'>Already have an account?</div>
            <a className='font-12 blue-color no-deco' href='/login'>Login</a>
          </div>
          {message && <p className='font-12 red-color text-center'>{message}</p>}
        </form>
      </div>
    </>
  );
}

export default Register;
