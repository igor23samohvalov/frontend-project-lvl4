import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectors as channelSelectors } from '../slices/channelsSlice.js';
import { selectors as messageSelectors } from '../slices/messagesSlice.js';
import useAuth from '../hook/useAuth.js';

function ChatStat() {
  const initChannels = useSelector(channelSelectors.selectAll);
  const initMessages = useSelector(messageSelectors.selectAll);
  const { activeChannel } = useAuth();

  function getMessageNum(msgs) {
    if (msgs.length === 0) {
      return 0;
    }

    return `${msgs.filter(({ channelId }) => channelId === activeChannel).length} сообщений`;
  }
  function getCurrentChannel(chnls) {
    if (chnls.length === 0) {
      return '# general and this sht doesnt work you know';
    }
    if (chnls.filter(({ id }) => id === activeChannel).length === 0) {
      return '# unknown';
    }

    return `# ${chnls.filter(({ id }) => id === activeChannel)[0].name}`;
  }

  return (
    <Row style={{ height: '10%', fontSize: '14px' }} className="p-3">
      <b className="m-0">{getCurrentChannel(initChannels)}</b>
      <p className="m-0">{getMessageNum(initMessages)}</p>
    </Row>
  );
}

export default ChatStat;
