export default class TopicProgress {
    constructor(props = {}) {
        const { id, topicId, status, lock, lastUpdate, userId, progress, notSeen, familiar, mastered, playing } = props;
        this.id = id !== null && id !== void 0 ? id : topicId + '-' + userId;
        this.topicId = topicId !== null && topicId !== void 0 ? topicId : -1;
        this.status = status !== null && status !== void 0 ? status : -1;
        this.lock = lock !== null && lock !== void 0 ? lock : true;
        this.lastUpdate = lastUpdate !== null && lastUpdate !== void 0 ? lastUpdate : -1;
        this.userId = userId !== null && userId !== void 0 ? userId : '';
        this.progress = progress !== null && progress !== void 0 ? progress : 0;
        this.notSeen = notSeen !== null && notSeen !== void 0 ? notSeen : 0;
        this.familiar = familiar !== null && familiar !== void 0 ? familiar : 0;
        this.mastered = mastered !== null && mastered !== void 0 ? mastered : 0;
        this.playing = playing !== null && playing !== void 0 ? playing : false;
    }
    static getArguments() {
        return [
            'id', 'topicId', 'status', 'lock', 'lastUpdate',
            'userId', 'progress', 'notSeen', 'familiar', 'mastered', 'playing'
        ];
    }
    static fromJS(topicProgressEntity) {
        if (typeof topicProgressEntity === 'string') {
            return new TopicProgress(JSON.parse(topicProgressEntity, TopicProgress.reviver));
        }
        else if (typeof topicProgressEntity === 'object') {
            let convert = {};
            let keysOfChoiceJS = Object.keys(topicProgressEntity);
            let valuesOfChoiceJS = Object.values(topicProgressEntity);
            for (let i = 0; i < keysOfChoiceJS.length; i++) {
                const item = keysOfChoiceJS[i];
                if (TopicProgress.getArguments().indexOf(item) > -1) {
                    convert[item] = valuesOfChoiceJS[i];
                }
            }
            return new TopicProgress(convert);
        }
        else if (topicProgressEntity) {
            return new TopicProgress(Object.assign({}, topicProgressEntity));
        }
        alert("topicProgressEntity null");
        return new TopicProgress(topicProgressEntity);
    }
    static init(topicId, userId) {
        return this.fromJS(JSON.stringify({ id: topicId + '-' + userId, userId: userId, topicId: topicId }));
    }
    static reviver(key, value) {
        return key === "" ? TopicProgress.fromJS(value) : value;
    }
    reset() {
        this.familiar = 0;
        this.mastered = 0;
        this.progress = 0;
    }
}
