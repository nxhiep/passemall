import { Button, CircularProgress, Container, Grid, makeStyles, SwipeableDrawer } from "@material-ui/core";
import { Computer as ComputerIcon, ExpandLess as ExpandLessIcon, Menu as MenuIcon } from '@material-ui/icons';
import fs from "fs";
import dynamic from "next/dynamic";
import path from "path";
import { useEffect, useState } from "react";
import ReactGA from 'react-ga';
import ReactHtmlParser from 'react-html-parser';
import LazyLoad from "react-lazyload";
import { Provider, useStore } from "react-redux";
import Slider from "react-slick";
import { PersistGate } from "redux-persist/lib/integration/react";
import FooterPanel from "../../components/new/FooterPanel";
import SEO from "../../components/SEO";
import { APP_NEW_DOMAIN } from "../../config_app";
import ErrorPage from "../../container/error";
import { callApi } from "../../services";
import { getHeaderBanner, getImageBlock3, getWebContext, isSuperApp, oldUser, scrollDown, scrollToTopic, setScrollDownAuto } from "../../utils";
import './app.css';
const HomeContent = dynamic(() => import("../../container/home/HomeContent"), { ssr: false })
const SelectStatePopup = dynamic(() => import("../../components/SelectStatePopup"), { ssr: false })

const useStyles = makeStyles({
    bgheader: props => {
        if(props.bannerUrl){
            return {
                background: "url("+props.bannerUrl+") no-repeat",
                backgroundSize: "cover"
            }
        }
        if(props.isMobile){
            return {
                background: "url(/images/new/banner-right.jpg) no-repeat",
                backgroundPosition: "top",
                backgroundSize: "cover",
            }
        }
        return {
            background: "url(/images/new/banner-left.jpg) no-repeat, url(/images/new/banner-right.jpg) no-repeat",
            backgroundPosition: "top left, top right",
            backgroundSize: "auto, auto 100%"
        }
    },
    headerTemp: props => {
        if(props.bannerUrl){
            return {
                backgroundColor: "rgb(0 0 0 / 0.6)"
            }
        }
        return {}
    },
    header: {
        height: "100px",
        backgroundColor: "transparent"
    },
    flex: {
        display: "flex",
        alignItems: "center"
    },
    headerMenu: props => {
        if(props.isMobile) {
            return {
                display: "block",
                padding: "10px",
                textDecoration: "none",
                color: "white",
                fontWeight: "500",
                cursor: "pointer",
                '&:hover': {
                    textDecoration: "underline"
                }
            }
        }
        return {
            padding: "10px 20px",
            textDecoration: "none",
            color: props.bannerUrl ? "white" : "#4e63bd",
            fontWeight: "500",
            cursor: "pointer",
            '&:hover': {
                textDecoration: "underline"
            }
        }
    },
    menuButton: {
        backgroundColor: "transparent",
        border: "none",
        outline: "none"
    },
});

const AppPage = ({ appInfo, url, isMobile }) => {
    // console.log("AppPage", appInfo, url, isMobile);
    if(!appInfo || Object.keys(appInfo).length === 0 && appInfo.constructor === Object){
        return <ErrorPage title="Not found app" />
    }
    useEffect(() => {
        ReactGA.pageview('/appInfo');
        setScrollDownAuto("home")
        oldUser()
    }, [])
    return <>
        <main style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <SEO url={url} appInfo={appInfo} />
            <LazyLoad height={1000}>
                <HeaderBannerPanel isMobile={isMobile} appInfo={appInfo} />
            </LazyLoad>
            <LazyLoad height={2000}>
                <BodyPanel appInfo={appInfo} isMobile={isMobile} />
                <FooterPanel isMobile={isMobile} />
            </LazyLoad>
        </main>
    </>
}

