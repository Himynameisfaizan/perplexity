import React from 'react';
import "../style/style.scss";
import HeaderChat from '../components/HeaderChat';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import { useChat } from '../hooks/useChat';
import { useEffect } from 'react';

const HomeChat = () => {

  const chat = useChat()

  const { user } = useSelector(state => state.auth)
  console.log(user.username)

  useEffect(()=>{
    chat.intializeSocketConnectio()
  }, [])
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