import * as Types from '../actions';
import { AlertType } from './../../components/MyAlert';
export class AppValueState {
    constructor(props) {
        var _a, _b, _c, _d;
        this.image = (_a = props === null || props === void 0 ? void 0 : props.image) !== null && _a !== void 0 ? _a : "";
        this.msg = (_b = props === null || props === void 0 ? void 0 : props.msg) !== null && _b !== void 0 ? _b : "";
        this.alertType = (_c = props === null || props === void 0 ? void 0 : props.alertType) !== null && _c !== void 0 ? _c : AlertType.info;
        this.onClose = (_d = props === null || props === void 0 ? void 0 : props.onClose) !== null && _d !== void 0 ? _d : function () { };
    }
    static init() {
        return new AppValueState();
    }
}
const appValueState = (state = AppValueState.init(), action) => {
    switch (action.type) {
        case Types.SHOW_IMAGE_DIALOG: {
            console.log("xxxxx running ")
            return Object.assign(Object.assign({}, state), { image: action.url });
        }
        case Types.SHOW_ALERT: {
            return Object.assign(Object.assign({}, state), { msg: action.msg, alertType: action.alertType, onClose: action.onClose });
        }
        default:
            return state;
    }
};
export default appValueState;
