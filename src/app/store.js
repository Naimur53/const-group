import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/data/dataSlice';

export const store = configureStore({
  reducer: {
    data: counterReducer,
  },
});
