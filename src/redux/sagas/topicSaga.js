
import { call, put, select, take } from 'redux-saga/effects';
import Config from '../../config';
import Topic from '../../models/Topic';
import TopicProgress from '../../models/TopicProgress';
import { callApi } from '../../services';
import * as Actions from '../actions/topic';
import * as Types from '../actions/types';
import { getTopicsProgressByTopicIdsSuccess } from './../actions/topicProgress';

function getTopicsSagaApi(parentId) {
    return callApi({ method: 'post', url: '/data?type=get_topics_by_parent_id&parentId=' + parentId, params: null });
}

function getTopicByIdSagaApi(id) {
    return callApi({ method: 'post', url: '/data?type=get_topics_by_ids&ids=' + id, params: null });
}

function* getTopicByIdAPI(id) {
    let topicState = yield select((state) => state.topicReducer);
    let topic;
    if (topicState && topicState.data) {
        topic = topicState.data[id];
        if (topic) {
            topic = Topic.fromJS(topic);
        }
        if (!topic) {
            let topics = yield call(getTopicByIdSagaApi, id);
            if (topics && topics.length > 0) {
                topic = topics[0];
            }
        }
    }
    return topic;
}

function* getTopicsByParentIdAPI(parentId) {
    let topicState = yield select((state) => state.topicReducer);
    let topics = new Array();
    if (topicState && topicState.list) {
        topicState.list.forEach((t) => {
            if (t.parentId === parentId) {
                let topic = Topic.fromJS(t);
                topics.push(topic);
            }
        });
        if (topics.length === 0) {
            topics = yield call(getTopicsSagaApi, parentId);
        }
    }
    return topics.filter((t) => t.status > -1);
}

function* getTopicsSaga() {
    while (true) {
        let action = yield take(Types.GET_TOPICS_BY_PARENT_ID);
        try {
            let data = yield call(getTopicsByParentIdAPI, action.params);
            let topicProgressState = yield select((state) => state.topicProgressReducer);
            let topicState = yield select((state) => state.topicReducer);
            let mapProgress = topicProgressState ? topicProgressState.data ?? {} : {};
            let topics = new Array();
            let listTopicProgress = [];
            let mapParentTopic = {};
            if (topicState && topicState.data) {
                Object.values(topicState.data).forEach(t => {
                    let topic = Topic.fromJS(t);
                    if (!mapParentTopic[topic.parentId]) {
                        mapParentTopic[topic.parentId] = new Array();
                    }
                    mapParentTopic[topic.parentId].push(topic);
                })
            }

            data.sort((a, b) => a.orderIndex - b.orderIndex).forEach((topicData) => {
                let topic = new Topic(topicData);
                if (topic.status > -1) {
                    let topicProgress = mapProgress[topic.id];
                    if (topicProgress) {
                        topic.progress = TopicProgress.fromJS(topicProgress);
                    } else {
                        topic.progress = TopicProgress.init(topic.id, Config.USER_ID);
                        listTopicProgress.push(topic.progress);
                    }
                    if (Object.keys(mapParentTopic).length > 0) {
                        let count = 0;
                        let arr = mapParentTopic[topic.id];
                        if (arr && arr.length > 0) {
                            arr.forEach((childTopic) => {
                                let progress = mapProgress[childTopic.id];
                                let total = progress.mastered + progress.familiar + progress.notSeen;
                                if (total !== 0) {
                                    let percent = (progress.mastered * 1 + progress.familiar * 0.5) / total;
                                    count += percent
                                }
                            });
                            topic.progress.progress = Math.round((Math.round(count * 100) / arr.length))
                        }
                    }
                    topics.push(topic);
                }
            });
            yield put(Actions.getTopicsByParentIdSuccess(action.params, topics));
            if (listTopicProgress.length > 0) {
                yield put(getTopicsProgressByTopicIdsSuccess(listTopicProgress));
            }
        } catch (e) {
            // console.log("action.params failure",action.params)
            // yield put(Actions.getTopicsByParentIdFailure(action.params, e));
        }
    }
}

function* getTopicByIdSaga() {
    while (true) {
        try {
            let action = yield take(Types.GET_TOPIC_BY_ID);
            let topic = yield call(getTopicByIdAPI, action.params);
            if (topic) {
                yield put(Actions.getTopicByIdSuccess(topic));
            } else {
                yield put(Actions.getTopicByIdFailure(action.params, 'topic null'));
            }
        } catch (e) {
            yield put(Actions.getTopicByIdFailure(-1, e));
        }
    }
}

export const topicsSaga = [
    getTopicsSaga(),
    getTopicByIdSaga(),
];