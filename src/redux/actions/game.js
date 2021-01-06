import Config from '../../config.js';
import * as Types from './types.js';
export const removeLastGame = (appId, topicId, gameType) => {
    return {
        type: Types.REMOVE_GAME,
        appId: appId,
        topicId: topicId,
        gameType: gameType,
    };
};
export const resetQuestionProgress = () => {
    return {
        type: Types.RESET_QUESTION_PROGRESS
    }
}

export const loadGame = (params) => {
    return {
        type: Types.GAME_LOAD_GAME,
        payload: params.id,
        level: params.level,
        appId: params.appId,
        gameType: params.gameType,
        questionIds: params.questionIds,
        timeTest: params.timeTest,
        passPercent: params.passPercent
    };
};
export const startNewGame = (params) => {
    return {
        type: Types.START_NEW_GAME,
        payload: params.cards,
        topicId: params.topicId,
        appId: params.appId,
        level: params.level,
        gameType: params.gameType,
        timeTest: params.timeTest,
        passPercent: params.passPercent
    };
};
export const resumeGame = (lastGame) => {
    return {
        type: Types.RESUME_GAME,
        lastGame: lastGame,
    };
};
export const onSelectedChoice = (choice) => {
    return {
        type: Types.GAME_ON_CHOICE_SELECTED,
        payload: choice,
    };
};
export const onContinue = () => {
    return {
        type: Types.GAME_ON_CONTINUE,
    };
};
export const updateListGame = (appId, topicId, game, questionProgressState) => {
    return {
        type: Types.GAME_UPDATE_LIST_GAME,
        appId: appId,
        topicId: topicId,
        payload: game,
        questionProgressState: questionProgressState,
    };
};
export const endTest = () => {
    return {
        type: Types.GAME_END_GAME,
    };
};
export const setGameIsLoading = () => {
    return {
        type : Types.SET_GAME_IS_LOADING,
    }
}
export const calcProgress = () => {
    return {
        type : Types.CALC_PROGRESS,
    }
}