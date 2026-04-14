import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import "../style/style.scss"

const ChatPrompts = () => {
  const promptsRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (itemsRef.current.length > 0) {
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out', delay: 0.3 }
      );
    }
  }, []);

  const prompts = [
    { icon: 'ri-search-line', label: 'Search', title: 'Search Web' },
    { icon: 'ri-image-add-line', label: 'Create Image', title: 'Generate Images' },
    { icon: 'ri-code-block-line', label: 'Coding', title: 'Code Assistant' },
    { icon: 'ri-file-text-line', label: 'Essay writer', title: 'Write Essay' },
    { icon: 'ri-briefcase-line', label: 'Business', title: 'Business Ideas' },
    { icon: 'ri-earth-line', label: 'Translator', title: 'Translate Text' },
    { icon: 'ri-play-circle-line', label: 'YouTube', title: 'YouTube Summary' },
    { icon: 'ri-mail-line', label: 'Email', title: 'Email Writing' },
    { icon: 'ri-robot-3-line', label: 'AI Chat', title: 'Chat with AI' },
    { icon: 'ri-lightbulb-flash-line', label: 'Research', title: 'Research Assistant' },
  ];

  const handlePromptClick = (prompt) => {
    // Handle prompt click here
    console.log('Prompt clicked:', prompt.label);
  };

  return (
    <div className='chat-prompts' ref={promptsRef}>
      {prompts.map((prompt, index) => (
        <button
          key={index}
          ref={el => itemsRef.current[index] = el}
          className='prompt-btn'
          onClick={() => handlePromptClick(prompt)}
          title={prompt.title}
        >
          <i className={prompt.icon}></i>
          <span>{prompt.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ChatPrompts;
