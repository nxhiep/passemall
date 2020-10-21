import { Button, Container, Grid, IconButton } from '@material-ui/core';
import { useTheme, withTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { ShowImage } from '../../components/Dialog';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SelectStatePopup from '../../components/SelectStatePopup';
import { LoadingWidget } from '../../components/Widgets';
import Config from '../../config';
import { scrollToTop } from '../../models/Utils';
import { onContinue, startNewExamTest } from '../../redux/actions/game';
import EndTestView from './EndTest';
import { TestProgressPanel, TestQuestionPanel } from './TestComponent';
import CustomTestView from './TestSettingView';
import ReactGA from 'react-ga';

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
    if (appInfo.bucket !== "dmv" && appInfo.bucket !== "cdl") {
        console.log(appInfo.id)
    }
    return (
        <>
        </>
    )
};
export default TestViewScreen