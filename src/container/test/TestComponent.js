import { Button, Collapse, Grid, IconButton, Paper, Popover, useMediaQuery, useTheme } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon, Favorite as HeartIcon, FavoriteBorder as UnHeartIcon, NavigateBefore as BackIcon, NavigateNext as NextIcon } from '@material-ui/icons';
import CancelIcon from '@material-ui/icons/Cancel';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TimerIcon from '@material-ui/icons/Timer';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { DialogInfo, ReportDialog } from '../../components/Dialog';
import QuestionContentPanel, { TextContentType } from '../../components/QuestionContentPanel';
import { LoadingWidget } from '../../components/Widgets';
import Config from '../../config';
import Choice from '../../models/Choice';
import Question from '../../models/QuestionX';
import { onBookmark } from '../../redux/actions';
import { loadGame, onContinue, onSelectedChoice } from '../../redux/actions/game';
import { endTest } from '../../redux/actions/index';
import { setTimeLeftState } from '../../redux/actions/timeLeft';
import { convertTime, isMobileFunctions, isProduction } from '../../utils';
import { CongratulationAlert } from '../game/Game.ViewTS';
var arrayIndex = new Array();
const CountDownUI = ({ timeLeftReducer, id, setTimeLeftState, onContinue, endTest, level }) => {
    useEffect(() => {
        if (timeLeftReducer.data[id]) {
            if (timeLeftReducer.data[id].timeLeft === 0) {
                if (level === Config.HARD_LEVEL) {
                    endTest();
                } else {
                    if (level === Config.VERY_HARD_LEVEL) {
                        onContinue();
                    }
                }
            } else {
                const timer = setTimeout(() => {
                    return setTimeLeftState({ id: id, timeLeft: timeLeftReducer.data[id].timeLeft - 1 });
                }, 1000);
                return () => clearTimeout(timer);
            }

        }
    });
    return (
        <div className="count-down">
            <TimerIcon></TimerIcon>
            <div style={{ marginLeft: "8px", minWidth: "85px", textAlign: "center" }}>
                {convertTime(timeLeftReducer.data[id] ? timeLeftReducer.data[id].timeLeft : -1)}
            </div>
        </div>
    )
}
const TestQuestionPanelUI = ({ showLeftPanel, endTest = () => { }, setShowLeftPanel = () => { }, questionProgress = {}, className = "", loadGame = () => { }, gameState, testInfoId, appId, timeTest, passPercent, questionIds, index = 0, onBookmark, appInfoState, onContinue = () => { } }) => {
    const isMobile = isMobileFunctions();
    let currentQuestion = gameState.currentQuestion;
    let isSkip = currentQuestion && currentQuestion.questionStatus == Config.QUESTION_NOT_ANSWERED;
    useEffect(() => {
        loadGame({ gameType: Config.TEST_GAME, appId: appId, id: testInfoId, timeTest: timeTest, passPercent: passPercent, questionIds: questionIds })
    }, [loadGame, appId, onContinue, endTest]);
    if (!questionProgress) {
        questionProgress = {};
    }
    let loading = gameState.isLoading === 2;
    if (!currentQuestion || loading) {
        return <LoadingWidget></LoadingWidget>
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
        <>
            <div
                className={"questions-panel" + (className ? " " + className : "") + (gameState.isFinish ? " end-game" : "")}
                id="canvas">
                {gameState.isFinish && isMobile ? <IconButton onClick={() => setShowLeftPanel()}>
                    <ArrowBackIcon style={{ color: "#4E63BD" }} />
                </IconButton> : null}
                { (gameState.level === Config.EASY_LEVEL || gameState.isFinish === true || showLeftPanel === true) ?
                    null : <CountDown onContinue={onContinue}
                        endTest={endTest}
                        level={gameState.level}
                        id={testInfoId + "-" + gameState.level} >
                    </CountDown>
                }
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
                            appInfoState={appInfoState}
                            level={gameState.level} />
                    })
                }
            </div>
            {
                gameState.isFinish ? null : <>
                { isMobile ? <div style={{height: "62px", width: "100%"}}></div> : null }
                <div className="parent-button-test">
                    <Button
                        variant={isSkip ? "outlined" : "contained"}
                        color="primary"
                        className={"button-test " + (isSkip ? "skip" : "continue")}
                        onClick={() => {
                            if (gameState.indexActive === (gameState.questions.length - 1)) {
                                endTest();
                            } else {
                                onContinue();
                            }
                        }}
                    >
                        {isSkip ? "Skip" : "Continue"}
                    </Button>
                </div>
                </>
            }
        </>
    );
}


