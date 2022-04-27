import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectors as channelSelectors } from '../slices/channelsSlice.js';
import Channel from './Channel.jsx';

function Channels() {
  const initChannels = useSelector(channelSelectors.selectAll);
  console.log(initChannels)
  return (
    <ListGroup as="ul">
      {initChannels.map(({name, id}) => <Channel name={name} key={id} />)}
    </ListGroup>
  )
}

export default Channels;
