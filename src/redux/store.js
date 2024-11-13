import { legacy_createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import rootReducer from './reducers';


const persistConfig = {
  key: 'root',        
  storage,
  whitelist: ['usuario'],
  blackList: ['peliculas', 'pelicula', 'generos', 'idiomas', 'clasificaciones', 'directores', 'funciones']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = legacy_createStore(
  persistedReducer,
  applyMiddleware(thunk) 
);

const persistor = persistStore(store);

export { store, persistor };  