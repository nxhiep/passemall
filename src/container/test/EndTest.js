import { Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

const EndTestView = ({ gameState, testInfoState, topicState, bucket }) => {
    let currentTestInfoId = gameState.id.substring(0, gameState.id.length - 2);
    let listTopicProgress = new Array();
    if (topicState.list.length > 0 && testInfoState.list.length > 0) {
        let testId = gameState.id.substring(0, gameState.id.length - 2);
        let testInfo = testInfoState.data[testId];
        testInfo.testQuestionData.forEach(el => {
            listTopicProgress.push({
                topicName: topicState.data[el.topicId].name,
                correctQuestion: el.correctQuestion[gameState.level - 1],
                questionNum: el.questionNum
            })
        })
    }
    return (
        <div className="end-test-view">
            <div className="image-finish">
                <img src="/images/finish.png" alt="finsih"></img>
            </div>
            <div className="circle-progress">
                <div className="circle">
                    <div className="circle2">{Math.round(gameState.progress.correct / gameState.progress.total * 100)}%</div>
                </div>
                <div className="content-progress">
                    <div className="correct">
                        <div style={{ width: "20px", marginRight: "24px", color: "#3A95DC", fontSize: "18px", fontWeight: 800 }}>{gameState.progress.correct}</div>
                        <div style={{ fontSize: "13px" }}>Correct</div>
                    </div>
                    <div className="mistake">
                        <div style={{ width: "20px", marginRight: "24px", color: "#56CCF2", fontSize: "18px", fontWeight: 800 }}>{gameState.progress.total - gameState.progress.correct}</div>
                        <div style={{ fontSize: "13px" }} >Mistake</div>
                    </div>
                </div>
            </div>
            <Button variant="contained" onClick={() => {
                
            }}>Try Again</Button>
            <div className="list-topic-progress">
                {listTopicProgress.map(topicProgress => {
                    return (
                        <TopicProgressItem topicProgress={topicProgress} bucket={bucket} key={topicProgress.topicName}></TopicProgressItem>
                    )
                })}
            </div>
        </div >
    );
}
const TopicProgressItem = ({ bucket, topicProgress }) => {
    return (
        <div >
            <div style={{ display: "flex" }}>
                <div style={{ fontSize: "12px", fontWeight: 500 }}>{bucket.toUpperCase() + " " + topicProgress.topicName}</div>
                <div style={{ marginLeft: "auto", display: "flex" }}>
                    <div style={{ fontSize: "12px" }}>({topicProgress.correctQuestion}/{topicProgress.questionNum})</div>
                </div>
            </div>
            <div style={{ height: "8px", boxShadow: "inset 3px 4px 3px rgba(0, 0, 0, 0.12)", borderRadius: "5px", marginTop: "8px", marginBottom: "24px" }}>
                <div style={{ width: (topicProgress.correctQuestion / topicProgress.questionNum * 100) + "%", height: "8px", background: "linear-gradient(270deg, #4EAFE8 6.58%, #96D9FF 99.04%)", borderRadius: "4px" }}></div>
            </div>
        </div >
    )
}
const mapStateToProps = (state, ownProps) => ({
    gameState: state.gameState,
    testInfoState: state.testInfoReducer,
    topicState: state.topicReducer,
    ...ownProps
})
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EndTestView);