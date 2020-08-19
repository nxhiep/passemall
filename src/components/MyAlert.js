import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Close as CloseIcon } from '@material-ui/icons';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/appstate';
import { AppValueState } from '../redux/reducers/appValue';
export var AlertType;
(function (AlertType) {
    AlertType[AlertType["error"] = 0] = "error";
    AlertType[AlertType["info"] = 1] = "info";
    AlertType[AlertType["success"] = 2] = "success";
    AlertType[AlertType["warning"] = 3] = "warning";
})(AlertType || (AlertType = {}));

const MyAlertUI = ({ msg, alertType, onClose = () => { }, appValueState }) => {
    const [open, setOpen] = useState(true);
    useEffect(() => {
        if (appValueState.msg && appValueState.msg.length > 0) {
            setOpen(true);
        }
    }, [appValueState.msg]);
    if (!open) {
        return null;
    }
    let alertTypeStr = 'info';
    let title = 'Info';
    switch (alertType) {
        case AlertType.error: alertTypeStr = "error"; title = "Error"; break;
        case AlertType.success: alertTypeStr = "success"; title = "Success"; break;
        case AlertType.warning: alertTypeStr = "warning"; title = "Warning"; break;
    }
    msg = "This is a " + alertTypeStr + " alert — check it out!";
    return (
        <div className={"my-alert " + (alertTypeStr)}>
            <Grid container alignItems="center" justify="space-between" style={{ height: "100%" }}>
                <span></span>
                <div className="content">
                    <div className="title">{title}</div>
                    <div className="msg">{msg}</div>
                </div>
                <IconButton onClick={() => { onClose(); setOpen(false); }}><CloseIcon style={{ color: 'white' }} /></IconButton>
            </Grid>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    showAlert: (url) => showAlert(url),
})

export default connect((state, ownProps) => ({
    appValueState: state.appValueState,
    ...ownProps
}), mapDispatchToProps)(MyAlertUI);
