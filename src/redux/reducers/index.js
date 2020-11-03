import { combineReducers } from "redux";
import appValueState from "./appValue";
import cardReducer from './card';
import cardProgressReducer from './cardProgress';
import gameReducer from './game';
import listGameReducer from './listGames';
import stateInfoState from "./stateInfo";
import topicReducer from './topic';
import topicProgressReducer from "./topicProgress";
import testInfoReducer from "./TestInfo";
import timeLeftReducer from "./timeLeft"
const rootReducer = combineReducers({
    topicReducer,
    cardProgressReducer,
    cardReducer,
    gameState: gameReducer,
    listGameState: listGameReducer,
    topicProgressReducer: topicProgressReducer,
    appValueState: appValueState,
    stateInfoState: stateInfoState,
    testInfoReducer: testInfoReducer,
    timeLeftReducer: timeLeftReducer,
});
export default rootReducer;
