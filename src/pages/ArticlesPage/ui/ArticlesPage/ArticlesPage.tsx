import { memo } from 'react';
import cls from './ArticlesPage.module.scss';
import { useTranslation } from 'react-i18next';
import { ArticleList, ArticleView } from 'entities/Article';
import { classNames } from 'shared/lib/classNames/classNames';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const { t } = useTranslation('article');
  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      <ArticleList
        isLoading
        articles={[]}
        view={ArticleView.BIG}
      />
    </div>
  );
};

export default memo(ArticlesPage);
