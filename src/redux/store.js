import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from './accountsReducer';
import userReducer from './userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    accounts: accountsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
