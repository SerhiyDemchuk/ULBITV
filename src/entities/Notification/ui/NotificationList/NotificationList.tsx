import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import cls from './NotificationList.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useNotifications } from '../../api/notificationApi';
import { classNames } from '@/shared/lib/classNames/classNames';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className } = props;
  const { isLoading, data } = useNotifications(null, {
    pollingInterval: 5000,
  });

  if (isLoading) {
    return (
      <VStack
        max
        gap='16'
        className={classNames(cls.NotificationList, {}, [className])}
      >
        <Skeleton width='100%' border='8px' height='80px' />
        <Skeleton width='100%' border='8px' height='80px' />
        <Skeleton width='100%' border='8px' height='80px' />
      </VStack>
    );
  }

  return (
    <VStack
      max
      gap='16'
      className={classNames(cls.NotificationList, {}, [className])}
    >
      {data?.map((item) => (
        <NotificationItem item={item} key={item.id} />
      ))}
    </VStack>
  );
});
