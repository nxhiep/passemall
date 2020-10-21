import { REHYDRATE } from 'redux-persist';
import TestSetting from "../../models/TestSetting";
import * as Types from '../actions/types.js';
const initialState = {
    data: [],
    currentSetting: undefined
};
const testSettingReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOAD_TEST_SETTING_BY_TOPIC_ID:
            let appId = action.appId;
            let topicId = action.topicId;
            let topicIds = action.topicIds;
            let currentSetting = state.data.find((item) => (item.topicId == topicId));
            if (currentSetting) {
                state.currentSetting = currentSetting;
            }
            else {
                state.currentSetting = TestSetting.init(appId, topicId, topicIds);
            }
            return Object.assign({}, state);
        case REHYDRATE:
            let result = new Array();
            if (action.payload && action.payload['testSettingState']) {
                let lists = action.payload['testSettingState']['data'];
                if (lists) {
                    for (let i = 0; i < lists.length; i++) {
                        const element = lists[i];
                        let testSetting = TestSetting.fromJS(element);
                        result.push(testSetting);
                    }
                }
                let currentTestSettingData = action.payload['testSettingState']['currentSetting'];
                if (currentTestSettingData) {
                    state.currentSetting = TestSetting.fromJS(currentTestSettingData);
                }
                state.data = result;
            }
            return Object.assign({}, state);
        case Types.SAVE_NEW_TEST_SETTING: {
            let topicId = action.topicId;
            state.data = state.data.filter((item) => (item.topicId != topicId));
            state.data.push(action.setting);
            state.currentSetting = action.setting;
            return Object.assign({}, state);
        }
        default: return Object.assign({}, state);
    }
};
export { testSettingReducer };
