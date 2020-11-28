import { Fade, IconButton, Modal } from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';
import { useEffect, useState } from "react";
import { Close as CloseIcon } from '@material-ui/icons'

const SearchResultsModal = ({ value, results }) => {
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    useEffect(() => {
        if (results) {
            setOpen(true)
        }
    }, [results])
    return <Modal
        className="modal-search-results-panel"
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 300,
        }}
    >
        <Fade in={open}>
            <div className="search-results-panel">
                <div className="headerx">
                    <div>Results for: "{value}" ({results ? results.length : 0})</div>
                    <IconButton
                    onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="bodyx">
                    {results ? results.map((appInfo) => {
                        let link = '/' + appInfo.appNameId
                        return <div key={"modal-" + appInfo.id} className="app-item-panel">
                            <div onClick={() => {
                                window.location.href = link
                            }}><img src={appInfo.avatar} width="60px" height="60px" /></div>
                            <div className="infos">
                                <div className="name" onClick={() => {
                                    window.location.href = link
                                }}>{appInfo.appName}</div>
                                <div className="stores">
                                    <a href={appInfo.urlAndroid} target="_blank" rel="noopener noreferrer">
                                        <img alt={appInfo.appName + "Link google app"} src="/images/googlePlayIcon.png" />
                                    </a>
                                    <div style={{ width: '20px' }}></div>
                                    <a href={appInfo.urlIos} target="_blank" rel="noopener noreferrer">
                                        <img alt={appInfo.appName + "Link app store"} src="/images/appStoreIcon.png" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    }) : null}
                </div>
            </div>
        </Fade>
    </Modal>
}

export default SearchResultsModal