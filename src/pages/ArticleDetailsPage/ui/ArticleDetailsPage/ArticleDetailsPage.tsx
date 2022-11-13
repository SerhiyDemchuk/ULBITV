import { memo, useCallback } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { useTranslation } from 'react-i18next';
import { ArticleDetails } from 'entities/Article';
import cls from './ArticleDetailsPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AddCommentForm } from 'features/addCommentForm';
import { useNavigate, useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { Page } from 'shared/ui/Page/Page';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const navigate = useNavigate();

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Article is not found')}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <Button
          onClick={onBackToList}
          theme={ButtonTheme.OUTLINE}
        >
          {t('Back to list')}
        </Button>
        <ArticleDetails id={id} />
        <Text className={cls.commentTitle} title={t('Comments')} />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
