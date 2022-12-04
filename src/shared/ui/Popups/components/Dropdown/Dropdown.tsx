import cls from './Dropdown.module.scss';
import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { AppLink } from '../../../AppLink/AppLink';
import { DropdownDirection } from 'shared/types/ui';
import popupCls from '../../styles/popup.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import { classNames } from 'shared/lib/classNames/classNames';

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger?: ReactNode;
  direction?: DropdownDirection;
}

export const Dropdown = (props: DropdownProps) => {
  const {
    items,
    trigger,
    className,
    direction = 'bottom right',
  } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu
      as="div"
      className={classNames('', {}, [className, popupCls.popup])}
    >
      <Menu.Button
        className={popupCls.trigger}
      >
        {trigger}
      </Menu.Button>
      <Menu.Items
        className={classNames(cls.menu, {}, menuClasses)}
      >
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type="button"
              onClick={item.onClick}
              disabled={item.disabled}
              className={classNames(cls.item, { [popupCls.active]: active }, [className])}
            >
              {item.content}
            </button>
          );
          if (item.href) {
            return (
              <Menu.Item
                as={AppLink}
                to={item.href}
                key={Math.random()}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            );
          }
          return (
            <Menu.Item
              as={Fragment}
              key={Math.random()}
              disabled={item.disabled}
            >
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};
