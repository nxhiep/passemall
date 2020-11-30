import { Button, CircularProgress, Container, Grid, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { CreditCard as CreditCardIcon } from '@material-ui/icons';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Rating } from '@material-ui/lab';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import LazyLoad from 'react-lazyload';
import { Provider, useStore } from 'react-redux';
import Slider from 'react-slick';
import { PersistGate } from 'redux-persist/integration/react';
import Footer from '../../components/Footer';
import HeaderBanner from '../../components/HeaderBanner';
import { Clock, FreeCircle, FreeIcon, LoginIcon, PenIcon, TotalQuestions } from '../../components/Icons';
import SEO from '../../components/SEO';
import { APP_NEW_DOMAIN, GA_ID } from '../../config_app';
import WebAppInfo from '../../models/WebAppInfo';
import { wrapper } from '../../redux/store';
import { callApi } from '../../services';
import { getHeaderBanner, getImageBlock3, getNewDomain, isSuperApp, oldUser, scrollToTopic, setScrollDownAuto } from '../../utils';
import './app.css';
import './home.css';
const HomeContent = dynamic(() => import("../../container/home/HomeContent"), { ssr: false })
const SelectStatePopup = dynamic(() => import("../../components/SelectStatePopup"), { ssr: false })
const GameChildScreen = dynamic(() => import("./[screenChild]"), { ssr: false })

const useStyles = makeStyles({
    root: {
        marginTop: "40px",
        backgroundColor: props => props.color,
        borderRadius: "50px",
        textTransform: "none",
        padding: "12px 32px",
        fontSize: "18px",
        fontWeight: 600,
        margin: "0 auto",
        color: props => props.color === "#FAFAFA" ? "#383838" : "#fff",
        "&:hover": {
            backgroundColor: props => props.color,
        }
    },
    button: {
        borderRadius: "40px",
        marginTop: "50px",
        marginBottom: "50px",
        padding: "8px 24px",
        fontWeight: "bold",
        fontSize: "16px",
        marginLeft: props => props.isMobile ? "auto" : "",
        marginRight: props => props.isMobile ? "auto" : "",
        display: props => props.isMobile ? "flex" : "inline-flex",
    },
    buttonStartTest: {
        backgroundColor: props => props.color, 
        color: "white", 
        padding: "10px 30px", 
        borderRadius: "50px", 
        fontWeight: "600",
        fontSize: "16px",
        "&:hover, &:focus": {
            backgroundColor: "rgb(31 63 197)"
        }
    }
})

ReactGA.initialize(GA_ID);