const QuestionItem = ({ level, question = new Question(), index = 0, onBookmark, appInfoState }) => {
    const listAnswer = question.choices;
    const [openCollapse, setOpenCollapse] = useState(false);
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780))
    return (
        <div className="question-item-panel">
            {isMobile ? <span style={{ fontWeight: "bold", marginTop: "20px" }}>Question {index + 1}:</span>
                :
                (<Grid
                    container
                    direction="row"
                    alignItems="center"
                    className="question-header-panel"
                >
                    <span style={{ fontWeight: "bold" }}>Question {index + 1}:</span>
                    <span style={{ marginLeft: "auto", display: "flex" }} >
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
                level={level}
            />
        </div >
    );
}

const ChoicesPanelUI = ({ level, questionId = -1, listAnswer = [], questionStatus = 0, explanation = "", gameState, appInfoState }) => {
    let showResult = gameState.isFinish ? true : (level === Config.EASY_LEVEL ? ((questionStatus === Config.QUESTION_NOT_ANSWERED) ? false : true) : false)
    let check = 0;
    return (
        <div className="choices-panel">
            {
                listAnswer.map((choice, index) => {
                    if (choice.isCorrect) {
                        check++;
                    }
                    return <AnswerButton
                        appInfoState={appInfoState}
                        index={index}
                        key={'answer-item-' + questionId + '-' + index}
                        showResult={showResult}
                        explanation={explanation}
                        selected={choice.selected}
                        choice={{ ...choice }}
                        check={check}
                    />;
                })
            }
        </div>
    );
}

const AnswerButtonUI = ({ check, index = 0, showResult = false, choice = new Choice(), explanation = "", onChoiceSelected = () => { }, appInfoState }) => {
    let showCss = "";
    if (showResult) {
        if (choice.selected) {
            showCss = (choice.isCorrect ? " correct" : " wrong");
        } else {
            showCss = (choice.isCorrect ? " correct" : "");
        }
    }
    return (
        <button className={"answer-button" + (!showResult && choice.selected ? " selected" : "") + showCss + ((Config.TEST_MODE || !isProduction()) && choice.isCorrect ? " test-true" : "")}
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
            {check === 1 ? (<Collapse className="explanation" in={(showResult && choice.isCorrect)}>
                <p style={{ fontWeight: "bold" }}>Explanation:</p>
                <div><QuestionContentPanel content={explanation} type={TextContentType.explanation} appInfoState={appInfoState} /></div>
            </Collapse>) : null}
        </button>
    );
}
const TestProgressPanelUI = ({ gameState, appInfo, onBookmark, setShowLeftPanel, endTest }) => {
    let progress = gameState.progress;
    let size = ((gameState.indexActive) / progress.total) * 100;
    let loading = gameState.isLoading == 2;
    if ((gameState.isFinish && loading) || (gameState.currentQuestion && loading) || (gameState.level < 0)) {
        return null
    }
    const [showAlert, setShowAlert] = useState(false)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    if (loading) {
        return <LoadingWidget color={null} />;
    }
    return (
        <>
            {isMobile ? (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: isMobile ? "15px 8px" : "0 8px", background: "#e5e5e5" }}>
                    { !showAlert ? null : <CongratulationAlert onBookmark={true} onClose={() => setShowAlert(false)}></CongratulationAlert>}

                    <ArrowBackIcon onClick={() => setShowLeftPanel()} style={{ color: "#4E63BD", marginTop: "20px" }} />
                    <div className="test-progress-panel" >
                        <div className="progress-panel">
                            <div className="content-line-progress" style={{ left: 'calc(' + size + '% - 10px)' }}>{gameState.indexActive} / {gameState.questions.length}</div>
                            <div style={{ visibility: 'hidden' }}>X</div>
                            <div className="parent-content-panel">
                                <div className="content-progress" style={{ width: size + '%' }}></div>
                                <div style={{ visibility: 'hidden' }}>X</div>
                            </div>
                        </div>
                    </div>
                    <span style={{ display: "flex" }}>
                        <MoreVertIcon color="primary" onClick={(event) => handleClick(event)}></MoreVertIcon>
                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "center"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center"
                            }}
                        >
                            <Paper
                                elevation={4}
                                style={{
                                    width: "200px",
                                    height: "160px",
                                    padding: "10px",
                                    fontSize: "16px",
                                }}
                            >
                                <Button fullWidth={true} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "16px" }} onClick={() => {
                                    if (!gameState.currentQuestion.progress.bookmark) {
                                        setShowAlert(true);
                                    }
                                    onBookmark(gameState.currentQuestion);
                                    handleClose()
                                }}>
                                    {gameState.currentQuestion.progress.bookmark ?
                                        <HeartIcon color="primary" /> : <UnHeartIcon color="primary" />
                                    }
                                    <div style={{ marginLeft: "16px" }}>Favorite</div>
                                </Button>
                                <ReportDialog
                                    questionId={gameState.currentQuestion.id}
                                    appId={appInfo.id}
                                    appName={appInfo.appName}
                                    handleClosePopover={() => handleClose()}>
                                </ReportDialog>
                                <Button onClick={() => {
                                    endTest();
                                    handleClose()
                                }} fullWidth={true} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "16px" }}>
                                    <CancelIcon color="primary"></CancelIcon>
                                    <div style={{ marginLeft: "16px" }}>End Test</div>
                                </Button>
                            </Paper>
                        </Popover>
                    </span>
                </div>
            ) : (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 8px", background: "#f0f0f3" }}>
                        <div className="test-progress-panel" >
                            <div className="progress-panel">
                                <div className="content-line-progress" style={{ left: 'calc(' + size + '% - 10px)' }}>{gameState.indexActive} / {gameState.questions.length}</div>
                                <div style={{ visibility: 'hidden' }}>X</div>
                                <div className="parent-content-panel">
                                    <div className="content-progress" style={{ width: size + '%' }}></div>
                                    <div style={{ visibility: 'hidden' }}>X</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>

    );
}
const ButtonLevelUI = ({ 
    showLeftPanel, isHaveRightPanel, setShowLeftPanel, 
    testInfoId, appId, timeTest, passPercent, 
    questionIds, loadGame, setDialogInfo, 
    gameStateId, level, isFinish, setShowGame,
    hiddenBackButton, onClickItem
    }) => {
    let id = gameStateId === -1 ? -1 : gameStateId.substring(0, gameStateId.length - 2);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));

    const handleClickLoadGame = (levelClick, currentLevel) => {
        onClickItem && onClickItem(levelClick, currentLevel)
        if (!isMobile) {
            if (id == testInfoId && levelClick !== currentLevel) {
                setDialogInfo(new DialogInfo({
                    title: 'Load Game', msg: 'Do you want to pause test', okText: '', cancelText: '', onConfirm: (result) => {
                        if (result) {
                            loadGame({ gameType: Config.TEST_GAME, level: levelClick, appId: appId, id: testInfoId, timeTest: timeTest, passPercent: passPercent, questionIds: questionIds })
                        }
                    }
                }));
            } else {
                if (id != testInfoId) {
                    setShowLeftPanel();
                    loadGame({ gameType: Config.TEST_GAME, level: levelClick, appId: appId, id: testInfoId, timeTest: timeTest, passPercent: passPercent, questionIds: questionIds })
                }
            }
        } else {
            setShowLeftPanel();
            loadGame({ gameType: Config.TEST_GAME, level: levelClick, appId: appId, id: testInfoId, timeTest: timeTest, passPercent: passPercent, questionIds: questionIds })
        }
    }
    if (isHaveRightPanel && !showLeftPanel) {
        return null
    }
    return (
        <Grid container spacing={1} 
            alignItems="center" 
            justify="space-between"
            direction={isMobile ? "column" : "row"} 
            className="list-level">
            {hiddenBackButton !== true ? <div className="button-back" 
                onClick={() => {
                    if (!isMobile) {
                        if (id === -1 || isFinish) {
                            setShowGame();
                        } else {
                            if (id == testInfoId) {
                                setDialogInfo(new DialogInfo({
                                    title: 'Play again', msg: 'Do you want to pause test', okText: '', cancelText: '', onConfirm: (result) => {
                                        if (result) {
                                            setShowGame();
                                        }
                                    }
                                }));
                            }
                        }
                    } else {
                        setShowGame()
                    }
                }}>
                <BackIcon style={{ fontSize: "40px", color: "#818C99" }}></BackIcon>
            </div> : null}
            <Grid item 
                onClick={() => handleClickLoadGame(Config.EASY_LEVEL, level)} 
                className={"button-level " + (level === Config.EASY_LEVEL && id == testInfoId ? "active" : "")}>
                <div style={{ display: "flex", flexDirection: "column", cursor: "pointer" }} >
                    <div className="b-title">Easy Test</div>
                    <div className="b-des">Instant Feedback, Unlimited time</div>
                </div>
                <NextIcon style={{ marginLeft: "auto", fontSize: "40px" }}></NextIcon>
            </Grid>
            <Grid item 
                onClick={() => handleClickLoadGame(Config.HARD_LEVEL, level)} 
                className={"button-level " + (level === Config.HARD_LEVEL && id == testInfoId ? "active" : "")}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="b-title">Hard Test</div>
                    <div className="b-des">40 - minutes test</div>
                </div>
                <NextIcon style={{ marginLeft: "auto", fontSize: "40px" }}></NextIcon>
            </Grid>
            <Grid item 
                onClick={() => handleClickLoadGame(Config.VERY_HARD_LEVEL, level)} 
                className={"button-level " + (level === Config.VERY_HARD_LEVEL && id == testInfoId ? "active" : "")}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="b-title">Hardest Test</div>
                    <div className="b-des">60 seconds / question</div>
                </div>
                <NextIcon style={{ marginLeft: "auto", fontSize: "40px" }}></NextIcon>
            </Grid>
        </Grid>
    )
}

