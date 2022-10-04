import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getCounter } from 'entities/Counter/model/selectors/getCounter/getCounter';

export const getCounterValue = createSelector(
  getCounter,
  (counter) => counter.value,
);
