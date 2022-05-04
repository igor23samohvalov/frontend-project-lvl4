import React, { useState } from 'react';
import { SplitButton, ListGroup, Dropdown, Button } from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import useAuth from '../hook/useAuth.js';
import RnmModal from '../modals/RnmModal.jsx';
import RemoveModal from '../modals/RemoveModal.jsx';

function Channel({ name, channelId = 1, socket, isRemovable }) {
  const { activeChannel, setActiveChn } = useAuth();
  const { t } = useTranslation();

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
        >
          <span className="me-1">#</span>
          {name}
        </Button>
      </ListGroup.Item>
    );
  }

  return (
    <ListGroup.Item as="li" className={classes} onClick={toggleChannel}>
      <SplitButton
        title={`# ${name}`}
        variant={activeChannel === channelId ? 'secondary' : 'light'}
        className="w-100 rounded-0 text-start px-0 split-button-align"
      >
        <Dropdown.Item
          onClick={() => {setRemoveModal(true)}}
          eventKey="1"
        >
          {t('remove')}
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="2"
          onClick={() => setRnmModal(true)}
        >
          {t('rename')}
        </Dropdown.Item>
      </SplitButton>
      <RnmModal
        show={isRnmModal}
        onHide={hideRnmModal}
        ap={socket}
        id={channelId}
      />
      <RemoveModal
        show={isRemoveModal}
        onHide={hideRemoveModal}
        ap={socket}
        id={channelId}
      />
    </ListGroup.Item>
  );
}

export default Channel;
