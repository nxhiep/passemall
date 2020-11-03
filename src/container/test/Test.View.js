import { Button, Container, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Done, Lock as LockIcon, PlayArrow } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { getTestInfoByAppId, setTestInfoPlaying, endTest, getTopicsByParentId, getTestInfoByAppIdAndParentId } from "../../redux/actions/index";
import SelectStatePopup from '../../components/SelectStatePopup';
import { LoadingWidget } from '../../components/Widgets';
import Config from '../../config';
import CloseIcon from '@material-ui/icons/Close';
import { scrollToTop } from '../../models/Utils';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import Header from "../../components/Header"
import { AlertDialogSlide, DialogInfo, ShowImage } from '../../components/Dialog';
import { ButtonLevel, TestProgressPanel, TestQuestionPanel } from './TestComponent';
import EndTestView from "./EndTest";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SelectTopicPopUp from '../../components/SelectTopicPopUp';
import Footer from '../../components/Footer';
import { CongratulationAlert } from "../game/Game.ViewTS"
const TestViewScreen = ({ appInfoState, topicId = -1 }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    useEffect(() => {
        if (isMobile) {
            scrollToTop();
        }
    }, [isMobile]);
    let appInfo = appInfoState;
    useEffect(() => {
        ReactGA.pageview('/testpage/' + appInfo.title);
    }, []);
    if (!appInfo) {
        return React.createElement(LoadingWidget, null);
    }
    return (
        <TestView appInfoState={appInfoState} topicId={topicId}></TestView>
    )
};
const TestViewUI = ({ stateInfoState, testInfoState, appInfoState, getTestInfoByAppId = () => { }, gameState, getTestInfoByAppIdAndParentId = () => { }, setTestInfoPlaying = () => { }, endTest, getTopicsByParentId }) => {
    let loading = gameState.isLoading === 2;
    const [dialogInfo, setDialogInfo] = useState(DialogInfo.init());
    const [clickReview, setClickReview] = useState(false);
    const [currentTestInfo, setCurrentTestInfo] = useState(null);
    const [showGame, setShowGame] = useState(false);
    const [openSelectTopic, setOpenSelectTopic] = useState(false);
    const theme = useTheme();
    const [showLeftPanel, setShowLeftPanel] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    let isHaveRightPanel = !((gameState.isFinish && loading) || (gameState.currentQuestion && loading) || (gameState.level < 0));
    useEffect(() => {
        if (Config.LISTBUCKET.indexOf(appInfoState.bucket) !== -1) {
            if (testInfoState.currentTopic[appInfoState.id]) {
                getTestInfoByAppIdAndParentId(appInfoState.id)
            } else {
                return
            }
        } else {
            if (appInfoState.hasState) {
                if (stateInfoState.mapCurrentStateInfo[appInfoState.id]) {
                    getTestInfoByAppId(appInfoState.id, stateInfoState.mapCurrentStateInfo[appInfoState.id].id);
                    getTopicsByParentId(stateInfoState.mapCurrentStateInfo[appInfoState.id].id);
                }
            } else {
                getTestInfoByAppId(appInfoState.id);
                getTopicsByParentId(appInfoState.id);
            }

        }
    }, [appInfoState.id, getTestInfoByAppId, setTestInfoPlaying, setCurrentTestInfo, getTestInfoByAppIdAndParentId, testInfoState.currentTopic[appInfoState.id], stateInfoState.mapCurrentStateInfo[appInfoState.id]]);
    if (isMobile) {
        console.log("xxxx", isHaveRightPanel && !showLeftPanel);
        console.log("xxxxx show end Test", gameState.isFinish && gameState.isLoading === 7)
        return (
            <div className="body-panel test-page">
                <Container className="test-game-panel">
                    {showGame ?
                        <>
                            {(gameState.isFinish && gameState.isLoading === 7 && !showLeftPanel) ? <EndTestView setShowLeftPanel={() => setShowLeftPanel(true)} bucket={appInfoState.bucket}></EndTestView>
                                : null}
                            <Grid item xs={12} sm={12} md={7} lg={8} className="right-panel" style={{ display: isHaveRightPanel && !showLeftPanel && gameState.isLoading !== 7 ? "block" : "none" }}>
                                <div className="box-question-panel">
                                    {gameState.isFinish ? null : <TestProgressPanel setShowLeftPanel={() => setShowLeftPanel(true)} appInfo={appInfoState}></TestProgressPanel>}

                                    <TestQuestionPanel
                                        className="question-view-study-game"
                                        testInfoId={currentTestInfo.id}
                                        appId={appInfoState.id}
                                        timeTest={currentTestInfo.timeTest}
                                        passPercent={currentTestInfo.passPercent}
                                        questionIds={currentTestInfo.questionIds}
                                        appInfoState={appInfoState}
                                        showLeftPanel={showLeftPanel}
                                        setShowLeftPanel={() => setShowLeftPanel(true)}
                                    ></TestQuestionPanel>
                                </div>
                            </Grid>
                            <ButtonLevel
                                isHaveRightPanel={isHaveRightPanel}
                                testInfoId={currentTestInfo ? currentTestInfo.id : -1}
                                appId={appInfoState.id}
                                timeTest={currentTestInfo.timeTest}
                                passPercent={currentTestInfo.passPercent}
                                questionIds={currentTestInfo.questionIds}
                                setDialogInfo={setDialogInfo}
                                gameStateId={gameState.id}
                                level={gameState.level}
                                showLeftPanel={showLeftPanel}
                                setShowLeftPanel={() => setShowLeftPanel(false)}
                                isFinish={gameState.isFinish}
                                setShowGame={() => setShowGame(false)}>
                            </ButtonLevel>
                        </> : (
                            <>
                                {Config.LISTBUCKET.indexOf(appInfoState.bucket) !== -1 ? <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ background: "#8496EA", color: "#fff", marginTop: isMobile ? "16px" : "", borderRadius: "20px", marginBottom: "16px", display: "block", marginLeft: "auto", marginRight: "auto" }}
                                    onClick={() => setOpenSelectTopic(true)}
                                >Change Topic</Button> : null}
                                <ListTestInfo appId={appInfoState.id}
                                    onChangeTestInfo={(testInfo) => {
                                        if (!testInfo.playing) {
                                            setCurrentTestInfo(testInfo);
                                            if (currentTestInfo) {
                                                setTestInfoPlaying(currentTestInfo.id, testInfo.id)
                                            }
                                        }
                                        setShowGame(true);

                                    }}
                                    level={gameState.level}
                                    bucket={appInfoState.bucket}>
                                </ListTestInfo>
                            </>
                        )}
                    {((Config.LISTBUCKET.indexOf(appInfoState.bucket) !== -1 && !testInfoState.currentTopic[appInfoState.id]) || openSelectTopic === true) ?
                        <SelectTopicPopUp appInfoState={appInfoState}
                            openSelectTopic={openSelectTopic}
                            setOpenSelectTopic={() => setOpenSelectTopic(false)}>
                        </SelectTopicPopUp> : null}
                    {appInfoState && appInfoState.hasState ?
                        <SelectStatePopup
                            appInfo={appInfoState}
                        /> : null}
                </Container>
                {showGame ? null : <Footer isStudy={true}></Footer>}
            </div>
        )
    }
    return (
        <div className="body-panel test-page">
            <Header isStudy={true}></Header>
            <Container className="test-game-panel">
                {dialogInfo ? <AlertDialogSlide dialogInfo={dialogInfo} /> : ''}
                {showGame ? (
                    <>
                        <ButtonLevel testInfoId={currentTestInfo ? currentTestInfo.id : -1}
                            appId={appInfoState.id}
                            timeTest={currentTestInfo ? currentTestInfo.timeTest : -1}
                            passPercent={currentTestInfo ? currentTestInfo.passPercent : -1}
                            questionIds={currentTestInfo ? currentTestInfo.questionIds : null}
                            setDialogInfo={setDialogInfo}
                            gameStateId={gameState.id}
                            level={gameState.level}
                            setShowLeftPanel={() => setShowLeftPanel(false)}
                            isFinish={gameState.isFinish}
                            setShowGame={() => setShowGame(false)}>
                        </ButtonLevel>
                        <Grid
                            container
                            direction="row"
                            spacing={isMobile ? 0 : 6}
                            style={{ display: isHaveRightPanel ? "flex" : "none" }}
                        >

                            <Grid item xs={12} sm={12} md={5} lg={4} className="left-panel">
                                {(gameState.isFinish && gameState.isLoading !== 2) ? (
                                    <>
                                        <EndTestView bucket={appInfoState.bucket}></EndTestView>
                                    </>
                                ) : (
                                        <>
                                            <div className="left-panel-content">
                                                <div className="description">
                                                    You are about to take the
                                                    simulator test. If you pass this
                                                    test at least 5 times,
                                                    congratulations! You are ready
                                                    for your real test
                                                </div>
                                                <ul className="list-content">
                                                    <li>As close as it gets to the actual test.</li>
                                                    <li>{gameState.questions.length} questions</li>
                                                    <li>{gameState.progress.total - Math.round(gameState.progress.total * gameState.passPercent / 100)} mistakes allowed</li>
                                                    <li>New questions every time you re-take.</li>
                                                    <li>Stop as soon as you have reached the failing score</li>
                                                </ul>
                                            </div>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    endTest();
                                                }}
                                                style={
                                                    {
                                                        display: ((gameState.isFinish && loading) || (gameState.currentQuestion && loading) || (gameState.level < 0)) ? "none" : "block",
                                                        background: "#EF7352",
                                                        boxShadow: "inset 0px 4px 4px rgba(255, 255, 255, 0.25)",
                                                        borderRadius: "20px",
                                                        width: "240px",
                                                        marginLeft: "auto",
                                                        marginRight: "auto"
                                                    }
                                                }>End Test</Button>
                                        </>)}

                            </Grid>

                            <Grid item xs={12} sm={12} md={7} lg={8} className="right-panel">
                                <div className="box-question-panel">
                                    {gameState.isFinish ? null : <TestProgressPanel setShowLeftPanel={() => setShowLeftPanel(true)} appInfo={appInfoState}></TestProgressPanel>}
                                    <TestQuestionPanel
                                        className="question-view-study-game"
                                        testInfoId={currentTestInfo ? currentTestInfo.id : -1}
                                        appId={appInfoState.id}
                                        timeTest={currentTestInfo.timeTest}
                                        passPercent={currentTestInfo.passPercent}
                                        questionIds={currentTestInfo.questionIds}
                                        appInfoState={appInfoState}
                                    ></TestQuestionPanel>
                                </div>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                        <>
                            {Config.LISTBUCKET.indexOf(appInfoState.bucket) !== -1 ? <Button
                                variant="contained"
                                color="primary"
                                style={{ marginBottom: "16px", display: "block", marginLeft: "auto", marginRight: "auto" }}
                                onClick={() => setOpenSelectTopic(true)}
                            >Change Topic</Button> : null}
                            <ListTestInfo appId={appInfoState.id}
                                onChangeTestInfo={(testInfo) => {
                                    if (!testInfo.playing) {
                                        setCurrentTestInfo(testInfo);
                                        if (currentTestInfo) {
                                            setTestInfoPlaying(currentTestInfo.id, testInfo.id)
                                        }
                                    }
                                    setShowGame(true);

                                }}
                                level={gameState.level}
                                bucket={appInfoState.bucket}>
                            </ListTestInfo>
                        </>)}
                {((Config.LISTBUCKET.indexOf(appInfoState.bucket) !== -1 && !testInfoState.currentTopic[appInfoState.id]) || openSelectTopic === true) ?
                    <SelectTopicPopUp appInfoState={appInfoState}
                        openSelectTopic={openSelectTopic}
                        setOpenSelectTopic={() => setOpenSelectTopic(false)}>
                    </SelectTopicPopUp> : null}
                {appInfoState && appInfoState.hasState ?
                    <SelectStatePopup
                        appInfo={appInfoState}
                    /> : null}
            </Container >
            <ShowImage></ShowImage>
        </div >
    )
}
const ListTestInfoUI = ({ testInfoState, appId, onChangeTestInfo, level, bucket }) => {
    let testInfos = new Array();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 600))
    const isIPad = useMediaQuery(theme.breakpoints.between(600, 780))
    if (!testInfoState || testInfoState.loading) {
        return <LoadingWidget></LoadingWidget>
    }
    let widget = [], childs = [];
    if (Config.LISTBUCKET.indexOf(bucket) !== -1) {
        if (testInfoState.list.length > 0) {
            testInfoState.list.forEach(el => {
                if (el.topicId === testInfoState.currentTopic[appId]) {
                    testInfos.push(el);
                }
            })
        }
    } else {
        if (testInfoState.list.length > 0) {
            testInfoState.list.forEach(el => {
                if (el.appId === appId) {
                    testInfos.push(el)
                }
            })
        }
    }
    console.log("xxxxx testInfos", testInfos.length)
    testInfos.sort((a, b) => a.index - b.index).forEach((el, index) => {
        let indexInt = isMobile ? parseInt(index / 2) : (isIPad ? parseInt(index / 4) : parseInt(index / 6));
        let testInfoItem = <TestInfoItem
            onChangeTestInfo={onChangeTestInfo}
            testInfo={el}
            key={el.id}
            index={index}
            level={level}
            length={testInfos.length}
            reverse={indexInt % 2 === 0 ? false : true} >
        </TestInfoItem>
        childs.push(testInfoItem);
        if (isMobile ? (childs.length === 2 || childs.length === (testInfos.length - widget.length * 2)) : (isIPad ? (childs.length === 4 || childs.length === (testInfos.length - widget.length * 4)) : (childs.length === 6 || childs.length === (testInfos.length - widget.length * 6)))) {
            let container
            if (indexInt % 2 === 0) {
                container = <Grid container spacing={2} key={"container " + indexInt} style={{ justifyContent: (isMobile && childs.length === 2) ? "center" : "", marginBottom: isIPad ? "20px" : "12px", width: "100%", marginLeft: (isMobile && childs.length === 1) ? "calc((100% - 360px)/2)" : "auto", marginRight: "auto", marginTop: (isMobile && indexInt === 0) ? "20px" : "0px" }}>{[...childs]}</Grid>
            } else {
                container = <Grid container spacing={2} key={"container " + indexInt} style={{ justifyContent: (isMobile && childs.length === 2) ? "center" : "", margin: isIPad ? "0 auto 20px" : "0 auto 12px", flexDirection: "row-reverse", width: "100%", marginLeft: (isMobile && childs.length === 1) ? "calc((360px - 100%)/2)" : "auto" }}>{[...childs]}</Grid>
            }
            widget.push(container);
            childs = []
        }
    })
    console.log("xxx widget", widget)
    return (
        <>
            { widget}
        </>
    )
}
const TestInfoItem = ({ testInfo, onChangeTestInfo, index, level, reverse, length }) => {
    let status = testInfo.statusProgress
    const theme = useTheme();
    const [showAlert, setShowAlert] = useState();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 600));
    const isIPad = useMediaQuery(theme.breakpoints.between(600, 780));
    return (
        <Grid item xs={isMobile ? 6 : (isIPad ? 3 : 2)} style={{ maxWidth: isMobile ? "180px" : (isIPad ? "" : "") }} onClick={() => {
            if (testInfo.lock) {
                setShowAlert(true)
            } else {
                onChangeTestInfo(testInfo)
            }
        }} className="test-info-item" >
            <div className="test-info-item-container" style={(isMobile && index % 2 === 0 || isIPad && index % 4 !== 3 || !isMobile && !isIPad && index % 6 !== 5) ? { display: "block" } : { display: "flex", width: (isMobile || isIPad) ? "154px" : "" }}>
                {showAlert ? <CongratulationAlert page="test" onClose={() => setShowAlert(false)}></CongratulationAlert> : null}
                {((!isMobile && !isIPad && index % 6 !== 5) || (isMobile && index % 2 === 0) || (isIPad && index % 4 !== 3) ? (
                    <>
                        <div className="test-info-item-top" style={{ border: index === 0 ? "2px solid #4e63bd" : "2px dashed #4e63bd" }}></div>
                        <div className="test-info-item-bottom" style={{ border: index === 0 ? "2px dashed #4e63bd" : "2px solid #4e63bd" }}></div>
                    </>
                ) : (
                        <>
                            <div className="test-info-item-left" style={{ border: reverse ? "2px dashed #4e63bd" : "2px solid #4e63bd" }}></div>
                            <div className="test-info-item-right" style={{ border: reverse ? "2px solid #4e63bd" : "2px dashed #4e63bd" }}></div>
                        </>
                    ))}
                <div className="test-info-item-content">
                    <div className="circle-progress">
                        {testInfo.lock ? null : <div className="circle-progress-content" style={status === Config.GAME_STATUS_FAILED ? { background: "#FE6D6D", boxShadow: "none" } : { background: "linear-gradient(108.3deg, #3a95dc 23.49%, #96d9ff 76.7%)" }}>{status === Config.TEST_STATUS_NOTHING ? <PlayArrow style={{ margin: "auto" }}></PlayArrow> : (
                            status === Config.GAME_STATUS_PASSED ? <Done></Done> : (status === Config.GAME_STATUS_FAILED ? <CloseIcon style={{ color: "#fff" }}></CloseIcon> : (level === -1 ? testInfo.progress + "%" : testInfo.calculateProgress(level) + "%"))
                        )}</div>}
                        {testInfo.lock ? <LockIcon style={{ color: "#DADADA", margin: "auto" }}></LockIcon> : null}

                    </div>
                    <div className="test-info-title">{testInfo.title + " " + (index + 1).toString()}</div>
                </div>
                {index === length - 1 ? null : <ArrowRightAltIcon style={
                    isMobile ? (index % 2 === 0 ?
                        {
                            color: "#4E63BD",
                            position: "absolute",
                            top: "42%",
                            right: reverse ? "" : "-37px",
                            left: reverse ? "-33px" : "",
                            fontSize: "40px",
                            transform: reverse ? "rotate(180deg)" : ""
                        } :
                        {
                            color: "#4E63BD",
                            position: "absolute",
                            top: "97%",
                            left: "38%",
                            fontSize: "40px",
                            transform: "rotate(90deg)"
                        }) : (isIPad ?
                            (
                                index % 4 === 3 ?
                                    {
                                        color: "#4E63BD",
                                        position: "absolute",
                                        top: "96%",
                                        left: "37%",
                                        fontSize: "51px",
                                        transform: "rotate(90deg)"
                                    } :
                                    {
                                        color: "#4E63BD",
                                        position: "absolute",
                                        top: "37%",
                                        right: (reverse ? "" : "-51px"),
                                        left: (reverse ? "-48px" : ""),
                                        fontSize: "57px",
                                        transform: (reverse ? "rotate(180deg)" : "")
                                    }
                            ) :
                            (
                                (index % 6 === 5 ?
                                    {
                                        color: "#4E63BD",
                                        position: "absolute",
                                        top: "100%",
                                        right: "",
                                        left: "42%",
                                        fontSize: "34px",
                                        transform: "rotate(90deg)"
                                    } :
                                    {
                                        color: "#4E63BD",
                                        position: "absolute",
                                        top: "42%",
                                        right: (reverse ? "" : "-31px"),
                                        left: (reverse ? "-28px" : ""),
                                        fontSize: "34px",
                                        transform: (reverse ? "rotate(180deg)" : "")
                                    })
                            ))
                }></ArrowRightAltIcon>}
            </div>
        </Grid >
    )
}
const ListTestInfo = connect((state, ownProps) => {
    return {
        testInfoState: state.testInfoReducer,
        ...ownProps
    }
}, null)(ListTestInfoUI)
const mapStateToProps = (state, ownProps) => {
    return {
        testInfoState: state.testInfoReducer,
        gameState: state.gameState,
        stateInfoState: state.stateInfoState,
        ...ownProps
    };
}

const mapDispatchToProps = (dispatch) => ({
    getTestInfoByAppId: (appId, stateId) => dispatch(getTestInfoByAppId(appId, stateId)),
    endTest: () => dispatch(endTest()),
    getTopicsByParentId: (appId) => dispatch(getTopicsByParentId(appId)),
    setTestInfoPlaying: (prevId, nextId) => dispatch(setTestInfoPlaying(prevId, nextId)),
    getTestInfoByAppIdAndParentId: (appId) => dispatch(getTestInfoByAppIdAndParentId(appId))
});
const TestView = connect(mapStateToProps, mapDispatchToProps)(TestViewUI)
export default TestViewScreen
