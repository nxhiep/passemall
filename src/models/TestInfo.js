import Config from "../config";

class TestInfo {
    constructor(props) {
        let { id, shortId, appId, status, subAppId, stateId, lastUpdate, title, description, passPercent, requiredPass, testQuestionData, testQuestionNum, index, timeTest, topicId, totalQuestion, lock, playing, questionIds, statusProgress, progress } = props;
        this.id = id ? id : -1;
        this.shortId = shortId ? shortId : -1;
        this.status = status ? status : -1;
        this.appId = appId ? appId : -1;
        this.subAppId = subAppId ? subAppId : -1;
        this.stateId = stateId ? stateId : -1;
        this.lastUpdate = lastUpdate ? lastUpdate : -1;
        this.title = title ? title : "";
        this.description = description ? description : "";
        this.passPercent = passPercent ? passPercent : 100;
        this.requiredPass = requiredPass ? requiredPass : 0;
        this.testQuestionData = new Array();
        this.testQuestionNum = testQuestionNum ? testQuestionNum : "";
        this.index = index >= 0 ? index : -1;
        this.timeTest = timeTest ? timeTest : -1;
        this.topicId = topicId ? topicId : -1;
        this.lock = index === 0 ? false : (lock === false ? false : true);
        this.playing = playing ? playing : false;
        this.statusProgress = statusProgress ? statusProgress : 1;
        this.progress = progress ? progress : 0;
        if (typeof testQuestionData === "string") {
            let totalQuestion = 0;
            let testQuestionDataJson = JSON.parse(testQuestionData);
            testQuestionDataJson.forEach(el => {
                this.testQuestionData.push(el);
                totalQuestion += el.questionNum;
                if (!el.correctQuestion) {
                    el.correctQuestion = [0, 0, 0]
                }
            })
            this.totalQuestion = totalQuestion
        } else {
            this.totalQuestion = totalQuestion
            this.testQuestionData = new Array();
            testQuestionData.forEach(el => {
                this.testQuestionData.push(el)

            })
        }
        if (questionIds) {
            this.questionIds = questionIds;
        } else {
            this.questionIds = new Array();
            this.testQuestionData.forEach(el => {
                el.questionIds.forEach(el => {
                    this.questionIds.push(el)
                })
            })
        }
    }

    static getArguments() {
        return [
            'id', 'shortId', 'status',
            'appId', 'subAppId', 'stateId', 'lastUpdate', 'title',
            'description', 'name', 'description', 'orderIndex', 'allowMistakes',
            'lastUpdate', 'childrentType', 'level', 'cardShortIds', 'decks', 'progress'
        ];
    }
    static fromJS(testInfoJS) {
        if (typeof testInfoJS === 'string') {
            return new TestInfo(JSON.parse(testInfoJS));
        }
        else {
            let testInfo = Object.create(TestInfo.prototype);
            return new TestInfo(Object.assign(testInfo, testInfoJS));
        }
    }
    calculateProgress(level) {
        if (this.totalQuestion === 0) {
            return 0;
        }
        let correctQuestion = 0
        this.testQuestionData.forEach(el => {
            correctQuestion += el.correctQuestion[level - 1];
        });
        this.progress = Math.round(correctQuestion / this.totalQuestion * 100)
        return Math.round(correctQuestion / this.totalQuestion * 100)
    }
}
export default TestInfo