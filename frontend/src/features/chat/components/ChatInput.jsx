import React, { useRef, useEffect } from 'react';
import "../style/style.scss"
import gsap from 'gsap';

const ChatInput = ({ onMessageSent }) => {
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.5 }
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = inputRef.current.value;
    if (message.trim()) {
      onMessageSent();

      // Animate input
      gsap.to(inputRef.current, {
        scale: 1.02,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: 'back.out'
      });

      inputRef.current.value = '';
    }
  };

  const handleInputFocus = () => {
    gsap.to(containerRef.current, {
      boxShadow: '0 0 40px rgba(0, 212, 255, 0.25)',
      duration: 0.35,
      ease: 'power2.out'
    });
  };

  const handleInputBlur = () => {
    gsap.to(containerRef.current, {
      boxShadow: '0 0 0px rgba(0, 212, 255, 0)',
      duration: 0.35,
      ease: 'power2.out'
    });
  };

  return (
    <form className='chat-input-form' ref={containerRef} onSubmit={handleSubmit}>
      <i className="ri-attachment-line"></i>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message AI chat..."
        className='chat-input'
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <div className='input-actions'>
        <i className="ri-search-line"></i>
        <button type="submit" className='send-btn'>
          <i className="ri-send-plane-fill"></i>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
