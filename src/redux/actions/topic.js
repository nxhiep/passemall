import * as Types from "./types";
export const getTopicById = (id) => {
    return {
        type: Types.GET_TOPIC_BY_ID,
        params: id,
    };
};
export const getTopicByIdSuccess = (topic) => {
    return {
        type: Types.GET_TOPIC_BY_ID_SUCCESS,
        params: topic ? topic.id : -1,
        topic: topic,
    };
};
export const getTopicByIdFailure = (id, error) => {
    return {
        type: Types.GET_TOPIC_BY_ID_FAILURE,
        params: id,
        error: error,
    };
};
export const getTopicsByParentId = (parentId) => {
    return {
        type: Types.GET_TOPICS_BY_PARENT_ID,
        params: parentId,
    };
};
export const getTopicsByParentIdSuccess = (parentId, topics) => {
    return {
        type: Types.GET_TOPICS_BY_PARENT_ID_SUCCESS,
        params: parentId,
        data: topics
    };
};
export const getTopicsByParentIdFailure = ( error) => {
    return {
        type: Types.GET_TOPICS_BY_PARENT_ID_FAILURE,
        error: error,
    };
};
