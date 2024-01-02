import { persistReducer, persistStore } from 'redux-persist';
import appReducer from './index'
import { thunk } from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
  key: 'root',
  storage :AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(persistedReducer,{}, applyMiddleware(thunk));
export const persistor = persistStore(store);
