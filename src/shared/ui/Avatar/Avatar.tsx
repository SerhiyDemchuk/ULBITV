import { Icon } from '../Icon';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import { Skeleton } from '../Skeleton';
import { CSSProperties, useMemo } from 'react';
import UserIcon from '../../assets/icons/user-filled.svg';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

export const Avatar = (props: AvatarProps) => {
  const { alt, src, className, size = 100, fallbackInverted } = props;
  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size],
  );

  const fallback = <Skeleton width={size} height={size} border='50%' />;
  const errorFallback = (
    <Icon
      width={size}
      height={size}
      Svg={UserIcon}
      inverted={fallbackInverted}
    />
  );

  return (
    <AppImage
      src={src}
      alt={alt}
      style={styles}
      fallback={fallback}
      errorFallback={errorFallback}
      className={classNames(cls.Avatar, mods, [className])}
    />
  );
};
