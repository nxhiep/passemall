import * as Types from "./types";
export const resetCardInTopic = (topicId) => {
    return {
        type: Types.RESET_CARD_IN_TOPIC,
        topicId: topicId,
    };
};
export function updateCardProgress(questionsProgress) {
    return {
        type: Types.UPDATE_QUESTION_PROGRESS,
        data: questionsProgress,
    };
}
export function onBookmark(question) {
    let listProgress = new Array();
    let questionProgress = question.progress;
    if (questionProgress) {
        questionProgress.bookmark = !questionProgress.bookmark;
        listProgress.push(questionProgress);
        question.progress = questionProgress;
    }
    return updateCardProgress(listProgress);
}
export function getAllCardProgress() {
    return {
        type: Types.GET_CARDS_PROGRESS,
    };
}
export function getAllCardProgressSuccess(questionsProgress) {
    return {
        type: Types.GET_CARDS_PROGRESS_SUCCESS,
        data: questionsProgress
    };
}
export function getAllCardProgressFailure(error) {
    return {
        type: Types.GET_CARDS_PROGRESS_FAILURE,
        error: error,
    };
}
export function getQuestionProgressByIds(ids) {
    return {
        type: Types.GET_QUESTION_PROGRESS_BY_IDS,
        ids: ids
    };
}
export function getQuestionProgressByIdsSuccess(ids, questionsProgress) {
    return {
        type: Types.GET_QUESTION_PROGRESS_BY_IDS_SUCCESS,
        data: questionsProgress,
        ids: ids,
    };
}
export function getQuestionProgressByIdsFailure(error) {
    return {
        type: Types.GET_QUESTION_PROGRESS_BY_IDS_FAILURE,
        error: error,
    };
}
