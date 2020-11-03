class TimeLeft {
    constructor(props) {
        let { id, timeLeft } = props;
        this.id = id ? id : -1;
        this.timeLeft = timeLeft >= 0 ? timeLeft : -1;
    }
    static fromJS(userRateEntity) {
        if (typeof userRateEntity === 'string') {
            return new UserRate(JSON.parse(userRateEntity));
        }
        else {
            let obj = Object.create(TimeLeft.prototype);
            return new TimeLeft(Object.assign(obj, userRateEntity));
        }
    }
}
export default TimeLeft;
