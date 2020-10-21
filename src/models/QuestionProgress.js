import Config from "../config.js";
export default class QuestionProgress {
    constructor(props = {}) {
        const { id, progress, testProgress, testId, index, bookmark, status, userId, questionId, parentId } = props;
        this.id = id !== null && id !== void 0 ? id : questionId + '-' + userId;
        this.progress = progress !== null && progress !== void 0 ? progress : new Array();
        this.testProgress = testProgress !== null && testProgress !== void 0 ? testProgress : new Array();
        this.testId = testId !== null && testId !== void 0 ? testId : -1;
        this.index = index !== null && index !== void 0 ? index : -1;
        this.bookmark = bookmark !== null && bookmark !== void 0 ? bookmark : false;
        this.status = status !== null && status !== void 0 ? status : Config.QUESTION_NOT_ANSWERED;
        this.userId = userId !== null && userId !== void 0 ? userId : "";
        this.questionId = questionId !== null && questionId !== void 0 ? questionId : -1;
        this.parentId = parentId !== null && parentId !== void 0 ? parentId : -1;
    }
    static fromJs(questionProgressJS) {
        if (typeof questionProgressJS === 'string') {
            return new QuestionProgress(JSON.parse(questionProgressJS));
        }
        else {
            let question = Object.create(QuestionProgress.prototype);
            return new QuestionProgress(Object.assign(question, questionProgressJS));
        }
    }
    static init(parentId, questionId, userId) {
        return this.fromJs(JSON.stringify({ id: questionId + '-' + userId, questionId: questionId, parentId: parentId, userId: userId }));
    }
    updateProgress(isCorrect) {
        this.progress.push(isCorrect === true ? 1 : 0);
    }
    updateTestProgress(isCorrect) {
        this.testProgress.push(isCorrect ? 1 : 0);
    }
    updateBookMark() {
        this.bookmark = !this.bookmark;
    }
    getPercentCorrect() {
        let total = this.progress.length;
        let numberOfCorrect = 0;
        for (let i = 0; i < total; i++) {
            if (this.progress[i] === 1) {
                numberOfCorrect++;
            }
        }
        return numberOfCorrect / total;
    }
    reset() {
        this.progress = new Array();
        this.status = Config.QUESTION_NOT_ANSWERED;
    }
}
