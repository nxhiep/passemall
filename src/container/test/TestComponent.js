import { Collapse, Grid, Button, withTheme } from '@material-ui/core';
import { Favorite as HeartIcon, FavoriteBorder as UnHeartIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import QuestionContentPanel, { TextContentType } from '../../components/QuestionContentPanel';
import { LoadingWidget } from '../../components/Widgets';
import Config from '../../config';
import Choice from '../../models/Choice';
import Question from '../../models/QuestionX';
import { onBookmark } from '../../redux/actions';
import { loadGame, onSelectedChoice } from '../../redux/actions/game';
import { GameState } from '../../redux/reducers/game';
import useMediaQuery from '@material-ui/core/useMediaQuery';

var arrayIndex = new Array();
const TestQuestionPanelUI = ({ initial = 0, questionProgress = {}, className = "", loadGame = () => { }, gameType = Config.TEST_GAME, gameState = GameState.init(), appId, topicId, index = 0, onBookmark, testSetting, theme , appInfoState }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    useEffect(() => {
        loadGame({ appId: appId, topicId: topicId, gameType: gameType, setting: testSetting });
    }, [loadGame, appId, topicId, gameType, testSetting]);
    let currentQuestion = gameState.currentQuestion;
    if (!questionProgress) {
        questionProgress = {};
    }
    let loading = gameState.isLoading == 1 || gameState.isLoading == 2;
    if (!currentQuestion || loading) {
        return React.createElement(LoadingWidget, { color: null });
    }
    let questions = [currentQuestion];
    if (gameState.isFinish) {
        questions = gameState.questions.sort((a, b) => a.index - b.index);
    }
    if (questions.length === 0) {
        return (React.createElement("div", null, "Empty!"));
    }
    if (gameState.questions.length > 0 && arrayIndex.length == 0) {
        for (let i = 0; i < gameState.questions.length; i++) {
            arrayIndex.concat(i);
            index = i;
        }
    }
    return (
        <div
            className={"questions-panel" + (className ? " " + className : "") + (gameState.isFinish ? " end-game" : "")}
            style={gameState.isFinish && !isMobile ? { maxHeight: 500 } : {}}>
            {
                questions.map((question) => {
                    if (questionProgress[question.id]) {
                        question.progress = questionProgress[question.id];
                    }
                    return <QuestionItem
                        question={question}
                        key={'question-item-' + question.id}
                        index={question.index}
                        onBookmark={onBookmark}
                        appInfoState = {appInfoState} />;
                })
            }
        </div>
    );
}


const QuestionItem = ({ question = new Question(), index = 0, onBookmark , appInfoState}) => {
    const listAnswer = question.choices;
    const [openCollapse, setOpenCollapse] = useState(false);
    useEffect(() => {
        setOpenCollapse(false);
    }, [question]);
    return (
        <div className="question-item-panel">
            <Grid
                container
                direction="row"
                alignItems="center"
                className="question-header-panel"
            >
                <span className="q-title">Question {index + 1}:</span>
                <span style={{ 'marginLeft': 'auto' }} onClick={() => {
                    onBookmark(question);
                }}>{question.progress.bookmark ? <HeartIcon style={{ 'color': '#aaa' }} /> : <UnHeartIcon style={{ 'color': '#aaa' }} />}</span>
            </Grid>
            <div className="question-content">
                <QuestionContentPanel content={question.question} image={question.image} type={TextContentType.question} appInfoState = {appInfoState}/>
            </div>
            {
                question.paragraphId && question.paragraphId > -1 && question.paragraphContent ?
                    <div className="question-paragraph">
                        <Button
                            style={{ marginBottom: "10px" }}
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                setOpenCollapse(!openCollapse);
                            }}>{openCollapse ? "Hidden" : "Read more"}</Button>
                        <Collapse style={{ color: '#555', paddingBottom: "10px" }} in={openCollapse}>
                            <QuestionContentPanel content={question.paragraphContent} type={TextContentType.explanation} appInfoState = {appInfoState} />
                        </Collapse>
                    </div> : ''
            }
            <ChoicesPanel
                listAnswer={listAnswer}
                questionId={question.id}
                questionStatus={question.questionStatus}
                explanation={question.explanation}
                appInfoState = {appInfoState}
            />
        </div>
    );
}

