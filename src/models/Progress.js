import Config from '../config.js';
class Progress {
    constructor(props) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.done = (_a = props.done) !== null && _a !== void 0 ? _a : 0;
        this.notDone = (_b = props.notDone) !== null && _b !== void 0 ? _b : 0;
        this.mistake = (_c = props.mistake) !== null && _c !== void 0 ? _c : 0;
        this.skipped = (_d = props.skipped) !== null && _d !== void 0 ? _d : 0;
        this.correct = (_e = props.correct) !== null && _e !== void 0 ? _e : 0;
        this.total = (_g = props.total) !== null && _g !== void 0 ? _g : 0;
        this.mastered = props.mastered ?? 0;
        this.familiar = props.familiar ?? 0;

    }

    static init() {
        return new Progress({
            done: 0,
            notDone: 0,
            correct: 0,
            mistake: 0,
            skipped: 0,
            total: 0,
            mastered: 0,
            familiar: 0,
        });
    }
    static calcProgress(questions) {
        let total = questions.length;
        let done = 0, notDone = 0, mistake = 0, skipped = 0, correct = 0, mastered = 0, familiar = 0;
        for (let i = 0; i < total; i++) {
            const question = questions[i];
            let lengthProgress = question.progress.progress.length
            if (question.questionStatus === Config.QUESTION_NOT_ANSWERED) {
                notDone++;
            } else {
                if (question.questionStatus === Config.QUESTION_ANSWERED_SKIP) skipped++;
                done++;
                if (question.questionStatus === Config.QUESTION_ANSWERED_CORRECT) {
                    correct++;
                } else {
                    mistake++;
                }

            }
            if (lengthProgress > 0) {
                if (question.progress.progress[lengthProgress - 1] === 1) {
                    mastered++;
                }
                if (question.progress.progress[lengthProgress - 1] === 0) {
                    familiar++;
                }
            }

        }
        return new Progress({ done, notDone, correct, mistake, skipped, mastered, total, familiar });
    }
    getNotSeenNumber() {
        return this.total - this.familiar - this.mastered;
    }

    getFamiliarNumber() {
        return this.familiar
    }

    getMasteredNumber() {
        return this.mastered
    }

    getPercentComplete() {
        if (!this.total) {
            alert('getPercentComplete in game.js: this.total == 0');
        }
        return (this.getFamiliarNumber() * 0.5 + this.getMasteredNumber() * 1) / this.total;
    }
}
export default Progress;
