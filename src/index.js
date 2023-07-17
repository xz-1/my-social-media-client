import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//configuration: especially for the persist state: setting the 'reducer': imports
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
//this for Redux persist (ONLY):
//Note: this is so that the information from /state/index.js
//initialState can be stored in the 'local state/space': meaning that the
//the browser tab is closed, so that user does not sign in again, all the data will still be there in the caches
//the only for the user to get rid of it, it is to clear their caches:
//Option: it is 'session storage (i think: it will storage the data on the server side)' 
//but if the tab is closed the data will go away
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

//configuration: especially for the persist state: setting the 'reducer': start:
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  //https://youtu.be/K8YELRmUb5o?t=7606
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER],
    },
  })
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);



