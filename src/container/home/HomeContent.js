import { Button, Grid } from "@material-ui/core";
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
    if (appInfo && appInfo.hasState && stateInfoState.mapCurrentStateInfo[appInfo.id]) {
        parentId = stateInfoState.mapCurrentStateInfo[appInfo.id].id;
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
            <FixedContainer>
                <h3 className="main-title">
                    <span>All categories</span>
                    {hasState ? <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            onChangeState();
                        }}>Change State</Button> : ''}
                </h3>
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
            </FixedContainer>
        </div>


    );
}

const TopicItem = ({ topic, appNameId }) => {
    const router = useRouter();

    if (!topic) {
        return null;
    }
    let description = topic.description;
    let progress = topic?.progress?.progress;
    if (!progress || isNaN(progress) || progress < 0) {
        progress = 0;
    }
    let link = '/' + appNameId + '/' + stringReplaceUrl(topic.name) + '-' + topic.id;
    return (
        <Grid item className="topic-item-panel" onClick={() => router.push(link)}>
            <a href={link} onClick={(event) => event.preventDefault()}>
                <label style={{ fontWeight: "bold" }}>{topic.name}</label>
                <div>{stringToHtml(description)}</div>
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