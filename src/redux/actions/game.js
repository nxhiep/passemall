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
export const startNewExamTest = (props) => {
    const { gameType, topicId, appId, setting } = props;
    return {
        type: Types.START_NEW_TEST,
        appId: appId,
        topicId: topicId,
        gameType: gameType !== null && gameType !== void 0 ? gameType : Config.TEST_GAME,
        setting: setting
    };
};
export const loadGame = (params) => {
    return {
        type: Types.GAME_LOAD_GAME,
        payload: params.topicId,
        appId: params.appId,
        gameType: params.gameType,
        setting: params.setting,
        questionIds: params.questionIds
    };
};
export const startNewGame = (params) => {
    return {
        type: Types.START_NEW_GAME,
        payload: params.cards,
        topicId: params.topicId,
        appId: params.appId,
        gameType: params.gameType,
        setting: params.setting
    };
};
export const resumeGame = (lastGame, setting) => {
    return {
        type: Types.RESUME_GAME,
        lastGame: lastGame,
        setting: setting
    };
};
export const onSelectedChoice = (choice) => {
    return {
        type: Types.GAME_ON_CHOICE_SELECTED,
        payload: choice
    };
};
export const onContinue = (setting) => {
    return {
        type: Types.GAME_ON_CONTINUE,
        setting: setting
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
export const endTest = (props) => {
    return {
        type: Types.GAME_END_GAME,
        topicId: props.topicId,
        appId: props.appId,
        gameType: props.gameType,
        setting: props.setting,
    };
};
