import { Container, Grid, IconButton, InputAdornment, List, ListItem, ListItemText, makeStyles, SwipeableDrawer, TextField, useMediaQuery, useTheme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Modal } from "../components/Widgets";
import { APP_NEW_DOMAIN, GA_ID } from '../config_app';
import FeedbackApps from '../container/landingpage/FeedbackApps';
import ListGreatApps from '../container/landingpage/ListGreatApps';
import StatictisApps from '../container/landingpage/StatictisApps';
import { callApi } from '../services';
import { oldUser, scrollDown, setScrollDownAuto } from '../utils';
import AppHome from './[appNameId]';

const useStyles = makeStyles({
    notchedOutline: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "white !important",
    },
    inputMarginDense: {
        color: "#fff",
    },
    flex: {
        display: "flex",
        flexDirection: "column"
    }
})

ReactGA.initialize(GA_ID);
const LandingPage = ({ appInfoState, url }) => {
    if(APP_NEW_DOMAIN){
        return <AppHome appInfoState={appInfoState} url={url} home={true} />
    }

    useEffect(() => {
        ReactGA.pageview('/homepage');
        setScrollDownAuto()
        oldUser();
    }, [])
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    let list = [];
    appInfoState.forEach(el => {
        let searchContent = el.description + el.appName
        list.push(searchContent)
    })
    const [listSearch, setListSearch] = useState([]);
    const showResult = (textInput) => {
        ReactGA.event({
            category: 'Search',
            action: 'Search app'
        })
        let result = []
        list.forEach((el, index) => {
            if (el.toLowerCase().replace(/ /g, "").search(textInput) > -1) {
                result.push(index);
            }

        })
        setListSearch(result)
    }
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    return (
        <>
            <SEO url={url ? url : 'http://passemall.com/'} manifest={true}>
                <link rel="stylesheet" type="text/css" href="/styles/slick.css" />
                <link rel="stylesheet" type="text/css" href="/styles/slick-theme.css" />
                <link rel="stylesheet" type="text/css" href="/styles/landing-page.css" />
            </SEO>
            <div className='body-panel landing-page'>
                <Modal show={open} click={handleClose}>
                    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                        {listSearch.length > 0 ? listSearch.map(el => {
                            let app = appInfoState[el] || {};
                            let link = "/" + app.appNameId
                            return (
                                <a href={link} key={app.appName} style={{ fontSize: "16px", marginTop: "36px", color: "#1155CC", display: "flex", marginLeft: "auto", marginRight: "auto", textDecoration: "none" }}>
                                    <div style={{ marginRight: "16px", display: "flex" }}>
                                        <img src={app.avatar} alt={app.appNameId} style={isMobile ? { display: "none" } : { height: "100px" }}></img>
                                        <div style={isMobile ? { textDecoration: "none" } : { marginLeft: "40px", textDecoration: "none" }}>{app.appName.toUpperCase()}
                                            <div style={{ fontSize: "14px", color: "#009933" }}>{link}</div>
                                            <div style={{ fontSize: "14px", color: "#000" }}>{app.description}</div>
                                        </div>
                                    </div>

                                </a>
                            )
                        }) : <div>No Results</div>}
                    </div>

                </Modal>
                <Header setOpen={setOpen} showResult={showResult} isMobile={isMobile} />
                <ListGreatApps appInfoState={appInfoState} />
                <StatictisApps />
                <FeedbackApps />
                <Footer color="#4E63BD"></Footer>
            </div>
        </>
    );
}
const Header = ({ setOpen, showResult, isMobile }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState("");
    const handleOnchage = (event) => {
        setSearchInput(event.target.value.toLowerCase());
    }
    const router = useRouter()
    const handlePress = (event) => {
        if (event.key === "Enter") {
            if (searchInput.length > 0) {
                showResult(searchInput);
                setOpen(true);
            }
        }
    }
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const [showInput, setShowInput] = useState(false);
    return (
        <header>
            <Container className="header">
                <div className="header-tab-panel">
                    <div className="parent-logo">
                        <a href="/" className="logo">
                            <img src="/images/logo-landing.png" style={isMobile ? { height: showInput ? "40px" : "45px" } : { height: "70px" }} alt="logo-landing"></img>
                        </a>
                    </div>
                    {isMobile ?
                        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                            {showInput ? <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Search"
                                onChange={(event) => handleOnchage(event)}
                                onKeyDown={(event) => handlePress(event)}
                                style={{ maxWidth: "85%" }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                disableFocusRipple={true}
                                                disableRipple={true}
                                                onClick={() => {
                                                    if (searchInput.length > 0) {
                                                        showResult(searchInput);
                                                        setOpen(true);
                                                    }
                                                }}
                                                style={{ padding: "12px 0px" }}>
                                                <SearchIcon style={{ color: "white" }} ></SearchIcon>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        inputMarginDense: classes.inputMarginDense
                                    }
                                }}
                            /> : <IconButton onClick={() => setShowInput(true)}>
                                    <SearchIcon style={{ color: "#fff" }} ></SearchIcon>
                                </IconButton>}
                            <IconButton onClick={() => setOpenDrawer(true)}>
                                <MenuIcon style={{ color: "#fff" }}></MenuIcon>
                            </IconButton>

                            <SwipeableDrawer
                                anchor="right"
                                open={openDrawer}
                                onClose={() => setOpenDrawer(false)}

                                onOpen={() => setOpenDrawer(true)}
                            >
                                <div style={{ width: "200px" }}>
                                    <List>
                                        <ListItem button>
                                            <a href="/" style={{ textDecoration: "none", color: "#4a4a4a", fontWeight: 400 }}>
                                                <ListItemText primary="HOME" />
                                            </a>
                                        </ListItem>
                                        <ListItem button>
                                            <a href="/blog" style={{ textDecoration: "none", color: "#4a4a4a", fontWeight: 400 }}>
                                                <ListItemText primary="BLOG" />
                                            </a>
                                        </ListItem>
                                    </List>
                                </div>
                            </SwipeableDrawer>
                        </div>
                        :
                        <div className="menu-appbar">
                            <div className="menu-nav">
                                <a href="/" >HOME</a>
                                <a href="/blog">BLOG</a>
                                <span onClick={() => scrollDown()}>SUPPORT</span>
                            </div>

                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Search"
                                onChange={(event) => handleOnchage(event)}
                                onKeyDown={(event) => handlePress(event)}
                                style={{ maxWidth: "200px" }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                disableFocusRipple={true}
                                                disableRipple={true}
                                                onClick={() => {
                                                    if (input.length > 0) {
                                                        showResult(input);
                                                        setOpen(true);
                                                    }
                                                }}>
                                                <SearchIcon style={{ color: "white" }} ></SearchIcon>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                        inputMarginDense: classes.inputMarginDense
                                    }
                                }}
                            />
                        </div>}
                </div>
            </Container>

            <div className="header-banner">
                <Container>
                    <Grid container alignItems="center" justify="space-between" className="header-media">
                        <Grid item sm={12} md={6} className="header-text-content">
                            <div style={{zIndex: '1', position: 'relative' }}>
                                <h1>Make your study great with our thousands of free practice questions</h1>
                                <p>You want to get 100% ready for your important day? You desire to pass your exam at your first try?
                                    You are wondering if you should pay a charge of money buying some practice materials?
                                    That’s why we are here to support you achieve the gate of success with our test prep solutions.</p>
                            </div>
                        </Grid>
                        {mdUp ? null : <Grid item xs={1} sm={3} md={false}></Grid>}
                        <Grid item xs={10} sm={6} md={6}>
                            <img style={smDown ? {} : {position: "relative", bottom: "-120px"}} alt='Make your study great with our thousands of free practice questions' width="100%" height="100%" src="/images/test3.png" />
                        </Grid>
                        <Grid item xs={1} sm={3} md={false}></Grid>
                    </Grid>
                </Container>
            </div>
        </header>
    );
}

export async function getServerSideProps(context) {
    if(APP_NEW_DOMAIN){
        const appNameId = APP_NEW_DOMAIN;
        const appInfoState = await callApi({ url: '/data?type=get_app_info&appNameId=' + appNameId, params: null, method: 'post' })
        let url = context.req.headers.referer;
        return {
            props: {
                appInfoState: appInfoState ? appInfoState : {},
                url: url ? url : '',
            }
        }
    } else {
        // console.log("context.req.headers", context.req.headers)
        const appInfoState = await callApi({ url: '/data?type=get_all_app_info', params: null, method: 'post' });
        let url = context.req.headers.referer;
        return {
            props: {
                appInfoState: appInfoState ? appInfoState : [],
                url: url ? url : ''
            }

        }
    }
}

export default LandingPage;
