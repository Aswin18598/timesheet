import { applyMiddleware } from "@reduxjs/toolkit";
import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { WatchSagas } from "../sagas";
import { rootReducer } from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const sagaMiddleWare = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleWare));
const store = createStore(persistedReducer, enhancer);

const configureStore = () => {
  sagaMiddleWare.run(WatchSagas);
  return store;
};

const persistor = persistStore(store);
export { persistor, configureStore };
