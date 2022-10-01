import { FC } from 'react';
import cls from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

const NotFoundPage: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.NotFoundPage, {}, [])}>
      {t('Page not found')}
    </div>
  );
};

export default NotFoundPage;
