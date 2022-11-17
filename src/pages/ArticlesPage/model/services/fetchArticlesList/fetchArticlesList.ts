import {
  getArticlesPageNum,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageOrder,
  getArticlesPageLimit,
  getArticlesPageSearch,
} from '../../selectors/articlesPageSelectors';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article, ArticleType } from 'entities/Article';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';

interface FetchArticlesListProps {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>>(
    'articlesPage/addCommentForArticle',
    async (args, thunkApi) => {
      const { extra, rejectWithValue, getState } = thunkApi;
      const limit = getArticlesPageLimit(getState());
      const sort = getArticlesPageSort(getState());
      const order = getArticlesPageOrder(getState());
      const search = getArticlesPageSearch(getState());
      const page = getArticlesPageNum(getState());
      const type = getArticlesPageType(getState());

      try {
        addQueryParams({
          sort, order, search, type,
        });
        const response = await extra.api.get<Article[]>('/articles', {
          params: {
            _expand: 'user',
            _limit: limit,
            _page: page,
            _sort: sort,
            _order: order,
            q: search,
            type: type === ArticleType.ALL ? undefined : type,
          },
        });

        if (!response.data) {
          throw new Error();
        }

        return response.data;
      } catch (e) {
        return rejectWithValue('error');
      }
    },
  );
