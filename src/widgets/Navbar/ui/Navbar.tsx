import cls from './Navbar.module.scss';
import { AppLinkTheme, AppLlink } from 'shared/ui/AppLink/AppLink';
import { classNames } from 'shared/lib/classNames/classNames';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        <AppLlink
          to="/"
          className={cls.mainLink}
          theme={AppLinkTheme.SECONDARY}
        >
          Главная</AppLlink>
        <AppLlink
          to="/about"
          theme={AppLinkTheme.SECONDARY}
        >
          О сайте</AppLlink>
      </div>
    </div>
  );
};
