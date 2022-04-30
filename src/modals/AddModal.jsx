import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { selectors as channelSelectors } from '../slices/channelsSlice.js';

function isNameTaken(name, array) {
  const filtered = array.filter((chn) => chn.name === name);
  return filtered.length > 0;
}

function AddModal({ show, onHide, ap }) {
  const channels = useSelector(channelSelectors.selectAll);
  const errors = {};

  const validate = ({ newChannel }, props) => {
    if (!newChannel) {
      errors.newChannel = 'Required';
    } else if (isNameTaken(newChannel, channels)) {
      errors.newChannel = 'This name is already taken';
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      newChannel: '',
    },
    validate,
    onSubmit: ({ newChannel }) => {
      ap.emit('newChannel', {
        name: newChannel,
      });
      onHide();
    },
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              name="newChannel"
              value={formik.values.newChannel}
              onChange={formik.handleChange}
              id="newChannel"
              isInvalid={formik.errors.newChannel}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.newChannel}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="secondary" onClick={onHide}>
            Отменить
          </Button>
          <Button variant="primary" type="submit">
            Отправить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddModal;