const mapTestSettingStateToProps = (state) => {
    return {
        gameState: state.gameState,
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
    endTest: () => endTest(),
    onContinue: () => onContinue(),
}
const mapStateToPropsCountDown = (state, ownProps) => {
    return {
        timeLeftReducer: state.timeLeftReducer,
        ...ownProps
    }
}
const mapDispatchToPropsCountDown = (dispatch) => {
    return {
        setTimeLeftState: (timeLeft) => dispatch(setTimeLeftState(timeLeft))
    }
}
const mapDispatchToPropsProgress = {
    onBookmark: (question) => onBookmark(question),
    endTest: () => endTest()
}
const mapDispatchToPropsButton = {
    loadGame: (params) => loadGame(params)
}

const CountDown = connect(mapStateToPropsCountDown, mapDispatchToPropsCountDown)(CountDownUI)
const ButtonLevel = connect(null, mapDispatchToPropsButton)(ButtonLevelUI)
const AnswerButton = connect(null, mapDispatchToProps)(AnswerButtonUI);
const TestQuestionPanel = connect(mapStateToProps, mapDispatchToProps)(TestQuestionPanelUI);
const ChoicesPanel = connect(mapTestSettingStateToProps, null)(ChoicesPanelUI);
const TestProgressPanel = connect(mapStateToProps, mapDispatchToPropsProgress)(TestProgressPanelUI);
export { TestQuestionPanel, TestProgressPanel, ButtonLevel };

