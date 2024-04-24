import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../Navbar/Navbar";
import BankLogo from "../Assets/Vector.svg";
import TriDotLogo from "../Assets/3dot.svg";
import ProfileImage from "../Assets/profile.jpg";
import DeleteSlot from "../Dashboard/DeleteSlot"
import AddHistory from './AddHistory';
import AddSlot from '../Dashboard/AddSlot';
// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './Style.css';
import '../../src/Stylist.css'
// import required modules
// import { EffectCards } from 'swiper/modules';

function formatDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'UTC' // Tambahkan opsi timeZone di sini
  };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export default function Wallets() {
  const [isPopupSlotOpen, setIsPopupSlotOpen] = useState(false);

  const openPopupSlot = () => {
    setIsPopupSlotOpen(true);
  };

  const closePopup = () => {
    setIsPopupSlotOpen(false);
  };

  const updateData = () => {
    console.log("Data updated!");
    closePopup();
  };
  const openCity = (evt, cityName) => {
    const tabcontents = document.querySelectorAll(".tabcontent");
    tabcontents.forEach(tabcontent => {
      tabcontent.style.display = "none";
    });

    const tablinks = document.querySelectorAll(".tablinks");
    tablinks.forEach(tablink => {
      tablink.classList.remove("active");
    });

    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.classList.add("active");
  };

  const { id } = useParams();

  // Atur nilai id ke currentId menggunakan useState
  const [currentId, setCurrentId] = useState(id);

  const handleNavClick = (id) => {
    setCurrentId(id);
  };

  const [userData, setUserData] = useState(null);

  const [slotData, setSlotData] = useState(null);
  const getUsername = localStorage.getItem('getUsername');
  const getPassword = localStorage.getItem('getPassword');
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/dompetku/owner?username=${getUsername}&password=${getPassword}`);
      const requestedSlot = response.data.wallet.slots.find(slot => slot.id === parseInt(id));
      setSlotData(requestedSlot);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDeleteSlot = (slotId) => {
    setUserData(prevUserData => ({
        ...prevUserData,
        wallet: {
            ...prevUserData.wallet,
            slots: prevUserData.wallet.slots.filter(slot => slotData.id !== slotId)
        }
    }));
};

  return (
    <>
    {/* POP UP SLOT */}
    {isPopupSlotOpen && (
      <AddSlot />
    )}
      <Navbar/>
        <div className="content-all">
        <div className="content-left h100" >
        {/* Section Wallet */}
        <div className="card-wallet h100">
          <div className="space-between-top">
            <div className="space-between-top gap-4">
              <div className="font-24 black-color">Your Slots</div>
              <div className="font-12 black-color">(3)</div>
            </div>
            <button className="btn-icon" onClick={openPopupSlot}>
              <div className="font-12">Add New</div>
              <i className='bx bx-plus' ></i>
            </button>
            
          </div>
          <div className="card-content" sx={{ maxHeight: '200px' }}>
            <div className="swiper mySwiper">
              <div className="swiper-wrapper">
                {/* Here Card */}
                {slotData && (
                <div className="swiper-slide">
                <div className="card-font">
                    <div className="space-between-top">
                      <div className="space-between-top gap-12">
                        <img src={BankLogo} alt="Bank Logo" className="img-16" />
                        <div className="font-14 white-to-white-color">Slot {slotData.name}</div>
                      </div>
                      <div className="dropdown">
                        <img src={TriDotLogo} className="img-16" alt="Tri Dot Logo" />
                        <div className="dropdown-content">
                          <DeleteSlot slotId={slotData.id} onDelete={handleDeleteSlot} />
                        </div>
                      </div>
                    </div>
                    <div className="space-balance">
                      <div className="font-12 white-to-white-color">Balance</div>
                      <div className="font-16 white-to-white-color">Rp {slotData.balance.toLocaleString()}.00</div>
                    </div>
                    <div className="font-14 white-to-white-color"></div>
                  </div>
                </div>
                )}
              </div>
            </div>

          </div>
          
        {/* Section FORM UPADTE */}
        {slotData && (
        <AddHistory slotId={slotData.id}  onUpdate={fetchData} />
        )}
        </div>

          
        </div>

        <div className="content-right">

          <div className="card-activity h100">
            <div className="font-24 black-color history-top hauto">Recent Activity</div>
            <div className="history h100" >
            <div className="tab">
              <button className="tablinks active" onClick={(evt) => openCity(evt, 'All')}>All</button>
              <button className="tablinks" onClick={(evt) => openCity(evt, 'Deposit')}>Deposit</button>
              <button className="tablinks" onClick={(evt) => openCity(evt, 'Decrease')}>Decrease</button>
            </div>
              
              <div id="All" className="tabcontent h100" style={{ display: 'block', height: '85%' }}>
                <table className="w100">
                  <tbody className="w100">
                  {slotData ? (
                    <>
                  {slotData && slotData.histories.map(history => (
                    <tr className="w100" key={history.id}>
                    <td className="w10">
                      <img className="img-50 radius-12" src={ProfileImage} alt="" />
                    </td>
                    <td className="w20">
                      <div className="activity-name">
                        <div className="font-16 black-color">{slotData.name}</div>
                        <div className="font-12 black-color-50">{formatDate(history.date)}</div>
                      </div>
                    </td>
                    <td className="w25">
                      <div className="font-12 black-color-50">{history.description}</div>
                    </td>
                    <td className="w25 pl6">
                      <div className="font-14 black-color">
                      {history.type === 'DECREASE' ? '-' : '+'} Rp {history.amount.toLocaleString()}.00
                      </div>
                    </td>
                  </tr>
                  ))}
                    </>
                  ) : (
                    <p>Not Found...</p>
                  )}


                  </tbody>
                </table>
              </div>
              
              <div id="Deposit" className="tabcontent h100" >
                <table className="w100">
                  <tbody className="w100">
                  {slotData ? (
                  <>
                  {slotData && slotData.histories.map(history => (
                    history.type !== 'DECREASE' && (
                    <tr className="w100" key={history.id}>
                    <td className="w10">
                      <img className="img-50 radius-12" src={ProfileImage} alt="" />
                    </td>
                    <td className="w20">
                      <div className="activity-name">
                        <div className="font-16 black-color">{slotData.name}</div>
                        <div className="font-12 black-color-50">{formatDate(history.date)}</div>
                      </div>
                    </td>
                    <td className="w25">
                      <div className="font-12 black-color-50">{history.description}</div>
                    </td>
                    <td className="w25 pl6">
                      <div className="font-14 black-color">
                        + Rp {history.amount.toLocaleString()}.00
                      </div>
                    </td>
                  </tr>
                    )
                  ))}
                  </>
                  ) : (
                    <p>Data Not Found...</p>
                  )}
                  </tbody>
                </table>
              </div>
              
              <div id="Decrease" className="tabcontent h100">
                <table>
                  <tbody>
                  {slotData ? (
                  <>
                  {slotData && slotData.histories.map(history => (
                    history.type === 'DECREASE' && (
                    <tr className="w100" key={history.id}>
                    <td className="w10">
                      <img className="img-50 radius-12" src={ProfileImage} alt="" />
                    </td>
                    <td className="w20">
                      <div className="activity-name">
                        <div className="font-16 black-color">{slotData.name}</div>
                        <div className="font-12 black-color-50">{formatDate(history.date)}</div>
                      </div>
                    </td>
                    <td className="w25">
                      <div className="font-12 black-color-50">{history.description}</div>
                    </td>
                    <td className="w25 pl6">
                      <div className="font-14 black-color">
                        - Rp {history.amount.toLocaleString()}.00
                      </div>
                    </td>
                  </tr>
                    )
                  ))}
                  </>
                  ) : (
                    <p>Data Not Found...</p>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
