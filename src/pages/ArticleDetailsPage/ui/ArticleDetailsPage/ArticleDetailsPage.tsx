import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { useParams } from 'react-router-dom';
import { CommentList } from 'entities/Comment';
import { useTranslation } from 'react-i18next';
import { ArticleDetails } from 'entities/Article';
import cls from './ArticleDetailsPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import {
  fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';

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

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Article is not found')}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <Text className={cls.commentTitle} title={t('Comments')} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
        {/* <CommentList isLoading={true} comments={[ */}
        {/*  { */}
        {/*    id: '1', */}
        {/*    text: 'comment 1', */}
        {/*    user: { id: '1', username: 'user 1', avatar: 'https://surl.li/dklgk' }, */}
        {/*  }, */}
        {/*  { */}
        {/*    id: '2', */}
        {/*    text: 'comment 2', */}
        {/*    user: { id: '2', username: 'user 2', avatar: 'https://surl.li/dklgk' }, */}
        {/*  }, */}
        {/*  { */}
        {/*    id: '3', */}
        {/*    text: 'comment 3', */}
        {/*    user: { id: '3', username: 'user 3', avatar: 'https://surl.li/dklgk' }, */}
        {/*  }, */}
        {/* ]} */}
        {/* /> */}
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
