import { Collapse, Grid, Button, IconButton } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon, Clear as UnCheckIcon, Done as CheckIcon, Favorite as HeartIcon, FavoriteBorder as UnHeartIcon, ArrowRightAlt as ArrowRightAltIcon } from '@material-ui/icons';
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

const ReviewQuestionPanelUI = ({ questions, questionProgress, onBookmark, appInfo }) => {
    if (!questionProgress) {
        questionProgress = new Map();
    }
    return (
        <div className='questions-panel'>
            {
                questions.map((question, index) => {
                    if (questionProgress.has(question.id)) {
                        question.progress = questionProgress.get(question.id) ?? new QuestionProgress();
                    }
                    return <QuestionItemTS question={question} key={'question-item-' + question.id} index={index} onBookmark={onBookmark} />;
                })
            }
        </div>
    );
}

const QuestionsPanelx = ({ questionProgress, className, topicId, loadGame, gameState, gameType, currentIndex, onBookmark, questionIds, appInfo, onContinue, congratulationTopic, onNextPart, setShowGame }) => {
    useEffect(() => {
        loadGame({ appId: appInfo.id, topicId: topicId, gameType: gameType, questionIds: questionIds });
    }, [loadGame, appInfo, topicId, gameType, questionIds]);
    const isMobile = isMobileFunctions()
    if (gameState.isLoading == 1 || gameState.isLoading == 2) {
        return <LoadingWidget color={null} />;
    }
    let size = gameState.progress.getPercentComplete() * 100
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
    let questions = [currentQuestion];
    if (isMobile) {
        return (
            <>
                <Grid
                    style={{ display: "flex", justifyContent: "space-between" }}
                    container alignItems="center" >
                    <IconButton style={{ color: "#4E63BD" }} onClick={() => { setShowGame() }}><ArrowBackIcon /></IconButton>
                    <span style={{ color: "#4E63BD" }}>Question {currentIndex + 1}</span>
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
                </Grid>
                <div style={{ padding: "0px 40px 20px 40px" }}>
                    <div style={{ position: "relative" }}>
                        <div style={{ visibility: 'hidden' }}>X</div>
                        <div style={{ width: "100%", height: "10px", background: "#fff", borderRadius: "10px" }}>
                            <div style={{ width: size + '%', background: "linear-gradient(270deg, #4E63BD 6.58%, #7F91DC 99.04%)", height: "10px", position: "absolute", top: "19px", left: "0", borderRadius: "10px", transition: "all 0.5s ease 0s" }}></div>
                            <div style={{ visibility: 'hidden' }}>X</div>
                        </div>
                    </div>
                </div >
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
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#8496EA", color: "#fff", boxShadow: "inset 0px 4px 4px rgba(255, 255, 255, 0.25)", borderRadius: "20px" }}
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
            </>
        )
    }
    return (
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
            {isMobile ? null : (
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    style={congratulationTopic ? { display: "none" } : {}}
                >
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#8496EA", color: "#fff", boxShadow: "inset 0px 4px 4px rgba(255, 255, 255, 0.25)", borderRadius: "10px" }}
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

const QuestionItemTS = ({ question, index, onBookmark, appInfoState, appId, appName }) => {
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
const ReviewQuestionPanel = connect(null, mapDispatchReviewQuestionToProps)(ReviewQuestionPanelUI);
export { ReviewQuestionPanel, QuestionsPanelTS, QuestionItemTS, ChoicesPanelTS, AnswerButtonTS, ProgressQuestionTS };

