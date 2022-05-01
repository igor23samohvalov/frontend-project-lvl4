import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { io } from 'socket.io-client';
import { Card, Col, Container, Row, Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import useAuth from '../hook/useAuth.js';
import ChatStat from '../components/ChatStat.jsx';
import AddModal from '../modals/AddModal.jsx';

function Chatpage() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeChannel, setActiveChn, logOut } = useAuth();
  const { t } = useTranslation();
  const socket = io('http://localhost:5000');

  const [isAddModal, setAddModal] = useState(false);
  const hideAddModal = () => setAddModal(false);

  useEffect(() => {
    if (localStorage.userId === undefined) {
      logOut();
    }
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

    socket.on('connect', () => {
      console.log(`${JSON.parse(localStorage.getItem('userId')).username} has connected!`);
    });
    socket.on('newMessage', (message) => {
      console.log(`${JSON.parse(localStorage.getItem('userId')).username} sent message: ${message.text}!`);
      dispatch(messagesActions.addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      console.log(`${channel.name} is added to the list`);
      dispatch(channelsActions.addChannel(channel));
      setActiveChn(channel.id);
    });
    socket.on('removeChannel', ({ id }) => {
      setActiveChn(1);
      console.log(`Channel with id:${id} is removed from the list`);
      dispatch(channelsActions.removeChannel(id));
    });
    socket.on('renameChannel', ({ id, name }) => {
      console.log(`Channel's new name with id:${id} is ${name}`);
      dispatch(channelsActions.renameChannel({ id, changes: { name } }));
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: yup.object({
      message: yup.mixed()
        .nullable()
        .required(t('required')),
    }),
    onSubmit: (values) => {
      socket.emit('newMessage', {
        text: values.message,
        author: JSON.parse(localStorage.getItem('userId')).username,
        channelId: activeChannel,
      });
    },
  });

  return (
    <Card style={{ width: '70rem', height: '50rem' }} className="shadow-sm">
      <Container fluid style={{ height: '100%', padding: '0px 12px' }}>
        <Row style={{ height: '100%', backgroundColor: '#f7f7f7' }}>
          <Col xs={2}>
            <Row className="text-center">
              <Col xs={8}><p>{t('channels')}</p></Col>
              <Col>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setAddModal(true)}
                >
                  +
                </Button>
                <AddModal show={isAddModal} onHide={hideAddModal} ap={socket} />
              </Col>
            </Row>
            <Row>
              <Channels socket={socket} />
            </Row>
          </Col>
          <Col>
            <ChatStat />
            <Row style={{ height: '80%', backgroundColor: '#fff' }} className="p-3">
              <Messages activeId={activeChannel} />
            </Row>
            <Row style={{ height: '10%', backgroundColor: '#fff' }}>
              <Form onSubmit={formik.handleSubmit}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    id="message"
                    name="message"
                    onChange={formik.handleChange}
                    value={formik.values.message}
                    placeholder={t('messageInput')}
                    isInvalid={formik.errors.message}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.message}</Form.Control.Feedback>
                  <Button variant="outline-secondary" type="submit">{'->'}</Button>
                </InputGroup>
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}

export default Chatpage;
