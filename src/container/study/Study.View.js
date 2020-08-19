import { Button, Fab, Grid, IconButton, Tooltip, useTheme, withTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ArrowBack as ArrowBackIcon, ArrowRightAlt as ArrowRightAltIcon, Assignment as AssignmentIcon, Check as CheckIcon, Close as CloseIcon, Done as DoneIcon, DoneAll as DoneAllIcon, Lock as LockIcon, LockOpen as UnLockIcon, ViewList as ViewListIcon } from '@material-ui/icons';
import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AlertDialogSlide, DialogInfo, ShowImage } from '../../components/Dialog';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { FixedContainer, LoadingWidget, MainWidget } from '../../components/Widgets';
import Config from '../../config';
import Question from '../../models/QuestionX';
import { scrollToTop } from '../../models/Utils';
import { resetTopicProgress, updateTopicsProgress } from '../../redux/actions';
import { getCardsByParentId } from '../../redux/actions/card';
import { onContinue } from '../../redux/actions/game';
import { getTopicById, getTopicsByParentId } from '../../redux/actions/topic';
import Routes from '../../routes';
import { isObjEmpty, stringReplaceUrl } from '../../utils';
import { QuestionsPanelTS } from '../game/Game.ViewTS';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
const questionsX = new Map();
import {isMobileFunctions} from '../../utils'
const StudyViewScreen = ({ appInfoState }) => {
    console.log("window width" , window.innerWidth);
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));;
    const { appNameId, screenChild } = router.query;
    useEffect(() => {
        if (isMobile) {
            scrollToTop();
        }
    }, [isMobile]);
    const screenStudy = screenChild;
    let topicId = -1;
    if (screenStudy) {
        let offset = screenStudy.lastIndexOf('-') + 1;
        topicId = offset > -1 ? parseInt(screenStudy.substring(offset, screenStudy.length)) : -1;
    }
    let appInfo = appInfoState;
    useEffect(() => {
        ReactGA.pageview('/studypage/' + appInfo.title);
    }, []);
    if (!appInfo) {
        return <LoadingWidget />
    }
    return (
        <StudyView appInfo={appInfo} topicId={topicId} />
    );
}

class StudyViewScreenUI extends Component {

    constructor(props) {
        
        super(props);
        let isMobile = isMobileFunctions();
        this.state = {
            id: props.topicId,
            appInfo: props.appInfo,
            topics: null,
            currentTopic: null,
            currentIndex: 0,
            showGame: true,
            showAlertName: '',
            isMobile: isMobile
        }
        this.props.getTopicsByParentId(this.state.id);
    }

    checkLoaded(prevState, nextState) {
        return (prevState.loading === true && nextState.loading === false && nextState.data) ||
            (prevState.loading === false && !isObjEmpty(prevState.data) && nextState.loading === false && !isObjEmpty(nextState.data));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        var _a;
        let topicState = nextProps.topicReducer;
        if (this.checkLoaded(this.props.topicReducer, topicState)) {
            let temp = Object.values(topicState.data);
            let parts = new Array();
            let playingIndex = -1;
            temp.sort((a, b) => a.orderIndex - b.orderIndex).forEach((topic) => {
                if (topic.parentId === this.state.id) {
                    if (topic.progress.playing === true) {
                        playingIndex = parts.length;
                    }
                    parts.push(topic);
                }
            });
            if (parts.length > 0) {
                if (playingIndex < 0) {
                    playingIndex = 0;
                }
                parts[playingIndex].progress.lock = false;
                parts[playingIndex].progress.playing = true;
                this.props.updateTopicsProgress([parts[playingIndex].progress]);
                this.setState({
                    topics: parts,
                    currentIndex: playingIndex,
                    currentTopic: parts[playingIndex],
                });
            }
            else {
            }
        }
        if (((_a = nextProps.gameState) === null || _a === void 0 ? void 0 : _a.isFinish) === true) {
            this.setState({
                showGame: nextProps.gameState.isFinish,
            });
        }
    }

    activeTopic(currentTopic, index) {
        let mapTopicProgress = {};
        this.state.topics.forEach((topic) => {
            if (topic.progress.playing === true) {
                topic.progress.playing = false;
                mapTopicProgress[topic.id] = topic.progress;
            }
        });
        currentTopic.progress.lock = false;
        currentTopic.progress.playing = true;
        mapTopicProgress[currentTopic.id] = currentTopic.progress;
        let listP = Object.values(mapTopicProgress);
        this.props.updateTopicsProgress(listP);
        this.setState({
            currentIndex: index,
            currentTopic: currentTopic,
            showGame: true
        });
    }

