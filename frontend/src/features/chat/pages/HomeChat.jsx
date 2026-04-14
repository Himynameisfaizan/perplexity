import React, { useEffect, useRef } from 'react';
import "../style/style.scss";
import HeaderChat from '../components/HeaderChat';
import ChatArea from '../components/ChatArea';
import { useSelector, useDispatch } from 'react-redux';
import { useChat } from '../hooks/useChat';
import { setIsMobile, setSidebarOpen } from '../chat.ui.slice';
import gsap from 'gsap';

const HomeChat = () => {
  const chat = useChat();
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector(state => state.chatUi);
  const containerRef = useRef(null);

  useEffect(() => {
    chat.intializeSocketConnectio();
  }, []);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      dispatch(setIsMobile(isMobile));

      // Auto-collapse sidebar on mobile
      if (isMobile && sidebarOpen) {
        dispatch(setSidebarOpen(false));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, sidebarOpen]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className='home-section'>
      <div className={`chat-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <HeaderChat />
        <ChatArea />
      </div>
    </div>
  );
};

export default HomeChat;
