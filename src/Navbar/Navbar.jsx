import React, { useState, useEffect } from 'react';
import 'boxicons/css/boxicons.min.css';
import './Style.css';
import '../../src/Stylist.css'
import ProfileImage from "../Assets/profile.jpg";
import axios from 'axios';

function Navbar() {
    const getUsername = localStorage.getItem('getUsername');
    const [userData, setUserData] = useState(null);
    const getPassword = localStorage.getItem('getPassword');
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/dompetku/owner?username=${getUsername}&password=${getPassword}`);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);
    
    useEffect(() => {
        const body = document.querySelector("body");
        const darkLight = document.querySelector("#darkLight");
        const sidebar = document.querySelector(".sidebar");
        const submenuItems = document.querySelectorAll(".submenu_item");
        const sidebarOpen = document.querySelector("#sidebarOpen");
        const sidebarClose = document.querySelector(".collapse_sidebar");
        const sidebarExpand = document.querySelector(".expand_sidebar");

        const handleSidebarOpen = () => sidebar.classList.toggle("close");

        const handleSidebarClose = () => {
            const sidebar = document.querySelector('.sidebar'); // Select the sidebar element
            if (sidebar) {
              sidebar.classList.add("close", "hoverable");
              const adminArea = document.querySelector('.content-all');
              if (adminArea) {
                adminArea.style.margin = '95px 50px 50px 80px';
              }
            }
          };
          
          const handleSidebarExpand = () => {
            const sidebar = document.querySelector('.sidebar'); // Select the sidebar element
            if (sidebar) {
              sidebar.classList.remove("close", "hoverable");
              const adminArea = document.querySelector('.content-all');
              if (adminArea) {
                adminArea.style.margin = '95px 50px 50px 260px';
              }
            }
          };

        const handleMouseEnter = () => {
            if (sidebar.classList.contains("hoverable")) {
                sidebar.classList.remove("close");
            }
        };

        const handleMouseLeave = () => {
            if (sidebar.classList.contains("hoverable")) {
                sidebar.classList.add("close");
            }
        };

        const handleDarkLightClick = () => {
            body.classList.toggle("dark");
            if (body.classList.contains("dark")) {
                darkLight.classList.replace("bx-sun", "bx-moon");
            } else {
                darkLight.classList.replace("bx-moon", "bx-sun");
            }
        };

        sidebarOpen.addEventListener("click", handleSidebarOpen);
        sidebarClose.addEventListener("click", handleSidebarClose);
        sidebarExpand.addEventListener("click", handleSidebarExpand);
        sidebar.addEventListener("mouseenter", handleMouseEnter);
        sidebar.addEventListener("mouseleave", handleMouseLeave);
        darkLight.addEventListener("click", handleDarkLightClick);

        if (window.innerWidth < 768) {
            sidebar.classList.add("close");
        } else {
            sidebar.classList.remove("close");
        }

        

        return () => {
            sidebarOpen.removeEventListener("click", handleSidebarOpen);
            sidebarClose.removeEventListener("click", handleSidebarClose);
            sidebarExpand.removeEventListener("click", handleSidebarExpand);
            sidebar.removeEventListener("mouseenter", handleMouseEnter);
            sidebar.removeEventListener("mouseleave", handleMouseLeave);
            darkLight.removeEventListener("click", handleDarkLightClick);
            submenuItems.forEach((item, index) => {
                item.addEventListener("click", () => {
                  item.classList.toggle("show_submenu");
                  submenuItems.forEach((item2, index2) => {
                    if (index !== index2) {
                      item2.classList.remove("show_submenu");
                    }
                  });
                });
              });
              
        };
    }, []);

    return (
        <div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
            <nav className="navbar">
                <div className="logo_item">
                    <i className="bx bx-menu" id="sidebarOpen"></i>
                    <i className='bx bx-wallet'></i>Dompetku
                </div>

                <div className="navbar_content">
                    <i className="bi bi-grid"></i>
                    <i className='bx bx-sun' id="darkLight"></i>
                    <i className='bx bx-bell' ></i>
                    <div className='space-between'>
                        <img src={ProfileImage} alt="" className="profile" />
                    </div>
                </div>
            </nav>

            

            {/* sidebar */}
            <nav className="sidebar">
                <div className="menu_content">

                    <ul className="menu_items">
                        <div className="menu_title menu_editor"></div>
                        <li className="item">
                            <a href="/dashboard" className="nav_link">
                                <span className="navlink_icon">
                                    <i className='bx bx-home-alt' ></i>
                                </span>
                                <span className="navlink">Dashboard</span>
                            </a>
                        </li>
                        <li className="item">
                            <div href="/" className="nav_link submenu_item">
                            <span className="navlink_icon">
                                <i className="bx bx-wallet"></i>
                            </span>
                            <span className="navlink">Slots</span>
                            <i className="bx bx-chevron-right arrow-left"></i>
                            </div>
                            <ul className="menu_items submenu">
                            {userData && userData.wallet.slots.map(slot => (
                            <React.Fragment key={slot.id}>
                                <a href={`/slot/${slot.id}`} className="nav_link sublink">Slot {slot.name}</a>
                            </React.Fragment>
                            ))}

                            </ul>
                        </li>
                        <li className="item">
                            <a href="/profile" className="nav_link">
                                <span className="navlink_icon">
                                    <i className='bx bx-user'></i>
                                </span>
                                <span className="navlink">Profile</span>
                            </a>
                        </li>
                    </ul>

                    {/* Sidebar Open / Close */}
                    <div className="bottom_content">
                        <div className="bottom expand_sidebar">
                            <span> Expand</span>
                            <i className='bx bx-log-in' ></i>
                        </div>
                        <div className="bottom collapse_sidebar">
                            <span> Collapse</span>
                            <i className='bx bx-log-out'></i>
                        </div>
                    </div>
                </div>
            </nav>

            
        </div>
    );
}

export default Navbar;
