import cls from './Navbar.module.scss';
import { useSelector } from 'react-redux';
import { HStack } from '@/shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { getUserAuthData } from '@/entities/User';
import { Text, TextTheme } from '@/shared/ui/Text';
import { LoginModal } from '@/features/AuthByUsername';
import { getRouteArticles } from '@/shared/const/router';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { AvatarDropdown } from '@/features/avatarDropdown';
import React, { memo, useCallback, useState } from 'react';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { classNames } from '@/shared/lib/classNames/classNames';
import { NotificationButton } from '@/features/notificationButton';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text
          className={cls.appName}
          theme={TextTheme.INVERTED}
          title={t('Ulbi TV App')}
        />
        <AppLink to={getRouteArticles()} theme={AppLinkTheme.SECONDARY}>
          {t('Create article')}
        </AppLink>
        <HStack gap='16' className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button
        className={cls.links}
        onClick={onShowModal}
        theme={ButtonTheme.CLEAR_INVERTED}
      >
        {t('Log in')}
      </Button>
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
