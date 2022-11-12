import { Article } from 'entities/Article';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

export const fetchArticlesList = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>>(
    'articleDetails/addCommentForArticle',
    async (articleId, thunkApi) => {
      const { extra, rejectWithValue } = thunkApi;

      try {
        const response = await extra.api.get<Article[]>('/articles', {
          params: {
            _expand: 'user',
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
