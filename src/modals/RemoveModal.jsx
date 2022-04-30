import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function RemoveModal(props) {
  // eslint-disable-next-line object-curly-newline
  const { show, onHide, id, ap } = props;
  const handleRemove = () => {
    ap.emit('removeChannel', { id });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>Уверены?</Modal.Body>
      <Button variant="secondary" onClick={onHide}>
        Отменить
      </Button>
      <Button variant="danger" onClick={handleRemove}>
        Удалить
      </Button>
    </Modal>
  );
}

export default RemoveModal;
