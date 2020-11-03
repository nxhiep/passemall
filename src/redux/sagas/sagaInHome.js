import { stateInfoSaga } from './stateInfo';
import { all ,} from 'redux-saga/effects';
import { topicsSaga } from './topicSaga';
import { topicsProgressSaga } from './topicProgress';
export default function* rootSagaHome() {
    yield all([
        ...topicsSaga,
        ...topicsProgressSaga,
        ...stateInfoSaga,
    ]);
}
