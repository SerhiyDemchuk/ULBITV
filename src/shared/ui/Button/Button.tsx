import {
  FC,
  memo,
  ReactNode,
  ButtonHTMLAttributes,
} from 'react';
import cls from './Button.module.scss';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline_red',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
  const {
    square,
    disabled,
    children,
    className,
    fullWidth,
    size = ButtonSize.M,
    theme = ButtonTheme.OUTLINE,
    ...otherProps
  } = props;
  const mods: Mods = {
    [cls[size]]: true,
    [cls[theme]]: true,
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
  };
  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(cls.Button, mods, [className])}
      {...otherProps}
    >
      {children}
    </button>
  );
});
