import { HStack } from '../../../Stack';
import cls from './ListBox.module.scss';
import { Fragment, ReactNode } from 'react';
import { Button } from '../../../Button/Button';
import { DropdownDirection } from 'shared/types/ui';
import popupCls from '../../styles/popup.module.scss';
import { Listbox as HListBox } from '@headlessui/react';
import { mapDirectionClass } from '../../styles/consts';
import { classNames } from 'shared/lib/classNames/classNames';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export const ListBox = (props: ListBoxProps) => {
  const {
    items,
    value,
    label,
    onChange,
    readonly,
    className,
    defaultValue,
    direction = 'bottom right',
  } = props;

  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap="16">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        as="div"
        value={value}
        disabled={readonly}
        onChange={onChange}
        className={classNames('', {}, [className, popupCls.popup])}
      >
        <HListBox.Button
          disabled={readonly}
          className={cls.trigger}
        >
          <Button disabled={readonly}>
            {value ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              as={Fragment}
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {({ active }) => (
                <li
                  className={classNames(cls.item, {
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled,
                  })}
                >
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
};
