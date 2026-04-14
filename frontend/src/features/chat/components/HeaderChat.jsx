import React, { useEffect, useRef } from 'react'
import "../style/style.scss"
import Sidebar from './Sidebar'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar } from '../chat.ui.slice'
import gsap from 'gsap';

const HeaderChat = () => {
  const headerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector(state => state.chatUi);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  const handleHamburgerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleSidebar());

    // Animate hamburger icon
    if (hamburgerRef.current) {
      gsap.to(hamburgerRef.current, {
        rotation: sidebarOpen ? 90 : 0,
        duration: 0.35,
        ease: 'power2.inOut'
      });
    }
  };

  return (
    <>
      <div className='header-sidebar'>
        <Sidebar />
      </div>
      <header ref={headerRef}>
        <div className='header-left'>
          <button
            className='hamburger-btn'
            onClick={handleHamburgerClick}
            ref={hamburgerRef}
            title="Toggle sidebar"
            type="button"
          >
            <i className="ri-menu-line"></i>
          </button>
        </div>
        <div className='header-option'>
          <div className="model">
            <span>Model 4.0</span>
            <i className="ri-arrow-down-s-line"></i>
          </div>
          <div className="option">
            <i className="ri-more-2-line"></i>
          </div>
        </div>
      </header>
    </>
  )
}

export default HeaderChat
