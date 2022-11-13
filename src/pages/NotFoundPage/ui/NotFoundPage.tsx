import { FC } from 'react';
import cls from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';

const NotFoundPage: FC = () => {
  const { t } = useTranslation();
  return (
    <Page className={classNames(cls.NotFoundPage, {}, [])}>
      {t('Page not found')}
    </Page>
  );
};

export default NotFoundPage;
