import React, { useRef, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as channelSelectors } from '../slices/channelsSlice.js';
import useSocket from '../hook/useSocket.js';

function isNameTaken(name, array) {
  const filtered = array.filter((chn) => chn.name === name);
  return filtered.length > 0;
}

function RnmModal(props) {
  const [isFormDisabled, setDisabled] = useState(false);
  // eslint-disable-next-line object-curly-newline
  const { show, onHide, id, socket } = props;

  const socketListener = useSocket();
  const channels = useSelector(channelSelectors.selectAll);
  const { t } = useTranslation();

  const errors = {};
  const refRnmInput = useRef(null);

  useEffect(() => {
    if (show) {
      refRnmInput.current.select();

      socket.once('renameChannel', () => {
        console.log('renameChannel');
        onHide();
      });
    }
  }, [show]);

  const validate = ({ renamedChannel }) => {
    if (!renamedChannel) {
      errors.renamedChannel = t('required');
    } else if (isNameTaken(renamedChannel, channels)) {
      errors.renamedChannel = t('errorNameTaken');
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      renamedChannel: channels.filter((chn) => chn.id === id)[0].name,
    },
    validate,
    onSubmit: (values) => {
      setDisabled(true);
      socketListener.renameChannel(socket, values, id, setDisabled);
    },
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('renameChannel')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              name="renamedChannel"
              aria-label="Имя канала"
              value={formik.values.renamedChannel}
              onChange={formik.handleChange}
              id="renamedChannel"
              isInvalid={formik.errors.renamedChannel}
              ref={refRnmInput}
              disabled={isFormDisabled}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.renamedChannel}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {t('cancel')}
          </Button>
          <Button variant="primary" type="submit">
            {t('submit')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default RnmModal;
