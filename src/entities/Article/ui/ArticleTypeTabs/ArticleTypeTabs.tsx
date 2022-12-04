import { useTranslation } from 'react-i18next';
import { ArticleType } from '../../../Article';
import { memo, useCallback, useMemo } from 'react';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { classNames } from 'shared/lib/classNames/classNames';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;
  const { t } = useTranslation();

  const typeTabs = useMemo<TabItem[]>(() => [
    {
      value: ArticleType.IT,
      content: t('IT'),
    },
    {
      value: ArticleType.ALL,
      content: t('All articles'),
    },
    {
      value: ArticleType.ECONOMICS,
      content: t('Economics'),
    },
    {
      value: ArticleType.SCIENCE,
      content: t('Science'),
    },
  ], [t]);

  const onTabClick = useCallback((tab: TabItem) => {
    onChangeType(tab.value as ArticleType);
  }, [onChangeType]);

  return (
    <Tabs
      value={value}
      tabs={typeTabs}
      onTabClick={onTabClick}
      className={classNames('', {}, [className])}
    />
  );
});
