import * as Types from './types.js';
export const getTestInfoByAppId = (appId, stateId) => {
    return {
        type: Types.GET_TEST_INFO_BY_APP_ID,
        appId: appId,
        stateId: stateId
    }
}
export const getTestInfoByAppIdSuccess = (testInfos) => {
    return {
        type: Types.GET_TEST_INFO_BY_APP_ID_SUCCESS,
        testInfos: testInfos
    }
}
export const getTestInfoByAppIdFailure = (error) => {
    return {
        type: Types.GET_TEST_INFO_BY_APP_ID_FAILURE,
        error: error
    }
}
export const setTestInfoUnlock = (id) => {
    return {
        type: Types.SET_TEST_INFO_UNLOCK,
        id: id
    }
}
export const setTestInfoPlaying = (prevId, nextId) => {
    return {
        type: Types.SET_TEST_INFO_PLAYING,
        prevId: prevId,
        nextId: nextId
    }
}
export const updateTestInfoProgress = (testId, questionId, level) => {
    return {
        type: Types.UPDATE_TEST_INFO_PROGRESS,
        testId: testId,
        questionId: questionId,
        level: level
    }
}
export const setTestInfoStatusEnd = (id, status) => {
    return {
        type: Types.SET_TEST_INFO_STATUS_END,
        id: id,
        status: status
    }
}
export const setTestInfoStatusPlaying = (id) => {
    return {
        type: Types.SET_TEST_INFO_STATUS_PLAYING,
        id: id
    }
}
export const resetTestInfoCorrectQuestions = (id) => {
    return {
        type: Types.RESET_TEST_INFO_CORRECT_QUESTIONS,
        testInfoId: id
    }
}
export const getTestInfoByAppIdAndParentId = (appId) => {
    return {
        type: Types.GET_TEST_INFO_BY_APP_ID_AND_PARENT_ID,
        appId: appId,
    }
}
export const getTestInfoByAppIdAndParentIdSuccess = (testInfos) => {
    return {
        type: Types.GET_TEST_INFO_BY_APP_ID_AND_PARENT_ID_SUCCESS,
        testInfos: testInfos
    }
}
export const getTestInfoByAppIdAndParentIdFailure = (error) => {
    return {
        type: Types.GET_TEST_INFO_BY_APP_ID_AND_PARENT_ID_FAILURE,
        error: error
    }
}
export const setCurrentTopic = (id, appId) => {
    return {
        type: Types.SET_CURRENT_TOPIC,
        topicId: id,
        appId: appId
    }
}