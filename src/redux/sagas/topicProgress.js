import { put, select, take } from 'redux-saga/effects';
import Config from '../../config';
import TopicProgress from '../../models/TopicProgress';
import * as Actions from '../actions/topicProgress';
import * as Types from '../actions/types';
import { resetCardInTopic } from './../actions/cardProgress';

function* getTopicsProgressSaga() {
    try {
        let action = yield take(Types.GET_QUESTION_PROGRESS_BY_IDS);
        let topicsProgressState = yield select((state) => state.topicProgressReducer);
        let listProgress = new Array();
        if (topicsProgressState && topicsProgressState.data) {
            let ids = action.params ?? [];
            ids.forEach(function (topicId) {
                if (topicsProgressState.data[topicId]) {
                    listProgress.push(TopicProgress.fromJS(topicsProgressState.data[topicId]));
                } else {
                    listProgress.push(TopicProgress.init(topicId, Config.USER_ID));
                }
            });
        } else {

        }
        yield put(Actions.getTopicsProgressByTopicIdsSuccess(listProgress));
    } catch (e) {
        yield put(Actions.getTopicsProgressByTopicIdsFailure(e))
    }
}


function* updateTopicsProgress() {
    while (true) {
        try {
            let action = yield take(Types.UPDATE_TOPICS_PROGRESS);
            if (action.data && action.data.length > 0) {
                yield put(Actions.updateTopicsProgressSuccess(action.data));
            }
        } catch (e) {
        }
    }
}

function* resetTopicProgress() {
    while (true) {
        try {
            let action = yield take(Types.RESET_TOPIC_PROGRESS);
            let topicId = action ? (action.topicProgress ? action.topicProgress.topicId : -1) : -1;
            if (topicId > -1) {
                yield put(resetCardInTopic(topicId));
            }
        } catch (e) { }
    }
}

export const topicsProgressSaga = [
    getTopicsProgressSaga(),
    updateTopicsProgress(),
    resetTopicProgress()
];