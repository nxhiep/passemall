import { call, fork, put, select, take } from 'redux-saga/effects';
import Config from '../../config.js';
import { getCardsByIdsSuccess, resetProgressInTopic, resetTestInfoCorrectQuestions, setTestInfoStatusEnd, setTestInfoStatusPlaying, setTestInfoUnlock, updateCardProgress, updateTestInfoProgress } from '../actions';
import { resumeGame, startNewGame, updateListGame, } from '../actions/game';
import { setTimeLeftState } from '../actions/timeLeft.js';
import * as Types from '../actions/types.js';
import { calcularTopicsProgress, resetTopicProgress } from './../actions/topicProgress';
import * as CARD_PROGRESS_API from './cardProgressSaga';
import * as CARD_API from './cardSaga';
function* startGameReload() {
    while (true) {
        yield startGame();
    }
}
function* startGame() {
    let action = yield take(Types.GAME_LOAD_GAME);
    let gameState = yield select((state) => state.gameState);
    let timeTest = action.timeTest
    let topicReducer = yield select((state) => state.topicReducer);
    let id = action.payload;
    let level = action.level;
    let passPercent = action.passPercent
    let appId = action.appId
    let topic = topicReducer.data[id]
    let gameType = action.gameType;
    let questionIds = action.questionIds;
    let currentGame;
    if (gameType === Config.STUDY_GAME || gameType === Config.REVIEW_GAME) {
        currentGame = yield select((state) => {
            let games = state.listGameState.games;
            return games.find((item) => (item.id == id && item.gameType == gameType));
        });
    }
    else {
        currentGame = yield select((state) => {
            let games = state.listGameState.games;
            if (level) {
                return games.find((item) => (item.id == (id + "-" + level) && item.gameType == Config.TEST_GAME));
            } else {
                if (games.length > 0) {
                    let arr = games.filter((item) => {
                        return (item.id.toString().search(id.toString()) !== -1 && item.gameType === Config.TEST_GAME)
                    })
                    let arr2 = arr.sort((a, b) => {

                        return a.lastUpdate - b.lastUpdate
                    });
                    return arr2[arr2.length - 1];
                }
            }
        });
    }

    console.log("xxxxx", currentGame, "xxxxx", level)
    if (currentGame == null || currentGame == undefined) {
        if (gameType === Config.STUDY_GAME || gameType === Config.REVIEW_GAME) {
            let cards;
            if (questionIds && questionIds.length > 0) {
                cards = yield call(CARD_API.getCardsByIdsAPI, questionIds);
            }
            else {
                cards = yield call(CARD_API.getCardByParentIdForStudy, id);
            }
            yield put(getCardsByIdsSuccess(cards));
            yield CARD_PROGRESS_API.getQuestionsProgress(cards);
            yield put(startNewGame({
                appId: appId,
                topicId: id,
                cards: cards,
                gameType: gameType
            }));
        }
        else {
            if (level >= 0) {
                console.log("xxx running")
                yield put(setTestInfoStatusPlaying(id))
                const cards = yield call(CARD_API.getCardForTest, id);
                yield put(getCardsByIdsSuccess(cards));
                yield put(startNewGame({
                    appId: appId,
                    topicId: id + "-" + level,
                    cards: cards,
                    level: level,
                    gameType: gameType,
                    timeTest: timeTest,
                    passPercent: passPercent
                }));
                if (level === Config.HARD_LEVEL) {
                    yield put(setTimeLeftState({ id: id + "-" + level, timeLeft: timeTest }))
                } else {
                    if (level === Config.VERY_HARD_LEVEL) {
                        yield put(setTimeLeftState({ id: id + "-" + level, timeLeft: Math.round(timeTest / cards.length) }))
                    }
                }
            }
        }
    }
    else {
        yield put(resumeGame(currentGame));
        let gameState = yield select((state) => state.gameState);
        // if (topic) {
        //     if (topic.getPercentComplete() === 0) {
        //         yield put(resetQuestionProgress());
        //         yield put(updateListGame(gameState.appId, gameState.id, gameState));
        //     }
        // } else {
        if (currentGame.gameType === Config.TEST_GAME) {
            yield put(updateListGame(gameState.appId, gameState.id, gameState));
        }
        // }

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
function* onEndGame() {
    while (true) {
        try {
            let action = yield take(Types.GAME_END_GAME);
            const gameState = yield select((state) => state.gameState);
            yield put(setTestInfoStatusEnd(gameState.id.substring(0, gameState.id.length - 2), gameState.status))
            yield put(updateListGame(gameState.appId, gameState.id, gameState));
            if (gameState.gameType === Config.TEST_GAME) {
                let id = gameState.id.substring(0, gameState.id.length - 2);
                yield put(setTestInfoUnlock(id))
            }
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
            if (gameState.gameType === Config.TEST_GAME && gameState.level !== Config.EASY_LEVEL) {
                let questionId = gameState.currentQuestion.id;
                let testId = gameState.id.substring(0, gameState.id.length - 2);
                if (gameState.currentQuestion.questionStatus === Config.QUESTION_ANSWERED_CORRECT) {
                    yield put(updateTestInfoProgress(testId, questionId, gameState.level));
                }
            }
            if (gameState.gameType === Config.TEST_GAME && gameState.level === Config.VERY_HARD_LEVEL) {
                yield put(setTimeLeftState({ id: gameState.id, timeLeft: Math.round(gameState.timeTest / gameState.questions.length) }))
            }
        }
        catch (error) {
        }
    }
}
function* onResetQuestion() {
    while (true) {
        try {
            yield take(Types.RESET_QUESTION_PROGRESS);
            let gameState = yield select((state) => state.gameState);
            yield put(updateListGame(gameState.appId, gameState.id, gameState));
            let topicProgressReducer = yield select((state) => state.topicProgressReducer)
            if (gameState.gameType !== Config.TEST_GAME) {
                let topicId = gameState.id;
                let topicProgress = topicProgressReducer.data[topicId];
                console.log("xxxxx topicProgress", topicProgress)
                yield put(resetProgressInTopic(topicId))
                yield put(resetTopicProgress(topicProgress));
            } else {
                if (gameState.level === Config.VERY_HARD_LEVEL) {
                    yield put(setTimeLeftState({ id: gameState.id, timeLeft: Math.round(gameState.timeTest / gameState.questions.length) }))
                }
                if (gameState.level === Config.HARD_LEVEL) {
                    yield put(setTimeLeftState({ id: gameState.id, timeLeft: gameState.timeTest }))
                }
                yield put(resetTestInfoCorrectQuestions(gameState.id.substring(0, gameState.id.length - 2)));
            }

        }
        catch {

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
                }
            } else {
                if (gameReducer.level === Config.EASY_LEVEL) {
                    let questionId = gameReducer.currentQuestion.id;
                    let testId = gameReducer.id.substring(0, gameReducer.id.length - 2);
                    if (gameReducer.currentQuestion.questionStatus === Config.QUESTION_ANSWERED_CORRECT) {
                        yield put(updateTestInfoProgress(testId, questionId, gameReducer.level));
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
    onEndGame(),
    onResetQuestion(),
];
