import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Col, Container, Row, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { actions as channelsActions, fetchChannels } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import MessageForm from '../components/MessageForm.jsx';
import useAuth from '../hook/useAuth.js';
import ChatStat from '../components/ChatStat.jsx';
import AddModal from '../modals/AddModal.jsx';

function Chatpage({ socket }) {
  const dispatch = useDispatch();
  const notify = (phrase, state) => toast[state](phrase, { autoClose: 2000 });
  const { activeChannel } = useAuth();
  const { t } = useTranslation();

  const [isAddModal, setAddModal] = useState(false);
  const hideAddModal = () => setAddModal(false);

  useEffect(() => {
    const authToken = {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userId')).token}`,
    };
    dispatch(fetchChannels(authToken));

    socket.on('newMessage', (message) => {
      dispatch(messagesActions.addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
      notify(t('successAddChannel'), 'success');
    });
    socket.on('removeChannel', ({ id }) => {
      dispatch(channelsActions.removeChannel(id));
      notify(t('successRemoveChannel'), 'success');
    });
    socket.on('renameChannel', ({ id, name }) => {
      dispatch(channelsActions.renameChannel({ id, changes: { name } }));
      notify(t('successRenameChannel'), 'success');
    });

    return () => socket.removeAllListeners();
  }, []);

  return (
    <Container className="h-100 rounded shadow my-4 overflow-hidden">
      <Row className="h-100 bg-white flex-md-row">
        <Col md={2} xs={12} className="col-4 md-2 px-0 border-end bg-light" id="channelsColumn">
          <div className="d-flex justify-content-between mb-2 ps-3 pe-3 align-items-center">
            <span style={{ fontSize: '18px', lineHeight: '20px' }}>{t('channels')}</span>
            <Button
              style={{ width: '30px', height: '30px' }}
              variant="outline-secondary"
              className="p-0"
              onClick={() => setAddModal(true)}
              aria-label="+"
            >
              +
            </Button>
            <AddModal show={isAddModal} onHide={hideAddModal} socket={socket} />
          </div>
          <Channels socket={socket} />
        </Col>
        <Col md={10} xs={12} className="p-0" id="messagesColumn">
          <div className="d-flex flex-column h-100">
            <ChatStat />
            <Messages activeId={activeChannel} />
            <div className="mt-auto px-5 py-3">
              <MessageForm socket={socket} activeChannel={activeChannel} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Chatpage;
