import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getArticlesPageNum,
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
} from '../../../model/selectors/articlesPageSelectors';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { articlesPageActions } from '../../../model/slices/articlesPageSlice';
import { fetchArticlesList } from '../../../model/services/fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>>(
    'articlesPage/fetchNextArticlesPage',
    async (_, thunkApi) => {
      const { getState, dispatch } = thunkApi;
      const hasMore = getArticlesPageHasMore(getState());
      const page = getArticlesPageNum(getState());
      const isLoading = getArticlesPageIsLoading(getState());

      if (hasMore && !isLoading) {
        dispatch(articlesPageActions.setPage(page + 1));
        dispatch(fetchArticlesList({
          page: page + 1,
        }));
      }
    },
  );
