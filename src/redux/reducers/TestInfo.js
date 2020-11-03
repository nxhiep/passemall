import { REHYDRATE } from 'redux-persist';
import * as Types from "../actions/types";
import { replaceItem } from "../../utils";
import TestInfo from '../../models/TestInfo';
import Config from '../../config';
const InitialTopisState = {
    loading: false,
    data: {},
    list: [],
    error: null,
    currentTopic: {}
};
const testInfoReducer = (state = InitialTopisState, action) => {
    let mapTestInfo = state.data ?? {};
    let mapCurrentTopic = state.currentTopic ?? {}
    switch (action.type) {
        case REHYDRATE: {
            if (action.payload && action.payload['testInfoReducer']) {
                let list = action.payload['testInfoReducer']['list'];
                if (list) {
                    list.forEach((t) => {
                        let testInfo = TestInfo.fromJS(t);
                        mapTestInfo[testInfo.id] = testInfo;
                    });
                    state.loading = true;
                    state.data = mapTestInfo;
                    state.list = list;
                    state.currentTopic = action.payload["testInfoReducer"]["currentTopic"]
                }
            }
            return { ...state };
        }
        case Types.GET_TEST_INFO_BY_APP_ID: {
            return { ...state, loading: true };
        }
        case Types.GET_TEST_INFO_BY_APP_ID_SUCCESS: {
            if (action.testInfos) {
                action.testInfos.forEach((el) => {
                    let testInfo = TestInfo.fromJS(el);
                    if (!mapTestInfo[testInfo.id]) {
                        state.list.push(testInfo);
                    } else {
                        replaceItem(state.list, 'id', testInfo);
                    }
                    mapTestInfo[testInfo.id] = testInfo;
                });
            }
            return { ...state, loading: false, data: mapTestInfo, error: null };
        }
        case Types.GET_TEST_INFO_BY_APP_ID_FAILURE: {
            return { ...state, loading: false, error: action.error };
        }
        case Types.SET_TEST_INFO_UNLOCK: {
            let currentTestInfo = mapTestInfo[action.id];
            state.list.forEach(el => {
                if (((el.index === currentTestInfo.index + 1) && ((el.topicId === currentTestInfo.topicId && el.topicId !== -1) || el.appId === currentTestInfo.appId))) {
                    let testInfo = mapTestInfo[el.id];
                    testInfo.lock = false;
                    mapTestInfo[testInfo.id] = testInfo;
                    replaceItem(state.list, 'id', testInfo);
                }
            })
            return { ...state, data: mapTestInfo, loading: false, error: null };
        }
        case Types.SET_TEST_INFO_PLAYING: {
            let testInfoNext = mapTestInfo[action.nextId];
            testInfoNext.playing = true;
            mapTestInfo[testInfoNext.id] = testInfoNext;
            replaceItem(state.list, 'id', testInfoNext);

            let testInfoPrev = mapTestInfo[action.prevId]
            testInfoPrev.playing = false;
            mapTestInfo[testInfoPrev.id] = testInfoPrev;
            replaceItem(state.list, 'id', testInfoPrev);
            return { ...state, data: mapTestInfo, loading: false, error: null };
        }
        case Types.UPDATE_TEST_INFO_PROGRESS: {
            let questionId = action.questionId;
            let testInfo = mapTestInfo[action.testId];
            testInfo.testQuestionData.forEach(el => {
                if (el.questionIds.indexOf(questionId) !== -1) {
                    el.correctQuestion[action.level - 1] += 1;
                }
            })
            mapTestInfo[testInfo.id] = testInfo;
            replaceItem(state.list, 'id', testInfo);
            return { ...state, data: mapTestInfo, loading: false, error: null };
        }
        case Types.SET_TEST_INFO_STATUS_PLAYING: {
            let id = action.id;
            let testInfo = mapTestInfo[id];
            testInfo.statusProgress = Config.TEST_STATUS_PLAYING;
            testInfo.progress = 0;
            mapTestInfo[testInfo.id] = testInfo;
            replaceItem(state.list, 'id', testInfo);
            return { ...state, data: mapTestInfo, loading: false, error: null };

        }
        case Types.SET_TEST_INFO_STATUS_END: {
            let id = action.id;
            let testInfo = mapTestInfo[id];
            testInfo.statusProgress = action.status;
            mapTestInfo[testInfo.id] = testInfo;
            replaceItem(state.list, 'id', testInfo);
            return { ...state, data: mapTestInfo, loading: false, error: null };
        }
        case Types.RESET_TEST_INFO_CORRECT_QUESTIONS: {
            let testInfo = mapTestInfo[action.testInfoId];
            testInfo.testQuestionData.forEach(el => {
                el.correctQuestion = [0, 0, 0];
            })
            mapTestInfo[testInfo.id] = testInfo;
            replaceItem(state.list, 'id', testInfo);
            return { ...state, data: mapTestInfo, loading: false, error: null };

        }
        case Types.GET_TEST_INFO_BY_APP_ID_AND_PARENT_ID: {
            return { ...state, loading: true };
        }
        case Types.GET_TEST_INFO_BY_APP_ID_AND_PARENT_ID_SUCCESS: {
            if (action.testInfos) {
                action.testInfos.forEach((el) => {
                    let testInfo = TestInfo.fromJS(el);
                    if (!mapTestInfo[testInfo.id]) {
                        state.list.push(testInfo);
                    } else {
                        replaceItem(state.list, 'id', testInfo);
                    }
                    mapTestInfo[testInfo.id] = testInfo;
                });
            }
            return { ...state, loading: false, data: mapTestInfo, error: null };
        }
        case Types.GET_TEST_INFO_BY_APP_ID_AND_PARENT_ID_FAILURE: {
            return { ...state, loading: false, error: action.error };
        }
        case Types.SET_CURRENT_TOPIC: {
            let id = action.topicId;
            let appId = action.appId;
            mapCurrentTopic[appId] = id;
            return { ...state, currentTopic: mapCurrentTopic }
        }
        default:
            return state;
    }
};

export default testInfoReducer;