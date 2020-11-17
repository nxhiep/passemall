import { Button, CircularProgress, Container, Grid, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
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
import Footer from '../components/Footer';
import HeaderMenu from '../components/HeaderMenu';
import { Clock, FreeCircle, FreeIcon, LoginIcon, PenIcon, TotalQuestions } from '../components/Icons';
import SEO from '../components/SEO';
import WebAppInfo from '../models/WebAppInfo';
import { wrapper } from '../redux/store';
import { callApi } from '../services';
import { getNewDomain, isSuperApp, oldUser, scrollToTopic, setScrollDownAuto } from '../utils';
const HomeContent = dynamic(() => import("../container/home/HomeContent"), { ssr: false })
const SelectStatePopup = dynamic(() => import("../components/SelectStatePopup"), { ssr: false })
initializeReactGA();
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
        margin: "0 auto",
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
const Home = ({ appInfoState, url }) => {
    if (!appInfoState) {
        appInfoState = {};
        console.error("xxxxxxxxxxxxxxxxxxxxxxxx appInfo null");
    }
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    useEffect(() => {
        setScrollDownAuto("home")
        oldUser()
    }, [])
    const [selectedState, setSelectedState] = useState(true);
    const [openPopupChangeState, setOpenPopupChangeState] = useState(false);
    let webAppInfo = WebAppInfo.getAppInfo(appInfoState.id, appInfoState.name);
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
            <SEO appInfo={appInfoState} url={url}>
                <link rel="stylesheet" type="text/css" href="/styles/app.css" />
                <link rel="stylesheet" type="text/css" href="/styles/slick.css" />
                <link rel="stylesheet" type="text/css" href="/styles/slick-theme.css" />
                <link rel="stylesheet" type="text/css" href="/styles/home.css" />
            </SEO>
            <div className="body-panel app">
                <_Header
                    webAppInfo={webAppInfo}
                    appName={webAppInfo.appName}
                    color={myColor.buttonHeader}
                    isMobile={isMobile}
                    onStartTest={() => {
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
                    onStartTest={() => {
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
                <Feedback isMobile={isMobile} appId={appInfoState.id}></Feedback>
                <Footer bucket={appInfoState.bucket} color={myColor.colorFooter}></Footer>
            </div>
        </>
    )
}
const _Header = (props) => {
    let webAppInfo = props.webAppInfo ? props.webAppInfo : new WebAppInfo({ appName: props.appName });
    let onStartTest = props.onStartTest ? props.onStartTest : () => { }
    let { appId, bucket, appNameId } = props.appInfo ? props.appInfo : {};
    const classes = useStyles(props);
    const router = useRouter();
    appId = appId ? appId : -1;
    appNameId = appNameId ? appNameId : router.query.appNameId;
    const bucketUrl = (bucket ? bucket + "/" : "");
    let imgUrl = `/images/apps/${bucketUrl}header-background.png`;
    if (!isSuperApp(appId) || !bucket) {
        imgUrl = `/images/landing.jpg`;
    }
    return (
        <header style={{ position: "relative" }}>
            <img src={imgUrl} width="100%" style={{ visibility: "hidden", minHeight: "530px", objectFit: "cover" }} allt="image-header" />
            <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", background: '#1f1667' }} className="header-background color-dark">
                <img src={imgUrl} width="100%" style={{ minHeight: "530px", objectFit: "cover" }} alt="image-header-2" />
            </div>
            <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}>
                <HeaderMenu appInfo={props.appInfo} />
                <Container className="container-header">
                    <div style={{height: props.isMobile ? "70px" : "100px"}}></div>
                    <div className="header-title">
                        <h1 style={{ textTransform: "uppercase" }}>{webAppInfo.header.title}</h1>
                        <div style={{ fontWeight: "500", fontSize: '1.1em' }}>{webAppInfo.header.description}</div>
                        <Button
                            style={{ fontSize: '16px' }}
                            variant="contained"
                            className={classes.button} onClick={() => { onStartTest() }} style={{ display: props.isMobile ? "flex" : "inline-flex", marginLeft: props.isMobile ? "auto" : "", marginRight: props.isMobile ? "auto" : "" }} >START YOUR PRACTICE TEST</Button>
                    </div>
                </Container>
            </div>
        </header>
    )
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
    const bucketUrl = (props.bucket ? props.bucket + "/" : "");
    let srcImage1 = `/images/apps/${bucketUrl}infographic/infographic-1.png`;
    let srcImage2 = `/images/apps/${bucketUrl}infographic/infographic-2.png `;
    if (!isSuperApp(props.appId) || !props.bucket) {
        srcImage1 = '/images/apps/all/scientifically-proven1.jpg';
        srcImage2 = '/images/apps/all/scientifically-proven2.jpg';
    }
    let appName = props.appName ? props.appName : '';
    let webAppInfo = props.webAppInfo ? props.webAppInfo : new WebAppInfo({ appName: props.appName });
    return (
        <>
            <Container>
                <Grid container alignItems="stretch">
                    <Grid item xs={12} sm={4}>
                        <LazyLoad><img width="100%" src={srcImage1} alt="infographic-1" style={{ display: "block" }}></img></LazyLoad>
                    </Grid>
                    <Grid item xs={12} sm={1}></Grid>
                    <Grid item xs={12} sm={6}>
                        <h2>{webAppInfo.block3.title}</h2>
                        <p>{webAppInfo.block3.description}</p>
                        <Button className={classes.buttonStartTest} style={{ marginTop: '50px' }} onClick={() => { onStartTest(); }}>START YOUR PRACTICE TEST</Button>
                    </Grid>
                    <Grid item xs={12} sm={1}></Grid>
                </Grid>
            </Container>
            <div style={{ height: "80px", width: "100%" }}></div>
            <Container className="infographic-container">
                <h2>Exam experience, duplicated</h2>
                <p>Our {appName} Certification Exam Simulator is an effective way to practice for the actual exam.</p>
                <Grid container spacing={3} className="list-infographic-new" alignItems="stretch" justify="space-evenly">
                    <Grid item xs={12} sm={3}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ color: props.color }} className="titlex">{webAppInfo.numberInfo.number1}</div>
                            <p className="dot-2 descriptionx">There is no fee to take the {appName}</p>
                            <FreeCircle color={props.color} ></FreeCircle>
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
                                onClick={() => { onStartTest(); }} fullWidth={false}>START YOUR PRACTICE TEST</Button>
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
                        <LazyLoad><img src={srcImage2} alt="infographic-2" style={{ display: "block", width: "100%" }}></img></LazyLoad>
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
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780))
    return (
        <Container className="mobile-description-container" style={{ backgroundColor: color }}>
            <Grid container spacing={3}>
                <Grid item xs={8} sm={6}>
                    <div className="mobile-description-content">
                        <h3>Practice offline & on the go with the free {appName} app</h3>
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
                                <LazyLoad><img alt="Link google app" src="/images/googlePlayIcon.png" /></LazyLoad>
                            </a>
                            <div style={{ width: '20px' }}></div>
                            <a href={appInfoState.urlIos} target="_blank" rel="noopener noreferrer">
                                <LazyLoad><img src="/images/appStoreIcon.png" alt="Link app store" /></LazyLoad>
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
    const { appNameId } = context.params;
    const appInfoState = await callApi({ url: '/data?type=get_app_info&appNameId=' + appNameId, params: null, method: 'post' })
    let url = context.req.headers.referer;
    return {
        props: {
            appInfoState: appInfoState ? appInfoState : {},
            url: url ? url : '',
        }
    }
}

export default wrapper.withRedux(Home);