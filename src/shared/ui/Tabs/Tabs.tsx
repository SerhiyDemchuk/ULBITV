import cls from './Tabs.module.scss';
import { memo, ReactNode, useCallback } from 'react';
import { Card, CardTheme } from '@/shared/ui/Card';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

export const Tabs = memo((props: TabsProps) => {
  const {
    tabs,
    value,
    className,
    onTabClick,
  } = props;

  const clickHandle = useCallback((tab: TabItem) => () => {
    onTabClick(tab);
  }, [onTabClick]);

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          key={tab.value}
          onClick={clickHandle(tab)}
          className={cls.tab}
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});
