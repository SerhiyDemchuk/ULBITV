import { memo, useCallback } from 'react';
import cls from './CurrencySelect.module.scss';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { Currency } from '../../model/types/currency';
import { classNames } from 'shared/lib/classNames/classNames';

const options = [
  { value: Currency.UAH, content: Currency.UAH },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

export const CurrencySelect = memo(({
  value, onChange, readonly, className,
}: CurrencySelectProps) => {
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  return (
    <Select
      value={value}
      options={options}
      readonly={readonly}
      onChange={onChangeHandler}
      label={t('Choose currency')}
      className={classNames('', {}, [className])}
    />
  );
});
