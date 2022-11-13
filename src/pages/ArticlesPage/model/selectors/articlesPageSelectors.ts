import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view;
export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error;
export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page || 1;
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit || 9;
export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading;
