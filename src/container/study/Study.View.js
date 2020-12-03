import { Button, Container, Grid, IconButton, Tooltip } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon, ArrowRightAlt as ArrowRightAltIcon, Check as CheckIcon, Done as DoneIcon, DoneAll as DoneAllIcon, Lock as LockIcon } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React, { Component, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { AlertDialogSlide, DialogForMobile, DialogInfo, ShowImage } from '../../components/Dialog';
import Footer from '../../components/Footer';
import HeaderMenu from '../../components/HeaderMenu';
import { LoadingWidget } from '../../components/Widgets';
import Config from '../../config';
import { resetTopicProgress, updateTopicsProgress } from '../../redux/actions';
import { getCardsByParentId } from '../../redux/actions/card';
import { onContinue, resetQuestionProgress } from '../../redux/actions/game';
import { getTopicById, getTopicsByParentId } from '../../redux/actions/topic';
import { isMobileFunctions, isObjEmpty } from '../../utils';
import { CongratulationAlert, QuestionsPanelTS } from '../game/Game.ViewTS';

const questionsX = new Map();
const StudyViewScreen = ({ appInfoState, topicId }) => {
    const router = useRouter();
    useEffect(() => {
        ReactGA.pageview('/studypage/' + appInfoState.title);
    }, []);
    if (!appInfoState) {
        return <LoadingWidget />
    }
    return (
        <StudyView appInfo={appInfoState} topicId={topicId} />
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
            showGame: false,
            showAlertName: '',
            isMobile: isMobile,
            count: 0,
        }
        this.props.getTopicsByParentId(this.state.id);
        this.props.getTopicById(this.state.id, this.state.appInfo.id, this.state.appInfo.bucket);
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
                topics: topics,
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
        if (!this.state.isMobile) {
            // console.log("PC congratulationTopic", congratulationTopic, 'currentTopic', (currentTopic ? currentTopic.name : ''))
            return (
                <div className="body-panel">
                    <HeaderMenu appInfo={this.state.appInfo} darkMode={true} />
                    <Container className="study-game-panel">
                        {!!this.state.showAlertName ?
                            <CongratulationAlert topicName={this.state.showAlertName} onClose={() => this.setState({ showAlertName: '' })} />
                            : null}
                        <Grid
                            container
                            direction="row"
                            spacing={3}
                            alignItems="stretch"
                            className="border-box"
                            style={{alignItems: "stretch"}}
                        >
                            <Grid item xs={12} sm={12} md={5} lg={4} className="left-panel border-box" >
                                <TopicInfoPanel
                                    appInfo={this.state.appInfo}
                                />
                                <TopicTreePanel
                                    parentId={this.state.id}
                                    currentQuestionId={currentTopic ? currentTopic.id : null}
                                    onChangeTopic={(topic, index, type) => {
                                        this.activeTopic(topic, index, type);
                                    }}
                                    openAlert={(topic) => {
                                        this.setState({
                                            showAlertName: topic.name
                                        })
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={7} lg={8} className="right-panel border-box">
                                {this.renderRightContentPanel(currentTopic, currentQuestionIndex, congratulationTopic, this.state.appInfo, onContinue)}
                            </Grid>
                        </Grid>
                    </Container>
                    <ShowImage />
                </div>
            )
        }
        if (this.state.isMobile) {
            // console.log("Mobile congratulationTopic", congratulationTopic, 'currentTopic', (currentTopic ? currentTopic.name : ''))
            return (
                <div className="body-panel">
                    <Container className="study-game-panel">
                        {!!this.state.showAlertName ?
                            <CongratulationAlert topicName={this.state.showAlertName} onClose={() => this.setState({ showAlertName: '' })} />
                            : null}
                        <Grid
                            container
                            direction="row"
                            spacing={0}
                            alignItems="stretch"
                        >
                            {!this.state.showGame ?
                                <Grid item xs={12} sm={12} md={5} lg={4} className="left-panel">
                                    <TopicInfoPanel
                                        appInfo={this.state.appInfo}
                                    />
                                    <TopicTreePanel
                                        parentId={this.state.id}
                                        currentQuestionId={currentTopic ? currentTopic.id : null}
                                        onChangeTopic={(topic, index) => {
                                            this.activeTopic(topic, index);
                                        }}
                                        openAlert={(topic) => {
                                            this.setState({
                                                showAlertName: topic.name
                                            })
                                        }}
                                    />
                                </Grid> :
                                <Grid item xs={12} sm={12} md={7} lg={8} className="right-panel">
                                    {this.renderRightContentPanel(currentTopic, currentQuestionIndex, congratulationTopic, this.state.appInfo, onContinue, true)}
                                </Grid>
                            }
                        </Grid>
                        {this.state.showGame ? null : <Footer isStudy={true} />}
                    </Container>
                    {(this.state.count % 2 === 0 && this.state.count !== 0) ? <DialogForMobile appInfoState={this.state.appInfo} handleInstalled={() => this.setState({ count: -1 })}></DialogForMobile> : null}
                    <ShowImage />
                </div>
            )
        }
    }

    onNextPart(zzz) {
        // console.log("onNextPart", zzz)
        let newIndex = this.state.currentIndex + 1;
        if (newIndex < this.state.topics.length) {
            let currentTopic = this.state.topics[newIndex]
            if(currentTopic.getPercentComplete() == 100){
                currentTopic.progress.reset();
                resetTopicProgress(currentTopic.progress);
            }
            this.activeTopic(currentTopic, newIndex);
        }
        if (this.state.count !== -1) {
            this.setState((state) => {
                return { count: state.count + 1 }
            });
        }
    }
    renderRightContentPanel(currentTopic, currentQuestionIndex, congratulationTopic, appInfo, onContinue, isMobile) {
        return (
            <div style={{ display: "flex", flexDirection: "column" }} className="border-box">
                <div style={congratulationTopic ? { display: 'none' } : {}} className="border-box">
                    {
                        currentTopic ?
                            <QuestionsPanelTS
                                appInfo={appInfo}
                                className="question-view-study-game border-box"
                                topicId={currentTopic.id}
                                gameType={Config.STUDY_GAME}
                                currentIndex={currentQuestionIndex}
                                congratulationTopic={congratulationTopic}
                                onContinue={onContinue}
                                onNextPart={() => {
                                    this.onNextPart(1)
                                }}
                                setShowGame={() => this.setState({ showGame: false })}
                            /> : <LoadingWidget />
                    }

                </div>
                {congratulationTopic ? <>
                    <div className="topic-congratulations-panel" >
                        <h1>Congratulations!</h1>
                        <p>You have passed {currentTopic ? currentTopic.name : ''} with excellent performance</p>
                        <div></div>
                    </div>
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                        style={{ display: "flex", marginTop: "16px" }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            className="next-part-button"
                            onClick={() => {
                                this.onNextPart(2)
                            }}
                        >
                            Go To Part {this.state.currentTopic.orderIndex + 2} <ArrowRightAltIcon />
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ borderRadius: "5px" }}
                            onClick={() => this.props.resetQuestionProgress()}>
                            Try Again
                            </Button>
                    </Grid>
                </> : null}
            </div>
        );
    }
}

const TopicInfoPanelUI = ({ topicState, appInfo }) => {
    let isMobile = isMobileFunctions();
    let router = useRouter()
    if (topicState.loading === true || !topicState.data || isObjEmpty(topicState.data)) {
        return <LoadingWidget />
    }
    let name = topicState.name;
    if (!name) {
        return <div></div>;
    }
    if (isMobile) {
        return (
            <Grid container alignItems="center" style={{ display: "inline-block", backgroundColor: "var(--main-color)", color: "#fff" }}>
                <IconButton style={{ color: "#fff" }} onClick={() => {
                    router.push("/" + (appInfo || '').appNameId);
                }}><ArrowBackIcon /></IconButton>
                <span style={{ textAlign: "left" }}>{name}</span>
            </Grid>
        );
    }
    return (
        <div className="topic-info-panel">
            {topicState.name}
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
    let totalQuestion = topicState.totalQuestion;
    temp.sort((a, b) => a.orderIndex - b.orderIndex).forEach((topic) => {
        if (parentId === topic.parentId) {
            topics.push(topic);
        }
    });
    let widgets = [], childs = [];
    let count = 0;
    let familiar = 0, mastered = 0;
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
                childs.splice(1, 0, <div key={"topic-row-1-l-r-" + parentId + '-' + topic.id} className={"topic-line topic-row-1-l-r"}></div>);
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
        if ((index === 6 && topics.length === 7) || (index === 11 && topics.length === 12)) {
            childs.splice(1, 0, <div key={"topic-row-2-l-r-" + parentId + '-' + topic.id} className="topic-line-7-12 topic-row-4-l-r"></div>);
            let row = <div className="parent-topics-row" key={'topic-row-' + parentId + '-' + count + '-' + topic.id}><div className="topics-row">{[...childs]}</div></div>;
            widgets.push(row);
            childs = [];
        }
    });


    if (childs.length > 0) {
        if (count % 2 === 0) {
            let row = <div className="parent-topics-row" key={'topic-row-' + parentId + '-' + count}><div className="topics-row">{[...childs]}</div></div>;
            widgets.push(row);
        } else {
            let row = <div className="parent-topics-row" key={'topic-row-' + parentId + '-' + count}><div style={{ justifyContent: "flex-end", marginRight: "35px" }} className="topics-row">{[...childs]}</div></div>;
            widgets.push(row);
        }
    }

    return (
        <div className="parent-topic-tree-panel border-box">
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
            <div style={{height: "100%"}} className="box-topic-tree-panel border-box">
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
                    <div className="lds-ripple"><div></div><div></div><div></div></div>
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
    resetQuestionProgress: () => dispatch(resetQuestionProgress()),
    getTopicById: (topicId, appId, bucket) => dispatch(getTopicById(topicId, appId, bucket)),
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

const TopicInfoPanel = connect((state, ownProps) => {
    return {
        topicState: state.topicReducer,
        ...ownProps
    };
}, null)(TopicInfoPanelUI);


const StudyView = connect(mapStateToProps, mapDispatchToProps)(StudyViewScreenUI);



export default StudyViewScreen