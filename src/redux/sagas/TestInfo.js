import { call, put, select, take } from 'redux-saga/effects';
import TestInfo from '../../models/TestInfo';
import { callApi } from '../../services';
import * as Actions from '../actions/test';
import * as Types from '../actions/types';

function getTestInfoByAppIdApi(id, stateId) {
    if (stateId) {
        return callApi({ method: 'post', url: '/dataapi?type=get-test-info&appId=' + id + "&stateId=" + stateId, params: null, baseURl: "https://micro-enigma-235001.appspot.com/" });
    }
    return callApi({ method: 'post', url: '/dataapi?type=get-test-info&appId=' + id, params: null, baseURl: "https://micro-enigma-235001.appspot.com/" });
}
function getTestInfoByAppIdAndParentIdApi(appId, topicId) {
    return callApi({ method: 'post', url: '/dataapi?type=get-test-info&appId=' + appId + "&topicId=" + topicId, params: null, baseURl: "https://micro-enigma-235001.appspot.com/" });
}
function* getTestInfoApiCall(appId, stateId) {
    let testInfoReducer = yield select((state) => state.testInfoReducer);
    let listTestinfo = new Array();
    if (testInfoReducer && testInfoReducer.list) {
        testInfoReducer.list.forEach(el => {
            if (stateId) {
                if (el.stateId === stateId) {
                    listTestinfo.push(el)
                }
            } else {
                if (el.appId === appId) {
                    listTestinfo.push(el)
                }
            }
        })
        if (listTestinfo.length === 0) {
            listTestinfo = yield call(getTestInfoByAppIdApi, appId, stateId);
        }
    }

    return listTestinfo;
}
function* getTestInfoByParentSaga(appId, topicId) {
    let testInfoReducer = yield select((state) => state.testInfoReducer);
    let listTestinfo = new Array();
    if (testInfoReducer && testInfoReducer.list) {
        testInfoReducer.list.forEach(el => {
            if (el.topicId === topicId) {
                listTestinfo.push(el)
            }
        })
        if (listTestinfo.length === 0) {
            listTestinfo = yield call(getTestInfoByAppIdAndParentIdApi, appId, topicId);
        }
    }

    return listTestinfo;
}
function* getTestInfo() {
    while (true) {
        let action = yield take(Types.GET_TEST_INFO_BY_APP_ID);
        try {
            let data = yield call(getTestInfoApiCall, action.appId, action.stateId);
            let testInfos = new Array();
            if (data) {
                data.forEach(el => {
                    let testInfo = TestInfo.fromJS(el);
                    if (testInfo.index === 0 && testInfo.lock === true) {
                        testInfo.lock = false;
                    }
                    testInfos.push(testInfo);
                })
            }
            yield put(Actions.getTestInfoByAppIdSuccess(testInfos))
        }
        catch (e) {
            yield put(Actions.getTestInfoByAppIdFailure(e))
        }
    }
}
function* getTestInfoByAppIdAndParentId() {
    while (true) {
        let action = yield take(Types.GET_TEST_INFO_BY_APP_ID_AND_PARENT_ID);
        try {
            let testInfo = yield select((state) => state.testInfoReducer);
            let data
            let testInfos = new Array();
            if (testInfo.currentTopic[action.appId]) {
                data = yield call(getTestInfoByParentSaga, action.appId, testInfo.currentTopic[action.appId]);
            }
            console.log("xxxxx data", data)
            if (data) {
                data.forEach(el => {
                    let testInfo = TestInfo.fromJS(el);
                    if (testInfo.index === 0 && testInfo.lock === true) {
                        testInfo.lock = false;
                    }
                    testInfos.push(testInfo);
                })
            }
            yield put(Actions.getTestInfoByAppIdAndParentIdSuccess(testInfos))
        }
        catch (e) {
            yield put(Actions.getTestInfoByAppIdAndParentIdFailure(e))
        }
    }
}

export const testInfoSaga = [
    getTestInfo(),
    getTestInfoByAppIdAndParentId()
]