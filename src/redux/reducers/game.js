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
            this.currentQuestion = new Question(props.currentQuestion);
            this.indexActive = props.indexActive
            this.arrayIndexWrong = props.arrayIndexWrong ?? new Array();
            this.level = props.level;
            this.timeTest = props.timeTest;
            this.lastUpdate = props.lastUpdate
            this.passPercent = props.passPercent;
            this.lastChoiceSelectedId = -1;
            this.listSelected = props.listSelected ?? new Array()
            for (let i = 0; i < props.questions.length; i++) {
                this.questions.push(new Question(props.questions[i]));
            }
        }
        else {
            this.questions = new Array();
            this.progress = Progress.init();
            this.indexActive = 0;
            this.level = -1;
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
        gameState.level = -1;
        gameState.timeTest = 0;
        gameState.passPercent = 0;
        gameState.lastUpdate = -1;
        gameState.lastChoiceSelectedId = -1;
        gameState.arrayIndexWrong = new Array();
        gameState.listSelected = new Array()
        return gameState;
    }
    static cloneGameState(clone) {
        return new GameState(clone);
    }
}
const gameReducer = (state = GameState.init(), action) => {
    var _a, _b, _c, _d, _e, _f;
    switch (action.type) {
        case Types.GAME_LOAD_GAME: {
            if (action.level) {
                state.isLoading = 8;
            } else {
                state.isLoading = 2;
            }
            state.isLoaded = false;
            return Object.assign({}, state);
        }
        case Types.START_NEW_GAME:
            state = GameState.init();
            let cards = action.payload;
            state.id = action.topicId;
            state.passPercent = action.passPercent;
            state.timeTest = action.timeTest
            state.appId = action.appId;
            state.gameType = action.gameType;
            state.level = action.level;

            for (let i = 0; i < cards.length; i++) {
                let question = Question.fromJs(cards[i]);
                question.index = i;
                (_a = state.questions) === null || _a === void 0 ? void 0 : _a.push(question);
            }
            onContinue(state, true);
            state.isLoaded = true;
            state.isLoading = 3;
            state.lastUpdate = new Date().getTime();
            return Object.assign({}, state);
        case Types.RESUME_GAME:
            state = GameState.cloneGameState(action.lastGame);
            state.isLoaded = true;
            onContinue(state, true);
            state.isLoading = 4;
            state.lastUpdate = new Date().getTime();
            return Object.assign({}, state);
        case Types.RESET_QUESTION_PROGRESS: {
            state.isFinish = false;
            state.isLoading = 9;
            onReload(state, true, false, true);
            state.currentQuestion = state.questions[state.indexActive]
            return Object.assign({}, state)
        }
        case Types.GAME_ON_CHOICE_SELECTED:
            let selectedChoice = action.payload;
            let currentQuestion = state.questions.find((item) => {
                return item.id == selectedChoice.questionId;
            });
            let correctNum = (_b = currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.getCorrectNum()) !== null && _b !== void 0 ? _b : 1;
            state.listSelected.push(selectedChoice)
            if (state.listSelected.length > correctNum) {
                const element = state.listSelected[0];
                let updateChoice = (_c = currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.choices.find((item) => {
                    return item.id === element.id;
                })) !== null && _c !== void 0 ? _c : new Choice();
                updateChoice.selected = false;
                state.listSelected.shift();
            }
            for (let i = 0; i < state.listSelected.length; i++) {
                const element = state.listSelected[i];
                let updateChoice = (_d = currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.choices.find((item) => {
                    return item.id === element.id;
                })) !== null && _d !== void 0 ? _d : new Choice();
                updateChoice.selected = true;
            }
            if (state.listSelected.length === correctNum) {
                if (state.gameType == Config.TEST_GAME) {
                    currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.updateTestProgress(state.listSelected);
                }
                else {
                    currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.updateQuestionProgress(state.listSelected);
                }
                state.progress = calcProgress(state.questions);

            }
            state.isLoading = 5;
            return Object.assign({}, state);
        case Types.GAME_ON_CONTINUE:
            onContinue(state, false)
            state.isLoading = 6;
            state.listSelected = new Array()
            return Object.assign({}, state);
        case Types.GAME_END_GAME:
            state.progress = calcProgress(state.questions);
            checkTestPassed(state);
            state.isFinish = true;
            state.isLoading = 7;
            return Object.assign({}, state);
        case Types.SET_GAME_IS_LOADING:
            state.isLoading = 9;
        default: return state;
    }
};
const onContinue = (state, firstLoad) => {
    if (state.gameType === Config.REVIEW_GAME) {
        let questions = state.questions;
        state.progress = calcProgress(questions);
        questions.forEach(q => {
            q.reset();
        });
    }
    else if (state.gameType === Config.STUDY_GAME) {
        let questions = state.questions;
        let isFirstLoop = state.arrayIndexWrong.length > 0 ? false : true;
        let newQuestion;
        state.progress = calcProgress(questions);
        if (state.progress.mastered === questions.length) {
            state.isFinish = true;
        }
        if (isFirstLoop) {
            if (state.currentQuestion) {
                if (state.currentQuestion.questionStatus === Config.QUESTION_ANSWERED_CORRECT || state.currentQuestion.questionStatus === Config.QUESTION_ANSWERED_INCORRECT) {
                    state.indexActive += 1;
                }
            }
            if (state.indexActive === questions.length) {
                onReload(state, false, true);

            }
            newQuestion = questions[state.indexActive]
        } else {
            if (state.arrayIndexWrong.length === 1) {
                if (state.currentQuestion.questionStatus === Config.QUESTION_ANSWERED_CORRECT || state.currentQuestion.questionStatus === Config.QUESTION_ANSWERED_INCORRECT) {
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

    }
    else {
        if (!firstLoad) {
            state.indexActive += 1;
        }
        if (state.indexActive === state.questions.length) {
            checkTestPassed(state)
        } else {
            let newQuestion = state.questions[state.indexActive];
            state.progress = calcProgress(state.questions);
            state.currentQuestion = newQuestion;
        }

    }
};
const checkTestPassed = (state) => {
    if (state.questions.length > 0) {
        if (state.progress.correct < (state.questions.length * state.passPercent)) {
            state.status = Config.GAME_STATUS_FAILED;
        } else {
            state.status = Config.GAME_STATUS_PASSED;
        }
    }
};
const onReload = (state, isRestudy, isLastItem, tryAgain) => {
    if (state.gameType !== Config.TEST_GAME) {
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
    } else {
        state.indexActive = 0;
        state.questions.forEach(question => {
            question.reset();
            question.progress.reset();
        })
    }
    if (tryAgain) {
        state.progress = Progress.init()
    }

}
const calcProgress = (questions) => {
    return Progress.calcProgress(questions);
};
export default gameReducer;
