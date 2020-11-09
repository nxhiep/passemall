import { Button, Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FixedContainer, LineProgress, LoadingWidget } from '../../components/Widgets';
import Topic from "../../models/Topic";
import { stringToHtml } from "../../models/Utils";
import { getTopicsByParentId } from "../../redux/actions";
import { stringReplaceUrl } from "../../utils";
import { useRouter } from "next/router";
const HomeContent = ({ appInfo, appNameId, topicState, getTopicsByParentId, hasState, onChangeState, stateInfoState }) => {
    let parentId = appInfo.id;
    let currentState;
    if (appInfo && appInfo.hasState && stateInfoState.mapCurrentStateInfo[appInfo.id]) {
        currentState = stateInfoState.mapCurrentStateInfo[appInfo.id];
        parentId = currentState.id;
    }
    useEffect(() => {
        getTopicsByParentId(parentId);
    }, [parentId]);
    if (!topicState || topicState.loading === true || !topicState.data) {
        return <LoadingWidget color={null} />;
    }
    let topics = [];
    let temp = Object.values(topicState.data);
    temp.forEach((topic) => {
        if (parentId == topic.parentId) {
            topics.push(topic);
        }
    });
    return (
        <div style={{ 'backgroundColor': 'var(--main-background-color)' }} className="content-home-page">
            <Container>
                <h2 className="main-title">
                    <span>All categories</span>
                    {hasState && currentState ? <div style={{ marginLeft: "auto", marginRight: "20px" }}>{currentState.name}</div> : null}
                    {hasState ? <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            onChangeState();
                        }}>Change State</Button> : ''}
                </h2>
                <hr />
                <div>
                    <Grid
                        className="content-panel"
                        container
                        direction="row"
                    >
                        {
                            topics.map((t) => {
                                let topic = new Topic(t);
                                return <TopicItem topic={topic} appNameId={appNameId} key={'home-topic-item-' + topic.id} />;
                            })
                        }
                    </Grid>
                </div>
            </Container>
        </div>


    );
}
const TopicItem = ({ topic, appNameId }) => {
    if (!topic) {
        return null;
    }
    let description = topic.description.replace(/(<([^>]+)>)/gi, '').replaceAll("&nbsp;", "");
    if (description.charCodeAt(0) === 183) {
        description = description.substring(1, description.length)
    }
    let progress = topic?.progress?.progress;
    if (!progress || isNaN(progress) || progress < 0) {
        progress = 0;
    }
    let link = ("/" + appNameId + '/' + stringReplaceUrl(topic.name) + '-' + topic.id).replace(/--/g, '-');
    return (
        <Grid item className="topic-item-panel" >
            <a href={link}>
                <label>{topic.name}</label>
                <p>{description}</p>
                <LineProgress percent={progress} size={'15px'} />
            </a>
        </Grid>
    );
}

const mapStateToProps = (state, ownProps) => ({
    topicState: state.topicReducer,
    stateInfoState: state.stateInfoState,
    ...ownProps
});

const mapDispatchToProps = (dispatch) => ({
    getTopicsByParentId: (parentId) => dispatch(getTopicsByParentId(parentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);