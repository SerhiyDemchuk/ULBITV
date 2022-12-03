import { useSelector } from 'react-redux';
import { Icon } from 'shared/ui/Icon/Icon';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import cls from './ArticleDetails.module.scss';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from 'shared/ui/Stack';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { memo, useCallback, useEffect } from 'react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
    case ArticleBlockType.CODE:
      return (
        <ArticleCodeBlockComponent
          block={block}
          key={block.id}
          className={cls.block}
        />
      );
    case ArticleBlockType.IMAGE:
      return (
        <ArticleImageBlockComponent
          block={block}
          key={block.id}
          className={cls.block}
        />
      );
    case ArticleBlockType.TEXT:
      return (
        <ArticleTextBlockComponent
          block={block}
          key={block.id}
          className={cls.block}
        />
      );
    default:
      return null;
    }
  }, []);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <VStack max>
        <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </VStack>
    );
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        title={t('An error occurred while loading the article')}
      />
    );
  } else {
    content = (
      <>
        <HStack
          max
          justify="center"
          className={cls.avatarWrapper}
        >
          <Avatar
            size={200}
            src={article?.img}
            className={cls.avatar}
          />
        </HStack>
        <VStack max gap="4">
          <Text
            size={TextSize.L}
            className={cls.title}
            title={article?.title}
            text={article?.subtitle}
          />
          <HStack gap="8" className={cls.articleInfo}>
            <Icon className={cls.icon} Svg={EyeIcon} />
            <Text text={String(article?.views)} />
          </HStack>
          <HStack gap="8" className={cls.articleInfo}>
            <Icon className={cls.icon} Svg={CalendarIcon} />
            <Text text={article?.createdAt} />
          </HStack>
        </VStack>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack
        max
        gap="16"
        className={classNames(cls.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
