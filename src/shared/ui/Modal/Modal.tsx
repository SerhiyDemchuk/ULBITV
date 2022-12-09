import cls from './Modal.module.scss';
import React, { ReactNode } from 'react';
import { Portal } from '../Portal/Portal';
import { useModal } from '@/shared/lib/hooks/useModal';
import { useTheme } from '@/app/providers/ThemeProvider';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

interface ModalProps {
  lazy?: boolean;
  isOpen?: boolean;
  className?: string;
  children?: ReactNode;
  onClose?: () => void;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
  const {
    lazy,
    isOpen,
    onClose,
    children,
    className,
  } = props;
  const { isClosing, close, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  });
  const { theme } = useTheme();

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
        <div
          // onClick={close}
          className={cls.overlay}
        >
          <div className={cls.content}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
