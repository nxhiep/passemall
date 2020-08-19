import { Collapse, Grid, Button } from '@material-ui/core';
import { Clear as UnCheckIcon, Done as CheckIcon, Favorite as HeartIcon, FavoriteBorder as UnHeartIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import QuestionContentPanel, { TextContentType } from '../../components/QuestionContentPanel';
import { LoadingWidget } from '../../components/Widgets';
import Config from '../../config';
import QuestionProgress from '../../models/QuestionProgress';
import { onBookmark } from '../../redux/actions';
import { loadGame, onSelectedChoice } from '../../redux/actions/game';

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

const QuestionsPanelx = ({ questionProgress, className, topicId, loadGame, gameState, gameType, currentIndex, onBookmark, cardProgressReducer, questionIds, appInfo }) => {
    useEffect(() => {
        loadGame({ appId: appInfo.id, topicId: topicId, gameType: gameType, questionIds: questionIds });
    }, [loadGame, appInfo, topicId, gameType, questionIds]);
    if (gameState.isLoading == 1 || gameState.isLoading == 2) {
        return <LoadingWidget color={null} />;
    }

    if (gameType === Config.REVIEW_GAME) {
        let questions = gameState.questions;
        if (!questions) {
            return <LoadingWidget color={null} />;
        }
        return (
            <div className={"questions-panel" + (className ? " " + className : "")}>
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
    return (
        <div className={"questions-panel" + (className ? " " + className : "")}>
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
        </div>
    );
}

const QuestionItemTS = ({ question, index, onBookmark, appInfoState }) => {
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
                <ProgressQuestionTS progress={question.progress.progress} questionId={question.id} />
                <span style={{ 'marginLeft': 'auto' }} onClick={() => {
                    onBookmark(question);
                }}>
                    {question.progress.bookmark ? <HeartIcon style={{ 'color': '#aaa' }} /> : <UnHeartIcon style={{ 'color': '#aaa' }} />}
                </span>
            </Grid>
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
                appInfoState = {appInfoState}
                listAnswer={listAnswer} questionId={question.id}
                questionStatus={question.questionStatus}
                explanation={question.explanation} />
        </div>
    );
}

const ChoicesPanelTS = ({ questionId, listAnswer, questionStatus, explanation , appInfoState}) => {
    return (
        <div className="choices-panel">
            {
                listAnswer.map((choice, index) => {
                    return <AnswerButtonTS
                        appInfoState = {appInfoState}
                        index={index}
                        answer={choice.content}
                        key={'answer-item-' + questionId + '-' + index}
                        showResult={(questionStatus === Config.QUESTION_NOT_ANSWERED) ? false : true}
                        explanation={explanation}
                        result={choice.isCorrect}
                        selected={choice.selected}
                        choice={choice}
                    />;
                })
            }
        </div>
    );
}

const AnswerButton2 = ({ index, answer, explanation, result, selected, choice, onChoiceSelected, showResult, appInfoState }) => {
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
                <div className='answer-button-title'>{String.fromCharCode(65 + index)}</div>
                <div className='answer-button-content'><QuestionContentPanel content={answer} type={TextContentType.answer} appInfoState = {appInfoState} /></div>
            </div>
            <Collapse className="explanation" in={showResult && result}>
                <p>Explanation:</p>
                <QuestionContentPanel content={explanation} type={TextContentType.explanation} appInfoState = {appInfoState} />
            </Collapse>
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

