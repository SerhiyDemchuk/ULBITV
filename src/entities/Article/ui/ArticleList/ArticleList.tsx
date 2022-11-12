import { memo } from 'react';
import cls from './ArticleList.module.scss';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from 'entities/Article/ui/ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
  .fill(0)
  .map((item, index) => (
    <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
  ));

export const ArticleList = memo((
  {
    view = ArticleView.BIG,
    articles,
    className,
    isLoading,
  }: ArticleListProps,
) => {
  const { t } = useTranslation();

  const renderArticle = (article: Article) => (
    <ArticleListItem
      view={view}
      key={article.id}
      article={article}
      className={cls.card}
    />
  );

  if (isLoading) {
    return (
      <div className={classNames('', {}, [className, cls[view]])}>
        {getSkeletons(view)}
      </div>
    );
  }

  return (
    <div className={classNames('', {}, [className, cls[view]])}>
      {articles.length > 0
        ? articles.map(renderArticle)
        : null}
    </div>
  );
});
