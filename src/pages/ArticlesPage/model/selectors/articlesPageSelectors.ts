import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view;
export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error;
export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading;
