import cls from './Select.module.scss';
import { ChangeEvent, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const {
    value,
    label,
    options,
    onChange,
    readonly,
    className,
  } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
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
};
