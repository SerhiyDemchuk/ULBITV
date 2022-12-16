import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation();
  const userData = useSelector(getUserAuthData);

  const { data, isLoading } = useGetArticleRating({
    userId: userData?.id ?? '',
    articleId,
  });

  const [rateArticleMutation] = useRateArticle();

  const rating = data?.[0];

  const handleRateArticle = useCallback((
    starsCount: number,
    feedback?: string,
  ) => {
    try {
      rateArticleMutation({
        feedback,
        articleId,
        rate: starsCount,
        userId: userData?.id ?? '',
      });
    } catch (e) {
      console.log(e);
    }
  }, [articleId, rateArticleMutation, userData?.id]);

  const onAccept = useCallback((starsCount: number, feedback?: string) => {
    handleRateArticle(starsCount, feedback);
  }, [handleRateArticle]);

  const onCancel = useCallback((starsCount: number) => {
    handleRateArticle(starsCount);
  }, [handleRateArticle]);

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  return (
    <RatingCard
      hasFeedback
      onCancel={onCancel}
      onAccept={onAccept}
      rate={rating?.rate}
      className={className}
      title={t('Rate the article')}
      feedbackTitle={t('Leave your feedback, it will help us to improve the quality')}
    />
  );
});

export default ArticleRating;
