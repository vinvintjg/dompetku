import React, { useState, useEffect } from 'react';
import Profile from '../Assets/profile.jpg';
import Navbar from "../Navbar/Navbar";
import EditProfile from '../Profile/EditProfile';
import '../../src/Stylist.css'
import axios from 'axios';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const openPopup = () => {
    setIsPopupOpen(true);
  };

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/dompetku/owner?username=Vincent');
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);
  return (
  <>
  {/* POP UP SLOT */}
  {isPopupOpen && (
      <EditProfile />
    )}
    <Navbar/>
    <div className="content-all">
    <div className="card-profile">
      <div className="profile-image">
        <img src={Profile} alt="Profile" />
        <div className="edit-button">
          <div className="btn-icon4">
            <i className='bx bxs-pencil' onClick={openPopup}></i>
          </div>
        </div>
      </div>
      {userData && (
      <div className="form-profile">
        <div className="label-input black-color">
          <label htmlFor="Username">Username</label>
          <input type="text" name="Username" value={userData.username} readOnly />
        </div>
        <div className="label-input black-color">
          <label htmlFor="Email">Email</label>
          <input type="text" name="Email" value="{userData.username}" readOnly />
        </div>
      </div>
      )}
    </div>
    </div>
  </>
  );
}

export default UserProfile;
