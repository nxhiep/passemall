import { REHYDRATE } from 'redux-persist';
import { StateInfo } from "../../models/StateInfo";
import * as Types from '../actions';
import { replaceItem } from '../../utils';
import Topic from '../../models/Topic';
const initState = {
    loading: false,
    error: null,
    data: {},
    list: []
}
const testInfoReducer = (state = initState, action) => {
    let mapTestInfo = {};
    switch (action.type) {
        case REHYDRATE: {
            if (action.payload && action.payload['testInfoReducer']) {
                let list = action.payload['testInfoReducer']['list'];
                if (list) {
                    list.forEach((t) => {
                        let testInfo = TestInfo.fromJS(t);
                        mapTopic[testInfo.appId] = topic;
                    });
                    state.loading = true;
                    state.data = mapTopic;
                    state.list = list;
                }
            }
            return { ...state };
        }
        // default :
    }
}
export default testInfoReducer