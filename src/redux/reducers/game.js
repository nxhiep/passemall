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
            this.lastStatus = props.lastStatus;
            this.currentQuestion = new Question(props.currentQuestion);
            for (let i = 0; i < props.questions.length; i++) {
                this.questions.push(new Question(props.questions[i]));
            }
        }
        else {
            this.questions = new Array();
            this.progress = Progress.init();
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
        gameState.lastStatus = 0;
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
            onContinue(state, action.setting);
            state.isLoaded = true;
            state.isLoading = 3;
            return Object.assign({}, state);
        case Types.RESUME_GAME:
            state = GameState.cloneGameState(action.lastGame);
            state.isLoaded = true;
            onContinue(state, action.setting);
            state.isLoading = 4;
            return Object.assign({}, state);
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
            state.lastStatus = state.currentQuestion.questionStatus;
            state.isLoading = 5;
            return Object.assign({}, state);
        case Types.GAME_ON_CONTINUE:
            onContinue(state, action.setting);
            state.isLoading = 6;
            return Object.assign({}, state);
        case Types.GAME_END_GAME:
            state.progress = calcProgress(state.questions);
            state.status = Config.GAME_STATUS_FAILED;
            state.isFinish = true;
            state.isLoading = 7;
            return Object.assign({}, state);
        default: return state;
    }
};
var listSelected = new Array();
const onContinue = (state, testSetting) => {
    console.log("listChoice" , listSelected);
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
        let nextIndex = 0;
        if (testSetting === undefined ) {
            if (state.currentQuestion !== undefined) {
                nextIndex = state.currentQuestion.index+1;
            }
        } else {
            if (state.currentQuestion) {
                nextIndex = state.currentQuestion?.index;
                if (state.lastStatus === Config.QUESTION_ANSWERED_CORRECT || state.lastStatus === Config.QUESTION_ANSWERED_INCORRECT) {
                    nextIndex +=1;
                }
            }
        }
        if (nextIndex >= questions.length) {
            nextIndex = 0;
        }
        let count = 0;
        while(questions[nextIndex].progress.boxNum === 2 ){
            nextIndex +=1 ;
            count+=1;
            if (count === questions.length) {
                state.isFinish = true;
                break;
            }
            if (nextIndex >= questions.length) {
                nextIndex = 0;
            }
        }
        console.log("isFinish " ,state.isFinish)
        state.progress = calcProgress(questions);
        let newQuestion = questions[nextIndex];
        state.lastStatus = newQuestion.questionStatus; 
        console.log("questiom.status" , newQuestion.questionStatus);
        newQuestion.reset();
        state.currentQuestion = newQuestion;
    }
    else {
        let currentQuestion = state.currentQuestion;
        listSelected = [];
        if (!currentQuestion) {
        }
        else if (currentQuestion.questionStatus != Config.QUESTION_NOT_ANSWERED) {
            state.questions.sort((a, b) => a.questionStatus - b.questionStatus);
        }
        else {
            currentQuestion.questionStatus = Config.QUESTION_ANSWERED_SKIP;
            state.questions.sort((a, b) => a.questionStatus - b.questionStatus);
        }
        state.progress = calcProgress(state.questions);
        checkTestPassed(testSetting, state);
        state.currentQuestion = state.questions[0];
    }
};
const checkTestPassed = (setting, state) => {
    if (setting && state.questions.length > 0) {
        if (state.progress.mistake > setting.allowMistake) {
            state.status = Config.GAME_STATUS_FAILED;
            state.isFinish = true;
        }
        else if (state.progress.done >= state.questions.length) {
            state.status = Config.GAME_STATUS_PASSED;
            state.isFinish = true;
        }
    }
};
const calcProgress = (questions) => {
    return Progress.calcProgress(questions);
};
export default gameReducer;