const HeaderBannerPanel = ({ isMobile, appInfo }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const handleOpenDrawer = (open) => setOpenDrawer(open)
    const superApp = isSuperApp(appInfo.id)
    const bannerUrl = superApp ? getHeaderBanner(appInfo.id, isMobile) : null
    const styles = useStyles({ isMobile, bannerUrl: bannerUrl });
    let appName = (appInfo.appName || '').toLowerCase().replace('practice', '').replace('test', '').toUpperCase();
    return <>
        <div className={styles.bgheader}>
            <div className={styles.headerTemp}>
                <header className={styles.header}>
                    <Container style={{height: "100%"}}>
                        <Grid container justify="space-between" alignItems="center" style={{height: "100%"}}>
                            <a href="/" style={{outline:'none'}}><img alt="ABC Elearning Logo" src={superApp ? "/images/logo-landing.png" : "/images/logo-landing-2.png"} width="240px" height="60px" /></a>
                            {isMobile ? <button className={styles.menuButton}
                            onClick={() => {
                                setOpenDrawer(true)
                            }}
                            >
                                <MenuIcon style={{ color: superApp && isMobile ? "white" : "#3f51b5" }} />
                            </button> : <div className={styles.flex}>
                                <HeaderMenu styles={styles} isMobile={isMobile} appInfo={appInfo} />
                            </div>}
                            { isMobile ? <SwipeableDrawer
                                className="header-menu-swipe"
                                anchor="right"
                                open={openDrawer}
                                onClose={() => {
                                    handleOpenDrawer(false);
                                }}
                                onOpen={() => handleOpenDrawer(true)}
                            >
                                <div style={{padding: "10px"}}>
                                    <a href="/"><img alt="ABC Elearning Logo" width="200px" height="48px" src="/images/logo-landing.png" /></a>
                                </div>
                                <HeaderMenu styles={styles} isMobile={isMobile} appInfo={appInfo} />
                            </SwipeableDrawer> : null }
                        </Grid>
                    </Container>
                </header>
                <Container>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item xs={12} sm={6} md={6}>
                            <h1 style={{
                                minHeight: isMobile ? "120px" : "0",
                                display: "flex",
                                alignItems: "center",
                                color: superApp ? "white" : "#1e3094"
                            }}>FREE {appName} PRACTICE TEST</h1>
                            <p style={{
                                minHeight: isMobile ? "120px" : "0",
                                display: "flex",
                                alignItems: "center",
                                color: superApp ? "white" : "#333",
                                fontSize: "1.1em",
                            }}>If you're nervous about the {appName} test for the first time, try our free {appName} practice test. Test your knowledge with +1000 {appName} practice questions!</p>
                            <div style={{height: "32px"}}></div>
                            <DownloadAppWidget appInfo={appInfo} />
                        </Grid>
                        {isMobile ? null : <Grid item xs={12} sm={5} md={5}>
                            <img width="100%" src="/images/test3.png" style={superApp ? {} : {
                                position: "relative",
                                bottom: "-60px"
                            }} />
                        </Grid>}
                        {/* <Grid item xs={12} sm={5} md={5} style={{textAlign: isMobile ? "center" : ""}}>
                            <img width="100%" src="/images/test3.png" style={{
                                position: "relative",
                                bottom: isMobile ? "0" : "-60px",
                            }} />
                        </Grid> */}
                    </Grid>
                </Container>
            </div>
        </div>
    </>
}

const DownloadAppWidget = ({ appInfo, center, darkMode }) => {
    return <div style={{display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: center ? "center" : "", marginBottom: "10px"}}>
        <Button variant="contained" color="inherit" style={{
            borderRadius: "40px",
            fontWeight: "bold",
            marginTop: "10px",
            backgroundColor: darkMode ? "white" : "#616E7D",
            color: darkMode ? "#616E7D" : "white",
        }} onClick={() => {
                scrollToTopic()
            }}>
            <ComputerIcon />
            <span style={{width: "10px"}}></span>
            <span>Start your test</span>
        </Button>
        <div style={{width: "32px"}}></div>
        <div className={"dropdown-app-panel " + (darkMode ? "darkmode" : "")}>
            <button variant="outlined" color="inherit">
                <span>Download on your mobile device</span>
                <span style={{width: "10px"}}></span>
                <ExpandLessIcon />
            </button>
            <div className="content">
                <a href={appInfo.urlAndroid} target="_blank" rel="noopener noreferrer" onClick={() => {
                    ReactGA.event({
                        category: 'Click Google Play',
                        action: 'Click Google Play App Home'
                    })
                }}>
                    <img alt="Link google app" src="/images/googlePlayIcon.png" />
                </a>
                <div style={{ width: '10px' }}></div>
                <a href={appInfo.urlIos} target="_blank" rel="noopener noreferrer" onClick={() => {
                    ReactGA.event({
                        category: 'Click App Store',
                        action: 'Click Google Play App Home'
                    })
                }}>
                    <img src="/images/appStoreIcon.png" alt="Link app store" />
                </a>
            </div>
        </div>
    </div>
}

