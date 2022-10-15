import { useState } from 'react';
import cls from './Sidebar.module.scss';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { classNames } from 'shared/lib/classNames/classNames';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
// import MainIcon from 'shared/assets/icon/main-20-20.svg';
// import AboutIcon from 'shared/assets/icon/about-20-20.svg';
import MainIcon from '../../../../shared/assets/icons/main-20-20.svg';
import AboutIcon from '../../../../shared/assets/icons/about-20-20.svg';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { t } = useTranslation();
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
        <div className={cls.item}>
          <AppLink
            to={RoutePath.main}
            theme={AppLinkTheme.SECONDARY}
          >
            <MainIcon className={cls.icon} />
            <span
              className={cls.link}
            >
              {t('Main')}
            </span>
          </AppLink>
        </div>
        <div className={cls.item}>
          <AppLink
            to={RoutePath.about}
            theme={AppLinkTheme.SECONDARY}
          >
            <AboutIcon className={cls.icon} />
            <span
              className={cls.link}
            >
              {t('About site')}
            </span>
          </AppLink>
        </div>
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
};
