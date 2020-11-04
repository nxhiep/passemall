import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, } from 'redux';
import rootReducer from './reducers/index';
import { persistReducer, persistStore } from 'redux-persist';
import localforage from 'localforage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createEncryptor from 'redux-persist-transform-encrypt';
import Config from '../config';
import rootSagaHome from './sagas/sagaInHome';
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
typeof localforage !== 'undefined' && localforage.config({
    driver: localforage.LOCALSTORAGE,
    name: 'uTest',
    version: 1.0,
    size: 4980736,
    storeName: 'data',
    description: 'offline data for web',
});
const encryptor = createEncryptor({
    secretKey: Config.SECRET_KEY,
    onError: function (error) {
    },
});
const persistConfig = {
    key: 'root',
    storage: localforage,
    stateReconciler: autoMergeLevel2,
    transform: [encryptor],
    whitelist: ["cardReducer", "listGameState",
        "cardProgressReducer", "topicReducer",
        "topicProgressReducer", "stateInfoState", "testInfoReducer", "timeLeftReducer"]
};
const pReducer = persistReducer(persistConfig, rootReducer);

export default function configStore(
) {

    const store = createStore(
        pReducer,
        applyMiddleware(...middlewares));
    const persistor = persistStore(store, null)
    sagaMiddleware.run(rootSagaHome);
    return { store, persistor };
}