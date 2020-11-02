import * as Types from "./types";
export const setTimeLeftState = (timeLeft) => {
    return {
        type: Types.SET_TIME_LEFT_STATE,
        timeLeft: timeLeft,
    }
}