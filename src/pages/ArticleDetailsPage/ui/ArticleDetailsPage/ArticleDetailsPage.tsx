import { memo } from 'react';
import { Page } from '@/widgets/Page/Page';
import { VStack } from '@/shared/ui/Stack';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArticleDetails } from '@/entities/Article';
import cls from './ArticleDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../../ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <ArticleRecommendationsList />
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
