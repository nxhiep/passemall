import Config from "../config.js";
class Choice {
    constructor(choice = {}) {
        this.id = -1;
        this.content = Config.NULL_STRING;
        this.questionId = -1;
        this.isCorrect = false;
        this.selected = false;
        let { id, content, questionId, isCorrect, selected } = choice;
        this.id = id !== null && id !== void 0 ? id : -1;
        this.content = content !== null && content !== void 0 ? content : Config.NULL_STRING;
        this.isCorrect = isCorrect !== null && isCorrect !== void 0 ? isCorrect : false;
        this.questionId = questionId !== null && questionId !== void 0 ? questionId : Config.NULL_STRING;
        this.selected = selected !== null && selected !== void 0 ? selected : false;
    }
    static fromJS(choiceJS) {
        if (typeof choiceJS === 'string') {
            return JSON.parse(choiceJS, Choice.reviver);
        }
        else if (typeof choiceJS === 'object') {
            let convert = {};
            let keysOfChoiceJS = Object.keys(choiceJS);
            let valuesOfChoiceJS = Object.values(choiceJS);
            for (let i = 0; i < keysOfChoiceJS.length; i++) {
                const item = keysOfChoiceJS[i];
                if (item === "id" || item === "content" || item === "questionId" || item === "isCorrect" || item === "selected") {
                    convert[item] = valuesOfChoiceJS[i];
                }
            }
            return new Choice(convert);
        }
        else {
            let choice = Object.create(Choice.prototype);
            return Object.assign(choice, choiceJS);
        }
    }
    static reviver(key, value) {
        return key === "" ? Choice.fromJS(value) : value;
    }
}
export default Choice;