const HeaderMenu = ({ styles, isMobile, appInfo }) => {
    return <>
        <div className={isMobile ? "" : styles.flex}>
            <span onClick={() => {
                scrollToTopic()
            }} className={styles.headerMenu}>LEARN</span>
            <a href={"/" + appInfo.appNameId + "/review"} className={styles.headerMenu}>REVIEW</a>
            <a href={"/blog?appId=" + appInfo.appNameId} className={styles.headerMenu}>BLOG</a>
            <span className={styles.headerMenu} onClick={() => {
                scrollDown()
            }}>SUPPORT</span>
        </div>
    </>
}

const BodyPanel = ({ isMobile, appInfo }) => {
    return <div>
        <div style={{height: isMobile ? "50px" : "100px"}}></div>
        <Block1 isMobile={isMobile} appInfo={appInfo} />
        <div style={{height: "50px"}}></div>
        <Block2 isMobile={isMobile} appInfo={appInfo} />
        <div style={{height: "50px"}}></div>
        <Block3 isMobile={isMobile} appInfo={appInfo} />
        <div style={{height: "50px"}}></div>
        <Block4 isMobile={isMobile} appInfo={appInfo} />
        <div style={{height: "50px"}}></div>
        <Block5 isMobile={isMobile} appInfo={appInfo} />
        <div style={{height: "50px"}}></div>
        <link rel="stylesheet" type="text/css" href="/styles/slick.css" />
        <Block6 isMobile={isMobile} appInfo={appInfo} />
        <div style={{height: "50px"}}></div>
    </div>
}

const MyTitle = ({ title, isMobile, center }) => {
    return <h1 style={{ textAlign: center === false ? "" : "center", fontSize: isMobile ? "" : "1.8em", color: "black" }}>{title}</h1>
}

const Block1 = ({ isMobile, appInfo }) => {
    let appName = (appInfo.appName || '').toLowerCase().replace('practice', '').replace('test', '').toUpperCase();
    return <section>
        <Container>
            <Grid container spacing={isMobile ? 2 : 3}>
                <Block1Item 
                    icon="icon-block1-1"
                    title={"All " + appName + " practice test free"}
                    desciption="1000+ FREE practice questions and various simulator tests to explore. All you need to get your certificate is available here."
                />
                <Block1Item 
                    icon="icon-block1-2"
                    title={"No Sign up or Login Required"}
                    desciption="All your progress is saved without an account even if you close your browser. No usernames, no passwords - just merely ASVAB training."
                />
                <Block1Item 
                    icon="icon-block1-3"
                    title={"Exam simulator All based on real tests"}
                    desciption="Same number of questions, same time limits, same structure. The exam simulators let you familiarize with test format and get 100% ready for your big day!"
                />
                <Block1Item 
                    icon="icon-block1-4"
                    title={"Detailed explanations"}
                    desciption="Let you know why an option was correct and the others were not. Well understand always helps you remember better!!!"
                />
                <Block1Item 
                    icon="icon-block1-5"
                    title={"Gamization"}
                    desciption="The learning process was divided into small milestones. Let's make your studying interesting like playing games."
                />
                <Block1Item 
                    icon="icon-block1-6 "
                    title={"Study on any device"}
                    desciption="You can browser to study on any device from your phone to tablet and PC. Keep stay any time to get more knowledge!"
                />
            </Grid>
        </Container>
    </section>
}

const Block1Item = ({ icon, title, desciption }) => {
    return <Grid item xs={12} sm={6} md={4}>
        <div style={{ padding: "20px", textAlign:"center" }}>
            <div className={icon}></div>
            <p><strong>{title}</strong></p>
            <p>{desciption}</p>
        </div>
    </Grid>
}

const Block2 = ({appInfo}) => {
    let appName = (appInfo.appName || '').toLowerCase().replace('practice', '').replace('test', '').toUpperCase();
    const store = useStore((state) => state);
    const [openPopupChangeState, setOpenPopupChangeState] = useState(false);
    const [selectedState, setSelectedState] = useState(true);
    return <section>
        <MyTitle title={"Start your "+ appName +" Practice Test"} />

        <Provider store={store}>
            <PersistGate persistor={store.__persistor}>
                <HomeContent
                    appInfo={appInfo} appNameId={appInfo.appNameId}
                    hasState={appInfo && appInfo.hasState}
                    onChangeState={() => {
                        setOpenPopupChangeState(true);
                    }}
                />
                {appInfo && appInfo.hasState ?
                    <SelectStatePopup
                        onLoaded={(selectedState) => {
                            setSelectedState(selectedState)
                        }}
                        openDefault={false}
                        appInfo={appInfo}
                        openPopupChangeState={openPopupChangeState}
                        onHidden={() => {
                            setOpenPopupChangeState(false);
                        }} /> : ''}
            </PersistGate>
        </Provider>
    </section> 
}

