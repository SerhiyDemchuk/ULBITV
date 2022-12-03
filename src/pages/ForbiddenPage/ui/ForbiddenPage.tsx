import { FC } from 'react';
import { Page } from 'widgets/Page/Page';
import { useTranslation } from 'react-i18next';

const ForbiddenPage: FC = () => {
  const { t } = useTranslation();
  return (
    <Page>
      {t('You have no right for this page')}
    </Page>
  );
};

export default ForbiddenPage;
