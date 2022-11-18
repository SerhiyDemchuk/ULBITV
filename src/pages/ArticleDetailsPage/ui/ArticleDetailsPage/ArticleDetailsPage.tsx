import { Page } from 'widgets/Page/Page';
import { memo, useCallback } from 'react';
import { CommentList } from 'entities/Comment';
import { useTranslation } from 'react-i18next';
import cls from './ArticleDetailsPage.module.scss';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useDispatch, useSelector } from 'react-redux';
import { AddCommentForm } from 'features/addCommentForm';
import { useNavigate, useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { articleDetailsPageReducer } from '../../model/slices';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { getArticleRecommendations } from '../../model/slices/articleDetailsPageRecommendationsSlice';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
  const navigate = useNavigate();

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
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
        <Text
          size={TextSize.L}
          className={cls.commentTitle}
          title={t('Recommendations')}
        />
        <ArticleList
          target="_blank"
          articles={recommendations}
          className={cls.recommendations}
          isLoading={recommendationsIsLoading}
        />
        <Text
          size={TextSize.L}
          title={t('Comments')}
          className={cls.commentTitle}
        />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
