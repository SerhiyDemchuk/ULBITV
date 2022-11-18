import {
  Reducer,
  AnyAction,
  CombinedState,
  EnhancedStore,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { UISchema } from 'features/UI';
import { UserSchema } from 'entities/User';
import { CounterSchema } from 'entities/Counter';
import { LoginSchema } from 'features/AuthByUsername';
import { ArticleDetailsSchema } from 'entities/Article';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage';
import { ProfileSchema } from 'entities/Profile/model/types/profile';

export interface StateSchema {
  user: UserSchema;
  counter: CounterSchema;
  ui: UISchema;

  // Async reducers
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  addCommentForm?: AddCommentFormSchema;
  articlesPage?: ArticlesPageSchema;
  articleDetailsPage?: ArticleDetailsPageSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  remove: (key: StateSchemaKey) => void;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  state: StateSchema;
  extra: ThunkExtraArg;
}
