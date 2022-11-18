import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage';
import { articleDetailsCommentsReducer } from '../../model/slices/articleDetailsCommentsSlice';
import { articleDetailsPageRecommendationsReducer } from '../../model/slices/articleDetailsPageRecommendationsSlice';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  recommendations: articleDetailsPageRecommendationsReducer,
  comments: articleDetailsCommentsReducer,
});
