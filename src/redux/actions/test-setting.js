import * as Types from './types.js';
export const loadTestSettingByTopicId = (params) => {
    return {
        type: Types.LOAD_TEST_SETTING_BY_TOPIC_ID,
        appId: params.appId,
        topicId: params.topicId,
        topicIds: params.topicIds
    };
};
export const saveNewTestSetting = (params) => {
    return {
        type: Types.SAVE_NEW_TEST_SETTING,
        setting: params.setting,
        topicId: params.topicId,
        appId: params.appId
    };
};