import * as Types from './types';
export const getStateInfo = (parentId) => {
    return {
        type: Types.GET_STATE_INFO,
        parentId: parentId
    };
};
export const getStateInfoSuccess = (states) => {
    return {
        type: Types.GET_STATE_INFO_SUCCESS,
        data: states
    };
};
export const getStateInfoFailure = (error) => {
    return {
        type: Types.GET_STATE_INFO_FAILURE,
        error: error
    };
};
export const setCurrentStateInfo = (stateInfo) => {
    return {
        type: Types.SET_CURRENT_STATE_INFO,
        currentStateInfo: stateInfo
    };
};
