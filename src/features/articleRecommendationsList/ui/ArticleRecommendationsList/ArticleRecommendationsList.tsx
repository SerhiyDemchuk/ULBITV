import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { ArticleList } from 'entities/Article';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { isLoading, data: articles, error } = useArticleRecommendationsList(3);

  if (isLoading || error || !articles) {
    return null;
  }

  return (
    <VStack gap="8" className={classNames('', {}, [className])}>
      <Text
        size={TextSize.L}
        title={t('Recommendations')}
      />
      <ArticleList
        target="_blank"
        articles={articles}
        virtualized={false}
      />
    </VStack>
  );
});
