import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Country } from '../../model/types/country';
import { ListBox } from '@/shared/ui/Popups/components/ListBox/ListBox';

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

export const CountrySelect = memo((props: CountrySelectProps) => {
  const {
    value,
    onChange,
    readonly,
    className,
  } = props;
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country);
  }, [onChange]);

  return (
    <ListBox
      value={value}
      items={options}
      readonly={readonly}
      className={className}
      direction="top right"
      onChange={onChangeHandler}
      label={t('Choose country')}
      defaultValue={t('Choose country')}
    />
  );
});
