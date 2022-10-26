import cls from './Select.module.scss';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useMemo } from 'react';

export interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
  const {
    value,
    label,
    options,
    onChange,
    readonly,
    className,
  } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  const mods: Mods = {};

  const optionsList = useMemo(() => (
    options?.map((opt) => (
      <option
        key={opt.value}
        value={opt.value}
        className={cls.option}
      >
        {opt.content}
      </option>
    ))), [options]);

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && (
        <span className={cls.label}>{`${label}>`}</span>
      )}
      <select
        value={value}
        disabled={readonly}
        className={cls.select}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  );
});
