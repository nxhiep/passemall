class UserRate {
    constructor(props) {
        let { id, userId, userName, appId, createDate, lastUpdate, content, avatar, rateValue } = props;
        this.id = id !== null && id !== void 0 ? id : -1;
        this.userId = userId !== null && userId !== void 0 ? userId : '';
        this.userName = userName !== null && userName !== void 0 ? userName : '';
        this.appId = appId !== null && appId !== void 0 ? appId : -1;
        this.createDate = createDate !== null && createDate !== void 0 ? createDate : -1;
        this.lastUpdate = lastUpdate !== null && lastUpdate !== void 0 ? lastUpdate : -1;
        this.content = content !== null && content !== void 0 ? content : '';
        this.avatar = avatar !== null && avatar !== void 0 ? avatar : '';
        this.rateValue = rateValue !== null && rateValue !== void 0 ? rateValue : 0;
    }
    static fromJS(userRateEntity) {
        if (typeof userRateEntity === 'string') {
            return new UserRate(JSON.parse(userRateEntity));
        }
        else {
            let obj = Object.create(UserRate.prototype);
            return new UserRate(Object.assign(obj, userRateEntity));
        }
    }
}
export default UserRate;
