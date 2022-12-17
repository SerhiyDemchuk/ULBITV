import { memo, useMemo } from 'react';
import { SortOrder } from '@/shared/types';
import { useTranslation } from 'react-i18next';
import cls from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '../../../Article';
import { Select, SelectOption } from '@/shared/ui/Select';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const {
    sort,
    order,
    className,
    onChangeSort,
    onChangeOrder,
  } = props;
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
    {
      value: 'asc',
      content: t('ascending'),
    },
    {
      value: 'desc',
      content: t('descending'),
    },
  ], [t]);

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
    {
      value: ArticleSortField.CREATED,
      content: t('created'),
    },
    {
      value: ArticleSortField.TITLE,
      content: t('title'),
    },
    {
      value: ArticleSortField.VIEWS,
      content: t('views'),
    },
  ], [t]);

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select
        value={sort}
        onChange={onChangeSort}
        label={t('Sort by')}
        options={sortFieldOptions}
      />
      <Select
        value={order}
        label={t('by')}
        className={cls.order}
        options={orderOptions}
        onChange={onChangeOrder}
      />
    </div>
  );
});
