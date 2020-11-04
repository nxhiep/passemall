import { Button, Container, IconButton, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React from 'react';
import { connect } from 'react-redux';
import { resetQuestionProgress, setGameIsLoading } from '../../redux/actions';

const useStyles = makeStyles({
    button: {
        borderRadius: "20px",
        width: "90%",
        left: "5%",
        position: "fixed"
    }
})
const EndTestView = ({ gameState, testInfoState, topicState, bucket, resetQuestionProgress, setGameIsLoading, setShowLeftPanel }) => {
    const classes = useStyles();
    let listTopicProgress = new Array();
    let testId = gameState.id.substring(0, gameState.id.length - 2);
    let testInfo = testInfoState.data[testId];
    if (topicState.list.length > 0 && testInfoState.list.length > 0) {
        testInfo.testQuestionData.forEach(el => {
            listTopicProgress.push({
                topicName: topicState.data[el.topicId] ? topicState.data[el.topicId].name : topicState.name,
                correctQuestion: el.correctQuestion[gameState.level - 1],
                questionNum: el.questionNum
            })
        })
    }
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    return (
        <Container>
            <div className="end-test-view">
                {isMobile ?
                    <IconButton onClick={() => setShowLeftPanel()} style={{ marginTop: "8px" }}
                    ><ArrowBack color="primary" style={{ fontSize: "30px" }}>
                        </ArrowBack>
                    </IconButton> : null}
                <div className="image-finish">
                    <img src="/images/finish.png" alt="finsih"></img>
                </div>
                <div style={{ marginTop: "16px" }}>
                    <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "4px", textAlign: "center" }}>{gameState.isFinish ? "Not enough to pass :(" : ""}</div>
                    <div style={{ fontSize: "9px", fontWeight: "500", maxWidth: "200px", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>{gameState.isFinish ? `Yowch! That hurt. Failing an exam always does. But hey, 
                        that was just one try. Get your notes together and try again. You can do this! ` : `Congratulations, you have
                        successfully completed this test. Your
                        rank is 2 out of two thousand`}</div>
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
                {!isMobile ? <Button style={{ margin: "16px auto 0px auto", display: "block" }} color="primary" variant="contained" onClick={() => {
                    resetQuestionProgress()
                }}>Try Again</Button> : null}
                <div className="list-topic-progress">
                    {listTopicProgress.map(topicProgress => {
                        return (
                            <TopicProgressItem topicProgress={topicProgress} bucket={bucket} key={topicProgress.topicName}></TopicProgressItem>
                        )
                    })}
                </div>

            </div >
            {isMobile ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Button style={{ bottom: "60px", background: "#4E63BD", color: "#fff" }}
                        className={classes.button}
                        onClick={() => {
                            resetQuestionProgress()
                        }}>Try Again</Button>
                    <Button style={{ bottom: "10px", background: "#fff", color: "#4E63BD" }}
                        className={classes.button}
                        onClick={() => setGameIsLoading()}
                    >Review</Button>
                </div>
            ) : null}
        </Container>
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
        resetQuestionProgress: () => dispatch(resetQuestionProgress()),
        setGameIsLoading: () => dispatch(setGameIsLoading())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EndTestView);