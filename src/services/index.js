var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Axios from "axios";
import Config from '../config';
const callApi = ({ method, url, params, baseURl }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        Axios({
            baseURL: baseURl ? baseURl : Config.BASE_URL,
            timeout: Config.HTTP_REQUEST_TIMEOUT,
            url: url,
            method: method ? method : 'POST',
            data: params ? params : null
        }).then(response => {
            if (response.status === Config.HTTP_REQUEST_SUCCESSS) {
                resolve(response.data);
            }
            else {
                reject("failed");
            }
        }).catch(e => {
            reject(e);
        });
    }));
};
const postReport = ({ appId, base64Image, reason, details, questionId, appName }) => {
    let image = base64Image.replace("data:image/png;base64,", "");
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let param = {
            "image": image,
            "reason": reason,
            "detail": details,
            "questionId": questionId,
            "appId": appId,
            "appName": appName,
            "version": -1,
            "buildNumber": -1,
            'gameType': -1,
            'dbVersion': 1
        }
        Axios({
            url: "https://hiep-dot-micro-enigma-235001.appspot.com/report_mistake",
            method: 'post',
            data: param,

        }).then(response => {
            if (response.status === Config.HTTP_REQUEST_SUCCESSS) {
                resolve(response.data);
            }
            else {
                reject("failed");
            }
        }).catch(e => {
            reject(e);
        });
    }));
}
export { callApi, postReport };
