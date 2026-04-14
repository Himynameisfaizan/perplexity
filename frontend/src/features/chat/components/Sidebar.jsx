import React, { useRef, useEffect } from 'react'
import "../style/style.scss";
import { useSelector, useDispatch } from 'react-redux'
import { setSidebarOpen } from '../chat.ui.slice'
import gsap from 'gsap';

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);
  const itemsRef = useRef([]);
  const dispatch = useDispatch();
  const { sidebarOpen, isMobile } = useSelector(state => state.chatUi);

  useEffect(() => {
    if (sidebarRef.current) {
      // Main sidebar animation
      gsap.to(sidebarRef.current, {
        width: sidebarOpen ? 280 : 80,
        duration: 0.35,
        ease: 'power3.inOut'
      });
    }

    // Text animation when closing/opening
    if (contentRef.current) {
      const textElements = contentRef.current.querySelectorAll('.sidebar-content span, .sidebar-footer p, .sidebar-footer span');

      gsap.to(textElements, {
        opacity: sidebarOpen ? 1 : 0,
        duration: sidebarOpen ? 0.4 : 0.2,
        delay: sidebarOpen ? 0.1 : 0,
        ease: 'power2.out'
      });
    }
  }, [sidebarOpen]);

  useEffect(() => {
    if (sidebarRef.current && !sidebarOpen) {
      const tl = gsap.timeline();

      // Sidebar fade in
      tl.fromTo(
        sidebarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      );

      // New Chat button
      const newChatBtn = contentRef.current?.querySelector('.new-chat-btn');
      if (newChatBtn) {
        tl.fromTo(
          newChatBtn,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out' },
          0.2
        );
      }

      // Nav items staggered
      if (itemsRef.current.length > 0) {
        tl.fromTo(
          itemsRef.current,
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
          0.3
        );
      }
    }
  }, []);

  const navItems = [
    { icon: 'ri-chat-new-line', label: 'New Chat', active: true },
    { icon: 'ri-history-line', label: 'History', active: false },
    { icon: 'ri-star-line', label: 'Favorites', active: false },
    { icon: 'ri-folder-line', label: 'Projects', active: false },
    { icon: 'ri-lightbulb-line', label: 'Explore', active: false },
    { icon: 'ri-database-2-line', label: 'Resources', active: false },
    { icon: 'ri-settings-3-line', label: 'Settings', active: false },
    { icon: 'ri-logout-box-line', label: 'Logout', active: false },
  ];

  return (
    <div className={`sidebar ${!sidebarOpen ? 'closed' : ''}`} ref={sidebarRef}>
      <div className="sidebar-header">
        <img src="/images/logo/logo.png" alt="Logo" title="Chat AI" />
        {sidebarOpen && <i className="ri-menu-unfold-line"></i>}
      </div>

      <div className="sidebar-content" ref={contentRef}>
        <button className="new-chat-btn">
          <i className="ri-add-line"></i>
          <span>New Chat</span>
        </button>

        <div className="sidebar-nav">
          {navItems.map((item, index) => (
            <div
              key={index}
              ref={el => itemsRef.current[index] = el}
              className={`nav-item ${item.active ? 'active' : ''}`}
              title={item.label}
            >
              <i className={item.icon}></i>
              {sidebarOpen && <span>{item.label}</span>}
            </div>
          ))}
        </div>
      </div>

      {sidebarOpen && (
        <div className="sidebar-footer">
          <div className="upgrade-btn">
            <span>✨ Upgrade Pro</span>
            <p>Unlock premium features</p>
          </div>

          <div className="user-profile">
            <img src="/images/logo/logo.png" alt="User" className="user-avatar" />
            <div className="user-info">
              <p className="user-name">You</p>
              <p className="user-status">Free Plan</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
