import { combineReducers, createStore, applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { persistCombineReducers, persistStore,persistReducer  } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import LoginReducer from './redux/reducer'
import { loadingBarReducer } from 'react-redux-loading-bar'

import { loadState, saveState } from "./localStorage"

const loggerMiddleware = createLogger();

const rootReducer =  combineReducers({
  userData : LoginReducer,
})


const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = [thunk, loggerMiddleware];
export const store =  configureStore({
  reducer: persistedReducer,
  middleware: middleware,
  enhancers : [applyMiddleware(...middleware)]
})

export const persistor = persistStore(store, null)

