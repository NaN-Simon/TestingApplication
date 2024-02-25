import { configureStore } from '@reduxjs/toolkit';
import questSlice from './reducers/questSlice';

export const store = configureStore({
  reducer: {
    questReducer: questSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
