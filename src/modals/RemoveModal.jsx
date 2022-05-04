import React from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

function RemoveModal(props) {
  // eslint-disable-next-line object-curly-newline
  const { show, onHide, id, ap } = props;
  const notify = (phrase, state) => toast[state](phrase, { autoClose: 2000 });
  const { t } = useTranslation();
  const handleRemove = () => {
    ap.timeout(2000).emit('removeChannel', { id }, (err) => {
      if (err) {
        notify(t('networkError'), 'error');
      }
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('confirm')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('cancel')}
        </Button>
        <Button variant="danger" onClick={handleRemove}>
          {t('remove')}
        </Button>
      </Modal.Footer>
      <ToastContainer />
    </Modal>
  );
}

export default RemoveModal;
