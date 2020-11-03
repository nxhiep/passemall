import * as Types from "./types";
export const getTopicById = (id, appId, bucket) => {
    return {
        type: Types.GET_TOPIC_BY_ID,
        params: id,
        appId: appId,
        bucket: bucket
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
export const getTopicsByParentIdFailure = (parentId, error) => {
    return {
        type: Types.GET_TOPICS_BY_PARENT_ID_FAILURE,
        error: error,
        params: parentId,
    };
};
export const resetProgressInTopic = (id) => {
    return {
        type: Types.RESET_PROGRESS_IN_TOPIC,
        topicId: id
    }
}
