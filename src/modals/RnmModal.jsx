import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as channelSelectors } from '../slices/channelsSlice.js';

function isNameTaken(name, array) {
  const filtered = array.filter((chn) => chn.name === name);
  return filtered.length > 0;
}

function RnmModal(props) {
  // eslint-disable-next-line object-curly-newline
  const { show, onHide, id, ap } = props;
  const channels = useSelector(channelSelectors.selectAll);
  const { t } = useTranslation();
  const errors = {};

  const validate = ({ renamedChannel }, props) => {
    if (!renamedChannel) {
      errors.renamedChannel = t('required');
    } else if (isNameTaken(renamedChannel, channels)) {
      errors.renamedChannel = t('errorNameTaken');
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      renamedChannel: '',
    },
    validate,
    onSubmit: ({ renamedChannel }) => {
      ap.emit('renameChannel', ({
        id,
        name: renamedChannel,
      }));
      onHide();
    },
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              name="renamedChannel"
              value={formik.values.renamedChannel}
              onChange={formik.handleChange}
              id="renamedChannel"
              isInvalid={formik.errors.renamedChannel}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.renamedChannel}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="secondary" onClick={onHide}>
            {t('cancel')}
          </Button>
          <Button variant="primary" type="submit">
            {t('submit')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RnmModal;
