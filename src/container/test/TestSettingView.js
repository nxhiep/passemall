import { Button, Checkbox, FormControl, IconButton, Input, ListItemText, MenuItem, Modal, Select, TextField, useTheme } from '@material-ui/core';
import { Clear as CloseIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Config from '../../config';
import { endTest, getTopicsByParentId, loadTestSettingByTopicId } from '../../redux/actions/index';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { LoadingWidget } from '../../components/Widgets';

const CustomTestView = ({ testSetting, topicState, appInfo, topicId, startNewTest, endTest, loadTestSetting, getTopicsByParentId, showButtonContinue, onContinueTest, stateInfoState }) => {
    const [openModal, setOpenModal] = useState(false);
    let appId = appInfo.id;
    let parentId = appId;
    if (appInfo && appInfo.hasState && stateInfoState.mapCurrentStateInfo[appId]) {
        parentId = stateInfoState.mapCurrentStateInfo[appId].id;
        topicId = parentId;
    }
    useEffect(() => {
        if (!appInfo.hasState || (appInfo.hasState && parentId != appId)) {
            getTopicsByParentId(parentId);
        }
    }, [getTopicsByParentId, appInfo, parentId, appId]);
    let mainTopics = new Array();
    let topicIds = new Array();
    if (!topicState.loading) {
        let topics = Object.values(topicState.data);
        topics.forEach((topic) => {
            if (topic.parentId === parentId) {
                mainTopics.push(topic);
                topicIds.push(topic.id);
            }
        });
    }
    if (topicId !== appId && !appInfo.hasState) {
        topicIds.push(topicId);
    }
    useEffect(() => {
        if (topicIds && topicIds.length > 0 && (!testSetting || (testSetting && (testSetting.appId != appId && testSetting.topicId != topicId)))) {
            loadTestSetting(appId, topicId, topicIds);
        }
    }, [loadTestSetting, appId, topicId, topicIds, testSetting]);
    console.log(testSetting);

    if (!testSetting)
        return React.createElement(LoadingWidget, null);
    return (React.createElement("div", { className: "custom-test-view" },
        React.createElement("p", null, "You are about to take the simulator test. If you pass this test at least 5 times, congratulations! You are ready for your real test"),
        React.createElement("ul", null,
            React.createElement("li", null, "As close as it gets to the actual test."),
            React.createElement("li", null,
                testSetting.totalQuestion,
                " questions."),
            React.createElement("li", null,
                testSetting.allowMistake,
                " mistakes allowed."),
            React.createElement("li", null, "New questions every time you re-take."),
            React.createElement("li", null, "Stop as soon as you have reached the failing score.")),
        showButtonContinue ? React.createElement("div", { className: "buttons-panel" },
            React.createElement(Button, { variant: "contained", color: "primary", className: "custom-test-button", onClick: () => onContinueTest() }, "Continue")) : '',
        React.createElement("div", { className: "buttons-panel" },
            React.createElement(Button, { variant: "contained", color: "primary", className: "custom-test-button", onClick: () => setOpenModal(true) }, "Custom Test")),
        React.createElement("div", { className: "buttons-panel" },
            React.createElement(Button, {
                variant: "contained", color: "secondary", className: "end-test-button", onClick: () => {
                    endTest(testSetting);
                }
            }, "End Test")),
        React.createElement(Modal, { className: "my-modal", "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: openModal, onClose: () => setOpenModal(false) },
            React.createElement("div", null,
                React.createElement(CustomTestModal, {
                    appId: appId, topicId: topicId, mainTopics: mainTopics, onClose: () => setOpenModal(false), onChange: (testSetting) => {
                        if (startNewTest)
                            startNewTest(testSetting);
                        setOpenModal(false);
                    }, testSetting: testSetting
                })))));
};
const CustomTestModalUI = ({ mainTopics, onClose, onChange, testSetting, appId, topicId, }) => {
    var _a, _b, _c, _d;
    const [instanceFeedback, setInstanceFeedback] = useState((_a = testSetting.instanceFeedback) !== null && _a !== void 0 ? _a : false);
    const [totalQuestion, setTotalQuestion] = useState((_b = testSetting.totalQuestion) !== null && _b !== void 0 ? _b : 0);
    const [allowMistake, setAllowMistake] = useState((_c = testSetting.allowMistake) !== null && _c !== void 0 ? _c : 0);
    const [contentTest, setContentTest] = useState((_d = testSetting.contentTest) !== null && _d !== void 0 ? _d : []);
    return (React.createElement("div", { className: "my-modal-content custom-test-content-dialog-panel" },
        React.createElement("div", { className: "my-modal-header" },
            "Custom Test",
            React.createElement(IconButton, { "aria-label": "delete", className: "close-icon-button", onClick: () => onClose() },
                React.createElement(CloseIcon, { fontSize: "small" }))),
        React.createElement("div", { className: "my-modal-body" },
            React.createElement("div", { className: "custom-test-content-panel" },
                React.createElement("div", { className: "item" },
                    React.createElement("label", null, "Questions number for test"),
                    React.createElement(TextField, {
                        id: "text-box-question-number", defaultValue: !totalQuestion || isNaN(totalQuestion) ? 0 : totalQuestion, variant: "outlined",
                        type: "number", className: "field-content", onChange: (event) => {
                            let value = event.target.value;
                            let total = 0;
                            try {
                                total = parseInt(value, 10);
                            }
                            catch (e) { }
                            setTotalQuestion(total);
                        }
                    })),
                React.createElement("div", { className: "item" },
                    React.createElement("label", null, "Max allowed questions mistake"),
                    React.createElement(TextField, {
                        id: "text-box-allowed-mistakes", defaultValue: !allowMistake || isNaN(allowMistake) ? 0 : allowMistake, variant: "outlined",
                        type: "number", className: "field-content", onChange: (event) => {
                            let value = event.target.value;
                            let total = 0;
                            try {
                                total = parseInt(value, 10);
                            }
                            catch (e) { }
                            setAllowMistake(total);
                        }
                    })),
                mainTopics.length > 0 ? React.createElement("div", { className: "item" },
                    React.createElement("label", null, "Content test"),
                    React.createElement(MultipleSelectBox, {
                        valuesDefault: contentTest, mainTopics: mainTopics, className: "field-content", onChange: (values) => {
                            setContentTest(values);
                        }
                    })) : '',
                React.createElement("div", { className: "item" },
                    React.createElement("label", null, "Instance feedback"),
                    React.createElement(FormControl, { variant: "outlined", className: "select-instance-feedback field-content" },
                        React.createElement(Select, {
                            id: "select-instance-feedback", value: instanceFeedback ? 1 : 0, onChange: (event) => {
                                setInstanceFeedback(!!event.target.value);
                            }
                        },
                            React.createElement(MenuItem, { value: 0 }, "Off"),
                            React.createElement(MenuItem, { value: 1 }, "On"))))),
            React.createElement("div", { className: "start-test-button-panel" },
                React.createElement(Button, {
                    variant: "contained", color: "primary", className: "start-test-button", onClick: () => {
                        onChange({
                            instanceFeedback: instanceFeedback,
                            totalQuestion: totalQuestion,
                            allowMistake: allowMistake,
                            contentTest: contentTest,
                            appId: appId,
                            topicId: topicId
                        });
                    }
                }, "Start Test")))));
};
const MultipleSelectBox = (props) => {
    const { mainTopics, onChange, className, valuesDefault } = props;
    const [topicIds, setTopicIds] = useState(valuesDefault ? valuesDefault : new Array());
    let mapTopicId = new Map();
    mainTopics.forEach((item) => {
        mapTopicId.set(item.id, item);
    });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    let width;
    if (isMobile) {
        width = window.innerWidth - 60;
    }
    return (React.createElement(FormControl, { style: width ? { maxWidth: width } : {}, className: "select-content-test" + (className ? " " + className : ""), variant: "outlined" },
        React.createElement(Select, {
            id: "select-content-test", multiple: true, value: topicIds, onChange: event => {
                const values = event.target.value;
                onChange(values);
                setTopicIds(values);
            }, input: React.createElement(Input, null), renderValue: (selected) => {
                let result = new Array();
                selected.forEach((id) => {
                    let item = mapTopicId.get(id);
                    if (item)
                        result.push(item.name);
                });
                return result.join(', ');
            }
        }, mainTopics.map((item) => {
            return (React.createElement(MenuItem, { value: item.id, key: 'menu-select-item-' + item.id },
                React.createElement(Checkbox, { checked: topicIds.indexOf(item.id) > -1 }),
                React.createElement(ListItemText, { primary: item.name })));
        }))));
};
const mapStateToProps = (state, ownProps) => {
    return Object.assign({ topicState: state.topicReducer, testSetting: state.testSettingState.currentSetting, stateInfoState: state.stateInfoState }, ownProps);
};
const mapDispatchToProps = (dispatch) => ({
    getTopicsByParentId: (parentId) => dispatch(getTopicsByParentId(parentId)),
    loadTestSetting: (appId, topicId, topicIds) => dispatch(loadTestSettingByTopicId({
        appId: appId,
        topicId: topicId,
        topicIds: topicIds
    })),
    endTest: (setting) => dispatch(endTest({ setting: setting })),
});
const mapStateToPropsModal = (state, ownProps) => {
    return Object.assign({ topicState: state.topicReducer, testSetting: state.testSettingState.currentSetting }, ownProps);
};
const CustomTestModal = connect(mapStateToPropsModal, null)(CustomTestModalUI);
export default connect(mapStateToProps, mapDispatchToProps)(CustomTestView);