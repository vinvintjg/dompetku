import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import BankLogo from "../Assets/Vector.svg";
import TriDotLogo from "../Assets/3dot.svg";
import ProfileImage from "../Assets/profile.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import './Style.css';
import '../../src/Stylist.css'
// import required modules
import { EffectCards } from 'swiper/modules';
import axios from 'axios';

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

export default function Dashboard() {
  const [originalAmount, setOriginalAmount] = useState('');
  const [originalUnusedBalance, setOriginalUnusedBalance] = useState('');
  const [originalUsedBalance, setOriginalUsedBalance] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupSlotOpen, setIsPopupSlotOpen] = useState(false);

  const [userData, setUserData] = useState(null);

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


  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const openPopupSlot = () => {
    setIsPopupSlotOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setIsPopupSlotOpen(false);
  };

  const updateData = () => {
    console.log("Data updated!");
    closePopup();
  };

  useEffect(() => {
    const amountElement = document.getElementById('amount');
    const unusedBalanceElement = document.getElementById('unusedBalance');
    const usedBalanceElement = document.getElementById('usedBalance');
    const toggleIcon = document.getElementById('toggleIcon');
    

    // Store the original values
    setOriginalAmount(amountElement.textContent);
    setOriginalUnusedBalance(unusedBalanceElement.textContent);
    setOriginalUsedBalance(usedBalanceElement.textContent);

    // Define the event listener function
    function handleToggleClick() {
      const isHidden = amountElement.classList.toggle('hidden');
      if (isHidden) {
        toggleIcon.classList.remove('bx-show');
        toggleIcon.classList.add('bx-hide');
        amountElement.textContent = '***.***.***,';
        unusedBalanceElement.textContent = '***.***.***';
        usedBalanceElement.textContent = '***.***.***';
      } else {
        toggleIcon.classList.remove('bx-hide');
        toggleIcon.classList.add('bx-show');
        amountElement.textContent = originalAmount;
        unusedBalanceElement.textContent = originalUnusedBalance;
        usedBalanceElement.textContent = originalUsedBalance;
      }
    }
    

    // Add event listener
    toggleIcon.addEventListener('click', handleToggleClick);

    // Cleanup function
    return () => {
      toggleIcon.removeEventListener('click', handleToggleClick);
    };
  }, [originalAmount, originalUnusedBalance, originalUsedBalance]);



  return (
    <>  
    {/* POP UP BALANCE */}
    {isPopupOpen && (
        <div className="popup show">
          <div className="form-update">
            <div className="font-24 black-color" style={{ textAlign: 'center' }}>Update Balance</div>
            <div className="label-input black-color">
              <label htmlFor="Method">Method</label>
              <select name="Method" id="">
                  <option value="-1">Select...</option>
                  <option value="1">Deposit</option>
                  <option value="2">Decrease</option>
              </select>
            </div>
            <div className="label-input black-color">
              <label for="Nominal">Nominal</label>
              <input type="number" name="Nominal" placeholder="Nominal"/>
            </div>
            <button className="btn-icon2 font-12" onClick={updateData}>Update Data</button>
            <button className="btn-icon2 btn-icon3 font-12" onClick={closePopup}>Cancel</button>
          </div>
        </div>
      )}
    {/* POP UP SLOT */}
    {isPopupSlotOpen && (
    <div id="" class="popup show">
      <div class="form-update">
        <div class="font-24 black-color" style={{ textAlign: 'center' }}>New Slots</div>
          <div class="label-input black-color">
              <label for="Method">Method</label>
              <select name="Method" id="">
                  <option value="-1">Select...</option>
                  <option value="1">Deposit</option>
                  <option value="2">Decrease</option>
              </select>
          </div>
          <div class="label-input black-color">
            <label for="Name">Name</label>
            <input type="text" name="Name" placeholder="Name"/>
          </div>
          <div class="label-input black-color">
              <label for="Nominal">Nominal</label>
              <input type="number" name="Nominal" placeholder="Nominal"/>
          </div>
          <div class="label-input black-color">
            <label for="Deskripsi">Deskripsi</label>
            <input type="text" name="Deskripsi" placeholder="Deskripsi"/>
          </div>
          <button className="btn-icon2 font-12" onClick={updateData}>Update Data</button>
            <button className="btn-icon2 btn-icon3 font-12" onClick={closePopup}>Cancel</button>
      </div>
    </div>
    )}
    <Navbar/>
    
    <div className="content-all">
      <div className="content-left">
        {/* Section Blance */}
        <div className="card-balance">
          <div className="space-between-center">
            <div className="font-24 black-color">Your Balance</div>
            <button className="btn-icon" onClick={openPopup}>
              <div className="font-12">Edit</div>
              <i className='bx bxs-pencil'></i>
            </button>
          </div>
          <div className="space-between-center">
            <div className="font-32 black-color">Rp</div>
            <div className="wrapper">
              <div id="amount" className="font-32 black-color">
              {userData && (
                <>
                  {(userData.wallet.unUsedBalance + userData.wallet.usedBalance).toLocaleString('id-ID')},00
                </>
              )}
            </div>
              <div className="font-20 black-color"></div>
              <i id="toggleIcon" className='bx bx-show icon-24 black-color pl30'></i>
            </div>
          </div>
        </div>
        {/* Section Deposit Decrease */}
        <div className="card-depo-decr">
          <div className="card-deposit">
            <div className="font-16 black-color">
              Unsued Balance
            </div>
            <div id="unusedBalance" className="font-16 black-color">
            {userData && (
              <>
                Rp {userData.wallet.unUsedBalance.toLocaleString('id-ID')},00
              </>
            )}
            </div>
            <div className="wrapper gap-4">
              <i id="unusedIcon" className='bx bx-right-top-arrow-circle blue-color'></i>
              <div className="font-12 black-color">
                15,2%
              </div>
            </div>
          </div>
          <div className="card-deposit border-red">
            <div className="font-16 black-color">
              Used Balance
            </div>
            <div id="usedBalance" className="font-16 black-color">
            {userData && (
              <>
                Rp {userData.wallet.usedBalance.toLocaleString('id-ID')},00
              </>
            )}
            </div>
            <div className="wrapper gap-4">
              <i id="usedIcon" className='bx bx-right-down-arrow-circle red-color' ></i>
              <div className="font-12 black-color">
                15,2%
              </div>
            </div>
          </div>
        </div>
        {/* Section Wallet */}
        <div className="card-wallet">
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
          <div className="card-content">
            <Swiper effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper">
                {/* Here Card */}
                {userData && userData.wallet.slots.map(slot => (
                <SwiperSlide key={slot.id} height={10}>
                  <div className="card-font">
                    <div className="space-between-top">
                      <div className="space-between-top gap-12">
                        <img src={BankLogo} alt="Bank Logo" className="img-16" />
                        <div className="font-14 white-to-white-color">Slot {slot.id}</div>
                      </div>
                      <div className="dropdown">
                        <img src={TriDotLogo} className="img-16" alt="Tri Dot Logo" />
                        <div className="dropdown-content">
                          <a href="/" className="font-12">Delete</a>
                        </div>
                      </div>
                    </div>
                    <div className="space-balance">
                      <div className="font-12 white-to-white-color">Balance</div>
                      <div className="font-16 white-to-white-color">Rp {slot.balance.toLocaleString()},00</div>
                    </div>
                    <div className="font-14 white-to-white-color">{slot.name}</div>
                  </div>
                </SwiperSlide>
              ))}

            </Swiper>

          </div>
          </div>
        </div>
        <div className="content-right">
          <div className="card-statistic">
            <div className="space-between-center">
              <div className="font-24 black-color">Statistics</div>
              <button className="btn-icon">
                <div className="font-12">Week</div>
                <i className='bx bx-chevron-down font-16'></i>
              </button>
            </div>
            <div className="cart-all">
              <div className="cart-graph">
                <canvas id="myChart" width="30" height="12"></canvas>
              </div>
              {/* <div className="cart-circle">
                <canvas id="myPieChart"  width="30" height="17"></canvas>
              </div> */}
            </div>
          </div>
          <div className="card-activity">
            <div className="font-24 black-color history-top">Recent Activity</div>
            <div className="history">
            <div className="tab">
              <button className="tablinks active" onClick={(evt) => openCity(evt, 'All')}>All</button>
              <button className="tablinks" onClick={(evt) => openCity(evt, 'Deposit')}>Deposit</button>
              <button className="tablinks" onClick={(evt) => openCity(evt, 'Decrease')}>Decrease</button>
            </div>

              <div id="All" className="tabcontent"  style={{ display:"block" }} >
                <table className="w100">
                  <tbody className="w100">

                  {userData && userData.wallet.slots.map(slot => (
                  <React.Fragment key={slot.id}>
                    {slot.histories.map(history => (
                      <tr className="w100" key={history.id}>
                        <td className="w10">
                          <img className="img-50 radius-12" src={ProfileImage} alt="" />
                        </td>
                        <td className="w20">
                          <div className="activity-name">
                            <div className="font-16 black-color">{slot.name}</div>
                            <div className="font-12 black-color-50">{formatDate(history.date)}</div>
                          </div>
                        </td>
                        <td className="w25">
                          <div className="font-12 black-color-50">{history.description}</div>
                        </td>
                        <td className="w25 pl6">
                          <div className="font-14 black-color">
                            {history.type === 'DECREASE' ? '-' : '+'} Rp {history.amount},00
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))} 
                  </tbody>
                </table>
              </div>
              
              <div id="Deposit" className="tabcontent">
                <table>
                  <tbody>
                  {userData && userData.wallet.slots.map(slot => (
                  <React.Fragment key={slot.id}>
                    {slot.histories.map(history => (
                      history.type !== 'DECREASE' && (
                        <tr className="w100" key={history.id}>
                          <td className="w10">
                            <img className="img-50 radius-12" src={ProfileImage} alt="" />
                          </td>
                          <td className="w20">
                            <div className="activity-name">
                              <div className="font-16 black-color">{slot.name}</div>
                              <div className="font-12 black-color-50">{formatDate(history.date)}</div>
                            </div>
                          </td>
                          <td className="w25">
                            <div className="font-12 black-color-50">{history.description}</div>
                          </td>
                          <td className="w25 pl6">
                            <div className="font-14 black-color">
                              + Rp {history.amount.toLocaleString()},00
                            </div>
                          </td>
                        </tr>
                      )
                    ))}
                      </React.Fragment>
                    ))}
                    
                  </tbody>
                </table>
              </div>
              
              <div id="Decrease" className="tabcontent">
                <table>
                  <tbody>
                  {userData && userData.wallet.slots.map(slot => (
                  <React.Fragment key={slot.id}>
                    {slot.histories.map(history => (
                      history.type === 'DECREASE' && (
                        <tr className="w100" key={history.id}>
                          <td className="w10">
                            <img className="img-50 radius-12" src={ProfileImage} alt="" />
                          </td>
                          <td className="w20">
                            <div className="activity-name">
                              <div className="font-16 black-color">{slot.name}</div>
                              <div className="font-12 black-color-50">{formatDate(history.date)}</div>
                            </div>
                          </td>
                          <td className="w25">
                            <div className="font-12 black-color-50">{history.description}</div>
                          </td>
                          <td className="w25 pl6">
                            <div className="font-14 black-color">
                              - Rp {history.amount.toLocaleString()},00
                            </div>
                          </td>
                        </tr>
                      )
                    ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.min.js"></script>
    <script src="script.js"></script>
    <script></script>
    </>  
);
}



