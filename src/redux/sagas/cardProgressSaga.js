var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { delay, put, select, take } from 'redux-saga/effects';
import QuestionProgress from '../../models/QuestionProgress';
import * as Actions from '../actions/cardProgress';
import * as Types from '../actions/types';
import { updateListGame } from './../actions/game';
function* getAllCardsProgressSaga() {
    while (true) {
        try {
            yield take(Types.GET_CARDS_PROGRESS);
            let list = new Array();
            yield delay(0);
            yield put(Actions.getAllCardProgressSuccess(list));
        }
        catch (e) {
            yield put(Actions.getAllCardProgressFailure(e));
        }
    }
}
export function* getQuestionsProgress(cards) {
    var _a;
    let questionProgressState = yield select((state) => state.cardProgressReducer);
    let mapQuestionProgress = (_a = questionProgressState.data) !== null && _a !== void 0 ? _a : null;
    if (mapQuestionProgress) {
        cards.forEach((c) => {
            if (mapQuestionProgress[c.id]) {
                let p = QuestionProgress.fromJs(mapQuestionProgress[c.id]);
                c.progress = p;
            }
        });
    }
    else {
    }
}
function* updateCardProgress() {
    while (true) {
        try {
            let action = yield take(Types.UPDATE_QUESTION_PROGRESS);
            let questionsProgress = action.data;
            if (questionsProgress) {
                let gameReducer = yield select((state) => state.gameState);
                let cardProgressReducer = yield select((state) => state.cardProgressReducer);
                if (gameReducer && cardProgressReducer && gameReducer.id, gameReducer.topicId) {
                    yield put(updateListGame(gameReducer.id, gameReducer.topicId, gameReducer, cardProgressReducer));
                }
                else {
                }
            }
        }
        catch (e) {
        }
    }
}
function* getQuestionProgressByIds() {
    var _a;
    while (true) {
        try {
            let action = yield take(Types.GET_QUESTION_PROGRESS_BY_IDS);
            let ids = (_a = action.ids) !== null && _a !== void 0 ? _a : [];
            if (ids) {
                yield put(Actions.getQuestionProgressByIdsSuccess(ids, []));
            }
        }
        catch (e) {
            yield put(Actions.getQuestionProgressByIdsFailure(e));
        }
    }
}
export const cardsProgressSaga = [
    getAllCardsProgressSaga(),
    updateCardProgress(),
    getQuestionProgressByIds(),
];
