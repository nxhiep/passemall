import { REHYDRATE } from 'redux-persist';
import Config from '../../config.js';
import * as Types from '../actions/types.js';
import { GameState } from "./game";
export class ListGamesState {
    constructor(props) {
        this.listGames = new Map();
        this.games = new Array();
        if (props) {
            for (let i = 0; i < props.games.length; i++) {
                const element = props.games[i];
                let xxx = GameState.cloneGameState(element);
                this.games.push(xxx);
            }
        }
    }
    static init() {
        return new ListGamesState();
    }
    static updateListGame(beforeState, topicId, gameState) {
        var _a, _b;
        let currentListGame = (_a = beforeState.listGames.get(topicId)) !== null && _a !== void 0 ? _a : new Array();
        currentListGame = (_b = currentListGame.filter((item) => item.id !== gameState.id)) !== null && _b !== void 0 ? _b : [];
        currentListGame.push(gameState);
        beforeState.listGames.set(topicId, currentListGame);
        return beforeState;
    }
    static removeGame(beforeState, topicId) {
        beforeState.listGames.delete(topicId);
        return beforeState;
    }
}
const listGamesReducer = (state = ListGamesState.init(), action) => {
    var _a;
    switch (action.type) {
        case REHYDRATE:
            if (action.payload) {
                let localList = action.payload['listGameState'];
                return new ListGamesState(localList);
            }
            else
                return state;
        case Types.GAME_UPDATE_LIST_GAME:
            let gameReducer = action.payload;
            let temp = new ListGamesState(state);
            if (gameReducer.gameType !== Config.REVIEW_GAME) {
                let topicIdx = action.topicId;
                temp = ListGamesState.updateListGame(temp, topicIdx, gameReducer);
                temp.games = temp.games.filter((item) => (item.id != gameReducer.id));
                temp.games.push(gameReducer);
                if (gameReducer.gameType === Config.STUDY_GAME) {
                    if (action.questionProgressState) {
                        let questionProgressState = action.questionProgressState;
                        if (!questionProgressState.data) {
                            questionProgressState.data = {};
                        }
                        if (gameReducer.currentQuestion) {
                            questionProgressState.data[gameReducer.currentQuestion.id] = (_a = gameReducer.currentQuestion) === null || _a === void 0 ? void 0 : _a.progress;
                        }
                    }
                }
            }
            return temp;
        case Types.REMOVE_GAME:
            let topicId = action.topicId;
            let gameType = action.gameType;
            state.games = state.games.filter((item) => (item.id != topicId && item.gameType != gameType));
            return state;
        default: return state;
    }
};
export default listGamesReducer;
