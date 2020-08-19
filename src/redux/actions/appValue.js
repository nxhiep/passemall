import * as Types from './types';
const XXX = "xxx";
export function showImageDialog(url) {
    return {
        type: Types.SHOW_IMAGE_DIALOG,
        url: url,
    };
}
export function showAlert(msg, alertType, onClose) {
    return {
        type: Types.SHOW_ALERT,
        msg: msg,
        alertType: alertType,
        onClose: onClose
    };
}
