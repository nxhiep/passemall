import { Collapse, Grid, Button, IconButton, useMediaQuery, useTheme, Popover, Paper } from '@material-ui/core';
import { MoreVert as MoreVertIcon, LockOpen as UnLockIcon, Close as CloseIcon, DoneAll as DoneAllIcon, ArrowForward as ArrowForwardIcon, ArrowBack as ArrowBackIcon, Clear as UnCheckIcon, Done as CheckIcon, Favorite as HeartIcon, FavoriteBorder as UnHeartIcon, ArrowRightAlt as ArrowRightAltIcon, Done } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import QuestionContentPanel, { TextContentType } from '../../components/QuestionContentPanel';
import { LoadingWidget } from '../../components/Widgets';
import Config from '../../config';
import QuestionProgress from '../../models/QuestionProgress';
import { onBookmark } from '../../redux/actions';
import { ReportDialog } from '../../components/Dialog'
import { loadGame, onSelectedChoice } from '../../redux/actions/game';
import { isMobileFunctions } from '../../utils';
import { useRouter } from 'next/router';

const mapStateToProps = (state, ownProps) => ({
    gameState: state.gameState,
    cardProgressReducer: state.cardProgressReducer,
    ...ownProps
})
const mapDispatchToProps = {
    loadGame: (props) => loadGame(props),
    onBookmark: (question) => onBookmark(question),
}
const mapDispatchReviewQuestionToProps = {
    onBookmark: (question) => onBookmark(question)
}
const mapDispatchChoiceToProps = {
    onChoiceSelected: (choice) => onSelectedChoice(choice)
}



