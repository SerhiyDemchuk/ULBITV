import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore, AppDispatch } from './config/store';

export type {
  StateSchema,
  ThunkConfig,
  StateSchemaKey,
  ReduxStoreWithManager,
} from './config/StateSchema';

export type { AppDispatch };

export {
  StoreProvider,
  createReduxStore,
};