const AppHome = ({ appInfoState, url, home }) => {
    if (!appInfoState) {
        appInfoState = {};
        console.error("xxxxxxxxxxxxxxxxxxxxxxxx appInfo null");
        return <h1>App Not Existed</h1>
    }
    // console.log("xxxxx appInfoState", appInfoState)
    if(APP_NEW_DOMAIN && home !== true){
        return <GameChildScreen appInfoState={appInfoState} url={url} />
    }
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    useEffect(() => {
        ReactGA.pageview('/appInfo');
        setScrollDownAuto("home")
        oldUser()
    }, [])
    const [selectedState, setSelectedState] = useState(true);
    const [openPopupChangeState, setOpenPopupChangeState] = useState(false);
    let webAppInfo = WebAppInfo.getAppInfo(appInfoState.id, appInfoState.appName);
    let myColor = webAppInfo.mainColor;
    // console.log("appInfoState.bucket", appInfoState.bucket)
    if (!url) {
        let domain = getNewDomain(appInfoState.id);
        if (domain) {
            url = domain;
        } else {
            url = 'http://passemall.com/' + appInfoState.appNameId;
        }
    }
    const store = useStore((state) => state);
    return (
        <>
            <SEO appInfo={appInfoState} url={url} />
            <div className={"body-panel app " + (isSuperApp(appInfoState.id) ? "" : "other")}>
                <_Header
                    webAppInfo={webAppInfo}
                    color={myColor.buttonHeader}
                    isMobile={isMobile}
                    onStartTest={() => {
                        ReactGA.event({
                            category: 'Click Start Test',
                            action: 'Click Start Test 1'
                        })
                        scrollToTopic()
                    }}
                    appInfo={appInfoState}
                />
                <Features
                    webAppInfo={webAppInfo}
                    appName={webAppInfo.appName}
                    color={myColor.mainColor}
                />
                <ExamOverview webAppInfo={webAppInfo} isMobile={isMobile} />
                <ListInfoGraphic
                    isMobile={isMobile}
                    webAppInfo={webAppInfo}
                    appName={webAppInfo.appName}
                    appId={appInfoState.id}
                    color={myColor.mainColor}
                    appInfoState={appInfoState}
                    bucket={appInfoState.bucket}
                    onStartTest={(index) => {
                        ReactGA.event({
                            category: 'Click Start Test',
                            action: 'Click Start Test ' + index
                        })
                        scrollToTopic()
                    }}
                />
                <ListTopic />
                <Provider store={store}>
                    <PersistGate persistor={store.__persistor}>
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
                <MobileDescription
                    appInfoState={appInfoState}
                    color={myColor.screenShotColor}
                    appName={webAppInfo.appName}
                />
                <LazyLoad>
                    <link rel="stylesheet" type="text/css" href="/styles/slick.css" />
                </LazyLoad>
                <Feedback isMobile={isMobile} appId={appInfoState.id}></Feedback>
                <Footer bucket={appInfoState.bucket} color={myColor.colorFooter}></Footer>
            </div>
        </>
    )
}
const _Header = (props) => {
    let { id, appNameId, appName } = props.appInfo ? props.appInfo : {};
    const router = useRouter();
    appNameId = appNameId ? appNameId : router.query.appNameId;
    let appId = id ? id : -1;
    const classes = useStyles(props);
    let webAppInfo = props.webAppInfo ? props.webAppInfo : new WebAppInfo({ appName: appName });
    let onStartTest = props.onStartTest ? props.onStartTest : () => { }
    if(!isSuperApp(appId)){
        return <HeaderBanner 
            title={webAppInfo.header.title}
            description={webAppInfo.header.description}
            blogLink={"/blog" + (appId ? "?appId=" + appId : '')}
            reviewLink={"/" + appNameId + "/review"}
            buttonPractice={
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.button} 
                    onClick={() => { onStartTest() }}>START YOUR PRACTICE TEST</Button>
            }
        />
    }
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 800));
    const banner = getHeaderBanner(appId);
    return <div className="bg-new"
        style={{
            backgroundImage: "url("+banner+")",
            backgroundSize: "cover",
            minHeight: isMobile ? "" : "500px",
            height: "100%",
            backgroundPosition: "top center"
        }}
    >
        <HeaderBanner 
            appInfo={props.appInfo}
            title={webAppInfo.header.title}
            description={webAppInfo.header.description}
            blogLink={"/blog" + (appId ? "?appId=" + appId : '')}
            reviewLink={"/" + appNameId + "/review"}
            buttonPractice={
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.button} 
                    onClick={() => { onStartTest() }}>START YOUR PRACTICE TEST</Button>
            }
        />
    </div>
}

