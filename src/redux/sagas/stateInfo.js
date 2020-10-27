import { call, put, select, take, delay } from 'redux-saga/effects';
import { callApi } from '../../services';
import * as Actions from '../actions/stateInfo';
import * as Types from '../actions/types';
import { StateInfo } from './../../models/StateInfo';
function getStateInfoAPI(appId) {
    return callApi({ url: '/data?type=get_states&appId=' + appId, params: null, method: 'post' });
}
function* getStateInfoSaga() {
    while (true) {
        try {
            let action = yield take(Types.GET_STATE_INFO);
            let appId = action ? action.parentId : -1;
            let stateInfoState = yield select((appState) => appState.stateInfoState);
            let stateInfos = new Array();
            if (stateInfoState && stateInfoState.list) {
                stateInfoState.list.forEach((s) => {
                    s = StateInfo.fromJS(s);
                    stateInfos.push(s);
                });
            }
            if (stateInfos.length === 0) {
                let result = yield call(getStateInfoAPI, appId);
                result && result.forEach((s) => {
                    s = StateInfo.fromJS(s);
                    stateInfos.push(s);
                });
            }
            else {
                yield delay(0);
            }
            yield put(Actions.getStateInfoSuccess(stateInfos));
        }
        catch (e) {
            yield put(Actions.getStateInfoFailure(e));
        }
    }
}
export const stateInfoSaga = [
    getStateInfoSaga()
];
