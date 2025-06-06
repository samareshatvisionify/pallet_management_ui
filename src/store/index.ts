import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Import slices
import dashboardSlice from './slices/dashboardSlice';
import uiSlice from './slices/uiSlice';
import authSlice from './slices/authSlice';
import zoneSlice from './slices/zoneSlice';
import settingsSlice from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    ui: uiSlice,
    auth: authSlice,
    zones: zoneSlice,
    settings: settingsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for use throughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store; 