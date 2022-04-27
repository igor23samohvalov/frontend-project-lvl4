import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row, Button, Form, InputGroup } from 'react-bootstrap';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import Channels from '../components/Channels.jsx';

function Chatpage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.userId === undefined) {
      navigate('/login');
    }
    const authToken = {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userId')).token}`,
    };
    const fetchData = async () => {
      const { data } = await axios.get('/api/v1/data', { headers: authToken });
      const { messages, channels } = data;
      channels.forEach((channel) => {
        dispatch(channelsActions.addChannel(channel));
      });
      messages.forEach((message) => {
        dispatch(messagesActions.addMessage(message));
      });
    };
    fetchData();
  }, []);

  return (
    <Card style={{ width: '70rem', height: '50rem' }} className="shadow-sm">
      <Container fluid style={{ height: '100%' }}>
        <Row style={{ height: '100%', backgroundColor: '#f7f7f7' }}>
          <Col xs={2} style={{ backgroundColor: '#f7f7f7' }}>
            <Row>
              <Col xs={8}><p>Каналы</p></Col>
              <Col><Button variant="outline-primary" size="sm">+</Button></Col>
            </Row>
            <Row>
              <Channels />
            </Row>
          </Col>
          <Col>
            <Row style={{ height: '10%' }}>
              <b># general</b>
              <p>100 сообщений</p>
            </Row>
            <Row style={{ height: '80%', backgroundColor: '#fff' }}>
            </Row>
            <Row style={{ height: '10%', backgroundColor: '#fff' }}>
              <Form>
                <InputGroup>
                  <Form.Control type="text" placeholder="Введите сообщение..." />
                  <Button variant="outline-secondary">{'->'}</Button>
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
