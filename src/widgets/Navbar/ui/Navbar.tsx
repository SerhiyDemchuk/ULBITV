import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { useCallback, useState } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button
        className={cls.links}
        onClick={onToggleModal}
        theme={ThemeButton.CLEAR_INVERTED}
      >
        {t('Log in')}
      </Button>

      <Modal isOpen={isAuthModal} onClose={onToggleModal}>
        'Lorem ipsum dolor sit amet, consectetur it. Aliquid cumque cupiditate dignissimot.'
      </Modal>
    </div>
  );
};
