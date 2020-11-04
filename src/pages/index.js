import { Container, Grid, IconButton, InputAdornment, List, ListItem, ListItemText, makeStyles, SwipeableDrawer, TextField, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FeedbackApps from '../container/landingpage/FeedbackApps';
import ListGreatApps from '../container/landingpage/ListGreatApps';
import StatictisApps from '../container/landingpage/StatictisApps';
import SearchIcon from '@material-ui/icons/Search';
import ReactGA from 'react-ga';
import fs from 'fs';
import path from 'path'
import Head from 'next/head';
import MenuIcon from '@material-ui/icons/Menu';
import Footer from '../components/Footer';
import { oldUser, scrollDown, setScrollDownAuto } from '../utils';
import { useRouter } from 'next/router';
import { Modal } from "../components/Widgets";
import { callApi } from '../services';
function initializeReactGA() {
    ReactGA.initialize('UA-167769768-1');
}
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
initializeReactGA();
const LandingPage = ({ appInfoState, userRateState }) => {
    const description = "With thousands of our FREE practice questions, we are here to help you achieve your gate of success with our test prep solutions."
    const title = "ABC Learning"
    useEffect(() => {
        // setScrollDownAuto()
        oldUser();
        ReactGA.pageview('/homepage');
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
            <Head>
                <title>ABC Learning</title>
                <link rel="icon" href="images/logo.svg" />
                <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;500;900&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" type="text/css" href="/styles/slick.css" />
                <link rel="stylesheet" type="text/css" href="/styles/slick-theme.css" />
                <link rel="stylesheet" type="text/css" href="/styles/landing-page.css" />
                <link rel="preconnect" href="https://storage.googleapis.com" />
                <link rel="canonical" href="https://passemall.com"></link>
                <meta property="og:type" content="website" />
                <meta name="theme-color" content="#000000" />
                <meta name="title" content={title} />
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="keywords" content="Abc e-learning, abc elearning, study online,practice test, practice question,exam prepare,asvab,teas exam,cdl test,cdl practice,cissp exam,cissp practice,accuplacer,comptia practice test,comptia A+,compTIA Network,comptia security,dmv,dmv practice test,driving theory,driving theory UK,G1 test,GED,hesi,hesi A2,motorcycle permit,pmp,pmp exam,ptcb,ptce,real estate exam,practice app,practice test onl,free practice test,free practice questions,free practice app" />
            </Head>

            <div className='body-panel landing-page'>
                <Modal show={open} click={handleClose}>
                    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                        {listSearch.length > 0 ? listSearch.map(el => {
                            let link = "http://localhost:3000/" + appInfoState[el].appNameId
                            return (
                                <a href={link} key={appInfoState[el].appName} style={{ fontSize: "16px", marginTop: "36px", color: "#1155CC", display: "flex", marginLeft: "auto", marginRight: "auto", textDecoration: "none" }}>
                                    <div style={{ marginRight: "16px", display: "flex" }}>
                                        <img src={appInfoState[el].avatar} alt={appInfoState[el].appNameId} style={isMobile ? { display: "none" } : { height: "100px" }}></img>
                                        <div style={isMobile ? { textDecoration: "none" } : { marginLeft: "40px", textDecoration: "none" }}>{appInfoState[el].appName.toUpperCase()}
                                            <div style={{ fontSize: "14px", color: "#009933" }}>{link}</div>
                                            <div style={{ fontSize: "14px", color: "#000" }}>{appInfoState[el].description}</div>
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
                <FeedbackApps userRateState={userRateState} />
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
    const [showInput, setShowInput] = useState(false);
    return (
        <header>
            <Container className="header">
                <div className="header-tab-panel">
                    <div className="parent-logo">
                        <a href="/" className="logo">
                            <img src="/images/logo-landing.png" style={isMobile ? { height: showInput ? "40px" : "50px" } : { height: "80px" }} alt="logo-landing"></img>
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
                                        {["Home", "Blog", "Support"].map((text, index) => (
                                            <ListItem button key={text}>
                                                <a href={index === 0 ? "/" : (index === 1 ? "/blog" : "")} style={{ textDecoration: "none", color: "#4a4a4a", fontWeight: 400 }}>
                                                    <ListItemText primary={text} />
                                                </a>
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </SwipeableDrawer>
                        </div>
                        :
                        <div className="menu-appbar">
                            <div className="menu-nav">
                                <a href="/" >HOME</a>
                                <a href="/blog">BLOG</a>
                                <a href="" onClick={() => scrollDown()}>SUPPORT</a>
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
            <Grid container alignItems="center" justify="space-between" className="header-media">
                <Grid item sm={isMobile ? 12 : 6} className="header-content">
                    <div className="xxx">
                        <h1>Make your study great with our thousands of free practice questions</h1>
                        <p>You want to get 100% ready for your important day? You desire to pass your exam at your first try?
                        You are wondering if you should pay a charge of money buying some practice materials?
                            That’s why we are here to support you achieve the gate of success with our test prep solutions.</p>
                    </div>
                </Grid>
                <Grid item sm={isMobile ? 12 : 6} className="header-image-content">
                    <img alt='Make your study great with our thousands of free practice questions' width="100%" height="100%" src="/images/test3.png" />
                </Grid>
            </Grid>
        </header >
    );
}
export async function getStaticProps(context) {
    const appInfoState = await callApi({ url: '/data?type=get_all_app_info', params: null, method: 'post' });
    const directoryUserRate = path.join(process.cwd(), 'src/data/userRatePerfect.json')
    let userRateFile = fs.readFileSync(directoryUserRate);
    const useRateState = Object.values(JSON.parse(userRateFile));
    return {
        props: {
            appInfoState: appInfoState,
            userRateState: useRateState
        }

    }
}

export default LandingPage;
