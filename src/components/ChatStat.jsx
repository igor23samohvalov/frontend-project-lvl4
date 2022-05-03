import React from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as channelSelectors } from '../slices/channelsSlice.js';
import { selectors as messageSelectors } from '../slices/messagesSlice.js';
import useAuth from '../hook/useAuth.js';

function ChatStat() {
  const initChannels = useSelector(channelSelectors.selectAll);
  const initMessages = useSelector(messageSelectors.selectAll);
  const { t } = useTranslation();
  const { activeChannel } = useAuth();

  function getMessageNum(msgs) {
    if (msgs.length === 0) {
      return 0;
    }

    return `${msgs.filter(({ channelId }) => channelId === activeChannel).length} ${t('msgsNum')}`;
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
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <b className="m-0">{getCurrentChannel(initChannels)}</b>
      <p className="m-0">{getMessageNum(initMessages)}</p>
    </div>
  );
}

export default ChatStat;
