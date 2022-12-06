import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comment';
import { StateSchema } from '@/app/providers/StoreProvider';
import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentSchema } from '../types/ArticleDetailsCommentSchema';

const commentAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
});

export const getArticleComments = commentAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.comments || commentAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsCommentsSlice',
  initialState: commentAdapter.getInitialState<ArticleDetailsCommentSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchCommentsByArticleId.fulfilled, (
        state,
        action: PayloadAction<Comment[]>,
      ) => {
        state.isLoading = false;
        commentAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
