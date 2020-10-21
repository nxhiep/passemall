import { Collapse, Grid, Button, IconButton, useTheme, useMediaQuery } from '@material-ui/core';
import { Favorite as HeartIcon, FavoriteBorder as UnHeartIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import QuestionContentPanel, { TextContentType } from '../../components/QuestionContentPanel';
import { LoadingWidget } from '../../components/Widgets';
import Config from '../../config';
import Choice from '../../models/Choice';
import Question from '../../models/QuestionX';
import { onBookmark } from '../../redux/actions';
import { endTest } from '../../redux/actions/index';
import { loadGame, onSelectedChoice } from '../../redux/actions/game';
import { GameState } from '../../redux/reducers/game';
import { ReportDialog } from '../../components/Dialog';
import { isMobileFunctions } from '../../utils';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

var arrayIndex = new Array();
const TestQuestionPanelUI = ({ endTest, initial = 0, questionProgress = {}, className = "", loadGame = () => { }, gameType = Config.TEST_GAME, gameState = GameState.init(), appId, topicId, index = 0, onBookmark, testSetting, appInfoState, onContinue }) => {
    const isMobile = isMobileFunctions();
    let currentQuestion = gameState.currentQuestion;
    let isSkip = currentQuestion && currentQuestion.questionStatus == Config.QUESTION_NOT_ANSWERED;
    useEffect(() => {
        loadGame({ appId: appId, topicId: topicId, gameType: gameType, setting: testSetting });
    }, [loadGame, appId, topicId, gameType, testSetting]);
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
    console.log(testSetting)
    return (
        <div
            className={"questions-panel" + (className ? " " + className : "") + (gameState.isFinish ? " end-game" : "")}
            style={gameState.isFinish && !isMobile ? { maxHeight: 500 } : {}}
            id="canvas">
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
                        appInfoState={appInfoState} />;
                })
            }
            {gameState.isFinish ? null : (
                <Button
                    style={{
                        color: isSkip ? "#4E63BD" : "#fff",
                        margin: !isMobile ? "30px auto 65px auto" : "",
                        display: "block", width: "200px",
                        backgroundColor: isSkip ? "#F0F0F3" : "#8496EA",
                        boxShadow: "inset 0px 4px 4px rgba(255, 255, 255, 0.25)",
                        borderRadius: "20px",
                        position: isMobile ? "fixed" : "",
                        bottom: isMobile ? "110px" : "",
                        left: isMobile ? "calc(50% - 100px)" : ""
                    }}
                    onClick={() => {
                        console.log("xxxxx", gameState.indexActive, "  ", gameState.questions.length - 1)
                        if (gameState.indexActive === (gameState.questions.length - 1)) {
                            endTest(testSetting);
                        } else {
                            onContinue(testSetting);
                        }
                    }}
                >
                    {isSkip ? "Skip" : "Continue"}
                </Button>)}
        </div>
    );
}


const QuestionItem = ({ question = new Question(), index = 0, onBookmark, appInfoState }) => {
    const listAnswer = question.choices;
    const [openCollapse, setOpenCollapse] = useState(false);
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780))
    useEffect(() => {
        setOpenCollapse(false);
    }, [question]);
    return (
        <div className="question-item-panel">
            {isMobile ? null :
                (<Grid
                    container
                    direction="row"
                    alignItems="center"
                    className="question-header-panel"
                >
                    <span style={{ fontWeight: "bold" }}>Question {index + 1}:</span>
                    <span style={{ 'marginLeft': 'auto', display: "flex" }} >
                        <ReportDialog
                            questionId={question.id}
                            appId={appInfoState.id}
                            appName={appInfoState.appName}
                        >
                        </ReportDialog>
                        {question.progress.bookmark ? <IconButton onClick={() => {
                            onBookmark(question);
                        }}>
                            <HeartIcon color="primary" />
                        </IconButton> : <IconButton onClick={() => {
                            onBookmark(question);
                        }}>
                                <UnHeartIcon color="primary" />
                            </IconButton>}
                    </span>
                </Grid>)}
            <div className="question-content">
                <QuestionContentPanel content={question.question} image={question.image} type={TextContentType.question} appInfoState={appInfoState} />
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
                            <QuestionContentPanel content={question.paragraphContent} type={TextContentType.explanation} appInfoState={appInfoState} />
                        </Collapse>
                    </div> : ''
            }
            <ChoicesPanel
                listAnswer={listAnswer}
                questionId={question.id}
                questionStatus={question.questionStatus}
                explanation={question.explanation}
                appInfoState={appInfoState}
            />
        </div >
    );
}

