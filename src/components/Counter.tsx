import { useState } from 'react';
import classes from './Counter.module.scss';
import { Button } from 'shared/ui/Button/Button';

export const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  return (
    <div className={classes.btn}>
      <div>{count}</div>
      <Button onClick={increment}>Counter</Button>
    </div>
  );
};
