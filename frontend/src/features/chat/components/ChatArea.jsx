import React, { useRef, useEffect, useState } from 'react';
import ChatInput from './ChatInput';
import ChatPrompts from './ChatPrompts';
import "../style/style.scss"
import { useSelector } from 'react-redux'
import gsap from 'gsap';

const ChatArea = () => {
  const chatAreaRef = useRef(null);
  const contentRef = useRef(null);
  const welcomeRef = useRef(null);
  const { sidebarOpen } = useSelector(state => state.chatUi);
  const [hasMessages, setHasMessages] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    // Welcome message animation
    tl.fromTo(
      welcomeRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      0.2
    );

    // Content fade in
    tl.fromTo(
      contentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      0
    );
  }, []);

  return (
    <div className={`chat-area ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`} ref={chatAreaRef}>
      <div className='chat-content' ref={contentRef}>
        {!hasMessages && (
          <>
            <div className='chat-welcome' ref={welcomeRef}>
              <h1>What's on your mind today?</h1>
              <p>Ask anything or use our smart prompts to get started</p>
            </div>
            <ChatPrompts />
          </>
        )}

        <div className='chat-messages'>
          {/* Messages will be rendered here */}
        </div>
      </div>

      <ChatInput onMessageSent={() => setHasMessages(true)} />
    </div>
  );
};

export default ChatArea;
