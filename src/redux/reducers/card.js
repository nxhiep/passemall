import { REHYDRATE } from 'redux-persist';
import Question from "../../models/QuestionX";
import * as Types from "../actions/types";
import { replaceItem } from '../../utils';
const initialState = {
    loading: false,
    data: {},
    list: new Array(),
    error: null,
};
const cardReducer = (state = initialState, action) => {
    var _a, _b;
    let mapQuestion = (_a = state.data) !== null && _a !== void 0 ? _a : {};
    switch (action.type) {
        case REHYDRATE: {
            if (action.payload) {
                let list = (_b = action.payload.cardReducer) === null || _b === void 0 ? void 0 : _b.list;
                if (list) {
                    list.forEach((value) => {
                        let qs = Question.fromJs(value);
                        mapQuestion[qs.id] = qs;
                    });
                    state.list = list;
                    state.data = mapQuestion;
                }
            }
            return Object.assign({}, state);
        }
        case Types.GET_CARDS_BY_PARENT_ID: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case Types.GET_CARDS_BY_PARENT_ID_SUCCESS: {
            let cards = action.data;
            cards.forEach((card) => {
                if (!mapQuestion[card.id]) {
                    state.list.push(card);
                }
                else {
                    replaceItem(state.list, 'id', card);
                }
                mapQuestion[card.id] = card;
            });
            return Object.assign(Object.assign({}, state), { loading: false, data: mapQuestion, error: null });
        }
        case Types.GET_CARDS_BY_PARENT_ID_FAILURE: {
            return Object.assign(Object.assign({}, state), { loading: false, error: action.error });
        }
        case Types.GET_CARDS_BY_IDS: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case Types.GET_CARDS_BY_IDS_SUCCESS: {
            let cards = action.data;
            cards.forEach((card) => {
                if (!mapQuestion[card.id]) {
                    state.list.push(card);
                }
                else {
                    replaceItem(state.list, 'id', card);
                }
                mapQuestion[card.id] = card;
            });
            return Object.assign(Object.assign({}, state), { loading: false, data: mapQuestion, error: null });
        }
        case Types.GET_CARDS_BY_IDS_FAILURE: {
            return Object.assign(Object.assign({}, state), { loading: false, error: action.error });
        }
        default:
            return state;
    }
};
export default cardReducer;
