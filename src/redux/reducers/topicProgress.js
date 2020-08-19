import { REHYDRATE } from 'redux-persist';
import TopicProgress from '../../models/TopicProgress';
import { replaceItem } from "../../utils";
import * as Types from "../actions/types";
const InitialTopisState = {
    loading: false,
    data: {},
    list: [],
    error: null,
};
const topicProgressReducer = (state = InitialTopisState, action) => {
    var _a, _b;
    let mapProgress = (_a = state.data) !== null && _a !== void 0 ? _a : {};
    switch (action.type) {
        case REHYDRATE: {
            if (action.payload && action.payload['topicProgressReducer']) {
                let list = action.payload['topicProgressReducer']['list'];
                if (list) {
                    list.forEach((p) => {
                        let progress = TopicProgress.fromJS(p);
                        mapProgress[progress.topicId] = progress;
                        state.list.push(progress);
                    });
                    state.list = list;
                    state.data = mapProgress;
                }
            }
            return Object.assign({}, state);
        }
        case Types.GET_TOPICS_PROGRESS_BY_TOPIC_IDS: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case Types.GET_TOPICS_PROGRESS_BY_TOPIC_IDS_SUCCESS: {
            if (action.data) {
                action.data.forEach((p) => {
                    let progress = TopicProgress.fromJS(p);
                    if (!mapProgress[progress.topicId]) {
                        state.list.push(progress);
                    }
                    else {
                        replaceItem(state.list, 'id', progress);
                    }
                    mapProgress[progress.topicId] = progress;
                });
            }
            return Object.assign(Object.assign({}, state), { loading: false, data: mapProgress, error: null });
        }
        case Types.GET_TOPICS_PROGRESS_BY_TOPIC_IDS_FAILURE: {
            return Object.assign(Object.assign({}, state), { loading: false, error: action.error });
        }
        case Types.UPDATE_TOPICS_PROGRESS: {
            return Object.assign(Object.assign({}, state), { data: mapProgress, error: null });
        }
        case Types.UPDATE_TOPICS_PROGRESS_SUCCESS: {
            if (action.data) {
                action.data.forEach((p) => {
                    let progress = TopicProgress.fromJS(p);
                    if (!mapProgress[progress.topicId]) {
                        state.list.push(progress);
                    }
                    else {
                        replaceItem(state.list, 'id', progress);
                    }
                    mapProgress[progress.topicId] = progress;
                });
            }
            return Object.assign(Object.assign({}, state), { data: mapProgress, error: null });
        }
        case Types.CALCULAR_TOPICS_PROGRESS: {
            let topic = action.topic;
            let progress = action.progress;
            if (topic && progress) {
                let topicId = (_b = topic.id) !== null && _b !== void 0 ? _b : -1;
                let topicProgress = mapProgress[topicId];
                if (topicProgress) {
                    topicProgress.notSeen = progress.getNotSeenNumber();
                    topicProgress.familiar = progress.getFamiliarNumber();
                    topicProgress.mastered = progress.getMasteredNumber();
                    mapProgress[topicId] = topicProgress;
                    topic.progress = topicProgress;
                    replaceItem(state.list, 'id', topic.progress);
                }
            }
            return Object.assign(Object.assign({}, state), { loading: false, data: mapProgress, error: null });
        }
        case Types.CALCULAR_PARENT_TOPICS_PROGRESS: {
            return state;
        }
        case Types.RESET_TOPIC_PROGRESS: {
            let topicProgress = action.topicProgress;
            if (topicProgress) {
                topicProgress = TopicProgress.fromJS(topicProgress);
                topicProgress.reset();
                mapProgress[topicProgress.topicId] = topicProgress;
                replaceItem(state.list, 'id', topicProgress);
            }
            return Object.assign(Object.assign({}, state), { data: mapProgress });
        }
        default:
            return state;
    }
};
export default topicProgressReducer;
