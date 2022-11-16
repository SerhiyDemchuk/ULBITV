import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { articlesPageActions } from '../../../model/slices/articlesPageSlice';
import { getArticlesPageInited } from '../../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../../model/services/fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async (_, thunkApi) => {
      const { getState, dispatch } = thunkApi;
      const inited = getArticlesPageInited(getState());
      if (!inited) {
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList({
          page: 1,
        }));
      }
    },
  );
