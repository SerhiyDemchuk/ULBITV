import { memo, useCallback } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import { Card } from 'shared/ui/Card/Card';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import cls from './ArticleListItem.module.scss';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import {
  Article,
  ArticleView,
  ArticleBlockType,
  ArticleTextBlock,
} from '../../model/types/article';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ArticleTextBlockComponent } from '../../ui/ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(RoutePath.articles_details + article.id);
  }, [article.id, navigate]);

  const types = <Text className={cls.types} text={article.type.join(', ')} />;
  const views = (
    <>
      <Text className={cls.views} text={String(article.views)} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar
              size={30}
              src={article.user.avatar}
            />
            <Text
              className={cls.username}
              text={article.user.username}
            />
            <Text
              className={cls.date}
              text={article.createdAt}
            />
          </div>
          <Text
            text={article.title}
            className={cls.title}
          />
          {types}
          <img
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <Button
              onClick={onOpenArticle}
              theme={ButtonTheme.OUTLINE}
            >
              {t('Read')}
            </Button>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
      <Card className={cls.card} onClick={onOpenArticle}>
        <div className={cls.imageWrapper}>
          <img
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          <Text
            className={cls.date}
            text={article.createdAt}
          />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text
          text={article.title}
          className={cls.title}
        />
      </Card>
    </div>
  );
});
