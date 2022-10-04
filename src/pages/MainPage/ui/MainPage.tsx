import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from 'app/providers/ErrorBoundary';
import { Counter } from 'entities/Counter';

const MainPage: FC = () => {
  const { t } = useTranslation('main');
  const hello = 'hello';
  return (
    <div>
      <BugButton />
      {t('Main Page')}
      <Counter />
    </div>
  );
};

export default MainPage;
