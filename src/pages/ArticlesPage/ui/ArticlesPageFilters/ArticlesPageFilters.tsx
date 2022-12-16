import {
  ArticleView,
  ArticleSortField,
  ArticleViewSelector,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { useTranslation } from 'react-i18next';
import cls from './ArticlesPageFilters.module.scss';
import {
  getArticlesPageSort,
  getArticlesPageView,
  getArticlesPageType,
  getArticlesPageOrder,
  getArticlesPageSearch,
} from '../../model/selectors/articlesPageSelectors';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ArticleType } from '@/entities/Article/model/consts/articleConsts';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import { ArticleTypeTabs } from '@/entities/Article/ui/ArticleTypeTabs/ArticleTypeTabs';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { ArticleSortSelector } from '@/entities/Article/ui/ArticleSortSelector/ArticleSortSelector';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesPageView);
  const sort = useSelector(getArticlesPageSort);
  const order = useSelector(getArticlesPageOrder);
  const search = useSelector(getArticlesPageSearch);
  const type = useSelector(getArticlesPageType);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);

  const onChangeSort = useCallback((newSort: ArticleSortField) => {
    dispatch(articlesPageActions.setSort(newSort));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articlesPageActions.setOrder(newOrder));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeSearch = useCallback((search: string) => {
    dispatch(articlesPageActions.setSearch(search));
    dispatch(articlesPageActions.setPage(1));
    debouncedFetchData();
  }, [dispatch, debouncedFetchData]);

  const onChangeType = useCallback((value: ArticleType) => {
    dispatch(articlesPageActions.setType(value));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  return (
    <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          sort={sort}
          order={order}
          onChangeSort={onChangeSort}
          onChangeOrder={onChangeOrder}
        />
        <ArticleViewSelector
          view={view}
          onViewClick={onChangeView}
        />
      </div>
      <Card className={cls.search}>
        <Input
          value={search}
          onChange={onChangeSearch}
          placeholder={t('Search')}
        />
      </Card>
      <ArticleTypeTabs
        value={type}
        className={cls.tabs}
        onChangeType={onChangeType}
      />
    </div>
  );
});
