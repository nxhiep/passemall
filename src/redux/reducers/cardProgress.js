import { REHYDRATE } from 'redux-persist';
import * as Types from "../actions/types";
import QuestionProgress from "../../models/QuestionProgress";
import { replaceItem } from '../../utils';
const InitialQuestionProgressState = {
    loading: false,
    data: {},
    error: null,
    list: [],
};
const cardProgressReducer = (state = InitialQuestionProgressState, action) => {
    var _a, _b, _c, _d;
    let mapProgress = (_a = state.data) !== null && _a !== void 0 ? _a : {};
    switch (action.type) {
        case REHYDRATE: {
            if (action.payload) {
                let list = (_b = action.payload.cardProgressReducer) === null || _b === void 0 ? void 0 : _b.list;
                if (list) {
                    list.forEach((value) => {
                        let qp = QuestionProgress.fromJs(value);
                        mapProgress[qp.questionId] = qp;
                    });
                    state.list = list;
                    state.data = mapProgress;
                }
            }
            return Object.assign({}, state);
        }
        case Types.GET_CARDS_PROGRESS: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case Types.GET_CARDS_PROGRESS_SUCCESS: {
            let questionProgress = (_c = action.data) !== null && _c !== void 0 ? _c : new Array();
            if (questionProgress) {
                questionProgress.forEach((p) => {
                    let progress = QuestionProgress.fromJs(p);
                    if (!mapProgress[p.questionId]) {
                        state.list.push(progress);
                    }
                    else {
                        replaceItem(state.list, 'id', progress);
                    }
                    mapProgress[p.questionId] = progress;
                });
            }
            return Object.assign(Object.assign({}, state), { loading: false, data: mapProgress, error: null });
        }
        case Types.GET_CARDS_PROGRESS_FAILURE: {
            return Object.assign(Object.assign({}, state), { loading: false, error: action.error });
        }
        case Types.UPDATE_QUESTION_PROGRESS: {
            let questionProgress = (_d = action.data) !== null && _d !== void 0 ? _d : new Array();
            if (mapProgress && questionProgress) {
                questionProgress.forEach((p) => {
                    let progress = QuestionProgress.fromJs(p);
                    if (!mapProgress[p.questionId]) {
                        state.list.push(progress);
                    }
                    else {
                        replaceItem(state.list, 'id', progress);
                    }
                    mapProgress[p.questionId] = progress;
                });
            }
            return Object.assign(Object.assign({}, state), { data: mapProgress });
        }
        case Types.GET_QUESTION_PROGRESS_BY_IDS: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case Types.GET_QUESTION_PROGRESS_BY_IDS_SUCCESS: {
            let questionProgress = action.data;
            if (questionProgress) {
                questionProgress.forEach((p) => {
                    let progress = QuestionProgress.fromJs(p);
                    if (!mapProgress[progress.questionId]) {
                        state.list.push(progress);
                    }
                    else {
                        replaceItem(state.list, 'id', progress);
                    }
                    mapProgress[progress.questionId] = progress;
                });
            }
            return Object.assign(Object.assign({}, state), { loading: false, data: mapProgress, error: null });
        }
        case Types.GET_QUESTION_PROGRESS_BY_IDS_FAILURE: {
            return Object.assign(Object.assign({}, state), { loading: false, error: action.error });
        }
        case Types.RESET_CARD_IN_TOPIC: {
            let topicId = action.topicId;
            if (topicId) {
                state.list.forEach((q) => {
                    let questionProgress = QuestionProgress.fromJs(q);
                    if (questionProgress.parentId == topicId) {
                        questionProgress.reset();
                        mapProgress[questionProgress.questionId] = questionProgress;
                    }
                });
            }
            return Object.assign(Object.assign({}, state), { data: mapProgress });
        }
        default:
            return state;
    }
};
export default cardProgressReducer;
