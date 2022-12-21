import { FC } from 'react';
import { Page } from '@/widgets/Page/Page';
import { useTranslation } from 'react-i18next';

const MainPage: FC = () => {
  const { t } = useTranslation('main');
  return (
    <Page data-testid="MainPage">
      {t('Main Page')}
    </Page>
  );
};

export default MainPage;