const ChoicesPanelUI = ({ questionId = -1, listAnswer = [], questionStatus = 0, explanation = "", testSettingState, isFinish = false, appInfoState }) => {
    let testSetting = testSettingState === null || testSettingState === void 0 ? void 0 : testSettingState.currentSetting;
    let showResult = isFinish
        || (!(questionStatus === Config.QUESTION_NOT_ANSWERED) && testSetting && testSetting.instanceFeedback);
    return (
        <div className="choices-panel">
            {
                listAnswer.map((choice, index) => {
                    return <AnswerButton
                        appInfoState={appInfoState}
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

const AnswerButtonUI = ({ index = 0, showResult = false, choice = new Choice(), explanation = "", onChoiceSelected = () => { }, appInfoState }) => {
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
                <div className="answer-button-background">
                    <div className='answer-button-title'>{String.fromCharCode(65 + index)}</div>
                </div>
                <div className='answer-button-content'>
                    <QuestionContentPanel content={choice.content} type={TextContentType.answer} appInfoState={appInfoState} />
                </div>
            </div>
            <Collapse className="explanation" in={(!!showResult && !!choice.isCorrect)}>
                <p style={{ fontWeight: "bold" }}>Explanation:</p>
                <div><QuestionContentPanel content={explanation} type={TextContentType.explanation} appInfoState={appInfoState} /></div>
            </Collapse>
        </button>
    );
}

const TestProgressPanelUI = ({ gameState, setShowGame, appInfo, onBookmark }) => {
    let progress = gameState.progress;
    let size = (progress.done / progress.total) * 100;
    let loading = gameState.isLoading == 1 || gameState.isLoading == 2;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    if (loading) {
        return <LoadingWidget color={null} />;
    }
    return (
        <>
            {isMobile ? (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <IconButton onClick={setShowGame}><ArrowBackIcon style={{ color: "#4E63BD" }} />
                    </IconButton>
                    <div style={{ color: "#4E63BD", fontWeight: 600 }}>Question {gameState.currentQuestion.index + 1} </div>
                    <span style={{ display: "flex" }} >
                        <ReportDialog
                            questionId={gameState.currentQuestion.id}
                            appId={appInfo.id}
                            appName={appInfo.appName}
                        >
                        </ReportDialog>
                        {gameState.currentQuestion.progress.bookmark ? <IconButton onClick={() => {
                            onBookmark(gameState.currentQuestion);
                        }}>
                            <HeartIcon color="primary" />
                        </IconButton> : <IconButton onClick={() => {
                            onBookmark(gameState.currentQuestion);
                        }}>
                                <UnHeartIcon color="primary" />
                            </IconButton>}
                    </span>
                </div>
            ) : null}
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
        </>

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
    onBookmark: (question) => onBookmark(question),
    endTest: (setting) => endTest({
        setting: setting
    }),
}
const mapDispatchToPropsProgress = {
    onBookmark: (question) => onBookmark(question)

}
const AnswerButton = connect(null, mapDispatchToProps)(AnswerButtonUI);
const TestQuestionPanel = connect(mapStateToProps, mapDispatchToProps)(TestQuestionPanelUI);
const ChoicesPanel = connect(mapTestSettingStateToProps, null)(ChoicesPanelUI);
const TestProgressPanel = connect(mapStateToProps, mapDispatchToPropsProgress)(TestProgressPanelUI);
export { TestQuestionPanel, TestProgressPanel };

