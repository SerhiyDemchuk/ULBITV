import cls from './AppLink.module.scss';
import { FC, memo, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

interface AppLlinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children?: ReactNode;
}

export const AppLink: FC<AppLlinkProps> = memo((props: AppLlinkProps) => {
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
});
