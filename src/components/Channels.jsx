import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectors as channelSelectors } from '../slices/channelsSlice.js';
import Channel from './Channel.jsx';

function Channels({ socket }) {
  const initChannels = useSelector(channelSelectors.selectAll);

  useEffect(() => {
    if (document.querySelector('.dropdown-toggle')) {
      const splitManagment = document.querySelector('.dropdown-toggle');
      splitManagment.ariaLabel = 'Управление каналом';
    }
    if (document.querySelector('.dropdown .btn')) {
      const namedButton = document.querySelector('.dropdown .btn');
      namedButton.ariaLabel = namedButton.nextSibling.id;
    }
  });

  return (
    <ListGroup as="ul" variant="flush" className="px-2">
      {initChannels.map(({ name, id, removable }) => (
        <Channel
          name={name}
          key={id}
          channelId={id}
          isRemovable={removable}
          socket={socket}
        />
      ))}
    </ListGroup>
  );
}

export default Channels;
