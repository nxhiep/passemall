class TestInfo {
    constructor(props) {
        let { id, shortId, status, subAppId, stateId, lastUpdate, title, description, passPercent, requiredPass, testQuestionData, testQuestionNum, index, timeTest, topicId, totalQuestion } = props;
        this.id = id ? id : -1;
        this.shortId = shortId ? shortId : -1;
        this.status = status ? status : -1;
        this.subAppId = subAppId ? subAppId : -1;
        this.stateId = stateId ? stateId : -1;
        this.lastUpdate = lastUpdate ? lastUpdate : -1;
        this.title = title ? title : "";
        this.description = description ? description : "";
        this.passPercent = passPercent ? passPercent : 100;
        this.requiredPass = requiredPass ? requiredPass : 0;
        this.testQuestionData = JSON.parse(testQuestionData) ? testQuestionData : "";
        this.testQuestionNum = testQuestionNum ? testQuestionNum : "";
        this.index = index ? index : -1;
        this.timeTest = timeTest ? timeTest : -1;
        this.topicId = topicId ? topicId : -1;
        if (totalQuestion) {
            this.totalQuestion = totalQuestion;
        } else {
            let totalQuestion = 0;
            this.testQuestionData.forEach(el => {
                totalQuestion += el.questionNum;
            })
            this.totalQuestion = totalQuestion
        }
    }
}