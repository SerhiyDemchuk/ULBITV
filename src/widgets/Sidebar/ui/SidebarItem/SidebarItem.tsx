import { memo } from 'react';
import cls from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import { SidebarItemType } from '../../model/items';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { classNames } from 'shared/lib/classNames/classNames';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;

}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  return (
    <AppLink
      to={item.path}
      className={classNames(cls.item, { [cls.collapsed]: collapsed })}
      theme={AppLinkTheme.SECONDARY}
    >
      <item.Icon className={cls.icon} />
      <span
        className={cls.link}
      >
        {t(item.text)}
      </span>
    </AppLink>
  );
});
