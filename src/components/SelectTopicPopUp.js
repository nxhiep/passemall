import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTopicsByParentId, setCurrentTopic } from "../redux/actions";
import { LoadingWidget } from "./Widgets";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const SelectTopic = ({ currentTopic, stateInfoState, appInfoState, topicState, getTopicsByParentId = () => { }, setCurrentTopic = () => { }, openSelectTopic, setOpenSelectTopic = () => { } }) => {
    const [open, setOpen] = useState(!currentTopic[appInfoState.id]);
    useEffect(() => {
        if (openSelectTopic) {
            setOpen(true);
        }
    }, [openSelectTopic, stateInfoState.mapCurrentStateInfo[appInfoState.id]])
    useEffect(() => {
        let parentId = appInfoState.id;
        if (appInfoState.hasState && appInfoState) {
            if (stateInfoState.mapCurrentStateInfo[appInfoState.id]) {
                parentId = stateInfoState.mapCurrentStateInfo[appInfoState.id].id;
                getTopicsByParentId(parentId)
            } else {
                return
            }
        } else {
            getTopicsByParentId(parentId)
        }
    }, [getTopicsByParentId, setCurrentTopic, stateInfoState.mapCurrentStateInfo[appInfoState.id], currentTopic[appInfoState.id]])
    const handleClose = () => {
        setOpenSelectTopic()
        setOpen(false);
    }
    return (
        <Dialog
            fullWidth={true}
            className="select-state-popup"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            role="dialog"

        >
            <DialogTitle id="alert-dialog-slide-title">Select topic test</DialogTitle>
            <DialogContent role="dialog">
                <div className="state-info-panel">
                    {
                        topicState.loading == true || topicState.list.length === 0 ?
                            <LoadingWidget /> : topicState.list.map((topic) => {
                                if (appInfoState.hasState) {
                                    if (topic.parentId === stateInfoState.mapCurrentStateInfo[appInfoState.id].id) {
                                        return (
                                            <Button
                                                color={currentTopic[appInfoState.id] === topic.id ? "primary" : "default"}
                                                key={'state-item-' + topic.id}
                                                variant="outlined"
                                                onClick={() => {
                                                    setCurrentTopic(topic.id, appInfoState.id)
                                                    handleClose()
                                                }} >
                                                {topic.name}
                                            </Button>
                                        );
                                    }
                                } else {
                                    if (topic.parentId === appInfoState.id) {
                                        return (
                                            <Button
                                                color={currentTopic[appInfoState.id] === topic.id ? "primary" : "default"}
                                                key={'state-item-' + topic.id}
                                                variant={currentTopic[appInfoState.id] === topic.id ? "contained" : "outlined"}
                                                onClick={() => {
                                                    setCurrentTopic(topic.id, appInfoState.id)
                                                    handleClose()
                                                }} >
                                                {topic.name}
                                            </Button>
                                        );
                                    }
                                }

                            })
                    }
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
const mapStateToProps = (state, ownProps) => ({
    stateInfoState: state.stateInfoState,
    topicState: state.topicReducer,
    currentTopic: state.testInfoReducer.currentTopic,
    ...ownProps
});
const mapDispatchToProps = (dispatch) => ({
    getTopicsByParentId: (parentId) => dispatch(getTopicsByParentId(parentId)),
    setCurrentTopic: (topicId, appId) => dispatch(setCurrentTopic(topicId, appId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectTopic);