import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import useSocket from '../hook/useSocket.js';
import useAuth from '../hook/useAuth.js';

function RemoveModal(props) {
  // eslint-disable-next-line object-curly-newline
  const { show, onHide, id, socket } = props;

  const socketListener = useSocket();
  const { setActiveChn } = useAuth();
  const { t } = useTranslation();

  const onRemoveChannel = () => {
    setActiveChn(1);
    onHide();
  };

  useEffect(() => {
    if (show) socket.once('removeChannel', onRemoveChannel);
  }, [show]);

  const handleRemove = () => {
    socketListener.removeChannel(socket, id, onHide);
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
        <Button variant="danger" onClick={handleRemove} aria-label="Удалить">
          {t('remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveModal;
