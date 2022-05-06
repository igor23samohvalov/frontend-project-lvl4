import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useFormik } from 'formik';
import { io } from 'socket.io-client';
import {
  Col, Container, Row, Button, Form, InputGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import filter from 'leo-profanity';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import useAuth from '../hook/useAuth.js';
import ChatStat from '../components/ChatStat.jsx';
import AddModal from '../modals/AddModal.jsx';

function Chatpage() {
  const dispatch = useDispatch();
  const { activeChannel, setActiveChn } = useAuth();
  const { t } = useTranslation();
  const notify = (phrase, state) => toast[state](phrase, { autoClose: 2000 });
  const [isAddModal, setAddModal] = useState(false);
  const hideAddModal = () => setAddModal(false);
  const msgInput = useRef(null);

  const [isEmptyInput, setDisable] = useState(true);
  const socket = useRef(null);

  useEffect(() => {
    filter.loadDictionary('en');
    filter.list();

    const authToken = {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userId')).token}`,
    };
    const fetchData = async () => {
      const { data } = await axios.get('/api/v1/data', { headers: authToken });
      const { messages, channels, currentChannelId } = data;
      setActiveChn(currentChannelId);

      channels.forEach((channel) => {
        dispatch(channelsActions.addChannel(channel));
      });
      messages.forEach((message) => {
        dispatch(messagesActions.addMessage(message));
      });
    };
    fetchData();
    msgInput.current.focus();
  }, []);

  useEffect(() => {
    socket.current = io();
    socket.current.on('newMessage', (message) => {
      console.log('new message')
      msgInput.current.disabled = false;
      dispatch(messagesActions.addMessage(message));

      setDisable(true);
      msgInput.current.value = '';
      msgInput.current.focus();
    });
    socket.current.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
      setAddModal(false);
      setActiveChn(channel.id);
      notify(t('successAddChannel'), 'success');
    });
    socket.current.on('removeChannel', ({ id }) => {
      setActiveChn(1);
      dispatch(channelsActions.removeChannel(id));
      notify(t('successRemoveChannel'), 'success');
    });
    socket.current.on('renameChannel', ({ id, name }) => {
      dispatch(channelsActions.renameChannel({ id, changes: { name } }));
      notify(t('successRenameChannel'), 'success');
    });
    socket.current.on('disconnect', () => {
      notify(t('disconnected'), 'error');
    });

    return () => socket.current.disconnect();
  }, []);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      msgInput.current.disabled = true;
      socket.current.timeout(2000).emit('newMessage', {
        text: filter.clean(values.message),
        author: JSON.parse(localStorage.getItem('userId')).username,
        channelId: activeChannel,
      }, (err) => {
        if (err) {
          console.log('fk')
          notify(t('networkError'), 'error');
          msgInput.current.disabled = false;
        }
      });
    },
  });

  const disableSubmit = (length) => {
    if (length === 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

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
              role="button"
              aria-label="+"
            >
              +
            </Button>
            <AddModal show={isAddModal} onHide={hideAddModal} ap={socket.current} />
          </div>
          <Channels socket={socket.current} />
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <ChatStat />
            <Messages activeId={activeChannel} />
            <div className="mt-auto px-5 py-3">
              <Form onSubmit={formik.handleSubmit}>
                <InputGroup>
                  <Form.Control
                    size="lg"
                    type="text"
                    id="message"
                    name="message"
                    onChange={(e) => {
                      disableSubmit(e.target.value.length);
                      formik.handleChange(e);
                    }}
                    value={formik.values.message}
                    placeholder={t('messageInput')}
                    ref={msgInput}
                    aria-label="Новое сообщение"
                  />
                  <Button
                    variant="outline-secondary"
                    type="submit"
                    disabled={isEmptyInput}
                    role="button"
                    aria-label="Отправить"
                  >
                    {'->'}
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </div>
        </Col>
        <ToastContainer />
      </Row>
    </Container>
  );
}

export default Chatpage;
