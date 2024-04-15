import React from 'react';
import 'boxicons/css/boxicons.min.css';
import '../../src/Stylist.css'
import Nopage from "../Assets/NoPage.svg";
function NoPage() {
    

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