const QuestionsPanelx = ({ questionProgress, className, topicId, loadGame = () => { }, gameState, gameType, currentIndex, onBookmark, questionIds, appInfo, onContinue, congratulationTopic, onNextPart, setShowGame }) => {
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        loadGame({ appId: appInfo.id, id: topicId, gameType: gameType, questionIds: questionIds });
    }, [loadGame, appInfo, topicId, gameType, questionIds]);
    const isMobile = isMobileFunctions();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    if (gameState.isLoading === 1 || gameState.isLoading === 2) {
        return <LoadingWidget color={null} />;
    }
    let size = gameState.progress.getPercentComplete() * 100;
    if (gameType === Config.REVIEW_GAME) {
        let questions = gameState.questions;
        if (!questions) {
            return <LoadingWidget color={null} />;
        }
        return (
            <div className={"questions-panel" + (className ? " " + className : "")} style={{ backgroundColor: "#f7f8ff", marginBottom: "100px" }} id="canvas">
                {
                    questions.map((question, index) => {
                        return <QuestionItemTS
                            appInfoState={appInfo}
                            question={question}
                            key={'question-item-' + question.id}
                            index={index}
                            onBookmark={onBookmark} />;
                    })
                }
            </div>
        );
    }
    let currentQuestion = gameState.currentQuestion;
    if (!questionProgress) {
        questionProgress = new Map();
    }
    if (!currentQuestion) {
        return <LoadingWidget color={null} />;
    }
    if (!currentIndex) {
        currentIndex = 0;
    }
    let checkChoice = gameState.currentQuestion.questionStatus === Config.QUESTION_ANSWERED_CORRECT || gameState.currentQuestion.questionStatus === Config.QUESTION_ANSWERED_INCORRECT
    let questions = [currentQuestion];
    if (isMobile) {
        return (
            <>
                {showAlert ? <CongratulationAlert onBookmark={true} onClose={() => setShowAlert(false)}></CongratulationAlert> : null}
                <Grid
                    style={{ display: "flex" }}
                    container alignItems="center" >
                    <IconButton style={{ color: "#4E63BD", marginTop: "20px" }} onClick={() => { setShowGame() }}><ArrowBackIcon /></IconButton>

                    <div style={{ display: "flex", flexDirection: "column", width: "calc(100% - 120px)", padding: "0px 10px 0px 10px", }}>
                        <div style={{ display: "flex", width: "80%", justifyContent: "space-around", marginLeft: "auto", marginRight: "auto", fontWeight: 600, color: "#3f51b5" }}>
                            <div style={{ position: "relative" }}>
                                <span>{gameState.questions.length - gameState.progress.familiar - gameState.progress.mastered}</span>
                            </div>
                            <ArrowForwardIcon style={{ fontSize: "16px" }}></ArrowForwardIcon>
                            <div>
                                <span>{gameState.progress.familiar}</span>
                                <Done style={{ fontSize: "12px", position: "relative", bottom: "8px", left: "4px" }}></Done>
                            </div>
                            <ArrowForwardIcon style={{ fontSize: "16px" }}></ArrowForwardIcon>
                            <div>
                                <span>{gameState.progress.mastered}</span>
                                <DoneAllIcon style={{ fontSize: "12px", position: "relative", bottom: "8px", left: "4px" }}></DoneAllIcon>
                            </div>
                        </div>
                        <div style={{ width: "100%" }}>
                            <div style={{ position: "relative", bottom: "8px" }}>
                                <div style={{ visibility: 'hidden' }}>X</div>
                                <div style={{ width: "100%", height: "10px", background: "#fff", borderRadius: "10px" }}>
                                    <div style={{ width: size + '%', background: "linear-gradient(270deg, #4E63BD 6.58%, #7F91DC 99.04%)", height: "10px", position: "absolute", top: "19px", left: "0", borderRadius: "10px", transition: "all 0.5s ease 0s" }}></div>
                                    <div style={{ visibility: 'hidden' }}>X</div>
                                </div>
                            </div>
                        </div >
                    </div>
                    <span style={{ display: "flex", margin: "20px 20px 0px auto" }} >
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
                                    height: "120px",
                                    padding: "10px",
                                    fontSize: "16px",
                                }}
                            >
                                <Button fullWidth={true} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "16px" }} onClick={() => {
                                    onBookmark(gameState.currentQuestion);
                                    setShowAlert(true)
                                }}>
                                    {gameState.currentQuestion.progress.bookmark ?
                                        <HeartIcon color="primary" /> : <UnHeartIcon color="primary" />
                                    }
                                    <div style={{ marginLeft: "16px" }}>Favorite</div>
                                </Button>
                                <ReportDialog
                                    questionId={gameState.currentQuestion.id}
                                    appId={appInfo.id}
                                    appName={appInfo.appName}>
                                </ReportDialog>
                            </Paper>
                        </Popover>

                    </span>
                </Grid>

                <div className={"questions-panel" + (className ? " " + className : "")} id="canvas">
                    {
                        questions.map((question, index) => {
                            if (questionProgress.has(question.id)) {
                                question.progress = questionProgress.get(question.id) ?? new QuestionProgress();
                            }
                            return <QuestionItemTS
                                appInfoState={appInfo}
                                question={question}
                                key={'question-item-' + question.id}
                                index={currentIndex}
                                onBookmark={onBookmark} />;
                        })
                    }
                    <div style={{ marginTop: "auto" }}></div>
                    <Button
                        variant="contained"
                        style={{ display: checkChoice ? "flex" : "none", backgroundColor: "#8496EA", color: "#fff", boxShadow: "inset 0px 4px 4px rgba(255, 255, 255, 0.25)", borderRadius: "20px", zIndex: 1000 }}
                        className="next-part-button"
                        onClick={() => {
                            if (congratulationTopic) {
                                onNextPart();
                            } else {
                                onContinue();
                            }
                        }}
                    >
                        Next Quesiton<ArrowRightAltIcon />
                    </Button>
                </div >
                <div style={{ height: "50px" }}></div>
            </>
        )
    }
    return (
        <div className={"questions-panel" + (className ? " " + className : "")} id="canvas">

            <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "0px 20px 0px 0px", }}>
                <div style={{ display: "flex", width: "60%", justifyContent: "space-around", marginLeft: "auto", marginRight: "auto", fontWeight: 600, color: "#3f51b5" }}>
                    <div style={{ position: "relative" }}>
                        <span>{gameState.questions.length - gameState.progress.familiar - gameState.progress.mastered}</span>
                    </div>
                    <ArrowForwardIcon style={{ fontSize: "16px" }}></ArrowForwardIcon>
                    <div>
                        <span>{gameState.progress.familiar}</span>
                        <Done style={{ fontSize: "12px", position: "relative", bottom: "8px", left: "4px" }}></Done>
                    </div>
                    <ArrowForwardIcon style={{ fontSize: "16px" }}></ArrowForwardIcon>
                    <div>
                        <span>{gameState.progress.mastered}</span>
                        <DoneAllIcon style={{ fontSize: "12px", position: "relative", bottom: "8px", left: "4px" }}></DoneAllIcon>
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <div style={{ position: "relative", bottom: "8px" }}>
                        <div style={{ visibility: 'hidden' }}>X</div>
                        <div style={{ width: "100%", height: "10px", background: "#fff", borderRadius: "10px" }}>
                            <div style={{ width: size + '%', background: "linear-gradient(270deg, #4E63BD 6.58%, #7F91DC 99.04%)", height: "10px", position: "absolute", top: "19px", left: "0", borderRadius: "10px", transition: "all 0.5s ease 0s" }}></div>
                            <div style={{ visibility: 'hidden' }}>X</div>
                        </div>
                    </div>
                </div >
            </div>
            {
                questions.map((question) => {
                    if (questionProgress.has(question.id)) {
                        question.progress = questionProgress.get(question.id) ?? new QuestionProgress();
                    }
                    return <QuestionItemTS
                        appInfoState={appInfo}
                        question={question}
                        key={'question-item-' + question.id}
                        index={currentIndex}
                        onBookmark={onBookmark} />;
                })
            }
            {isMobile ? null : (
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    style={congratulationTopic ? { display: "none" } : {}}
                >
                    <Button
                        variant="contained"
                        style={{ display: checkChoice ? "flex" : "none", backgroundColor: "#8496EA", color: "#fff", boxShadow: "inset 0px 4px 4px rgba(255, 255, 255, 0.25)", borderRadius: "10px" }}
                        className="next-part-button"
                        onClick={() => onContinue()}
                    >
                        Next Question<ArrowRightAltIcon />
                    </Button>
                </Grid>
            )}
        </div>
    );
}
const CongratulationAlert = ({ topicName = "", onClose = () => { }, onBookmark = false, page = "" }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));

    useEffect(() => {
        let time = setTimeout(() => onClose(), 2500);
        return () => {
            clearTimeout(time);
        };
    }, []);
    const router = useRouter();
    const { screenChild } = router.query
    return (
        <Grid
            container
            alignItems="center"
            justify="space-between"
            className="congratulation-alert-panel"
            style={{
                backgroundColor: onBookmark ? "green" : "#ffff40",
                top: screenChild === "review" ? "39%" : (onBookmark ? "53%" : (isMobile ? "0px" : "60px")),
                width: onBookmark ? (isMobile ? "150px" : "200px") : "100%",
                textAlign: "center",
                color: onBookmark ? "#fff" : "#000",
                zIndex: 100,
                justifyContent: onBookmark ? "center" : "",
                left: onBookmark ? (isMobile ? "calc(50% - 75px )" : "57%") : "0",
                borderRadius: onBookmark ? "20px" : "0px"
            }}>
            <div></div>
            <div className="title">
                {onBookmark ? null : <UnLockIcon></UnLockIcon>}
                <span style={{ fontSize: onBookmark ? "14px" : "18px" }}>{onBookmark ? "Added to favorites" : `You must complete previous ${page}!`}</span>
            </div>
            { onBookmark ? null : <IconButton style={{ fontSize: isMobile ? "14px" : "18px" }} onClick={() => onClose()}><CloseIcon /></IconButton>}
        </Grid>
    );
}
const QuestionItemTS = ({ question, index, onBookmark, appInfoState }) => {
    const [showAlert, setShowAlert] = useState(false)
    const listAnswer = question.choices;
    const [openCollapse, setOpenCollapse] = useState(false);
    const isMobile = isMobileFunctions()
    useEffect(() => {
        setOpenCollapse(false);
    }, [question]);
    return (
        <div className="question-item-panel">
            {isMobile ? null : <Grid
                container
                direction="row"
                alignItems="center"
                className="question-header-panel"
            >
                <span className="q-title">Question {index + 1}:</span>
                <ProgressQuestionTS progress={question.progress.progress} questionId={question.id} />
                <span style={{ marginLeft: 'auto', display: "flex", position: "relative" }} >
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
                        setShowAlert(true);
                        onBookmark(question);
                    }}>
                            <UnHeartIcon color="primary" />
                        </IconButton>}
                </span>
                {showAlert ? <CongratulationAlert onBookmark={true} onClose={() => setShowAlert(false)}></CongratulationAlert> : null}
            </Grid>}
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
            {
                question.correctNums > 1 ? <div className="select-multiple-question-title">
                    Selected: {question.getNumberChoiceSelected()}/{question.correctNums}
                </div> : null
            }
            <ChoicesPanelTS
                appInfoState={appInfoState}
                listAnswer={listAnswer} questionId={question.id}
                questionStatus={question.questionStatus}
                explanation={question.explanation} />
        </div>
    );
}

