import { Button, FormControlLabel, Checkbox, makeStyles, TextField, IconButton, Input, Link } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Close as IconClose, } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Report as ReportIcon } from '@material-ui/icons'
import { showImageDialog } from '../redux/actions/appValue';
import { postReport } from '../services/index';
import html2canvas from 'html2canvas';
import { isMobileFunctions } from '../utils';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles({
    root: {
        width: "400px"
    },
    title: {
        padding: "16px 0 16px 0"
    },
    reportButton: {
        marginRight: "16px"
    }
})

export class DialogInfo {
    constructor(props) {
        let { title, msg, okText, cancelText, autoHide = true, onConfirm = () => { }, showDialogKey } = props;
        this.title = title;
        this.msg = msg;
        this.okText = okText;
        this.cancelText = cancelText;
        this.autoHide = autoHide;
        this.onConfirm = onConfirm;
        this.showDialogKey = showDialogKey == -1 ? -1 : new Date().getTime();
    }
    static init() {
        return new DialogInfo({
            title: '',
            msg: '',
            showDialogKey: -1,
        });
    }
}
const DialogForMobile = ({ handleInstalled, appInfoState }) => {
    let userAgent = ""
    if (typeof window !== "undefined") {
        if (navigator.userAgent.match("Android")) {
            userAgent = "Android"
        } else {
            userAgent = "IOS"
        }
    }
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    }
    const handleClickInstalled = () => {
        handleInstalled();
        setOpen(false);
    }
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Install App</DialogTitle>
            <DialogContent>Do you want install app?</DialogContent>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 8px" }}>
                <DialogActions>
                    <Button component={Link} href={userAgent === "Android" ? appInfoState.urlAndroid : appInfoState.urlIos} onClick={handleClickInstalled} color="primary">Install</Button>
                </DialogActions>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">No,Thanks!</Button>
                </DialogActions>
            </div>

        </Dialog>
    );
}
const AlertDialogSlide = ({ dialogInfo }) => {

    let { title, msg, okText, cancelText, autoHide = true, showDialogKey, onConfirm = () => { } } = dialogInfo;
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (showDialogKey != -1) {
            setOpen(true);
        }
    }, [showDialogKey]);

    const handleClose = () => {
        if (onConfirm) {
            onConfirm(false);
        }
        setOpen(false);
    };

    const handleAgree = () => {
        if (onConfirm) {
            onConfirm(true);
        }
        if (autoHide) {
            setOpen(false);
        }
    }
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            {title ? <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle> : ''}
            {msg ? <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">{msg}</DialogContentText>
            </DialogContent> : ""}
            <DialogActions>
                {cancelText !== undefined ? <Button onClick={handleClose} color="primary">{cancelText ? cancelText : 'Cancel'}</Button> : ''}
                {okText !== undefined ? <Button onClick={handleAgree} color="primary">{okText ? okText : 'Ok'}</Button> : ''}
            </DialogActions>
        </Dialog>
    );
}
const ReportDialog = ({ appId, appName, questionId, handleClosePopover }) => {
    let reason = 1;
    let details = "";
    let imgBase64 = ""
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const isMobile = isMobileFunctions();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        handleClosePopover()
    };
    const handleReport = async () => {
        await html2canvas(document.getElementById("canvas"), { scrollY: -window.scrollY, height: 700, logging: false, letterRendering: true }).then(canvas => {
            imgBase64 = canvas.toDataURL();
        });
        postReport({
            appId: appId,
            base64Image: imgBase64,
            reason: reason,
            details: details,
            questionId: questionId,
            appName: appName
        })
        setOpen(false);
    }
    const [checked, setChecked] = useState({
        mistake: true,
        difficult: false,
        other: false
    })
    const handleOnChangeInput = (event) => {
        details = event.target.value
    }
    const handleChange = (field) => {
        switch (field) {
            case ("mistake"): {
                reason = 1;
                return setChecked({
                    mistake: true,
                    difficult: false,
                    other: false
                })
            }
            case ("difficult"): {
                reason = 2;
                return setChecked({
                    mistake: false,
                    difficult: true,
                    other: false
                })
            }
            case ("other"): {
                reason = 3;
                return setChecked({
                    mistake: false,
                    difficult: false,
                    other: true
                })
            }
        }
    }
    return (
        <div>
            {!isMobile ?
                <IconButton onClick={handleClickOpen}>
                    <ReportIcon color="primary"></ReportIcon>
                </IconButton>
                :
                <Button fullWidth={true} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "16px" }} onClick={() => handleClickOpen()}>
                    <ReportIcon color="primary"></ReportIcon>
                    <div style={{ marginLeft: "16px" }}>Report</div>
                </Button>
            }
            <Dialog
                open={open}
                fullWidth={isMobile}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogContent style={isMobile ? {} : { width: "400px" }}>
                    <DialogTitle className={classes.title}>{"REPORT MISTAKE!"}</DialogTitle>
                    <DialogContentText id="alert-dialog-slide-description" style={{ display: "flex", flexDirection: "column" }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedF"
                                    color="primary"
                                    checked={checked.mistake}
                                    onChange={() => handleChange("mistake")}
                                />
                            }
                            label="There's a mistake"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedF"
                                    color="primary"
                                    checked={checked.difficult}
                                    onChange={() => handleChange("difficult")}
                                />
                            }
                            label="It's too difficult"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedF"
                                    color="primary"
                                    checked={checked.other}
                                    onChange={() => handleChange("other")}
                                />
                            }
                            label="Other"
                        />

                    </DialogContentText>
                    <TextField
                        label="Detail"
                        variant="outlined"
                        placeholder="Please explain your issue in a little bit more detail"
                        rows={4}
                        multiline
                        fullWidth
                        margin="dense"
                        onChange={(event) => handleOnChangeInput(event)} />
                </DialogContent>
                <DialogActions >
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleReport} color="primary" className={classes.reportButton}>
                        Report
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

const ShowImageUI = ({ appValueState, showImageDialog, }) => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        window.onpopstate = (e) => {
            showImageDialog('');
        }
        if (appValueState.image && appValueState.image.length > 0) {
            setOpen(true);
        }
    }, [appValueState]);
    const handleClose = () => {
        setOpen(false);
        showImageDialog('');
    };
    const isMobile = isMobileFunctions()
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <div style={{ width: isMobile ? '100%' : 600, position: 'relative' }}>
                <Button onClick={handleClose} aria-label="close" style={{ position: 'absolute', 'top': 0, right: '0' }}>
                    <IconClose fontSize="small" style={{ color: 'red' }} />
                </Button>
                <img width="100%" src={appValueState.image} alt="dialog" />
            </div>
        </Dialog>
    );
}
const mapDispatchToProps = {
    showImageDialog: (url) => showImageDialog(url),
}
const ShowImage = connect((state, ownProps) => ({
    appValueState: state.appValueState,
    ...ownProps
}), mapDispatchToProps)(ShowImageUI);
export { DialogForMobile, AlertDialogSlide, ShowImage, ReportDialog };

