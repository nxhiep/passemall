import { REHYDRATE } from 'redux-persist';
import Topic from "../../models/Topic";
import * as Types from "../actions/types";
import { replaceItem } from "../../utils";
const InitialTopisState = {
    loading: false,
    data: {},
    list: [],
    error: null,
    name: "",
    totalQuestion: -1,
};
const topicReducer = (state = InitialTopisState, action) => {
    let mapTopic = state.data ?? {};
    switch (action.type) {
        case REHYDRATE: {
            if (action.payload && action.payload['topicReducer']) {
                let list = action.payload['topicReducer']['list'];
                if (list) {
                    list.forEach((t) => {
                        let topic = Topic.fromJS(t);
                        mapTopic[topic.id] = topic;
                    });
                    state.loading = true;
                    state.data = mapTopic;
                    state.list = list;
                    state.name = action.payload['topicReducer']['name'];
                    // state.totalQuestion = action.payload['topicReducer']["totalQuestion"];
                    // state.name = action.payload["topicReducer"]["name"]
                }
            }
            return { ...state };
        }
        case Types.GET_TOPICS_BY_PARENT_ID: {
            return { ...state, loading: true };
        }
        case Types.GET_TOPICS_BY_PARENT_ID_SUCCESS: {
            action.data && action.data.forEach((t) => {
                let topic = Topic.fromJS(t);
                if (!mapTopic[topic.id]) {
                    state.list.push(topic);
                } else {
                    replaceItem(state.list, 'id', topic);
                }
                mapTopic[topic.id] = topic;
            });
            return { ...state, loading: false, data: mapTopic, error: null };
        }
        case Types.GET_TOPICS_BY_PARENT_ID_FAILURE: {
            return { ...state, loading: false, error: action.error };
        }
        case Types.GET_TOPIC_BY_ID: {
            return { ...state, loading: true };
        }
        case Types.GET_TOPIC_BY_ID_SUCCESS: {
            let name = action.topic.name;
            let totalQuestion = action.topic.totalQuestion
            return Object.assign(Object.assign({}, state), { loading: false, data: mapTopic, error: null, name: name, totalQuestion: totalQuestion });
        }
        case Types.GET_TOPIC_BY_ID_FAILURE: {
            return { ...state, loading: false, error: action.error }
        }
        case Types.RESET_PROGRESS_IN_TOPIC: {
            let topic = mapTopic[action.topicId];
            topic.progress.reset();
            mapTopic[topic.id] = topic;
            replaceItem(state.list, 'id', topic);
            return { ...state, data: mapTopic }
        }
        default:
            return state;
    }
};

export default topicReducer;