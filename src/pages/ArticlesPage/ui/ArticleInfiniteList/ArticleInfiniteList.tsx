import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { ArticleList } from '@/entities/Article';
import { useSearchParams } from 'react-router-dom';
import cls from './ArticleInfiniteList.module.scss';
import {
  getArticlesPageView,
  getArticlesPageError,
  getArticlesPageIsLoading,
} from '../../model/selectors/articlesPageSelectors';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getArticles } from '../../model/slices/articlesPageSlice';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const error = useSelector(getArticlesPageError);
  const [searchParams] = useSearchParams();

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  if (error) {
    return <Text text={t('Error while loading')} />;
  }

  return (
    <div className={classNames(cls.ArticleInfiniteList, {}, [className])}>
      <ArticleList
        view={view}
        articles={articles}
        className={className}
        isLoading={isLoading}
      />
    </div>
  );
});
