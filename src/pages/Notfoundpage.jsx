import React from 'react';
import { useTranslation } from 'react-i18next';

function Notfoundpage() {
  const { t } = useTranslation();

  return (
    <div>{t('fourzerofour')}</div>
  );
}

export default Notfoundpage;
