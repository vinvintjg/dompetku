import React, { useState } from 'react';
import Dompet3D from '../Assets/Dompet3D.png';
import DompetkuLogo from '../Assets/DompetkuLogo.svg';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    

  return (
    <>
      <div className='container'>
        <img className="dompet3D" src={Dompet3D} alt="error" />
        <form className="auth" onSubmit={''}>
          <img className="dompetkuLogo pb12" src={DompetkuLogo} alt="error" height={42} width={213} />
          <div className='font-16-r pb32'>Login To Your Account</div>
          <div className="label-input black-color pb12">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="label-input black-color pb24">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='pb12'>
            <button type="submit" className="btn-icon2 font-14 w100">Login</button>
          </div>
          <div className="label-input black-color space-between">
            <div className='font-12 black-color'>Don't have an account?</div>
            <a className='font-12 blue-color no-deco' href='/register'>Register</a>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
