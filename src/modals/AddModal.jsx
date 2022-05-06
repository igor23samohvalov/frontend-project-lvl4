import React, { useEffect, useRef } from 'react';
import {
  Modal, Button, Form, FloatingLabel,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { selectors as channelSelectors } from '../slices/channelsSlice.js';

function isNameTaken(name, array) {
  const filtered = array.filter((chn) => chn.name === name);
  return filtered.length > 0;
}

function AddModal({ show, onHide, ap }) {
  const channels = useSelector(channelSelectors.selectAll);
  const notify = (phrase, state) => toast[state](phrase, { autoClose: 2000 });
  const { t } = useTranslation();
  const errors = {};
  const refAddChnInput = useRef(null);

  useEffect(() => {
    if (show) {
      refAddChnInput.current.value = '';
      refAddChnInput.current.disabled = false;
      refAddChnInput.current.focus();
    }
  }, [show]);

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
    onSubmit: ({ newChannel }) => {
      refAddChnInput.current.disabled = true;
      ap.timeout(2000).emit('newChannel', {
        name: newChannel,
      }, (err) => {
        if (err) {
          notify(t('networkError'), 'error');
          refAddChnInput.current.disabled = false;
        }
      });
    },
  });

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
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.newChannel}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {t('cancel')}
          </Button>
          <Button variant="primary" type="submit" aria-label="Отправить">
            {t('submit')}
          </Button>
        </Modal.Footer>
      </Form>
      <ToastContainer />
    </Modal>
  );
}

export default AddModal;
