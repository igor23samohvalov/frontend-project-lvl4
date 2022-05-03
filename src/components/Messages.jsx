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
    console.log(msgContainer.current.scrollTop  )
    updateOverflow();
  }, [msgContainer]);

  return (
    <div className="overflow-auto px-5" ref={msgContainer}>
      {initMessages
        .filter(({ channelId }) => activeId === channelId)
        .map(({ text, id, author }) => (
          <Message body={text} key={id} author={author} />
        ))}
    </div>
  );
}

export default Messages;
