import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import './Style.css';
import CardProfile from '../Profile/Profile';

function Navbar() {
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
            sidebar.classList.add("close", "hoverable");
            const adminArea = document.querySelector('.content-all');
            adminArea.style.margin = '95px 50px 50px 80px';
        };

        const handleSidebarExpand = () => {
            sidebar.classList.remove("close", "hoverable");
            const adminArea = document.querySelector('.content-all');
            adminArea.style.margin = '95px 50px 50px 260px';
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

        const handleSubmenuItemToggle = (item, index) => {
            item.addEventListener("click", () => {
                item.classList.toggle("show_submenu");
                submenuItems.forEach((item2, index2) => {
                    if (index !== index2) {
                        item2.classList.remove("show_submenu");
                    }
                });
            });
        };

        sidebarOpen.addEventListener("click", handleSidebarOpen);
        sidebarClose.addEventListener("click", handleSidebarClose);
        sidebarExpand.addEventListener("click", handleSidebarExpand);
        sidebar.addEventListener("mouseenter", handleMouseEnter);
        sidebar.addEventListener("mouseleave", handleMouseLeave);
        darkLight.addEventListener("click", handleDarkLightClick);
        submenuItems.forEach((item, index) => handleSubmenuItemToggle(item, index));

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
                item.removeEventListener("click", () => handleSubmenuItemToggle(item, index));
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
                    <img src="asset/profile.jpg" alt="" className="profile" />
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
                            <a href="/wallets" className="nav_link">
                                <span className="navlink_icon">
                                    <i className="bx bx-wallet"></i>
                                </span>
                                <span className="navlink">Wallets</span>
                            </a>
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
