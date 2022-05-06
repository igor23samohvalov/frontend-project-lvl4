import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectors as messageSelectors } from '../slices/messagesSlice.js';
import Message from './Message.jsx';

function Messages({ activeId }) {
  const initMessages = useSelector(messageSelectors.selectAll);
  const msgContainer = useRef(null);

  const updateOverflow = () => {
    msgContainer.current.scrollTop += msgContainer.current.scrollHeight;
  };
  useEffect(() => {
    updateOverflow();
  });

  return (
    <div className="overflow-auto px-5" ref={msgContainer}>
      {initMessages
        .filter(({ channelId }) => activeId === channelId)
        .map(({ text, id, username }) => (
          <Message body={text} key={id} username={username} />
        ))}
    </div>
  );
}

export default Messages;
