import { REHYDRATE } from 'redux-persist';
import { StateInfo } from "../../models/StateInfo";
import * as Types from '../actions';
import { replaceItem } from '../../utils';
const InitialStateInfo = {
    loading: false,
    data: {},
    list: [],
    error: null,
    listCurrentState: [],
    mapCurrentStateInfo: {}
};
const stateInfoState = (state = InitialStateInfo, action) => {
    var _a;
    let mapStateInfo = (_a = state.data) !== null && _a !== void 0 ? _a : {};
    switch (action.type) {
        case REHYDRATE: {
            if (action.payload && action.payload['stateInfoState']) {
                let list = action.payload['stateInfoState']['list'];
                let listCurrentState = action.payload['stateInfoState']['listCurrentState'];
                if (listCurrentState) {
                    listCurrentState.forEach((s) => {
                        let stateInfo = StateInfo.fromJS(s);
                        state.mapCurrentStateInfo[stateInfo.parentId] = stateInfo;
                    });
                    state.listCurrentState = listCurrentState;
                }
                if (list) {
                    list.forEach((t) => {
                        let stateInfo = StateInfo.fromJS(t);
                        mapStateInfo[stateInfo.id] = stateInfo;
                    });
                    state.data = mapStateInfo;
                }
            }
            return Object.assign({}, state);
        }
        case Types.GET_STATE_INFO: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case Types.GET_STATE_INFO_SUCCESS: {
            if (action.data) {
                action.data.forEach((s) => {
                    s = StateInfo.fromJS(s);
                    if (!mapStateInfo[s.id]) {
                        state.list.push(s);
                    }
                    else {
                        replaceItem(state.list, 'id', s);
                    }
                    mapStateInfo[s.id] = s;
                });
            }
            return Object.assign(Object.assign({}, state), { loading: false, data: mapStateInfo, error: null });
        }
        case Types.SET_CURRENT_STATE_INFO: {
            if (action.currentStateInfo) {
                let s = StateInfo.fromJS(action.currentStateInfo);
                if (state.mapCurrentStateInfo[s.parentId]) {
                    replaceItem(state.listCurrentState, 'id', s);
                }
                else {
                    state.listCurrentState.push(s);
                }
                state.mapCurrentStateInfo[s.parentId] = s;
            }
            return Object.assign({}, state);
        }
        case Types.GET_STATE_INFO_FAILURE: {
            return Object.assign(Object.assign({}, state), { loading: false, error: action.error });
        }
        default: return Object.assign({}, state);
    }
};
export default stateInfoState;
