import { FC } from 'react';
import { Counter } from 'entities/Counter';
import { useTranslation } from 'react-i18next';

const AboutPage: FC = () => {
  const { t } = useTranslation('about');
  return (
    <div>
      {t('About Page')}
      <Counter />
    </div>
  );
};

export default AboutPage;
