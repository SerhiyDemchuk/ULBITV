import cls from './ArticleList.module.scss';
import { useTranslation } from 'react-i18next';
import { Article } from '../../model/types/article';
import { Text, TextSize } from '@/shared/ui/Text';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { ArticleView } from '../../model/consts/articleConsts';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleListItem } from '../../ui/ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../../ui/ArticleListItem/ArticleListItemSkeleton';

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

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames('', {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Articles not found')} />
      </div>
    );
  }

  return (
    <div
      data-testid="ArticleList"
      className={classNames('', {}, [className, cls[view]])}
    >
      {articles.map((item) => (
        <ArticleListItem
          view={view}
          key={item.id}
          article={item}
          target={target}
          className={cls.card}
        />
      ))}
      {isLoading && getSkeletons(view)}
    </div>
  );
});
