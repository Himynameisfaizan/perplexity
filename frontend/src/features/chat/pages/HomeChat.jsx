import React from 'react';
import "../style/style.scss";
import HeaderChat from '../components/HeaderChat';
import Sidebar from '../components/Sidebar';

const HomeChat = () => {
  return (
    <>
   
    <div className='home-section'>
        <div>
            <HeaderChat/>
            {/* <Sidebar /> */}
        </div>
        {/* <h2>Hello </h2>
        <h2>Everyone!</h2> */}
    </div>
    </>
  )
}

export default HomeChat