import { CounterSchema } from 'entities/Counter';
import {
  counterActions,
  counterReducer,
} from 'entities/Counter/model/slice/counterSlice';

describe('counterSlice.test', () => {
  test('decrease counter state by one', () => {
    const state: CounterSchema = { value: 10 };
    expect(counterReducer(state, counterActions.decrement())).toEqual({ value: 9 });
  });
  test('increase counter state by one', () => {
    const state: CounterSchema = { value: 10 };
    expect(counterReducer(state, counterActions.increment())).toEqual({ value: 11 });
  });
  test('should work with the empty state', () => {
    expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 });
  });
});
