import React, { useState, useEffect } from 'react';
import 'boxicons/css/boxicons.min.css';
import '../../src/Stylist.css'
import Nopage from "../Assets/NoPage.svg";
function NoPage() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

    useEffect(() => {
      const body = document.querySelector("body");
      if (darkMode) {
          body.classList.add("dark");
      } else {
          body.classList.remove("dark");
      }
      localStorage.setItem('darkMode', darkMode); // Update local storage with dark mode status
      }, [darkMode]);

    return (
        <>
            <div className='card-no-page'>
                <img src={Nopage} alt="404" style={{ width: "50%" }} />
                <p className="font-20 black-color">Oops, we can’t find the page you’r looking for!</p>
                <a href="/dashboard" className="btn-icon2 font-12 no-deco">Back To Dashboard</a>
            </div>
        </>
    );
}

export default NoPage;
