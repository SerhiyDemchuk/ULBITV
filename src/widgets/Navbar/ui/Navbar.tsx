import cls from './Navbar.module.scss';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUsername/ui';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button
        className={cls.links}
        onClick={onShowModal}
        theme={ThemeButton.CLEAR_INVERTED}
      >
        {t('Log in')}
      </Button>
      <LoginModal
        isOpen={isAuthModal}
        onClose={onCloseModal}
      />
    </div>
  );
};
