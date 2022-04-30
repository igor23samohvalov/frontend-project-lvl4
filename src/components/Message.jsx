import React from 'react';
import { ListGroup } from 'react-bootstrap';

function Message({ body, author }) {
  return (
    <ListGroup.Item><b>{author}</b>: {body}</ListGroup.Item>
  );
}

export default Message;
