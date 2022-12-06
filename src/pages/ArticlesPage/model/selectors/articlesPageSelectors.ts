import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleSortField, ArticleType } from '@/entities/Article';

export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view;
export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error;
export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page || 1;
export const getArticlesPageInited = (state: StateSchema) => state.articlesPage?._inited;
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit || 9;
export const getArticlesPageSearch = (state: StateSchema) => state.articlesPage?.search ?? '';
export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading;
export const getArticlesPageOrder = (state: StateSchema) => state.articlesPage?.order ?? 'asc';
export const getArticlesPageType = (state: StateSchema) => state.articlesPage?.type ?? ArticleType.ALL;
export const getArticlesPageSort = (state: StateSchema) => state.articlesPage?.sort ?? ArticleSortField.CREATED;
