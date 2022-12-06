import { Text } from '@/shared/ui/Text/Text';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Card } from '@/shared/ui/Card/Card';
import { useTranslation } from 'react-i18next';
import cls from './ArticleListItem.module.scss';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import {
  Article,
  ArticleTextBlock,
} from '../../model/types/article';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { ArticleTextBlockComponent } from '../../ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleBlockType, ArticleView } from '../../model/consts/articleConsts';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const {
    view,
    target,
    article,
    className,
  } = props;
  const { t } = useTranslation();

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
            <AppLink
              target={target}
              to={RoutePath.article_details + article.id}
            >
              <Button
                theme={ButtonTheme.OUTLINE}
              >
                {t('Read')}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      target={target}
      to={RoutePath.article_details + article.id}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card}>
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
    </AppLink>
  );
});
