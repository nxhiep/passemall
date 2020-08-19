import Topic from "../../models/Topic";
import * as Types from "../actions/types";
import { replaceItem } from "../../utils";
const InitialTopisState = {
    loading: false,
    data: {},
    list: [],
    error: null,
};
const topicReducer = (state = InitialTopisState, action) => {
    var _a;
    let mapTopic = (_a = state.data) !== null && _a !== void 0 ? _a : {};
    switch (action.type) {
        case Types.GET_TOPICS_BY_PARENT_ID: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case Types.GET_TOPICS_BY_PARENT_ID_SUCCESS: {
            action.data && action.data.forEach((t) => {
                let topic = Topic.fromJS(t);
                if (!mapTopic[topic.id]) {
                    state.list.push(topic);
                }
                else {
                    replaceItem(state.list, 'id', topic);
                }
                mapTopic[topic.id] = topic;
            });
            return Object.assign(Object.assign({}, state), { loading: false, data: mapTopic, error: null });
        }
        case Types.GET_TOPICS_BY_PARENT_ID_FAILURE: {
            return Object.assign(Object.assign({}, state), { loading: false, error: action.error });
        }
        case Types.GET_TOPIC_BY_ID: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case Types.GET_TOPIC_BY_ID_SUCCESS: {
            let topic = action.data;
            if (topic) {
                if (!mapTopic[topic.id]) {
                    state.list.push(topic);
                }
                else {
                    replaceItem(state.list, 'id', topic);
                }
                mapTopic[topic.id] = topic;
            }
            return Object.assign(Object.assign({}, state), { loading: false, data: mapTopic, error: null });
        }
        case Types.GET_TOPIC_BY_ID_FAILURE: {
            return Object.assign(Object.assign({}, state), { loading: false, error: action.error });
        }
        default:
            return state;
    }
};
export default topicReducer;
