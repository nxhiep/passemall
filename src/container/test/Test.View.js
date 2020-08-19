import { Button, Grid, IconButton } from '@material-ui/core';
import {  withTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { ShowImage } from '../../components/Dialog';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SelectStatePopup from '../../components/SelectStatePopup';
import { FixedContainer, LoadingWidget, MainWidget } from '../../components/Widgets';
import Config from '../../config';
import { scrollToTop } from '../../models/Utils';
import { onContinue, startNewExamTest } from '../../redux/actions/game';
import EndTestView from './EndTest';
import { TestProgressPanel, TestQuestionPanel } from './TestComponent';
import CustomTestView from './TestSettingView';
import ReactGA from 'react-ga';
import { isMobileFunctions } from '../../utils';

const TestViewScreen = ({ appInfoState, topicId = -1, theme }) => {
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
    return (React.createElement(TestView, { appInfo: appInfo, topicId: topicId > -1 ? topicId : appInfo.id }));
};
class TestViewUI extends Component {
    constructor(props) {
        super(props);
        this.renderTest = () => {
            const { gameState, onContinue, testSetting } = this.props;
            const appInfo = this.state.appInfo;
            if (!testSetting || !testSetting.currentSetting || testSetting.currentSetting.appId != appInfo.id) {
                return React.createElement(LoadingWidget, null);
            }
            let currentQuestion = gameState.currentQuestion;
            let isSkip = currentQuestion && currentQuestion.questionStatus == Config.QUESTION_NOT_ANSWERED;
            return (React.createElement(Grid, { item: true, sm: 12, md: 8, className: "right-panel", style: this.state.isMobile ? { display: this.state.showGame ? '' : 'none' } : {} },
                React.createElement("div", { className: "box-question-panel" },
                    !gameState.isFinish ? React.createElement(TestProgressPanel, null) : '',
                    React.createElement(TestQuestionPanel, { className: "question-view-study-game", appId: appInfo.id, topicId: this.state.topicId, gameType: Config.TEST_GAME, testSetting: testSetting.currentSetting, appInfoState: appInfo })),
                !gameState.isFinish ? React.createElement(Grid, { container: true, justify: "center", className: "button-game-panel" },
                    React.createElement(Button, {
                        className: isSkip ? "skip-button" : "continue-button", onClick: () => {
                            onContinue(testSetting.currentSetting);
                        }
                    }, isSkip ? "Skip" : "Continue")) : ''));
        };
        let appInfo = props.appInfo;
        let isMobile = isMobileFunctions();
        this.state = {
            topicId: props.topicId,
            appInfo: appInfo,
            showGame: false,
            isMobile: isMobile
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.isMobile && this.props.gameState.isLoaded === false && nextProps.gameState.isLoaded === true) {
            this.setState({
                showGame: nextProps.gameState.isLoading == 3 || nextProps.gameState.isLoading == 4 
            });
        }
    }
    render() {
        const { startNewTest, gameState, stateInfoState } = this.props;
        const appInfo = this.state.appInfo;
        let loading = this.state.isMobile && gameState && gameState.isLoading == 2;
        return (React.createElement(MainWidget, null,
            React.createElement(Header, null),
            React.createElement(FixedContainer, { className: "test-game-panel" },
                React.createElement(Grid, { container: true, direction: "row", spacing: this.state.isMobile ? 0 : 3 },
                    loading ? React.createElement(LoadingWidget, { fixed: true }) : '',
                    React.createElement(Grid, { item: true, sm: 12, md: 4, className: "left-panel", style: this.state.isMobile ? { display: this.state.showGame && !gameState.isFinish ? 'none' : '' } : {} }, gameState.isFinish ?
                        React.createElement(EndTestView, null) : React.createElement(CustomTestView, {
                            topicId: this.state.topicId, appInfo: appInfo, startNewTest: (testSetting) => {
                                let appId = appInfo.id;
                                let topicId = this.state.topicId;
                                if (appInfo.hasState && stateInfoState.mapCurrentStateInfo[appId]) {
                                    topicId = stateInfoState.mapCurrentStateInfo[appId].id;
                                }
                                startNewTest(appId, topicId, testSetting);
                            }, showButtonContinue: this.state.isMobile && !this.state.showGame, onContinueTest: () => {
                                this.setState({
                                    showGame: true
                                });
                            }
                        })),
                    this.state.isMobile && this.state.showGame && !gameState.isFinish ?
                        React.createElement(Grid, { container: true, alignItems: "center" },
                            React.createElement(IconButton, {
                                onClick: () => {
                                    this.setState({
                                        showGame: false
                                    });
                                }
                            },
                                React.createElement(ArrowBackIcon, null))) : '',
                    this.renderTest())),
            React.createElement(Footer, null),
            React.createElement(ShowImage, null),
            appInfo.hasState ? React.createElement(SelectStatePopup, { appInfo: appInfo, openPopupChangeState: false }) : ''));
    }
}
const mapStateToProps = (state, ownProps) => {
    return Object.assign({ topicReducer: state.topicReducer, gameState: state.gameState, testSetting: state.testSettingState, stateInfoState: state.stateInfoState }, ownProps);
};
const mapDispatchToProps = (dispatch) => ({
    startNewTest: (appId, topicId, testSetting) => dispatch(startNewExamTest({
        appId: appId,
        topicId: topicId,
        setting: testSetting,
        gameType: Config.TEST_GAME,
    })),
    onContinue: (testSetting) => dispatch(onContinue(testSetting)),
});
const TestView = connect(mapStateToProps, mapDispatchToProps)(TestViewUI);
export default (withTheme(TestViewScreen));
