import { memo, useCallback } from 'react';
import cls from './CurrencySelect.module.scss';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { Country } from '../../model/types/country';
import { classNames } from 'shared/lib/classNames/classNames';

const options = [
  { value: Country.USA, content: Country.USA },
  { value: Country.Poland, content: Country.Poland },
  { value: Country.Ukraine, content: Country.Ukraine },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
];

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

export const CountrySelect = memo(({
  value, onChange, readonly, className,
}: CountrySelectProps) => {
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country);
  }, [onChange]);

  return (
    <Select
      value={value}
      options={options}
      readonly={readonly}
      onChange={onChangeHandler}
      label={t('Choose country')}
      className={classNames('', {}, [className])}
    />
  );
});
