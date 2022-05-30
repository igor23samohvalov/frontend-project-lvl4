import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Col, Container, Row, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { fetchChannels } from '../slices/channelsSlice.js';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import MessageForm from '../components/MessageForm.jsx';
import useAuth from '../hook/useAuth.js';
import ChatStat from '../components/ChatStat.jsx';
import AddModal from '../modals/AddModal.jsx';

function Chatpage({ socket }) {
  const dispatch = useDispatch();
  const { activeChannel } = useAuth();
  const { t } = useTranslation();

  const [isAddModal, setAddModal] = useState(false);
  const hideAddModal = () => setAddModal(false);

  useEffect(() => {
    const authToken = {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userId')).token}`,
    };
    dispatch(fetchChannels(authToken));
  }, []);

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
    <Container className="h-100 rounded shadow my-4 overflow-hidden">
      <Row className="h-100 bg-white flex-md-row">
        <Col sm={2} className="col-4 md-2 pt-5 px-0 border-end bg-light">
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
        <Col className="p-0 h-100">
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
