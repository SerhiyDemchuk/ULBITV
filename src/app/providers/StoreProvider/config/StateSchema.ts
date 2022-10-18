import {
  Reducer,
  AnyAction,
  CombinedState,
  EnhancedStore,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { UserSchema } from 'entities/User';
import { CounterSchema } from 'entities/Counter';
import { LoginSchema } from 'features/AuthByUsername';

export interface StateSchema {
  user: UserSchema;
  counter: CounterSchema;

  // Async reducers
  loginForm?: LoginSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  remove: (key: StateSchemaKey) => void;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}
