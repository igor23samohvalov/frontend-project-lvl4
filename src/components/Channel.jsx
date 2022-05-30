import React, { useState } from 'react';
import {
  Dropdown, ListGroup, Button,
} from 'react-bootstrap';
import cn from 'classnames';
// import { useTranslation } from 'react-i18next';
import useAuth from '../hook/useAuth.js';
import RnmModal from '../modals/RnmModal.jsx';
import RemoveModal from '../modals/RemoveModal.jsx';

function Channel(props) {
  const {
    name, channelId = 1, socket, isRemovable,
  } = props;
  const { activeChannel, setActiveChn } = useAuth();
  // const { t } = useTranslation();

  const [isRnmModal, setRnmModal] = useState(false);
  const [isRemoveModal, setRemoveModal] = useState(false);

  const hideRnmModal = () => setRnmModal(false);
  const hideRemoveModal = () => setRemoveModal(false);

  const toggleChannel = () => setActiveChn(channelId);
  const classes = cn('p-0');

  if (!isRemovable) {
    return (
      <ListGroup.Item as="li" className={classes} onClick={toggleChannel}>
        <Button
          variant={activeChannel === channelId ? 'secondary' : 'light'}
          className="w-100 text-start"
          aria-label={name}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
      </ListGroup.Item>
    );
  }

  return (
    <ListGroup.Item as="button" className={classes} onClick={toggleChannel} aria-label={name}>
      <Dropdown>
        <Dropdown.Toggle variant={activeChannel === channelId ? 'secondary' : 'light'} id={name} aria-label="Управление каналом">
          {`# ${name}`}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setRemoveModal(true)} aria-label="Удалить">Удалить</Dropdown.Item>
          <Dropdown.Item onClick={() => setRnmModal(true)} aria-label="Переименовать">Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <RnmModal
        show={isRnmModal}
        onHide={hideRnmModal}
        socket={socket}
        id={channelId}
      />
      <RemoveModal
        show={isRemoveModal}
        onHide={hideRemoveModal}
        socket={socket}
        id={channelId}
      />
    </ListGroup.Item>
  );
}

export default Channel;
