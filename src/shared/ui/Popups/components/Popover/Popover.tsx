import { ReactNode } from 'react';
import cls from './Popover.module.scss';
import { DropdownDirection } from '@/shared/types/ui';
import popupCls from '../../styles/popup.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import { Popover as HPopover } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';

interface PopoverProps {
  className?: string;
  trigger?: ReactNode;
  direction?: DropdownDirection;
  children: ReactNode;
}

export const Popover = (props: PopoverProps) => {
  const {
    trigger,
    children,
    className,
    direction = 'bottom right',
  } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <HPopover
      className={classNames('', {}, [className, popupCls.popup])}
    >
      <HPopover.Button className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel
        className={classNames(cls.panel, {}, menuClasses)}
      >
        {children}
      </HPopover.Panel>
    </HPopover>
  );
};
