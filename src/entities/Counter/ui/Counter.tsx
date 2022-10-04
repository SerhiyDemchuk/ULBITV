import cls from './Counter.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from 'entities/Counter/model/slice/counterSlice';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { useTranslation } from 'react-i18next';

interface CounterProps {
  className?: string;
}

export const Counter = ({ className }: CounterProps) => {
  const dispatch = useDispatch();
  const counterValue = useSelector((state: StateSchema) => state.counter.value);
  const { t } = useTranslation();
  const increment = () => {
    dispatch(counterActions.increment());
  };
  const decrement = () => {
    dispatch(counterActions.decrement());
  };
  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button
        onClick={increment}
        data-testid="increment-btn"
      >
        {t('increment')}
      </Button>
      <Button
        onClick={decrement}
        data-testid="decrement-btn"
      >
        {t('decrement')}
      </Button>
    </div>
  );
};
