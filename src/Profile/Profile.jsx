import React from 'react';
import Profile from '../Assets/profile.jpg';
import Navbar from "../Navbar/Navbar";
function UserProfile() {
  return (
  <>
    <Navbar/>
    <div className="card-profile">
      <div className="profile-image">
        <img src={Profile} alt="Profile" />
        <div className="edit-button">
          <div className="btn-icon4">
            <i className='bx bxs-pencil'></i>
          </div>
        </div>
      </div>
      <div className="form-profile">
        <div className="label-input black-color">
          <label htmlFor="Username">Username</label>
          <input type="text" name="Username" value="Kevin" readOnly />
        </div>
        <div className="label-input black-color">
          <label htmlFor="Email">Email</label>
          <input type="text" name="Email" value="Kevin@gmail.com" readOnly />
        </div>
      </div>
    </div>
  </>
  );
}

export default UserProfile;
