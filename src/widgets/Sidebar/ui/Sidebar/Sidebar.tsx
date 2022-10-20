import { memo, useState } from 'react';
import cls from './Sidebar.module.scss';
import { SidebarItemsList } from '../../model/items';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      data-testid="sidebar"
      className={classNames(
        cls.Sidebar,
        { [cls.collapsed]: collapsed },
        [className],
      )}
    >
      <Button
        square
        onClick={onToggle}
        size={ButtonSize.L}
        data-testid="sidebar-toggle"
        className={cls.collapsedBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
      >
        {collapsed ? '>' : '<'}
      </Button>
      <div className={cls.items}>
        {SidebarItemsList.map((item) => (
          <SidebarItem
            item={item}
            key={item.path}
            collapsed={collapsed}
          />
        ))}
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher
          short={collapsed}
          className={cls.lang}
        />
      </div>
    </div>
  );
});
