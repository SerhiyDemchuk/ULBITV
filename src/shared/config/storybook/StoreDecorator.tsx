import { Story } from '@storybook/react';
import { profileReducer } from '@/features/editableProfileCard';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slices';
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addCommentFormReducer } from '@/features/addCommentForm/model/slices/addCommentFormSlice';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
);
