import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectors as messageSelectors } from '../slices/messagesSlice.js';
import Message from './Message.jsx';

function Messages({ activeId }) {
  const initMessages = useSelector(messageSelectors.selectAll);

  return (
    <ListGroup variant="flush" className="overflow-auto">
      {initMessages
        .filter(({ channelId }) => activeId === channelId)
        .map(({ text, id, author }) => (
          <Message body={text} key={id} author={author} />
        ))}
    </ListGroup>
  );
}

export default Messages;
