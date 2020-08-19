import * as Types from "./types";
export function getCardsByParentId(parentId) {
    return {
        type: Types.GET_CARDS_BY_PARENT_ID,
        parentId: parentId,
    };
}
export function getCardsByParentIdSuccess(cards) {
    return {
        type: Types.GET_CARDS_BY_PARENT_ID_SUCCESS,
        data: cards,
    };
}
export function getCardsByParentIdFailure(error) {
    return {
        type: Types.GET_CARDS_BY_PARENT_ID_FAILURE,
        error: error,
    };
}
export function getCardsByIds(ids) {
    return {
        type: Types.GET_CARDS_BY_IDS,
        cardIds: ids,
    };
}
export function getCardsByIdsSuccess(cards) {
    return {
        type: Types.GET_CARDS_BY_IDS_SUCCESS,
        data: cards,
    };
}
export function getCardsByIdsFailure(error) {
    return {
        type: Types.GET_CARDS_BY_IDS_FAILURE,
        error: error,
    };
}
