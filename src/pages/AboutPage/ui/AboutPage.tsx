import { FC } from 'react';
import { Page } from '@/widgets/Page/Page';
import { useTranslation } from 'react-i18next';

const AboutPage: FC = () => {
  const { t } = useTranslation('about');
  return <Page data-testid='AboutPage'>{t('About Page')}</Page>;
};

export default AboutPage;