const ChoicesPanelTS = ({ questionId, listAnswer, questionStatus, explanation, appInfoState }) => {
    let check = 0;
    return (
        <div className="choices-panel">
            {
                listAnswer.map((choice, index) => {
                    if (choice.isCorrect) {
                        check++;
                    }
                    return <AnswerButtonTS
                        appInfoState={appInfoState}
                        index={index}
                        answer={choice.content}
                        key={'answer-item-' + questionId + '-' + index}
                        showResult={(questionStatus === Config.QUESTION_NOT_ANSWERED) ? false : true}
                        explanation={explanation}
                        result={choice.isCorrect}
                        selected={choice.selected}
                        choice={choice}
                        check={check}
                    />;
                })
            }
        </div>
    );
}

const AnswerButton2 = ({ index, answer, explanation, result, selected, choice, onChoiceSelected, showResult, appInfoState, check }) => {
    let showCss = "";
    if (showResult) {
        if (selected) {
            showCss = (result ? " correct" : " wrong");
        } else {
            showCss = (result ? " correct" : "");
        }
    }
    return (
        <button className={"answer-button" + (!showResult && selected ? " selected" : "") + showCss + (Config.TEST_MODE && result ? " test-true" : "")} onClick={() => {
            if (showResult) {
                return;
            }
            onChoiceSelected(choice);
        }}>
            <div className="answered-content">
                <div className="answer-button-background">
                    <div className='answer-button-title'>{String.fromCharCode(65 + index)}</div>
                </div>
                <div className='answer-button-content'><QuestionContentPanel content={answer} type={TextContentType.answer} appInfoState={appInfoState} /></div>
            </div>


            {check === 1 ? <Collapse className="explanation" in={showResult && result}>
                <p style={{ fontWeight: "bold" }}>Explanation:</p>
                <QuestionContentPanel content={explanation} type={TextContentType.explanation} appInfoState={appInfoState} />
            </Collapse> : null}
        </button>
    );
}

const ProgressQuestionTS = ({ progress, questionId }) => {
    if (!progress) {
        return <div></div>;
    }
    return (
        <span>
            {
                progress.map((item, index) => {
                    return (
                        <span key={'ProgressQuestion-item-' + questionId + '-' + index}>
                            {item === 1 ?
                                <CheckIcon style={{ 'color': 'green', 'fontSize': '16px' }} />
                                : <UnCheckIcon style={{ 'color': 'red', 'fontSize': '16px' }} />}
                        </span>
                    );
                })
            }
        </span>
    );
}
const AnswerButtonTS = connect(null, mapDispatchChoiceToProps)(AnswerButton2);
const QuestionsPanelTS = connect(mapStateToProps, mapDispatchToProps)(QuestionsPanelx);
export { CongratulationAlert, QuestionsPanelTS, QuestionItemTS, ChoicesPanelTS, AnswerButtonTS, ProgressQuestionTS };

