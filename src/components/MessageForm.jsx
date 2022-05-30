import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import useSocket from '../hook/useSocket.js';

function MessageForm({ socket, activeChannel }) {
  const socketListener = useSocket();
  const { t } = useTranslation();
  filter.loadDictionary('en');
  filter.list();

  const [isSubmitting, setSubmitState] = useState(false);
  const [isEmptyInput, disableSubmitButon] = useState(true);
  const msgInput = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem('userId')).username;

  const disableSubmit = (length) => {
    if (length === 0) {
      disableSubmitButon(true);
    } else {
      disableSubmitButon(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      setSubmitState(true);
      const filteredMessage = filter.clean(values.message);
      socketListener.newMessage(socket, filteredMessage, activeChannel, setSubmitState);
    },
  });

  useEffect(() => {
    msgInput.current.focus();

    socket.on('newMessage', ({ username }) => {
      if (currentUser === username) {
        setSubmitState(false);
        disableSubmitButon(true);
        formik.resetForm();
      }
      msgInput.current.focus();
    });
  }, []);

  return (
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
          disabled={isSubmitting}
        />
        <Button
          variant="outline-secondary"
          type="submit"
          disabled={isEmptyInput}
          aria-label="Отправить"
        >
          {'->'}
        </Button>
      </InputGroup>
    </Form>
  );
}

export default MessageForm;
