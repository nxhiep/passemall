import Config from '../../config.js';
import Choice from '../../models/Choice';
import Progress from '../../models/Progress';
import Question from '../../models/QuestionX';
import * as Types from '../actions/types.js';
export class GameState {
    constructor(props) {
        var _a;
        if (props) {
            this.questions = new Array();
            this.id = props.id;
            this.appId = props.appId;
            this.status = props.status;
            this.gameType = props.gameType;
            this.progress = (_a = new Progress(props.progress)) !== null && _a !== void 0 ? _a : Progress.init();
            this.isFinish = props.isFinish;
            this.isLoaded = props.isLoaded;
            this.isLoading = props.isLoading;
            this.isClick = props.isClick;
            this.countLoop = props.countLoop;
            this.currentQuestion = new Question(props.currentQuestion);
            this.indexActive = props.indexActive
            this.arrayIndexWrong = props.arrayIndexWrong ?? new Array();
            for (let i = 0; i < props.questions.length; i++) {
                this.questions.push(new Question(props.questions[i]));
            }
        }
        else {
            this.questions = new Array();
            this.progress = Progress.init();
            this.indexActive = 0;
        }
    }
    static init() {
        let gameState = new GameState();
        gameState.id = -1;
        gameState.appId = -1;
        gameState.questions = new Array();
        gameState.status = Config.GAME_STATUS_TESTING;
        gameState.isFinish = false;
        gameState.isLoaded = false;
        gameState.isLoading = 1;
        gameState.indexActive = 0;
        gameState.isClick = false;
        gameState.arrayIndexWrong = new Array();
        return gameState;
    }
    static cloneGameState(clone) {
        return new GameState(clone);
    }
}
const gameReducer = (state = GameState.init(), action) => {
    var _a, _b, _c, _d, _e, _f;
    switch (action.type) {
        case Types.SAVE_NEW_TEST_SETTING: {
            state.isLoading = 2;
            state.isFinish = false;
            state.isLoaded = false;
            return Object.assign({}, state);
        }
        case Types.GAME_LOAD_GAME: {
            state.isLoading = 2;
            state.isFinish = false;
            state.isLoaded = false;
            return Object.assign({}, state);
        }
        case Types.START_NEW_GAME:
            state = GameState.init();
            let cards = action.payload;
            state.id = action.topicId;
            state.appId = action.appId;
            state.gameType = action.gameType;
            for (let i = 0; i < cards.length; i++) {
                let question = Question.fromJs(cards[i]);
                question.index = i;
                (_a = state.questions) === null || _a === void 0 ? void 0 : _a.push(question);
            }
            onContinue(state, action.setting, true);
            state.isLoaded = true;
            state.isLoading = 3;
            return Object.assign({}, state);
        case Types.RESUME_GAME:
            state = GameState.cloneGameState(action.lastGame);
            state.isLoaded = true;
            onContinue(state, action.setting);
            state.isLoading = 4;
            return Object.assign({}, state);
        case Types.RESET_QUESTION_PROGRESS: {
            state.isFinish = false;
            onReload(state, true, false);
            state.currentQuestion = state.questions[state.indexActive]
            return { ...state }
        }
        case Types.GAME_ON_CHOICE_SELECTED:
            let selectedChoice = action.payload;
            let currentQuestion = state.questions.find((item) => {
                return item.id == selectedChoice.questionId;
            });
            let correctNum = (_b = currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.getCorrectNum()) !== null && _b !== void 0 ? _b : 1;
            let isExist = listSelected.find(choice => {
                return choice.questionId === selectedChoice.questionId && choice.id === selectedChoice.id;
            });
            if (isExist) {
                return Object.assign({}, state);
            }
            else {
                listSelected.push(selectedChoice);
                if (listSelected.length > correctNum) {
                    const element = listSelected[0];
                    let updateChoice = (_c = currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.choices.find((item) => {
                        return item.id === element.id;
                    })) !== null && _c !== void 0 ? _c : new Choice();
                    updateChoice.selected = false;
                    listSelected.shift();
                }
            }
            for (let i = 0; i < listSelected.length; i++) {
                const element = listSelected[i];
                let updateChoice = (_d = currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.choices.find((item) => {
                    return item.id === element.id;
                })) !== null && _d !== void 0 ? _d : new Choice();
                updateChoice.selected = true;
            }
            if (listSelected.length === correctNum) {
                if (state.gameType == Config.TEST_GAME) {
                    currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.updateTestProgress(listSelected);
                }
                else {
                    currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.updateQuestionProgress(listSelected);
                }
                state.progress = calcProgress(state.questions);
            }
            else {
            }
            state.isLoading = 5;
            state.isClick = true;
            return Object.assign({}, state);
        case Types.GAME_ON_CONTINUE:
            onContinue(state, action.setting, false);
            state.isLoading = 6;
            return Object.assign({}, state);
        case Types.GAME_END_GAME:
            state.progress = calcProgress(state.questions);
            checkTestPassed(action.setting, state);
            state.isFinish = true;
            state.isLoading = 7;
            return Object.assign({}, state);
        default: return state;
    }
};
var listSelected = new Array();
const onContinue = (state, testSetting, firstLoad) => {
    console.log("reducer",testSetting)
    if (state.gameType === Config.REVIEW_GAME) {
        let questions = state.questions;
        listSelected = [];
        state.progress = calcProgress(questions);
        questions.forEach(q => {
            q.reset();
        });
    }
    else if (state.gameType === Config.STUDY_GAME) {
        let questions = state.questions;
        listSelected = [];
        let isFirstLoop = state.arrayIndexWrong.length > 0 ? false : true;
        let newQuestion;
        state.progress = calcProgress(questions);
        if (state.progress.mastered === questions.length) {
            state.isFinish = true;
        }
        if (isFirstLoop) {
            if (state.isClick) {
                state.indexActive += 1;
            }
            if (state.indexActive === questions.length) {
                onReload(state, false, true);

            }
            newQuestion = questions[state.indexActive]
        } else {
            if (state.arrayIndexWrong.length === 1) {
                if (state.isClick) {
                    if (state.indexActive !== state.arrayIndexWrong[0]) {
                        state.indexActive = state.arrayIndexWrong[0];
                    }
                    else {
                        onReload(state, false, true);
                    }
                }
                newQuestion = questions[state.indexActive];

            } else {
                if (state.arrayIndexWrong.length > 1) {
                    if (state.indexActive === state.arrayIndexWrong[state.arrayIndexWrong.length - 1]) {
                        onReload(state, false, true);
                    } else {
                        let tempIndex = state.arrayIndexWrong.findIndex((el) => el === state.indexActive);
                        if (tempIndex === -1) {
                            state.indexActive = 0;
                        } else {
                            state.indexActive = state.arrayIndexWrong[tempIndex + 1]
                        }

                    }
                }
                newQuestion = questions[state.indexActive]
            }
        }
        state.currentQuestion = newQuestion;
        state.isClick = false;

    }
    else {
        if (!firstLoad) {
            state.indexActive += 1;
        }
        let newQuestion = state.questions[state.indexActive];
        state.progress = calcProgress(state.questions);
        checkTestPassed(testSetting, state);
        state.currentQuestion = newQuestion;
    }
};
const checkTestPassed = (setting, state) => {
    if (setting && state.questions.length > 0) {
        if (state.progress.done === state.questions.length) {
            if (state.progress.mistake > setting.allowMistake) {
                state.status = Config.GAME_STATUS_FAILED;
            } else {
                state.status = Config.GAME_STATUS_PASSED;
            }
            state.isFinish = true;
        } else {
            let mistake = state.questions.length - state.progress.done + state.progress.mistake;
            if (mistake > setting.allowMistake) {
                state.status = Config.GAME_STATUS_FAILED;
            } else {
                state.status = Config.GAME_STATUS_PASSED;
            }
        }
        console.log("xxxxx123", state.status, state.progress.mistake, setting.allowMistake)
    }
};
const onReload = (state, isRestudy, isLastItem) => {
    state.arrayIndexWrong = new Array();
    state.questions.forEach(question => {
        let progressLength = question.progress.progress.length
        question.reset();
        if (isRestudy) {
            question.progress.reset();
        } else {
            if (question.progress.progress[progressLength - 1] === 0) {
                state.arrayIndexWrong.push(question.index);
            }
        }
    })
    if (isRestudy) {
        state.indexActive = 0;
    }
    if (isLastItem) {
        let tempForIndexActive;
        if (state.arrayIndexWrong.length === 1) {
            tempForIndexActive = state.arrayIndexWrong[0];
            state.indexActive = Math.floor(Math.random() * state.questions.length);
            while (state.indexActive === tempForIndexActive) {
                state.indexActive = Math.floor(Math.random() * state.questions.length);
            }
        } else {
            if (state.arrayIndexWrong.length > 1) {
                state.indexActive = state.arrayIndexWrong[0];
            }
        }
    }

}
const calcProgress = (questions) => {
    return Progress.calcProgress(questions);
};
export default gameReducer;
