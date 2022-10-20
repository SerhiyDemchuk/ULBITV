import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProfileSchema } from 'entities/Profile/model/types/profileSchema';

const initialState: ProfileSchema = {
  error: '',
  readonly: true,
  data: undefined,
  isLoading: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
});

export const {
  actions: profileActions,
  reducer: profileReducer,
} = profileSlice;
