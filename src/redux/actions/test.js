import * as Types from './types.js';
export const getTestInfoByAppId = (appId) => {
    return {
        type: Types.GET_TEST_INFO_BY_APP_ID,
        appId: appId
    }
}
export const getTestInfoByAppIdSuccess = (testInfos) => {
    return {
        type: Types.GET_ALL_APP_INFO_SUCCESS,
        testInfos: testInfos
    }
}
export const getTestInfoByAppIdFailure = (erorr) => {
    return {
        type: Types.GET_ALL_APP_INFO_FAILURE,
        error: error
    }
}