import {
  Article,
  ArticleView,
  ArticleType,
  ArticleSortField,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;

  // pagination
  page: number;
  limit: number;
  hasMore: boolean;
  // filters
  view: ArticleView;
  order: SortOrder;
  sort: ArticleSortField;
  search: string;
  type: ArticleType;

  _inited: boolean;
}
