import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { loadingSlice } from './features/loading/loadingSlice';

const rootReducer = combineSlices(loadingSlice);

export const store = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the type of store
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
