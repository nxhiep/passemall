import TopicProgress from "./TopicProgress";
import Config from "../config";
export default class Topic {
    constructor(props = {}) {
        let { instanceFeedback, totalQuestion, contentTest, topicId, id, parentId, status, rootTopicId, shortId, name, description, orderIndex, allowMistakes, lastUpdate, childrentType, level, cardShortIds, decks, progress } = props;
        this.instanceFeedback = instanceFeedback !== null && instanceFeedback !== void 0 ? instanceFeedback : false;
        this.totalQuestion = totalQuestion !== null && totalQuestion !== void 0 ? totalQuestion : 0;
        this.contentTest = contentTest !== null && contentTest !== void 0 ? contentTest : [];
        this.topicId = topicId !== null && topicId !== void 0 ? topicId : -1;
        this.id = id !== null && id !== void 0 ? id : -1;
        this.parentId = parentId !== null && parentId !== void 0 ? parentId : -1;
        this.status = status !== null && status !== void 0 ? status : -1;
        this.rootTopicId = rootTopicId !== null && rootTopicId !== void 0 ? rootTopicId : -1;
        this.shortId = shortId !== null && shortId !== void 0 ? shortId : -1;
        this.name = name !== null && name !== void 0 ? name : '';
        this.description = description !== null && description !== void 0 ? description : '';
        this.orderIndex = orderIndex !== null && orderIndex !== void 0 ? orderIndex : -1;
        this.allowMistakes = allowMistakes !== null && allowMistakes !== void 0 ? allowMistakes : -1;
        this.lastUpdate = lastUpdate !== null && lastUpdate !== void 0 ? lastUpdate : -1;
        this.childrentType = childrentType !== null && childrentType !== void 0 ? childrentType : -1;
        this.level = level !== null && level !== void 0 ? level : -1;
        this.cardShortIds = cardShortIds !== null && cardShortIds !== void 0 ? cardShortIds : [];
        this.decks = decks !== null && decks !== void 0 ? decks : [];
        if (progress) {
            this.progress = TopicProgress.fromJS(progress);
        }
        else {
            this.progress = TopicProgress.init(this.id, Config.USER_ID);
        }
    }
    static getArguments() {
        return [
            'instanceFeedback', 'totalQuestion', 'contentTest',
            'topicId', 'id', 'parentId', 'status', 'rootTopicId',
            'shortId', 'name', 'description', 'orderIndex', 'allowMistakes',
            'lastUpdate', 'childrentType', 'level', 'cardShortIds', 'decks', 'progress'
        ];
    }
    static fromJS(topicEntity) {
        if (typeof topicEntity === 'string') {
            return new Topic(JSON.parse(topicEntity, Topic.reviver));
        }
        else if (typeof topicEntity === 'object') {
            let convert = {};
            let keysOfChoiceJS = Object.keys(topicEntity);
            let valuesOfChoiceJS = Object.values(topicEntity);
            for (let i = 0; i < keysOfChoiceJS.length; i++) {
                const item = keysOfChoiceJS[i];
                if (Topic.getArguments().indexOf(item) > -1) {
                    convert[item] = valuesOfChoiceJS[i];
                }
            }
            return new Topic(convert);
        }
        else if (topicEntity) {
            let choice = Object.create(Topic.prototype);
            return new Topic(Object.assign(choice, topicEntity));
        }
        return new Topic(topicEntity);
    }
    static reviver(key, value) {
        return key === "" ? Topic.fromJS(value) : value;
    }
    getPercentComplete() {
        if (this.progress) {
            if (this.totalQuestion == 0) {
                return 0;
            }
            let p = (this.progress.familiar * 0.5 + this.progress.mastered * 1) / this.totalQuestion;
            return Math.round(p * 100);
        }
        return 0;
    }
}