const ChoicesPanelUI = ({ questionId = -1, listAnswer = [], questionStatus = 0, explanation = "", testSettingState, isFinish = false,appInfoState }) => {
    let testSetting = testSettingState === null || testSettingState === void 0 ? void 0 : testSettingState.currentSetting;
    let showResult = isFinish
        || (!(questionStatus === Config.QUESTION_NOT_ANSWERED) && testSetting && testSetting.instanceFeedback);
    return (
        <div className="choices-panel">
            {
                listAnswer.map((choice, index) => {
                    return <AnswerButton
                        appInfoState = {appInfoState}
                        index={index}
                        key={'answer-item-' + questionId + '-' + index}
                        showResult={showResult}
                        explanation={explanation}
                        choice={{ ...choice }}
                    />;
                })
            }
        </div>
    );
}

const AnswerButtonUI = ({ index = 0, showResult = false, choice = new Choice(), explanation = "", onChoiceSelected = () => { } , appInfoState }) => {
    let showCss = "";
    if (showResult) {
        if (choice.selected) {
            showCss = (choice.isCorrect ? " correct" : " wrong");
        } else {
            showCss = (choice.isCorrect ? " correct" : "");
        }
    }
    return (
        <button className={"answer-button" + (!showResult && choice.selected ? " selected" : "") + showCss + (Config.TEST_MODE && choice.isCorrect ? " test-true" : "")}
            onClick={() => {
                if (showResult) {
                    return;
                }
                onChoiceSelected(choice);
            }}>
            <div className="answered-content">
                <div className='answer-button-title'>{String.fromCharCode(65 + index)}</div>
                <div className='answer-button-content'>
                    <QuestionContentPanel content={choice.content} type={TextContentType.answer} appInfoState = {appInfoState} />
                </div>
            </div>
            <Collapse className="explanation" in={(!!showResult && !!choice.isCorrect)}>
                <p>Explanation:</p>
                <div><QuestionContentPanel content={explanation} type={TextContentType.explanation} appInfoState = {appInfoState}/></div>
            </Collapse>
        </button>
    );
}

const TestProgressPanelUI = ({ gameState }) => {
    let progress = gameState.progress;
    let size = (progress.done / progress.total) * 100;
    let loading = gameState.isLoading == 1 || gameState.isLoading == 2;
    if (loading) {
        return <LoadingWidget color={null} />;
    }
    return (
        <div className="test-progress-panel">
            <div className="progress-panel">
                <div className="content-line-progress" style={{ left: 'calc(' + size + '% - 25px)' }}>{progress.done} / {progress.total}</div>
                <div style={{ visibility: 'hidden' }}>X</div>
                <div className="parent-content-panel">
                    <div className="content-progress" style={{ width: size + '%' }}></div>
                    <div style={{ visibility: 'hidden' }}>X</div>
                </div>
            </div>
        </div>
    );
}

const mapTestSettingStateToProps = (state) => {
    return {
        testSettingState: state.testSettingState,
        isFinish: state.gameState.isFinish
    }
}

const mapStateToProps = (state, ownProps) => ({
    gameState: state.gameState,
    cardProgressReducer: state.cardProgressReducer,
    ...ownProps
})
const mapDispatchToProps = {
    loadGame: (params) => loadGame(params),
    onChoiceSelected: (choice) => onSelectedChoice(choice),
    onBookmark: (question) => onBookmark(question)
}
const AnswerButton = connect(null, mapDispatchToProps)(AnswerButtonUI);
const TestQuestionPanel = connect(mapStateToProps, mapDispatchToProps)(withTheme(TestQuestionPanelUI));
const ChoicesPanel = connect(mapTestSettingStateToProps, null)(ChoicesPanelUI);
const TestProgressPanel = connect(mapStateToProps, null)(TestProgressPanelUI);
export { TestQuestionPanel, TestProgressPanel };

