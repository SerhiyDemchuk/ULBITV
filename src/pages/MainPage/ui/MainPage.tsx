import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from 'app/providers/ErrorBoundary';

const MainPage: FC = () => {
  const { t } = useTranslation('main');
  const hello = 'hello';
  return (
    <div>
      <BugButton />
      {t('Main Page')}
    </div>
  );
};

export default MainPage;
