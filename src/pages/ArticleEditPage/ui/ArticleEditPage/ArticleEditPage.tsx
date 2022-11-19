import { memo } from 'react';
import { Page } from 'widgets/Page/Page';
import { useTranslation } from 'react-i18next';
import cls from './ArticleEditPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      {isEdit
        ? t('Edit article ID = ') + id
        : t('Create new article')}
    </Page>
  );
});

export default ArticleEditPage;
