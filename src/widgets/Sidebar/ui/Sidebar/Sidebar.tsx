import cls from './Sidebar.module.scss';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/ui/Stack';
import { memo, useMemo, useState } from 'react';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { SidebarItemType } from '../../model/types/sidebar';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(() => sidebarItemsList.map((item: SidebarItemType) => (
    <SidebarItem
      item={item}
      key={item.path}
      collapsed={collapsed}
    />
  )), [collapsed, sidebarItemsList]);

  return (
    <aside
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
      <VStack role="navigation" gap="8" className={cls.items}>
        {itemsList}
      </VStack>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher
          short={collapsed}
          className={cls.lang}
        />
      </div>
    </aside>
  );
});
