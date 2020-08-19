import { call, fork, put, select, take } from 'redux-saga/effects';
import Config from '../../config.js';
import TestSetting from '../../models/TestSetting';
import { getCardsByIdsSuccess, saveNewTestSetting, updateCardProgress } from '../actions';
import { loadGame, removeLastGame, resumeGame, startNewGame, updateListGame } from '../actions/game';
import * as Types from '../actions/types.js';
import { calcularParentTopicsProgress, calcularTopicsProgress } from './../actions/topicProgress';
import * as CARD_PROGRESS_API from './cardProgressSaga';
import * as CARD_API from './cardSaga';
function* forceStartNewGame() {
    while (true) {
        let action = yield take(Types.START_NEW_TEST);
        let appId = action.appId;
        let topicId = action.topicId;
        let gameType = action.gameType;
        let setting = action.setting;
        let questionIds = action.questionIds;
        if (setting) {
            yield put(saveNewTestSetting({ appId: appId, setting: setting, topicId: topicId }));
        }
        yield put(removeLastGame(appId, topicId, gameType));
        yield put(loadGame({ appId: appId, topicId: topicId, gameType: gameType, setting: setting, questionIds: questionIds }));
    }
}
function* startGameReload() {
    while (true) {
        yield startGame();
    }
}
function* startGame() {
    let action = yield take(Types.GAME_LOAD_GAME);
    let topicId = action.payload;
    let appId = action.appId;
    let gameType = action.gameType;
    let testSetting;
    if (action.setting) {
        testSetting = TestSetting.fromJS(action.setting);
    }
    else {
        testSetting = new TestSetting(yield select((state) => {
            return state.testSettingState.currentSetting;
        }));
    }
    let questionIds = action.questionIds;
    let currentGame;
    if (gameType === Config.STUDY_GAME || gameType === Config.REVIEW_GAME) {

        currentGame = yield select((state) => {
            let games = state.listGameState.games;
            return games.find((item) => (item.id == topicId && item.gameType == gameType));
        });
    }
    else {
        currentGame = yield select((state) => {
            let games = state.listGameState.games;
            return games.find((item) => (item.id == topicId && item.gameType == Config.TEST_GAME));
        });
    }
    if (currentGame == null || currentGame == undefined) {
        if (gameType === Config.STUDY_GAME || gameType === Config.REVIEW_GAME) {
            let cards;
            if (questionIds && questionIds.length > 0) {
                cards = yield call(CARD_API.getCardsByIdsAPI, questionIds);
            }
            else {
                cards = yield call(CARD_API.getCardByParentIdForStudy, topicId);
            }
            yield put(getCardsByIdsSuccess(cards));
            yield CARD_PROGRESS_API.getQuestionsProgress(cards);
            yield put(startNewGame({
                appId: appId,
                topicId: topicId,
                cards: cards,
                gameType: gameType
            }));
        }
        else {
            const cards = yield call(CARD_API.getCardForTest, testSetting);
            yield put(getCardsByIdsSuccess(cards));
            yield CARD_PROGRESS_API.getQuestionsProgress(cards);
            yield put(startNewGame({
                appId: appId,
                topicId: topicId,
                cards: cards,
                gameType: gameType,
                setting: testSetting
            }));
        }
    }
    else {
        yield put(resumeGame(currentGame, testSetting));
    }
}
function* onSaveGame() {
    while (true) {
        try {
            let action = yield take(Types.START_NEW_GAME);
            let gameState = yield select((state) => state.gameState);
            yield put(updateListGame(action.appId, action.topicId, gameState));
        }
        catch (error) {
        }
    }
}
function* onContinue() {
    while (true) {
        try {
            yield take(Types.GAME_ON_CONTINUE);
            let gameState = yield select((state) => state.gameState);
            yield put(updateListGame(gameState.appId, gameState.id, gameState));
        }
        catch (error) {
        }
    }
}
function* onChoiceSelected() {
    while (true) {
        try {
            let action = yield take(Types.GAME_ON_CHOICE_SELECTED);
            let gameReducer = yield select((state) => state.gameState);
            let cardProgressReducer = yield select((state) => state.cardProgressReducer);
            let topicState = yield select((state) => state.topicReducer);
            yield put(updateListGame(gameReducer.appId, gameReducer.id, gameReducer, cardProgressReducer));
            if (gameReducer.gameType != Config.TEST_GAME) {
                let currentTopic = topicState.data[gameReducer.topicId];
                let selectedChoice = action.payload;
                let currentQuestion = gameReducer.questions.find((item) => {
                    return item.id == selectedChoice.questionId;
                });
                if (!currentTopic) {
                    if (currentQuestion) {
                        currentTopic = topicState.data[currentQuestion.parentId];
                    }
                }
                if (currentQuestion) {
                    yield put(updateCardProgress([currentQuestion.progress]));
                }
                if (currentTopic && gameReducer.gameType == Config.STUDY_GAME) {
                    yield put(calcularTopicsProgress(currentTopic, gameReducer.progress));
                    let currentParentTopic = topicState.data[currentTopic.parentId];
                    if (currentParentTopic) {
                        yield put(calcularParentTopicsProgress(currentTopic, currentParentTopic));
                    }
                }
            }
        }
        catch (error) {
        }
    }
}
export const gameSaga = [
    startGameReload(),
    onContinue(),
    onSaveGame(),
    onChoiceSelected(),
    forceStartNewGame(),
];
