import { StoreProvider } from 'app/providers/StoreProvider/ui/StoreProvider';
import { createReduxStore, AppDispatch } from 'app/providers/StoreProvider/config/store';
import type { StateSchema, ReduxStoreWithManager } from 'app/providers/StoreProvider/config/StateSchema';

export {
  StateSchema,
  AppDispatch,
  StoreProvider,
  createReduxStore,
  ReduxStoreWithManager,
};
