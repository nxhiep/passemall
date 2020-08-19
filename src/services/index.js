var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import Config from '../config';
const callApi = ({ method, url, params }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        axios({
            baseURL: Config.BASE_URL,
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
export { callApi };
