import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getStateInfo, setCurrentStateInfo } from "../redux/actions";
import { LoadingWidget } from "./Widgets";
import { onScrollElementAtParentElement } from "../models/Utils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SelectStatePopup = ({ stateInfoState, getStateInfo, setCurrentStateInfo, appInfo, openPopupChangeState, onHidden, openDefault, onLoaded }) => {
    const [open, setOpen] = useState(!stateInfoState.mapCurrentStateInfo[appInfo.id] && openDefault);
    useEffect(() => {
        if (appInfo.hasState) {
            getStateInfo(appInfo.id);
        }
    }, [getStateInfo, appInfo]);
    useEffect(() => {
        if (appInfo.hasState && openPopupChangeState) {
            setOpen(true);
            onScrollElementAtParentElement('.state-item.active', '.select-state-popup .MuiDialog-scrollPaper');
        }
    }, [openPopupChangeState, appInfo])
    const handleClose = () => {
        setOpen(false);
    }
    const selectStateHandle = (stateInfo) => {
        setCurrentStateInfo(stateInfo);
        setOpen(false);
    }
    let stateInfos = stateInfoState.list;
    let currentStateInfo = stateInfoState.mapCurrentStateInfo[appInfo.id];
    useEffect(() => {
        if(!currentStateInfo && stateInfos && stateInfos.length > 0){
            console.log("stateInfos 222 ", stateInfos);
            stateInfos.forEach(element => {
                if(element.id == 6118567191773184){
                    currentStateInfo = element
                }
            });
            currentStateInfo && setCurrentStateInfo(currentStateInfo);
        }
    }, [stateInfos, currentStateInfo])
    useEffect(() => {
        onLoaded && onLoaded(!!currentStateInfo);
    }, [onLoaded])
    return (
        <Dialog
            onExit={() => {
                onHidden && onHidden();
            }}
            fullWidth={true}
            className="select-state-popup"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            role="dialog"

        >
            <DialogTitle id="alert-dialog-slide-title">Select state</DialogTitle>
            <DialogContent role="dialog">
                <div className="state-info-panel">
                    {
                        stateInfoState.loading == true || !stateInfos ?
                            <LoadingWidget /> : stateInfos.sort((a, b) => a.name.localeCompare(b.name))
                                .map((stateInfo) => {
                                    return (
                                        <Button
                                            className={'state-item' + (currentStateInfo && currentStateInfo.id == stateInfo.id ? ' active' : '')}
                                            key={'state-item-' + stateInfo.id}
                                            variant="outlined" onClick={() => selectStateHandle(stateInfo)} >
                                            {stateInfo.name}
                                        </Button>
                                    );
                                })
                    }
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
const mapStateToProps = (state, ownProps) => ({
    stateInfoState: state.stateInfoState,
    ...ownProps
});
const mapDispatchToProps = (dispatch) => ({
    getStateInfo: (parentId) => dispatch(getStateInfo(parentId)),
    setCurrentStateInfo: (stateInfo) => dispatch(setCurrentStateInfo(stateInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectStatePopup);