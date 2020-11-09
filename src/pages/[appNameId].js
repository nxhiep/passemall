import { Button, CircularProgress, Container, Grid, IconButton, List, ListItem, ListItemText, makeStyles, SwipeableDrawer, useMediaQuery, useTheme } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MenuIcon from '@material-ui/icons/Menu';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Rating } from '@material-ui/lab';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import Slider from 'react-slick';
import { PersistGate } from 'redux-persist/integration/react';
import Footer from '../components/Footer';
import { Clock, FreeCircle, FreeIcon, LoginIcon, PenIcon, PeopleIcon, TotalQuestions } from '../components/Icons';
import WebAppInfo from '../models/WebAppInfo';
import configStore from '../redux/storeInHome';
import { callApi } from '../services';
import { isAppASVAB, isAppCDL, isAppCNA, isAppDMV, isAppGED, isAppMotorcycle, isSuperApp, oldUser, scrollToTopic, setScrollDownAuto } from '../utils';
const HomeContent = dynamic(() => import("../container/home/HomeContent"), { ssr: false })
const SelectStatePopup = dynamic(() => import("../components/SelectStatePopup"), { ssr: false })
initializeReactGA();
const store = configStore();
function initializeReactGA() {
    ReactGA.initialize('UA-167769768-1');
}
const useStyles = makeStyles({
    root: {
        marginTop: "40px",
        backgroundColor: props => props.color,
        borderRadius: "50px",
        textTransform: "none",
        padding: "12px 32px",
        fontSize: "18px",
        fontWeight: 600,
        color: props => props.color === "#FAFAFA" ? "#383838" : "#fff",
        "&:hover": {
            backgroundColor: props => props.color,
        }
    },
    button: {
        borderRadius: "40px",
        marginTop: "40px",
        padding: "8px 24px",
        fontWeight: "bold"
    }
})
const Home = ({ appInfoState }) => {
    if(!appInfoState){
        appInfoState = {};
        console.error("xxxxxxxxxxxxxxxxxxxxxxxx appInfo null");
    }
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    useEffect(() => {
        setScrollDownAuto("home")
        oldUser()
    }, [])
    const canonical = `https://passemall.com/${appInfoState.appNameId}`;

    let myColor = {
        colorFooter: "#E07730",
        mainColor: "#FA8E45",
        screenShotColor: "#FFA86C",
        buttonHeader: "#FA8E45" 
    };
    if(isAppGED(appInfoState.id)){
        myColor = {
            colorFooter: "#E07730",
            mainColor: "#FA8E45",
            screenShotColor: "#FFA86C",
            buttonHeader: "#FA8E45"
        };
    }
    if(isAppCNA(appInfoState.id)){
        myColor = {
            colorFooter: "#1C7BBE",
            mainColor: "#1C7BBE",
            screenShotColor: "#82AFD1",
            buttonHeader: "#1C7BBE"
        };
    }
    if(isAppASVAB(appInfoState.id)){
        myColor = {
            colorFooter: "#8A8862",
            mainColor: "#8A8862",
            screenShotColor: "#A6A480",
            buttonHeader: "#FAFAFA"
        };
    }
    if(isAppMotorcycle(appInfoState.id)){
        myColor = {
            colorFooter: "#4E63BD",
            mainColor: "#495EBF",
            screenShotColor: "#6679CC",
            buttonHeader: "#FAFAFA"
        };
    }
    if(isAppCDL(appInfoState.id)){
        myColor = {
            colorFooter: "#5B6695",
            mainColor: "#5B6695",
            screenShotColor: "#5B6695",
            buttonHeader: "#FAFAFA"
        };
    }
    if(isAppDMV(appInfoState.id)) {
        myColor = {
            colorFooter: "#4E63BD",
            mainColor: "#495EBF",
            screenShotColor: "#6679CC",
            buttonHeader: "#FAFAFA"
        };
    }
    const [selectedState, setSelectedState] = useState(true);
    const [openPopupChangeState, setOpenPopupChangeState] = useState(false);
    let webAppInfo = WebAppInfo.getAppInfo(appInfoState.id);
    return (
        <>
            <Head>
                <title>{appInfoState.title}</title>
                <link rel="icon" href={appInfoState.avatar} />
                <link rel="preconnect" href="https://webappapi-dot-micro-enigma-235001.appspot.com"></link>
                <link rel="preconnect" href="https://storage.googleapis.com" />
                <link rel="stylesheet" type="text/css" href="/styles/app.css" />
                <link rel="stylesheet" type="text/css" href="/styles/slick.css" />
                <link rel="stylesheet" type="text/css" href="/styles/slick-theme.css" />
                <link rel="stylesheet" type="text/css" href="/styles/home.css" />
                <link rel="canonical" href={canonical}></link>
                <meta property="og:type" content="website" />
                <meta name="title" content={appInfoState.title} />
                <meta name="description" content={appInfoState.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="keywords" content={appInfoState.keywords} />
            </Head>
            <div className="body-panel app">
                <Header 
                    webAppInfo={webAppInfo}
                    appName={appInfoState.name} 
                    color={myColor.buttonHeader} 
                    bucket={appInfoState.bucket} 
                    isMobile={isMobile} 
                    appId={appInfoState.id} 
                    appNameId={appInfoState.appNameId} 
                    onStartTest={() => {
                        if(!selectedState){
                            setTimeout(() => {
                                setOpenPopupChangeState(true);
                            }, 300)
                        }
                    }}
                />
                <Features 
                    webAppInfo={webAppInfo}
                    appName={appInfoState.name} 
                    color={myColor.mainColor} 
                />
                <ExamOverview webAppInfo={webAppInfo} />
                <ListInfoGraphic 
                    webAppInfo={webAppInfo}
                    appName={appInfoState.name} 
                    appId={appInfoState.id} 
                    color={myColor.mainColor} 
                    appInfoState={appInfoState} 
                    bucket={appInfoState.bucket}
                    onStartTest={() => {
                        if(!selectedState){
                            setTimeout(() => {
                                setOpenPopupChangeState(true);
                            }, 300)
                        }
                    }}
                />
                <ListTopic />
                <Provider store={store.store}>
                    <PersistGate persistor={store.persistor}>
                        <HomeContent
                            appInfo={appInfoState} appNameId={appInfoState.appNameId}
                            hasState={appInfoState && appInfoState.hasState}
                            onChangeState={() => {
                                setOpenPopupChangeState(true);
                            }}
                        />
                        {appInfoState && appInfoState.hasState ?
                            <SelectStatePopup
                                onLoaded={(selectedState) => {
                                    setSelectedState(selectedState)
                                }}
                                openDefault={false}
                                appInfo={appInfoState}
                                openPopupChangeState={openPopupChangeState}
                                onHidden={() => {
                                    setOpenPopupChangeState(false);
                                }} /> : ''}
                    </PersistGate>
                </Provider>
                <MobileDescription appInfoState={appInfoState} color={myColor.screenShotColor}></MobileDescription>
                <Feedback isMobile={isMobile} appId={appInfoState.id}></Feedback>
                <Footer bucket={appInfoState.bucket} color={myColor.colorFooter}></Footer>
            </div>
        </>
    )
}
const Header = (props) => {
    let webAppInfo = props.webAppInfo ? props.webAppInfo : new WebAppInfo({ appName: props.appName });
    let onStartTest = props.onStartTest ? props.onStartTest : () => {}
    let appId = props.appId ? props.appId : -1;
    const classes = useStyles(props);
    const [openDrawer, setOpenDrawer] = useState(false);
    const router = useRouter();
    const appNameId = props.appNameId ? props.appNameId : router.query.appNameId;
    const bucketUrl = (props.bucket ? props.bucket + "/" : "");
    let bannerUrl = `url(/images/apps/${bucketUrl}header-background.png) no-repeat`;
    if(!isSuperApp(appId)){
        bannerUrl = `url(/images/landing.svg)`;
    }
    console.log('appNameId', appNameId, 'webAppInfo', webAppInfo);
    return (
        <header style={{ background: bannerUrl, backgroundSize: "cover", backgroundPosition: isAppCNA(appId) ? "100px 100px" : (props.isMobile ? "left" : "center"), minHeight: (isAppDMV(appId) || isAppMotorcycle(appId)) ? "690px" : "630px" }}>
            <Container className="container-header">
                <Grid container alignItems="center" justify="space-between" className="header-tab-panel">
                    <div className="parent-logo">
                        <a href="/" className="logo">
                            <img src={isAppCNA(appId) ? "/images/logo-landing-2.png" : "/images/logo-landing.png"} style={props.isMobile ? { height: "50px", paddingTop: "16px" } : { height: "80px" }} alt="logo-landing"></img>
                        </a>
                    </div>
                    {props.isMobile ?
                        <div style={{ marginLeft: "auto" }}>
                            <IconButton onClick={() => setOpenDrawer(true)}>
                                <MenuIcon style={{ marginLeft: "auto", color: "#fff" }}></MenuIcon>
                            </IconButton>
                            <SwipeableDrawer
                                anchor="right"
                                open={openDrawer}
                                onClose={() => {
                                    setOpenDrawer(false);
                                }}
                                onOpen={() => setOpenDrawer(true)}
                            >
                                <div style={{ width: "200px" }}>
                                    <List>
                                        {["Learn", "Test", "Study guide"].map((text, index) => (
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
                                <a href="#" onClick={() => scrollToTopic()} style={isAppCNA(appId) ? { color: "#000" } : {}}>Learn</a>
                                <a href={"/" + appNameId + "/test"} style={isAppCNA(appId) ? { color: "#000" } : {}}>Test</a>
                                <a href="" style={isAppCNA(appId) ? { color: "#000" } : {}}>Study guide</a>
                            </div>

                        </div>
                    }
                </Grid>
                <div className="header-title">
                    <h1 style={isAppCNA(appId) ? { color: "#000" } : { color: "#fff" }}>{webAppInfo.header.title}</h1>
                    <p style={isAppCNA(appId) ? { color: "#2282C4" } : { color: "#fff" }}>{webAppInfo.header.description}</p>
                    <Button 
                        variant="contained"
                        className={classes.button} onClick={() => {scrollToTopic(); onStartTest()} }>START YOUR TEST</Button>
                </div>
            </Container>
        </header>
    )
}
const Features = ({ color, webAppInfo, appName }) => {
    if(!webAppInfo){
        webAppInfo = new WebAppInfo({ appName: appName });
    }
    const router = useRouter();
    return (
        <Container className="features-container">
            <div className="list-features">
                <div>
                    <FreeIcon color={color}></FreeIcon>
                    <h2>{webAppInfo.block1[0].title}</h2>
                    <p>{webAppInfo.block1[0].description}</p>
                </div>
                <div >
                    <LoginIcon color={color}></LoginIcon>
                    <h2>{webAppInfo.block1[1].title}</h2>
                    <p>{webAppInfo.block1[1].description}</p>
                </div>
                <div>
                    <PenIcon color={color}></PenIcon>
                    <h2>{webAppInfo.block1[2].title}</h2>
                    <p>{webAppInfo.block1[2].description}</p>
                </div>
            </div>
        </Container>
    )
}
const ExamOverview = ({ webAppInfo, appName }) => {
    if(!webAppInfo){
        webAppInfo = new WebAppInfo({ appName: appName });
    }
    return (
        <Container className="overview-container">
            <div className="overview-title">
                <h2>{webAppInfo.block2[0].title}</h2>
                <p>{webAppInfo.block2[0].description}</p>
            </div>
            <div className="list-overview">
                <div className="overview-item">
                    <h2>{webAppInfo.block2[1].title}</h2>
                    <p>{webAppInfo.block2[1].description}</p>
                </div>
                <div className="overview-item">
                    <h2>{webAppInfo.block2[2].title}</h2>
                    <p>{webAppInfo.block2[2].description}</p>
                </div>
                <div className="overview-item">
                    <h2>{webAppInfo.block2[3].title}</h2>
                    <p>{webAppInfo.block2[3].description}</p>
                </div>
            </div>

        </Container>
    )
}
const ListInfoGraphic = (props) => {
    let onStartTest = props.onStartTest ? props.onStartTest : () => {}
    const classes = useStyles(props);
    const bucketUrl = (props.bucket ? props.bucket + "/" : "");
    let srcImage1 = `/images/apps/${bucketUrl}infographic/infographic-1.png`;
    let srcImage2 = `/images/apps/${bucketUrl}infographic/infographic-2.png `;
    if(!isSuperApp(props.appId)){
        srcImage1 = '/images/apps/all/scientifically-proven1.jpg';
        srcImage2 = '/images/apps/all/scientifically-proven2.jpg';
    }
    let appName = props.appName ? props.appName : '';
    let webAppInfo = props.webAppInfo ? props.webAppInfo : new WebAppInfo({ appName: props.appName });
    return (
        <>
            <Container>
                <Grid container alignItems="stretch">
                    <Grid item xs={12} sm={5}>
                        <img width="100%" src={srcImage1} alt="infographic-1" style={{ display: "block" }}></img>
                    </Grid>
                    <Grid item xs={12} sm={1}></Grid>
                    <Grid item xs={12} sm={6}>
                        <h2>{webAppInfo.block3.title}</h2>
                        <p>{webAppInfo.block3.description}</p>
                        <Button className={classes.root} style={{marginTop: '50px'}} onClick={() => {scrollToTopic(); onStartTest(); }}>Start your test</Button>
                    </Grid>
                </Grid>
            </Container>
            <div style={{height: "100px", width: "100%"}}></div>
            <Container className="infographic-container">
                <h2>Exam experience, duplicated</h2>
                <p>Our {appName} Certification Exam Simulator is an effective way to practice for the actual exam.</p>
                <div className="list-infographic">
                    <div>
                        <div style={{ fontSize: "36px", color: props.color }}>{webAppInfo.numberInfo.number1}</div>
                        <p style={{ fontSize: "14px" }}>There is no fee to take the {appName}</p>
                        <FreeCircle color={props.color} ></FreeCircle>
                    </div>
                    <div>
                        <div style={{ fontSize: "24px", color: props.color }}>{webAppInfo.numberInfo.number2}</div>
                        <p style={{ fontSize: "14px", lineHeight: "17px" }}>Total questions</p>
                        <TotalQuestions color={props.color}></TotalQuestions>
                    </div>
                    <div>
                        <div style={{ fontSize: "36px", color: props.color }}>{webAppInfo.numberInfo.number3}</div>
                        <p style={{ fontSize: "14px" }}>Total time (minutes) to take the {appName}</p>
                        <Clock color={props.color}></Clock>
                    </div>

                </div>
            </Container>
            <Container>
                <Grid container alignItems="stretch">
                    <Grid item xs={12} sm={6}>
                        <h2>{webAppInfo.block5.title}</h2>
                        <p>{webAppInfo.block5.description}</p>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "200px" }}>
                        <Button className={classes.root} onClick={() =>{ scrollToTopic(); onStartTest(); }} fullWidth={false}> Start your test</Button>
                        <ArrowDownwardIcon style={
                            {
                                marginTop: "20px",
                                color: props.color ? props.color : "",
                                fontSize: "32px",
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto"
                            }
                        }></ArrowDownwardIcon>
                    </div>
                </Grid>
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={5}>
                    <img src={srcImage2} alt="infographic-2" style={{ display: "block", width: "100%" }}></img>
                </Grid>
                </Grid>
            </Container>
        </>
    )
}
const ListTopic = () => {
    return (
        <Container style={{ textAlign: "center", marginTop: "70px" }}>
            <h2 style={{ fontSize: "36px" }}>Start your TEAS Practice Test</h2>
        </Container>
    )
}
const MobileDescription = ({ appInfoState, color = "#FFA86C" }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780))
    return (
        <Container className="mobile-description-container" style={{ backgroundColor: color }}>
            <Grid container spacing={3}>
                <Grid item xs={8} sm={6}>
                    <div className="mobile-description-content">
                        <h3>Practice offline & on the go with the free GED Test Genie app</h3>
                        <p>Available for IOS and Android devices.</p>
                        <div className="app-info">
                            <img src={appInfoState.avatar} alt="app-image" style={{ borderRadius: "15px", height: "100px" }}></img>
                            <div className="app-info-right">
                                <h4>{appInfoState.appName}</h4>
                                <Rating value={5} style={isMobile ? { color: "#fff", fontSize: "16px" } : { color: "#fff", fontSize: "20px" }} readOnly ></Rating>
                            </div>
                        </div>
                        <div className="app-url">
                            <a href={appInfoState.urlAndroid} target="_blank" rel="noopener noreferrer">
                                <img alt="Link google app" src="/images/googlePlayIcon.png" />
                            </a>
                            <div style={{ width: '20px' }}></div>
                            <a href={appInfoState.urlIos} target="_blank" rel="noopener noreferrer">
                                <img src="/images/appStoreIcon.png" alt="Link app store" />
                            </a>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4} sm={6}>
                    <div className="mobile-description-image">
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}
const Feedback = ({ isMobile, appId }) => {
    const [loading, setLoading] = useState(true);
    const [feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        callApi({ url: '/data?type=get_user_rates&appId=' + appId, params: null, method: 'post' }).then((data) => {
            setLoading(false);
            setFeedbacks(data);
        });
    }, [appId])
    if(loading){
        return <CircularProgress />
    }
    if(feedbacks.length == 0){
        return null;
    }
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: "feedbacks-slider",
        autoPlay: true,
        autoplaySpeed: 1500,
        arrows: true
    };
    return <Container className="feedback-container"> 
        <div style={{position: 'relative'}}>
            <Slider {...settings}>
                {
                    feedbacks.map((feedback, index) => {
                        return <FeedbackItem
                            key={"XX-FeedbackItem-" + feedback.id + "-" + index}
                            content={feedback.content}
                            name={feedback.userName}
                            createTime={feedback.createDate}
                            index={index}   
                        />
                    })
                }
            </Slider>
        </div>
    </Container>
}

const FeedbackItem = ({ content, name, createTime, index }) => {
    return <div className="feedback-item">
        <div className="content">{content}</div>
        <div className="infos">
            <img className="avatar" src={index % 3 === 0 ? "/images/avatar-1.png" : (index % 3 === 1 ? "/images/avatar-2.png" : "/images/avatar-3.png")} alt="avatar"></img>
            <div className="name">{name}</div>
            <div className="date">{createTime}</div>
        </div>
    </div>
}

export async function getServerSideProps(context) {
    const { appNameId } = context.params;
    const appInfoState = await callApi({ url: '/data?type=get_app_info&appNameId=' + appNameId, params: null, method: 'post' })
    return {
        props: {
            appInfoState: appInfoState,
        }
    }
}
export default Home;