import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { StoreProvider } from 'app/providers/StoreProvider/ui/StoreProvider';
import type { StateSchema, ReduxStoreWithManager } from 'app/providers/StoreProvider/config/StateSchema';

export {
  StateSchema,
  StoreProvider,
  createReduxStore,
  ReduxStoreWithManager,
};
