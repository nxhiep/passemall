import { Box, CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import Image from './Image';
const FixedContainer = (props) => {
    return (
        <React.Fragment>
            <Container fixed className={'fixed-container' + (props.className ? ' ' + props.className : '')} style={props.style} id="container">
                <Typography component="div">
                    {props.children}
                </Typography>
            </Container>
        </React.Fragment>
    );
}
const LoadingWidget = (props) => {
    let { color, width, height, fixed } = props;
    if (!color) {
        color = "var(--main-color)"
    }
    let style = { color: color, textAlign: "center", margin: "15px auto" };
    if (width) {
        style.width = width;
    }
    if (height) {
        style.height = height;
    }
    if (fixed) {
        return (
            <Grid container justify="center" alignItems="center"
                style={{
                    position: 'fixed', width: '100%',
                    height: '100%', zIndex: 9999, backgroundColor: 'white'
                }}>
                <div style={style}><CircularProgress style={{ color: 'var(--main-color)' }} /></div>
            </Grid>
        );
    }
    return (
        <Grid container justify="center" alignItems="center" style={style}><CircularProgress color="inherit" /></Grid>
    );
}

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

const LineProgress = ({ percent, size }) => {
    return (
        <Grid
            className="parent-line-progress-panel"
            container
            direction="row"
            alignItems="center"
        >
            <div className="line-progress-panel" style={{ 'height': size, 'width': 'calc(100% - 40px)' }}>
                <div style={{ 'width': percent + '%' }} className="content-line-progress-panel"></div>
            </div>
            <div style={{ 'width': '40px', 'textAlign': 'right' }}>
                {percent}%
                </div>
        </Grid>
    );
}
const Backdrop = (props) => (
    props.show ? <div className="Backdrop" onClick={props.click}></div> : null
);
const Modal = (props) => {
    return (
        <div>
            <Backdrop click={props.click} show={props.show}></Backdrop>
            <div
                className="Modal"
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? "1" : "0"
                }}>
                {props.children}
            </div>
        </div>
    )
}
const TitleBlock = ({ title = '', description = '', image = '' }) => {
    return (
        <div className="title-block">
            {image ? <Image src={image} /> : ''}
            <h2 className="title">{title}</h2>
            {description ? <p className="description" >{description}</p> : ''}
        </div >
    );
}

export { TitleBlock, FixedContainer, LoadingWidget, TabPanel, LineProgress, Modal };