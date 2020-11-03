import { REHYDRATE } from 'redux-persist';
import * as Types from "../actions/types";
import { replaceItem } from '../../utils';
import TimeLeft from '../../models/TimeLeft';
const initialState = {
    loading: false,
    data: {},
    list: [],
    error: null,
};
const timeLeftReducer = (state = initialState, action) => {
    let mapTime = state.data ?? {};
    switch (action.type) {
        case REHYDRATE: {
            if (action.payload && action.payload['timeLeftReducer']) {
                let list = action.payload['timeLeftReducer']['list'];
                if (list) {
                    list.forEach((p) => {
                        let timeLeft = TimeLeft.fromJS(p);
                        mapTime[timeLeft.id] = timeLeft;
                        state.list.push(timeLeft);
                    });
                    state.list = list;
                    state.data = mapTime;
                }
            }
            return Object.assign({}, state);
        }
        case Types.SET_TIME_LEFT_STATE:
            let timeLeft = TimeLeft.fromJS(action.timeLeft)
            if (!mapTime[timeLeft.id]) {
                state.list.push(timeLeft);
            } else {
                replaceItem(state.list, 'id', timeLeft);
            }
            mapTime[timeLeft.id] = timeLeft;
            return { ...state, data: mapTime, loading: false, error: null };

        default:
            return state;
    }
};

export default timeLeftReducer;