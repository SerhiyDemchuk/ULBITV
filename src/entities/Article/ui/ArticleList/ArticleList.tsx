import cls from './ArticleList.module.scss';
import { PAGE_ID } from 'widgets/Page/Page';
import { useTranslation } from 'react-i18next';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleView } from '../../model/types/article';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { ArticleListItem } from '../../ui/ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../../ui/ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  virtualized?: boolean;
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
    virtualized = true,
    view = ArticleView.SMALL,
  }: ArticleListProps,
) => {
  const { t } = useTranslation();

  const isBig = view === ArticleView.BIG;

  const itemsPerRow = isBig ? 1 : 3;
  const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);

  const rowRender = ({ index, key, style }: ListRowProps) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

    for (let i = fromIndex; i < toIndex; i += 1) {
      items.push(
        <ArticleListItem
          key={i}
          view={view}
          target={target}
          className={cls.card}
          article={articles[i]}
        />,
      );
    }

    return (
      <div
        key={key}
        style={style}
        className={cls.row}
      >
        {items}
      </div>
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames('', {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Articles not found')} />
      </div>
    );
  }

  return (
    <WindowScroller
      scrollElement={document.getElementById(PAGE_ID) as Element}
    >
      {({
        width,
        height,
        registerChild,
        onChildScroll,
        scrollTop,
        isScrolling,
      }) => (
        <div
          ref={registerChild}
          className={classNames('', {}, [className, cls[view]])}
        >
          {virtualized
            ? (
              <List
                autoHeight
                rowCount={rowCount}
                scrollTop={scrollTop}
                height={height ?? 700}
                rowRenderer={rowRender}
                onScroll={onChildScroll}
                isScrolling={isScrolling}
                rowHeight={isBig ? 700 : 330}
                width={width ? width - 80 : 700}
              />
            )
            : (articles.map((item) => (
              <ArticleListItem
                view={view}
                key={item.id}
                article={item}
                target={target}
                className={cls.card}
              />
            )))}
          {isLoading && getSkeletons(view)}
        </div>
      )}
    </WindowScroller>
  );
});
