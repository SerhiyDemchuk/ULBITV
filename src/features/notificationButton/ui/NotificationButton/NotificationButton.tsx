import React, { memo } from 'react';
import { Popover } from 'shared/ui/Popups';
import { Icon } from 'shared/ui/Icon/Icon';
import cls from './NotificationButton.module.scss';
import { NotificationList } from 'entities/Notification';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;

  return (
    <Popover
      direction="bottom left"
      trigger={(
        <Button theme={ButtonTheme.CLEAR}>
          <Icon Svg={NotificationIcon} inverted />
        </Button>
      )}
      className={classNames('', {}, [className])}
    >
      <NotificationList
        className={cls.notifications}
      />
    </Popover>
  );
});
