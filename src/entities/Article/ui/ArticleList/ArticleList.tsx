import cls from './ArticleList.module.scss';
import { useTranslation } from 'react-i18next';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from 'entities/Article/ui/ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
  .fill(0)
  .map((item, index) => (
    <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
  ));

export const ArticleList = memo((
  {
    target,
    articles,
    className,
    isLoading,
    view = ArticleView.SMALL,
  }: ArticleListProps,
) => {
  const { t } = useTranslation();

  const renderArticle = (article: Article) => (
    <ArticleListItem
      view={view}
      key={article.id}
      article={article}
      target={target}
      className={cls.card}
    />
  );

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames('', {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Articles not found')} />
      </div>
    );
  }

  return (
    <div className={classNames('', {}, [className, cls[view]])}>
      {articles.length > 0
        ? articles.map(renderArticle)
        : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
});