const Block3 = ({ isMobile, appInfo }) => {
    let images = getImageBlock3(appInfo.id ? appInfo.id : -1)
    console.log("appInfo", appInfo)
    return <section>
        <Container>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={6}>
                    <img width="90%" src={images[0]} style={isMobile ? {margin: "0 auto", display: "block"} : {}} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    {/* <MyTitle isMobile={isMobile} title="Scientifically proven" center={false} /> */}
                    <div className="contentxxx">{ReactHtmlParser(appInfo.description)}</div>
                    <Button variant="contained" color="inherit" style={{
                        borderRadius: "40px",
                        fontWeight: "bold",
                        marginTop: "10px",
                        backgroundColor: "#616E7D",
                        color: "white",
                    }} onClick={() => {
                        scrollToTopic()
                    }}>
                        <ComputerIcon />
                        <span style={{width: "10px"}}></span>
                        <span>Start your test</span>
                    </Button>
                </Grid>
            </Grid>
        </Container>
    </section>
}

const Block4 = ({ isMobile, appInfo }) => {
    return <section style={{
        background: "url(/images/new/bg-block4.jpg) no-repeat",
        backgroundSize: "cover"
    }}>
        <Container style={{
            minHeight: "350px", 
            color: "white", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            flexDirection: "column",
            alignContent: "center"
        }}>
            <h1>Download the app and start studying for free today</h1>
            <DownloadAppWidget appInfo={appInfo} center={true} darkMode={true} />
            <div style={{height: "10px"}}></div>
        </Container>
    </section>
}

const Block5 = ({isMobile, appInfo}) => {
    return <section>
        <Container>
            <MyTitle isMobile={isMobile} title="Experience our app with full of convenient features" />
            <div style={{height: "40px"}}></div>
            <Grid container spacing={3}>
                <Block1Item 
                    icon="icon-block5-1"
                    title={"No Internet Required"}
                    desciption="Study anywhere at anytime without Internet connection."
                />
                <Block1Item 
                    icon="icon-block5-2"
                    title={"Study Plan"}
                    desciption="Just enter your test date, a study plan will be setup for you. A clear schedule brings more value than you can imagine."
                />
                <Block1Item 
                    icon="icon-block5-3"
                    title={"3 Interesting Test Modes"}
                    desciption="3 different test modes with increased difficult level let you experience the test in very exciting way."
                />
                <Block1Item 
                    icon="icon-block5-4"
                    title={"Test Bank"}
                    desciption="3 features: Weak/Medium/Strong questions help you clearly determine which area you should work harder on."
                />
                <Block1Item 
                    icon="icon-block5-5"
                    title={"Dark mode"}
                    desciption="Experience dark theme to ease your eyes and it's just... beautiful!"
                />
                <Block1Item 
                    icon="icon-block5-6 "
                    title={"Study Reminder"}
                    desciption="Customize your study reminder to receive notification at any time you want"
                />
            </Grid>
        </Container>
    </section>
}

const Block6 = ({ isMobile, appInfo }) => {
    const [loading, setLoading] = useState(true);
    const [feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        callApi({ url: '/data?type=get_user_rates&appId=' + appInfo.id, params: null, method: 'post' }).then((data) => {
            setLoading(false);
            setFeedbacks(data);
        });
    }, [appInfo.id])
    if (loading) {
        return <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <CircularProgress />
        </div>
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
    return <section>
        <Container className="feedback-container">
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
    </section>
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

export async function getServerSideProps(context) {
    const appNameId = APP_NEW_DOMAIN ? APP_NEW_DOMAIN : context.params.appNameId;
    const directoryAppInfos = path.join(process.cwd(), 'src/data/appInfos.json')
    let appInfosData = fs.readFileSync(directoryAppInfos);
    let mapAppInfos = JSON.parse(appInfosData)
    const appInfo = mapAppInfos[appNameId] || {};
    return getWebContext(context, {
        appInfo
    });
}

export default AppPage;