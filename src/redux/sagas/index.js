import { stateInfoSaga } from './stateInfo';
import { all ,} from 'redux-saga/effects';
import { cardsProgressSaga } from './cardProgressSaga';
import { cardsSaga } from './cardSaga';
import { gameSaga } from './game';
import { topicsSaga } from './topicSaga';
import { topicsProgressSaga } from './topicProgress';
export default function* rootSaga() {
    yield all([
        ...cardsProgressSaga,
        ...topicsSaga,
        ...cardsSaga,
        ...gameSaga,
        ...topicsProgressSaga,
        ...stateInfoSaga,
    ]);
}
