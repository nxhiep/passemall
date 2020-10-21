import { combineReducers } from "redux";
import appValueState from "./appValue";
import cardReducer from './card';
import cardProgressReducer from './cardProgress';
import gameReducer from './game';
import listGameReducer from './listGames';
import stateInfoState from "./stateInfo";
import { testSettingReducer } from "./test-setting";
import topicReducer from './topic';
import topicProgressReducer from "./topicProgress";
import testInfoReducer from "./TestInfo"
const rootReducer = combineReducers({
    topicReducer,
    cardProgressReducer,
    cardReducer,
    gameState: gameReducer,
    listGameState: listGameReducer,
    testSettingState: testSettingReducer,
    topicProgressReducer: topicProgressReducer,
    appValueState: appValueState,
    stateInfoState: stateInfoState,
    testInfoReducer: testInfoReducer
});
export default rootReducer;
