import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';

const AboutPage: FC = () => {
  const { t } = useTranslation('about');
  return (
    <Page>
      {t('About Page')}
    </Page>
  );
};

export default AboutPage;
