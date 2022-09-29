import cls from './AppLink.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import { FC } from 'react';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

interface AppLlinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink: FC<AppLlinkProps> = (props) => {
  const {
    to,
    theme = AppLinkTheme.PRIMARY,
    children,
    className,
    ...otherProps
  } = props;
  return (
    <Link
      to={to}
      {...otherProps}
      className={classNames(cls.AppLlink, {}, [className, cls[theme]])}
    >
      {children}
    </Link>
  );
};
