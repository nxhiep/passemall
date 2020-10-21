import Config from "../config.js";
import { shuffle } from "../utils.js";
import Choice from "./Choice";
import QuestionProgress from "./QuestionProgress";
class Question {
    constructor(questionJS = {}) {
        const { question, hint, image, sound, explanation, answers, choices, lastUpdate, userId, _id, parentId, categoryId, questionStatus, id, progress, index, topicQuestion, listChoices, paragraphId, quiz } = questionJS;
        this.question = question !== null && question !== void 0 ? question : "";
        this.hint = hint !== null && hint !== void 0 ? hint : "";
        this.image = image !== null && image !== void 0 ? image : "";
        this.sound = sound !== null && sound !== void 0 ? sound : "";
        this.explanation = explanation !== null && explanation !== void 0 ? explanation : "";
        this.quiz = quiz;
        this.paragraphContent = quiz && quiz.description ? quiz.description : '';
        this.paragraphId = paragraphId !== null && paragraphId !== void 0 ? paragraphId : -1;
        this.lastUpdate = lastUpdate !== null && lastUpdate !== void 0 ? lastUpdate : new Date().getTime();
        this.userId = userId !== null && userId !== void 0 ? userId : "";
        this.categoryId = categoryId !== null && categoryId !== void 0 ? categoryId : -1;
        this.questionStatus = questionStatus !== null && questionStatus !== void 0 ? questionStatus : Config.QUESTION_NOT_ANSWERED;
        this.id = id !== null && id !== void 0 ? id : (_id !== null && _id !== void 0 ? _id : -1);
        this.lastUpdate = new Date().getTime();
        this.choices = this.getListChoices(answers, choices, this.id);
        if (!(this.choices && this.choices.length > 0) && listChoices && listChoices.length > 0) {
            this.choices = [];
            listChoices.forEach((choice) => {
                this.choices.push(Choice.fromJS({
                    content: choice.choice,
                    isCorrect: choice.isCorrect,
                    id: choice.id,
                    questionId: this.id,
                    selected: choice.selected
                }));
            });
        }
        this.correctNums = this.getCorrectNum();
        this.rootTopicId = parentId;
        this.parentId = -1;
        this.topicQuestion = topicQuestion;
        if (topicQuestion && topicQuestion.parentId) {
            this.parentId = topicQuestion.parentId;
        }
        if (progress) {
            this.progress = QuestionProgress.fromJs(progress);
        }
        else {
            this.progress = QuestionProgress.init(this.parentId, id, Config.USER_ID);
        }
        this.index = index;
    }
    getListChoices(answers, choices, questionId) {
        var _a;
        let listChoices = new Array();
        if (answers && choices) {
            for (let i = 0; i < answers.length; i++) {
                let correctChoice = Choice.fromJS(Object.assign({}, {
                    content: answers[i],
                    isCorrect: true,
                    questionId: questionId,
                    id: listChoices.length,
                }));
                listChoices.push(correctChoice);
            }
            for (let i = 0; i < choices.length; i++) {
                let wrongChoice = Choice.fromJS(Object.assign({}, {
                    content: choices[i],
                    isCorrect: false,
                    questionId: questionId,
                    id: listChoices.length,
                }));
                listChoices.push(wrongChoice);
            }
        }
        else if (choices) {
            for (let i = 0; i < choices.length; i++) {
                let wrongChoice = Choice.fromJS(Object.assign({}, {
                    content: choices[i]['content'],
                    isCorrect: choices[i]['isCorrect'],
                    questionId: choices[i]['questionId'],
                    selected: !!choices[i]['selected'],
                    id: (_a = choices[i]['id']) !== null && _a !== void 0 ? _a : i
                }));
                listChoices.push(wrongChoice);
            }
        }
        else {
        }
        return shuffle(listChoices);
    }
    getCorrectNum() {
        this.correctNums = 0;
        for (let i = 0; i < this.choices.length; i++) {
            if (this.choices[i].isCorrect)
                this.correctNums++;
        }
        return this.correctNums;
    }
    static fromJs(questionJS) {
        if (typeof questionJS === 'string') {
            return new Question(JSON.parse(questionJS, Question.reviver));
        }
        else {
            let question = Object.create(Question.prototype);
            return new Question(Object.assign(question, questionJS));
        }
    }
    getNumberChoiceSelected() {
        let num = 0;
        for (let i = 0; i < this.choices.length; i++) {
            if (this.choices[i].selected)
                num++;
        }
        return num;
    }
    updateQuestionProgress(listChoiceSelected) {
        this.lastUpdate = new Date().getTime();
        let correctNum = 0;
        for (let i = 0; i < listChoiceSelected.length; i++) {
            let choiceUpdate = listChoiceSelected[i];
            if (choiceUpdate.isCorrect)
                correctNum++;
        }
        this.questionStatus = (correctNum === this.correctNums) ? Config.QUESTION_ANSWERED_CORRECT : Config.QUESTION_ANSWERED_INCORRECT;
        this.progress.updateProgress(correctNum === this.correctNums);
        this.progress.status = this.questionStatus;
    }
    reset() {
        this.questionStatus = Config.QUESTION_NOT_ANSWERED;
        this.progress.status = Config.QUESTION_NOT_ANSWERED;
        for (let index = 0; index < this.choices.length; index++) {
            this.choices[index].selected = false;
        }
    }
    static reviver(key, value) {
        return key === "" ? Choice.fromJS(value) : value;
    }
    updateTestProgress(listChoiceSelected) {
        let correctNum = 0;
        for (let i = 0; i < listChoiceSelected.length; i++) {
            let choiceUpdate = listChoiceSelected[i];
            if (choiceUpdate.isCorrect)
                correctNum++;
        }
        this.questionStatus = (correctNum === this.correctNums) ? Config.QUESTION_ANSWERED_CORRECT : Config.QUESTION_ANSWERED_INCORRECT;
        this.progress.updateTestProgress(correctNum === this.correctNums);
        this.progress.status = this.questionStatus;
    }
}
export default Question;
