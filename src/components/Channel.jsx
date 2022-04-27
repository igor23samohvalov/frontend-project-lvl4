import React from 'react';
import { ListGroup } from 'react-bootstrap';

function Channel({ name }) {
  return (
    <ListGroup.Item as="li">
      {`# ${name}`}
    </ListGroup.Item>
  );
}

export default Channel;
