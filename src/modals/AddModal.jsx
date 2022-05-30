import React, { useEffect, useRef, useState } from 'react';
import {
  Modal, Button, Form, FloatingLabel,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as channelSelectors } from '../slices/channelsSlice.js';
import useSocket from '../hook/useSocket.js';
import useAuth from '../hook/useAuth.js';

function isNameTaken(name, array) {
  const filtered = array.filter((chn) => chn.name === name);
  return filtered.length > 0;
}

function AddModal({ show, onHide, socket }) {
  const [isFormDisabled, setDisabled] = useState(false);

  const socketListener = useSocket();
  const { setActiveChn } = useAuth();

  const channels = useSelector(channelSelectors.selectAll);
  const { t } = useTranslation();
  const errors = {};
  const refAddChnInput = useRef(null);

  const validate = ({ newChannel }) => {
    if (!newChannel) {
      errors.newChannel = t('required');
    } else if (isNameTaken(newChannel, channels)) {
      errors.newChannel = t('errorNameTaken');
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      newChannel: '',
    },
    validate,
    onSubmit: (values) => {
      console.log('канал создан', values.newChannel)
      socketListener.newChannel(socket, values, setDisabled);
    },
  });

  useEffect(() => {
    if (show) {
      setDisabled(false);
      formik.resetForm();

      socket.once('newChannel', ({ id }) => {
        setActiveChn(id);
        onHide();
      });

      refAddChnInput.current.focus();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <FloatingLabel label="Имя канала" className="mb-3">
              <Form.Control
                type="text"
                name="newChannel"
                aria-label="Имя канала"
                value={formik.values.newChannel}
                onChange={formik.handleChange}
                placeholder="Имя канала"
                id="newChannel"
                isInvalid={formik.errors.newChannel}
                ref={refAddChnInput}
                disabled={isFormDisabled}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.newChannel}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} aria-label="Отменить">
            {t('cancel')}
          </Button>
          <Button variant="primary" type="submit" aria-label="Отправить">
            {t('submit')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddModal;
