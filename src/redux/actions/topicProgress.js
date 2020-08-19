import * as Types from "./types";
export const resetTopicProgress = (topicProgress) => {
    return {
        type: Types.RESET_TOPIC_PROGRESS,
        topicProgress: topicProgress,
    };
};
export const calcularTopicsProgress = (topic, progress) => {
    return {
        type: Types.CALCULAR_TOPICS_PROGRESS,
        topic: topic,
        progress: progress,
    };
};
export const calcularParentTopicsProgress = (childTopic, parentTopic) => {
    return {
        type: Types.CALCULAR_PARENT_TOPICS_PROGRESS,
        topic: childTopic,
        parentTopic: parentTopic,
    };
};
export const updateTopicsProgress = (topicsProgress) => {
    return {
        type: Types.UPDATE_TOPICS_PROGRESS,
        data: topicsProgress
    };
};
export const updateTopicsProgressSuccess = (topicsProgress) => {
    return {
        type: Types.UPDATE_TOPICS_PROGRESS_SUCCESS,
        data: topicsProgress
    };
};
export const getTopicsProgressByTopicIds = (ids) => {
    return {
        type: Types.GET_TOPICS_PROGRESS_BY_TOPIC_IDS,
        params: ids,
    };
};
export const getTopicsProgressByTopicIdsSuccess = (topicsProgress) => {
    return {
        type: Types.GET_TOPICS_PROGRESS_BY_TOPIC_IDS_SUCCESS,
        data: topicsProgress
    };
};
export const getTopicsProgressByTopicIdsFailure = (error) => {
    return {
        type: Types.GET_TOPICS_PROGRESS_BY_TOPIC_IDS_FAILURE,
        error: error,
    };
};