    componentDidUpdate() {
        let currentTopic = this.state.currentTopic;
        let topics = this.state.topics;
        if (currentTopic && topics && topics.length > (this.state.currentIndex + 1)
            && currentTopic.getPercentComplete() >= Config.NEXT_PART_PROGRESS && topics[this.state.currentIndex + 1].progress.lock === true) {
            let i = this.state.currentIndex + 1;
            topics[i].progress.lock = false;
            this.setState({
                topics: topics
            });
            this.props.updateTopicsProgress([topics[i].progress]);
        }
    }

    render() {
        var _a, _b, _c, _d, _e;
        const { onContinue } = this.props;
        const currentTopic = this.state.currentTopic;
        let currentQuestionIndex = 0;
        let gameState = this.props.gameState;
        if (gameState) {
            let topicId = (_a = gameState.id) !== null && _a !== void 0 ? _a : -1;
            if (!questionsX.has(topicId) || ((_b = questionsX.get(topicId)) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                questionsX.set(topicId, gameState.questions.map((item) => Object.assign({}, item)));
            }
            if (questionsX.size > 0) {
                let currentQuestionId = (_d = (_c = gameState.currentQuestion) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : -1;
                if (currentQuestionId) {
                    let listQ = (_e = questionsX.get(topicId)) !== null && _e !== void 0 ? _e : new Array();
                    currentQuestionIndex = listQ ? listQ.findIndex((q) => q.id === currentQuestionId) : 0;
                }
            }
        }
        let congratulationTopic = (!!gameState.isFinish);
        console.log("xxxxxx" , this.state.showGame)
        return (
            <MainWidget className={(this.state.isMobile ? " mobile" : "")}>
                <Header />
                <FixedContainer className="study-game-panel">
                    {!!this.state.showAlertName ?
                        <CongratulationAlert topicName={this.state.showAlertName} onClose={() => this.setState({ showAlertName: '' })} />
                        : null}
                    <Grid
                        container
                        direction="row"
                        spacing={this.state.isMobile ? 0 : 3}
                    >
                        <Grid item xs={12} sm={12} md={5} lg={4} className="left-panel" style={this.state.isMobile ? { display: (this.state.showGame ? 'none' : '') } : {}}>
                            <TopicInfoPanel
                                topicId={currentTopic ? currentTopic.parentId : -1}
                                appInfo={this.state.appInfo}
                                isMobile={this.state.isMobile} />
                            <TopicTreePanel
                                parentId={this.state.id}
                                currentQuestionId={currentTopic ? currentTopic.id : null}
                                onChangeTopic={(topic, index) => {
                                    this.activeTopic(topic, index);
                                    this.setState({
                                        showGame: true
                                    })
                                }}
                                openAlert={(topic) => {
                                    this.setState({
                                        showAlertName: topic.name
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={7} lg={8} className="right-panel" style={this.state.isMobile ? { display: (this.state.showGame ? '' : 'none') } : {}}>
                            {this.state.isMobile && this.state.showGame ?
                                <Grid
                                    style={{ borderBottom: '1px solid #ddd' }}
                                    container alignItems="center" >
                                    <IconButton onClick={() => {
                                        this.setState({
                                            showGame: false
                                        })
                                    }}><ArrowBackIcon /></IconButton>
                                    <span>{currentTopic ? currentTopic.name : ''}</span>
                                </Grid> : ''
                            }
                            {this.renderRightContentPanel(currentTopic, currentQuestionIndex, congratulationTopic, this.state.appInfo)}
                            <Grid
                                container
                                alignItems="center"
                                justify="center"
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="next-part-button"
                                    onClick={() => {
                                        if (congratulationTopic) {
                                            this.onNextPart();
                                        } else {
                                            onContinue();
                                        }
                                    }}
                                >
                                    {congratulationTopic ? 'Next part' : 'Next Question'}<ArrowRightAltIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </FixedContainer>
                {!this.state.isMobile || !this.state.showGame ? <FloatingButtonTest currentTopic={this.state.currentTopic} /> : ''}
                <Footer />
                <ShowImage />
            </MainWidget>
        );
    }

    onNextPart() {
        let newIndex = this.state.currentIndex + 1;
        if (newIndex < this.state.topics.length) {
            let currentTopic = this.state.topics[newIndex];
            this.activeTopic(currentTopic, newIndex);
        } else {
        }
    }

    renderRightContentPanel(currentTopic, currentQuestionIndex, congratulationTopic, appInfo) {
        return (
            <div>
                <div style={congratulationTopic ? { display: 'none' } : {}}>
                    <QuestionProgressPanel topic={currentTopic} />
                    {
                        currentTopic ?
                            <QuestionsPanelTS
                                appInfo={appInfo}
                                className="question-view-study-game"
                                topicId={currentTopic.id}
                                gameType={Config.STUDY_GAME}
                                currentIndex={currentQuestionIndex}
                            /> : <LoadingWidget />
                    }
                </div>
                <div className="topic-congratulations-panel" style={congratulationTopic ? {} : { display: 'none' }}>
                    <h1>Congratulations!</h1>
                    <p>You have passed {currentTopic ? currentTopic.name : ''} with excellent performance</p>
                    <div></div>
                </div>
            </div>
        );
    }
}

const CongratulationAlert = ({ topicName = "", onClose = () => { } }) => {
    useEffect(() => {
        let time = setTimeout(() => {
            onClose();
        }, 5000);
        return () => {
            clearTimeout(time);
        };
    }, [topicName]);
    return (
        <Grid container alignItems="center" justify="space-between" className="congratulation-alert-panel">
            <div></div>
            <div className="title">
                <UnLockIcon width="100px" fontSize="large" />
                <span>You must complete previous topic <strong>{topicName}</strong>!</span>
            </div>
            <IconButton onClick={() => onClose()}><CloseIcon /></IconButton>
        </Grid>
    );
}

const FloatingButtonTest = ({ currentTopic }) => {
    let router = useRouter();
    if (!currentTopic) {
        return null;
    }
    let name = stringReplaceUrl(currentTopic.name);
    return (
        <Fab color="secondary" variant="extended" className="floating-button-test"
            onClick={() => {
                router.push(Routes.TEST_SCREEN + '-' + name + '-' + currentTopic.id);
            }}>
            <AssignmentIcon /> Test
        </Fab>
    );
}

const QuestionProgressPanelUI = (props) => {
    var _a, _b, _c;
    let topic = props === null || props === void 0 ? void 0 : props.topic;
    let gameState = props === null || props === void 0 ? void 0 : props.gameState;
    if (!gameState || !(gameState === null || gameState === void 0 ? void 0 : gameState.isLoaded)) {
        return React.createElement(LoadingWidget, null);
    }
    let topicId = (_a = gameState.id) !== null && _a !== void 0 ? _a : -1;
    let currentQuestion = (_b = gameState.currentQuestion) !== null && _b !== void 0 ? _b : new Question();
    let listQuestion = (_c = questionsX.get(topicId)) !== null && _c !== void 0 ? _c : new Array();
    let loading = gameState.isLoading == 1 || gameState.isLoading == 2;
    console.log("listQuestion" , listQuestion);
    return (
        <div className="question-progress-panel">
            <div className="topic-name"><ViewListIcon /> <span>{topic ? topic.name : 'Topic name'}</span></div>
            <div className="scroll-panel function-scroll-panel">
                <div className="list-question-panel">
                    {loading ? <LoadingWidget /> :
                        (listQuestion.map((item, index) => {
                            return <QuestionItemProgress
                                index={index}
                                key={'question-item-right-' + item.id}
                                question={item}
                                currentQuestion={currentQuestion}
                            />;
                        }))
                    }
                </div>
            </div>
        </div>
    );
}
const QuestionItemProgress = ({ index, question, currentQuestion }) => {
    if (question.id === currentQuestion.id && currentQuestion.questionStatus !== Config.QUESTION_NOT_ANSWERED) {
        question.questionStatus = currentQuestion.questionStatus;
        question.progress.boxNum = currentQuestion.progress.boxNum
    }
    let progress = question.progress;
    let statusStr = '';
    let borderCurrent = "";
    if (question.id === currentQuestion.id) {
        borderCurrent = " border-current-question"
    }
    if (question.questionStatus === Config.QUESTION_ANSWERED_CORRECT) {
        statusStr = ' correct';
    } else if (question.questionStatus === Config.QUESTION_ANSWERED_INCORRECT) {
        statusStr = ' incorrect';
    }
    let icon;
    if (progress.boxNum === 1) {
        icon = <DoneIcon className="icon" />;
    } else if (progress.boxNum > 1) {
        icon = <DoneAllIcon className="icon" />;
    }
    useEffect(() => {
        if (question.id === currentQuestion.id) {
            onScrollHoz('function-scroll-panel', index);
        }
    }, [question, currentQuestion]);
    return (
        <div className={"question-item" + statusStr + borderCurrent}>
            <span >{index + 1}</span>
            {icon}
        </div>
    );
}

export function onScrollHoz(parentClass, index) {
    let parentsElement = document.getElementsByClassName(parentClass);
    let scrollLeft = index * 60;
    for (let index = 0; index < parentsElement.length; index++) {
        let parentElement = parentsElement[index];
        parentElement.scrollTo({ left: scrollLeft });
    }
}

const TopicInfoPanelUI = ({ topicId = -1, getTopicById, topicState, appInfo }) => {
    let theme = useTheme();
    let isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    console.log("dau la dau, ", isMobile)
    useEffect(() => {
        getTopicById(topicId);
    }, [topicId]);
    let router = useRouter()
    if (topicState.loading === true || !topicState.data || isObjEmpty(topicState.data)) {
        return <LoadingWidget />
    }
    let topic = topicState.data[topicId];
    if (!topic) {
        return <div></div>;
    }
    if (isMobile) {
        return (
            <Grid container alignItems="center" >
                <IconButton onClick={() => {
                    router.push("/" + appInfo.appNameId);
                }}><ArrowBackIcon /></IconButton>
                <span>{topic.name}</span>
            </Grid>
        );
    }
    return (
        <div className="topic-info-panel">
            {topic.name}
        </div>
    );
}

const TopicTreePanelUI = ({ topicState, parentId, currentQuestionId, onChangeTopic, resetTopicProgress, openAlert }) => {
    const [dialogInfo, setDialogInfo] = useState(DialogInfo.init());
    if (!topicState || topicState.loading === true || !topicState.data) {
        return React.createElement(LoadingWidget, null);
    }
    let topics = [];
    let temp = Object.values(topicState.data);
    temp.sort((a, b) => a.orderIndex - b.orderIndex).forEach((topic) => {
        if (parentId === topic.parentId) {
            topics.push(topic);
        }
    });
    let widgets = [], childs = [];
    let count = 0;
    let totalQuestion = 0, familiar = 0, mastered = 0;
    let lastTopicUnLock = 0;
    topics.forEach((topic, index) => {
        let progress = topic.progress;
        if (progress.lock === false) {
            lastTopicUnLock = index;
        }
        familiar += progress.familiar;
        mastered += progress.mastered;
    });
    const onClickTopic = (topic, index, type) => {
        if (type === 1) {
            setDialogInfo(new DialogInfo({
                title: 'Play again', msg: 'Do you want to reset all progress of this part!', okText: '', cancelText: '', onConfirm: (result) => {
                    if (result) {
                        topic.progress.reset();
                        resetTopicProgress(topic.progress);
                        onChangeTopic(topic, index);
                    }
                }
            }));
        }
        else if (type === 2) {
            openAlert(topic);
        }
        else if (type === 3) {
            onChangeTopic(topic, index);
        }
    };
    topics.forEach((topic, index) => {
        totalQuestion += topic.totalQuestion;
        let active = currentQuestionId === topic.id;
        if (count % 2 === 0) {
            childs.push(<TopicItem
                topic={topic}
                key={'topic-item-' + parentId + '-' + topic.id}
                index={index}
                active={active}
                onClickTopic={onClickTopic} />);
            if (childs.length === 3) {
                count++;
                childs.splice(1, 0, <div key={"topic-row-1-l-r-" + parentId + '-' + topic.id} className={"topic-line topic-row-1-l-r" + (lastTopicUnLock < index ? " active" : "")}></div>);
                childs.splice(3, 0, <div key={"topic-row-2-l-r-" + parentId + '-' + topic.id} className="topic-line topic-row-2-l-r"></div>);
                childs.push(<div key={"topic-row-3-l-r-c-" + parentId + '-' + topic.id} className="topic-line topic-row-3-l-r-c"></div>);
                let row = <div className="parent-topics-row" key={'topic-row-' + parentId + '-' + count + '-' + topic.id}><div className="topics-row">{[...childs]}</div></div>;
                widgets.push(row);
                childs = [];
            }
        } else {
            childs.unshift(<TopicItem
                topic={topic}
                key={'topic-item-' + parentId + '-' + topic.id}
                active={active}
                onClickTopic={onClickTopic} />);
            if (childs.length === 2) {
                count++;
                childs.splice(1, 0, <div key={"topic-row-1-r-l-" + parentId + '-' + topic.id} className="topic-line topic-row-1-r-l"></div>);
                childs.unshift(<div key={"topic-row-2-r-l-" + parentId + '-' + topic.id} className="topic-line topic-row-2-r-l-c"></div>);
                let row = <div className="parent-topics-row" key={'topic-row-' + parentId + '-' + count + '-' + topic.id}><div className="topics-row">{[...childs]}</div></div>;
                widgets.push(row);
                childs = [];
            }
        }
    });

    if (childs.length > 0) {
        if (count % 2 === 0) {
            let row = <div className="parent-topics-row" key={'topic-row-' + parentId + '-' + count}><div className="topics-row">{[...childs]}</div></div>;
            widgets.push(row);
        } else {
            let row = <div className="parent-topics-row" key={'topic-row-' + parentId + '-' + count}><div className="topics-row">{[...childs]}</div></div>;
            widgets.push(row);
        }
    }

    return (
        <div className="parent-topic-tree-panel">
            {dialogInfo ? <AlertDialogSlide dialogInfo={dialogInfo} /> : ''}
            <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-around"
                className="question-result-info"
            >
                <div className="item">
                    <label>Not seen</label>
                    <div>{totalQuestion - familiar - mastered}</div>
                </div>
                <div className="item-line"></div>
                <div className="item">
                    <label>Familiar</label>
                    <div>{familiar} <DoneIcon /></div>
                </div>
                <div className="item-line"></div>
                <div className="item">
                    <label>Mastered</label>
                    <div>{mastered} <DoneAllIcon /></div>
                </div>
            </Grid>
            <div className="box-topic-tree-panel">
                <div className="topic-tree-panel">
                    {widgets}
                </div>
            </div>
        </div>
    );
}

const TopicItem = ({ topic, active = false, index = 0, onClickTopic }) => {
    let progress = topic.progress;
    if (topic.getPercentComplete() === 100) {
        return (
            <div className={"topic-item completed" + (active ? ' active' : '')} onClick={() => onClickTopic(topic, index, 1)}>
                <div className="lds-ripple"><div></div><div></div><div></div></div>
                <div className="topic-content"><CheckIcon /></div>
                <div className="topic-name" data-id={topic.id} data-index={topic.orderIndex}>{topic.name}</div>
            </div>
        );
    }
    if (progress.lock === true) {
        return (
            <Tooltip title="Completed previous topic!">
                <div className="topic-item locked" onClick={() => onClickTopic(topic, index, 2)}>
                    <div className="topic-content"><LockIcon /></div>
                    <div className="topic-name" data-id={topic.id} data-index={topic.orderIndex}>{topic.name}</div>
                </div>
            </Tooltip>
        );
    }
    return (
        <div className={"topic-item" + (active ? ' active' : '')} onClick={() => onClickTopic(topic, index, 3)}>
            <div className="lds-ripple"><div></div><div></div><div></div></div>
            <div className="topic-content">{topic.getPercentComplete()}%</div>
            <div className="topic-name" data-id={topic.id} data-index={topic.orderIndex}>{topic.name}</div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        topicReducer: state.topicReducer,
        cardReducer: state.cardReducer,
        gameState: state.gameState,
        appValueState: state.appValueState,
        ...ownProps
    };
}

const mapDispatchToProps = (dispatch) => ({
    getCardsByParentId: (parentId) => dispatch(getCardsByParentId(parentId)),
    onContinue: () => dispatch(onContinue()),
    getTopicsByParentId: (parentId) => dispatch(getTopicsByParentId(parentId)),
    updateTopicsProgress: (topicsProgress) => dispatch(updateTopicsProgress(topicsProgress)),
});

const mapDispatchTopicTreeToProps = (dispatch) => ({
    resetTopicProgress: (topicProgress) => dispatch(resetTopicProgress(topicProgress))
});

const TopicTreePanel = connect((state, ownProps) => {
    return {
        topicState: state.topicReducer,
        gameState: state.gameState,
        topicProgressReducer: state.topicProgressReducer,
        ...ownProps
    }
}, mapDispatchTopicTreeToProps)(TopicTreePanelUI);

const QuestionProgressPanel = connect((state, ownProps) => {
    return {
        gameState: state.gameState,
        ...ownProps
    };
}, null)(QuestionProgressPanelUI);

const TopicInfoPanel = connect((state, ownProps) => {
    return {
        topicState: state.topicReducer,
        ...ownProps
    };
},
    (dispatch) => ({
        getTopicById: (topicId) => dispatch(getTopicById(topicId))
    })
)(TopicInfoPanelUI);

const StudyView = connect(mapStateToProps, mapDispatchToProps)(withTheme(StudyViewScreenUI));



export default StudyViewScreen