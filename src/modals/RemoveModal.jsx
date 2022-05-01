import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';

function RemoveModal(props) {
  // eslint-disable-next-line object-curly-newline
  const { show, onHide, id, ap } = props;
  const { t } = useTranslation();
  const handleRemove = () => {
    ap.emit('removeChannel', { id });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('confirm')}</Modal.Body>
      <Button variant="secondary" onClick={onHide}>
        {t('cancel')}
      </Button>
      <Button variant="danger" onClick={handleRemove}>
        {t('remove')}
      </Button>
    </Modal>
  );
}

export default RemoveModal;