const Features = ({ color, webAppInfo, appName }) => {
    if (!webAppInfo) {
        webAppInfo = new WebAppInfo({ appName: appName });
    }
    return (
        <Container className="features-container">
            <div className="list-features">
                <div >
                    <FreeIcon width="80px" height="80px" color={color}></FreeIcon>
                    <h2 className="dot-2">{webAppInfo.block1[0].title}</h2>
                    <p>{webAppInfo.block1[0].description}</p>
                </div>
                <div >
                    <LoginIcon width="80px" height="80px" color={color}></LoginIcon>
                    <h2 className="dot-2">{webAppInfo.block1[1].title}</h2>
                    <p>{webAppInfo.block1[1].description}</p>
                </div>
                <div>
                    <PenIcon width="80px" height="80px" color={color}></PenIcon>
                    <h2 className="dot-2">{webAppInfo.block1[2].title}</h2>
                    <p>{webAppInfo.block1[2].description}</p>
                </div>
            </div>
        </Container>
    )
}
const ExamOverview = ({ webAppInfo, appName, isMobile }) => {
    if (!webAppInfo) {
        webAppInfo = new WebAppInfo({ appName: appName });
    }
    return (
        <Container className="overview-container">
            <div className="overview-title">
                <h2 style={{ textAlign: "center" }}>{webAppInfo.block2[0].title}</h2>
                <p style={{ textAlign: isMobile ? "left" : "center" }}>{webAppInfo.block2[0].description}</p>
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
    let onStartTest = props.onStartTest ? props.onStartTest : () => { }
    const classes = useStyles(props);
    let images = getImageBlock3(props.appId ? props.appId : -1)
    let appName = props.appName ? props.appName : '';
    let webAppInfo = props.webAppInfo ? props.webAppInfo : new WebAppInfo({ appName: props.appName });
    return (
        <>
            <Container>
                <Grid container alignItems="stretch">
                    <Grid item xs={12} sm={4}>
                        <LazyLoad><img width="100%" src={images[0]} alt="infographic-1" style={{ display: "block" }}></img></LazyLoad>
                    </Grid>
                    <Grid item xs={12} sm={1}></Grid>
                    <Grid item xs={12} sm={6}>
                        <h2>{webAppInfo.block3.title}</h2>
                        <p>{webAppInfo.block3.description}</p>
                        <Button className={classes.buttonStartTest} style={{ marginTop: '50px' }} onClick={() => { onStartTest(2); }}>START YOUR PRACTICE TEST</Button>
                    </Grid>
                    <Grid item xs={12} sm={1}></Grid>
                </Grid>
            </Container>
            <div style={{ height: "80px", width: "100%" }}></div>
            <Container className="infographic-container">
                <h2>{webAppInfo.block4[0].title}</h2>
                <p>{webAppInfo.block4[0].description}</p>
                <Grid container spacing={3} className="list-infographic-new" alignItems="stretch" justify="space-evenly">
                    <Grid item xs={12} sm={3}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ color: props.color }} className="titlex">{webAppInfo.numberInfo.number1}</div>
                            <p className="dot-2 descriptionx">{webAppInfo.block4[1].title}</p>
                            {webAppInfo.numberInfo.free ? <FreeCircle color={props.color} ></FreeCircle> 
                                : <div style={{ 
                                    backgroundColor: "#5a6695",
                                    color: "white",
                                    marginTop: "auto",
                                    marginBottom: "16px",
                                    width: "78px",
                                    height: "78px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "100%"
                                }}><CreditCardIcon color="inherit" fontSize="large" /></div>}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ color: props.color }} className="titlex">{webAppInfo.numberInfo.number2}</div>
                            <p className="dot-2 descriptionx">Total questions</p>
                            <TotalQuestions color={props.color}></TotalQuestions>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ color: props.color }} className="titlex">{webAppInfo.numberInfo.number3}</div>
                            <p className="dot-2 descriptionx">Total time (minutes) to take the {appName}</p>
                            <Clock color={props.color}></Clock>
                        </div>
                    </Grid>

                </Grid>
            </Container>
            <Container>
                <Grid container alignItems="stretch">
                    <Grid item xs={12} sm={5}>
                        <h2>{webAppInfo.block5.title}</h2>
                        <p>{webAppInfo.block5.description}</p>
                        <div style={{ display: "inline-flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", marginTop: "20px" }}>
                            <Button 
                                className={classes.buttonStartTest}
                                style={{ display: props.isMobile ? "none" : "block" }} 
                                onClick={() => { onStartTest(3); }} fullWidth={false}>START YOUR PRACTICE TEST</Button>
                            <ArrowDownwardIcon style={
                                {
                                    marginTop: "20px",
                                    color: props.color ? props.color : "",
                                    fontSize: "32px",
                                    display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    cursor: "pointer"
                                }
                            }></ArrowDownwardIcon>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                        <LazyLoad><img src={images[1]} alt="infographic-2" style={{ display: "block", width: "100%" }}></img></LazyLoad>
                    </Grid>
                    <Grid item xs={12} sm={1}></Grid>
                </Grid>
            </Container>
        </>
    )
}
const ListTopic = () => {
    return (
        <Container style={{ textAlign: "center", marginTop: "40px" }}>
            <h2 style={{ fontSize: "36px" }}>Start your Practice Test</h2>
        </Container>
    )
}
const MobileDescription = ({ appInfoState, color = "#FFA86C", appName }) => {
    if (!appName) {
        appName = ''
    }
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(800));
    console.log("isMobile", isMobile)
    return <Container className="stores-panel">
        <Grid container style={{ backgroundColor: color, borderRadius: isMobile ? "20px" : "" }} className="x-content">
            <Grid item xs={12} sm={isMobile ? 12 : 6}>
            <div className="mobile-description-content" style={isMobile ? {
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
            } : {}}>
                <h1>Practice offline & on the go with the free {appName} app</h1>
                <p style={{fontSize: "18px", opacity: "0.8"}}>Available for IOS and Android devices.</p>
                <div className="app-info">
                    <img src={appInfoState.avatar} alt="app-image" style={{ borderRadius: "15px", height: "100px" }}></img>
                    <div className="app-info-right">
                        <h2>{appInfoState.appName}</h2>
                        <Rating value={5} readOnly ></Rating>
                    </div>
                </div>
                <div className="app-url">
                    <LazyLoad>
                    <a href={appInfoState.urlAndroid} target="_blank" rel="noopener noreferrer" onClick={() => {
                        ReactGA.event({
                            category: 'Click Google Play',
                            action: 'Click Google Play App Home'
                        })
                    }}>
                        <img alt="Link google app" src="/images/googlePlayIcon.png" />
                    </a>
                    <div style={{ width: '20px' }}></div>
                    <a href={appInfoState.urlIos} target="_blank" rel="noopener noreferrer" onClick={() => {
                        ReactGA.event({
                            category: 'Click App Store',
                            action: 'Click Google Play App Home'
                        })
                    }}>
                        <img src="/images/appStoreIcon.png" alt="Link app store" />
                    </a>
                    </LazyLoad>
                </div>
            </div>
            </Grid>
            {!isMobile ? <Grid item xs={12} sm={6} className="stores-right-panel">
                <LazyLoad><img width="100%" src="/images/screenshot.png" /></LazyLoad>
            </Grid> : null}
        </Grid>
    </Container>
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
    if (loading) {
        return <CircularProgress />
    }
    if (feedbacks.length == 0) {
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
        <div style={{ position: 'relative' }}>
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
            <LazyLoad><img className="avatar" src={index % 3 === 0 ? "/images/avatar-1.png" : (index % 3 === 1 ? "/images/avatar-2.png" : "/images/avatar-3.png")} alt="avatar"></img></LazyLoad>
            <div className="name">{name}</div>
        </div>
    </div>
}

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
export async function getServerSideProps(context) {
    const appNameId = APP_NEW_DOMAIN ? APP_NEW_DOMAIN : context.params.appNameId;
    const appInfoState = await callApi({ url: '/data?type=get_app_info&appNameId=' + appNameId, params: null, method: 'post' })
    let url = context.req.headers.referer;
    return {
        props: {
            appInfoState: appInfoState ? appInfoState : {},
            url: url ? url : '',
        }
    }
}

export default wrapper.withRedux(AppHome);