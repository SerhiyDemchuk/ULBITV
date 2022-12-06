import {
  memo,
  useRef,
  UIEvent,
  ReactNode,
  MutableRefObject,
} from 'react';
import cls from './Page.module.scss';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useThrottle } from '@/shared/lib/hooks/useThrottle';
import { getUIScrollByPath, uiActions } from '@/features/UI';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector(
    (stata: StateSchema) => getUIScrollByPath(stata, pathname),
  );

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(uiActions.setScrollPosition({
      position: e.currentTarget.scrollTop,
      path: pathname,
    }));
  }, 500);

  return (
    <main
      id={PAGE_ID}
      ref={wrapperRef}
      onScroll={onScroll}
      className={classNames(cls.Page, {}, [className])}
    >
      {children}
      {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
    </main>
  );
});
