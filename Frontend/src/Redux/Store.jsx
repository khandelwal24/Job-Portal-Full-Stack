import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from './authSlice.jsx'
import JobSlice from './JobSlice.jsx'
import CompanySlice from './CompanySlice.jsx'
import ApplicationSlice from './ApplicationSlice.jsx'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducers = combineReducers({
    auth:authSlice,
    job:JobSlice,
    company:CompanySlice,
    jobApplication:ApplicationSlice,
  });

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: 
    {
      /* ignore persistance actions */
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER
      ],
    },
  }),
});

export default store;