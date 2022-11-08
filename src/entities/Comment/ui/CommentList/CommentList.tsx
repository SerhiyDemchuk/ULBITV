import { memo } from 'react';
import { Comment } from 'entities/Comment';
import { Text } from 'shared/ui/Text/Text';
import cls from './CommentList.module.scss';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { CommentCard } from 'entities/Comment/ui/CommentCard/CommentCard';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: CommentListProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            isLoading={isLoading}
            className={cls.comment}
          />
        ))
        : <Text text={t('No comments')} />}
    </div>
  );
});
