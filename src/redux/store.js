import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore } from 'redux';
import createEncryptor from "redux-persist-transform-encrypt";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';
import Config from '../config';
import rootReducer from './reducers/index';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== "production") {
        const { composeWithDevTools } = require("redux-devtools-extension");
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
    if (isServer) {
        //If it's on server side, create a store
        const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));
        sagaMiddleware.run(rootSaga);
        return store;
    } else {
        //If it's on client side, create a store which will persist
        const { persistStore, persistReducer } = require("redux-persist");
        const encryptor = createEncryptor({
            secretKey: Config.SECRET_KEY,
            onError: function (error) {
            },
        });
        const storage = require("redux-persist/lib/storage").default;

        const persistConfig = {
            key: 'root',
            storage,
            stateReconciler: autoMergeLevel2,
            transform: [encryptor],
            whitelist: ["cardReducer", "listGameState",
                "cardProgressReducer", "topicReducer", "testSettingState",
                "topicProgressReducer", "stateInfoState", "testInfoReducer", "timeLeftReducer"]
        };

        const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer

        const store = createStore(
            persistedReducer,
            bindMiddleware([sagaMiddleware])
        ); // Creating the store again
        store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
        sagaMiddleware.run(rootSaga);
        return store;
    }
};

export const wrapper = createWrapper(makeStore);