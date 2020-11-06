import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import ReactGA from 'react-ga';
import { Button, Container, Grid, IconButton, List, ListItem, ListItemText, makeStyles, SwipeableDrawer, useMediaQuery, useTheme } from '@material-ui/core';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const HomeContent = dynamic(() => import("../container/home/HomeContent"), { ssr: false })
const SelectStatePopup = dynamic(() => import("../components/SelectStatePopup"), { ssr: false })
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configStore from '../redux/storeInHome';
import { FreeCircle, TotalQuestions, PeopleIcon, Clock, FreeIcon, LoginIcon, PenIcon } from '../components/Icons';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import MenuIcon from '@material-ui/icons/Menu';
import { Rating } from '@material-ui/lab';
import { oldUser, scrollToTopic, setScrollDownAuto } from '../utils';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { callApi } from '../services';
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

})
const Home = ({ appInfoState }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    useEffect(() => {
        setScrollDownAuto("home")
        oldUser()
    }, [])
    const canonical = `https://passemall.com/${(appInfoState || '').appNameId}`;
    let color = [];
    color["ged"] = {
        colorFooter: "#E07730",
        mainColor: "#FA8E45",
        screenShotColor: "#FFA86C",
        buttonHeader: "#FA8E45"
    }
    color["cna"] = {
        colorFooter: "#1C7BBE",
        mainColor: "#1C7BBE",
        screenShotColor: "#82AFD1",
        buttonHeader: "#1C7BBE"
    }
    color["asvab"] = {
        colorFooter: "#8A8862",
        mainColor: "#8A8862",
        screenShotColor: "#A6A480",
        buttonHeader: "#FAFAFA"
    }
    color["motocycle"] = {
        colorFooter: "#4E63BD",
        mainColor: "#495EBF",
        screenShotColor: "#6679CC",
        buttonHeader: "#FAFAFA"
    }
    color["cdl"] = {
        colorFooter: "#5B6695",
        mainColor: "#5B6695",
        screenShotColor: "#5B6695",
        buttonHeader: "#FAFAFA"
    }
    color["dmv"] = {
        colorFooter: "#4E63BD",
        mainColor: "#495EBF",
        screenShotColor: "#6679CC",
        buttonHeader: "#FAFAFA"
    }
    const [openPopupChangeState, setOpenPopupChangeState] = useState(false);
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
                <Header color={color[appInfoState.bucket] ? color[appInfoState.bucket].buttonHeader : ""} bucket={color[appInfoState.bucket] ? appInfoState.bucket : ""} isMobile={isMobile}></Header>
                <Features color={color[appInfoState.bucket] ? color[appInfoState.bucket].mainColor : ""}></Features>
                <ExamOverview></ExamOverview>
                <ListInfoGraphic color={color[appInfoState.bucket] ? color[appInfoState.bucket].mainColor : ""} appInfoState={appInfoState} bucket={color[appInfoState.bucket] ? appInfoState.bucket : ""}></ListInfoGraphic>
                <ListTopic></ListTopic>
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
                                appInfo={appInfoState}
                                openPopupChangeState={openPopupChangeState}
                                onHidden={() => {
                                    setOpenPopupChangeState(false);
                                }} /> : ''}
                    </PersistGate>
                </Provider>
                <MobileDescription appInfoState={appInfoState} color={color[appInfoState.bucket] ? color[appInfoState.bucket].screenShotColor : ""}></MobileDescription>
                <Feedback isMobile={isMobile}></Feedback>
                <Footer bucket={appInfoState.bucket} color={color[appInfoState.bucket] ? color[appInfoState.bucket].colorFooter : ""}></Footer>
            </div>
        </>
    )
}
const Header = (props) => {
    const classes = useStyles(props);
    const [openDrawer, setOpenDrawer] = useState();
    const router = useRouter();
    const { appNameId } = router.query
    const bucketUrl = (props.bucket ? props.bucket + "/" : "");
    return (
        <header style={{ background: `url(/images/apps/${bucketUrl}header-background.png) no-repeat`, backgroundSize: "cover", backgroundPosition: props.bucket === "cna" ? "100px 100px" : (props.isMobile ? "left" : "center"), minHeight: (props.bucket === "dmv" || props.bucket === "motocycle") ? "690px" : "630px" }}>
            <Container className="container-header">
                <Grid container alignItems="center" justify="space-between" className="header-tab-panel">
                    <div className="parent-logo">
                        <a href="/" className="logo">
                            <img src={props.bucket === "cna" ? "/images/logo-landing-2.png" : "/images/logo-landing.png"} style={props.isMobile ? { height: "50px", paddingTop: "16px" } : { height: "80px" }} alt="logo-landing"></img>
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
                                <a href="#" onClick={() => scrollToTopic()} style={props.bucket === "cna" ? { color: "#000" } : {}}>Learn</a>
                                <a href={"/" + appNameId + "/test"} style={props.bucket === "cna" ? { color: "#000" } : {}}>Test</a>
                                <a href="" style={props.bucket === "cna" ? { color: "#000" } : {}}>Study guide</a>
                            </div>

                        </div>
                    }
                </Grid>
                <div className="header-title">
                    <h1 style={props.bucket === "cna" ? { color: "#000" } : { color: "#fff" }}>FREE 2020 GED PRACTICE TEST!</h1>
                    <p style={props.bucket === "cna" ? { color: "#2282C4" } : { color: "#fff" }}>Getting ready for your motorcycle license test is tough
                    Sometimes it's hard to find the official source, among
                    other things. We've done the hard part for you and put
                    together a list of the most recent official motorcycle
                    handbooks for every U.S. state. Select your state in the
                    drop-down above to find the latest official rider's manual (2020).</p>
                    <Button className={classes.root} onClick={() => scrollToTopic()}>Start your test</Button>
                </div>
            </Container>
        </header>
    )
}
const Features = ({ color }) => {
    const router = useRouter();
    return (
        <Container className="features-container">
            <div className="list-features">
                <div>
                    <FreeIcon color={color}></FreeIcon>
                    <h2>Free & Premium GED Test Practice</h2>
                    <p>More effective than traditional MOTORCYCLE
                    classes. Every practice test is based on
                    authentic exam questions, and you can
                    study at your own pace. We'll shuffle the
                    questions every time you restart a test.</p>
                </div>
                <div >
                    <LoginIcon color={color}></LoginIcon>
                    <h2>No Registration or Login Required</h2>
                    <p>In the free mode, your test progress is
                    saved without an account, even if you
                    close your browser. No usernames or
                    passwords to remember - just frictionless MORTORCYCLE training.</p>
                </div>
                <div>
                    <PenIcon color={color}></PenIcon>
                    <h2>Exam Simulator - Just Like the Real Test</h2>
                    <p>See if you're ready for the real thing with
                    the MOTORCYCLE Exam Simulator
                    Same number of questions presented
                    the same way as the Nurse Aide exam.</p>
                </div>
            </div>
        </Container>
    )
}
const ExamOverview = () => {
    return (
        <Container className="overview-container">
            <div className="overview-title">
                <h2>GED Exam Overview</h2>
                <p>Every state in the USA administers their own ASVAB examination. Usually it's a two-part exam consisting of a written knowledge test
                (a set of multiple-choice questions) and a skills evaluation. Depending on your state of residence, your MOTORCYCLE exam will be one of the
            following third-party exam certification providers</p>
            </div>
            <div className="list-overview">
                <div className="overview-item">
                    <h2>Pearson Vue's National NNAAP</h2>
                    <p>The National Nurse Assistant Assessment
                    Program (NNAAP) is the nation's largest
                    MOTORCYCLE exam assessment program.
                    Their written knowledge exam is 70 multiple
                    choice questions with four answer options.
                    <br></br>
                        <br></br>
                    You can take the NNAAP Nurse Aid exam in
                    the following jurisdictions: Alabama, Alaska,
                    California, Colorado, DC, Georgia, Maryland,
                    Minnesota, Mississippi, New Hampshire, North
                    Carolina, Pennsylvania, Rhode Island,
                    South Carolina, Texas, Virgin Islands, Virginia,
                    Washington</p>
                </div>
                <div className="overview-item">
                    <h2>Prometric's MOTORCYCLE Exam (Nurse Aide exam)</h2>
                    <p>You'll be given 90 minutes to complete a
                    60-question written examination, and
                    30-40 minutes - to complete the clinical
                    skills exam.
                    <br></br>
                        <br></br>
                    If you live in one of the following eleven
                    states, your CNA exam will most likely be
                    administered by Prometric: Alabama
                    Arkansas, Connecticut, Delaware, Florida
                    Hawaii, Idaho, Michigan, New Mexico
                    New York, Oklahoma.</p>
                </div>
                <div className="overview-item">
                    <h2>HDMaster (D&S Diversified Technologies)</h2>
                    <p>Just like the other test providers, the Headmaster
                    MOTORCYCLE exam is administered in two stages:
                    a written exam and a manual skills exam. The written
                    MOTORCYCLE examination is 75 multiple-choice
                    questions while the clinical skills exam is 3-4
                    selected skills.
                    <br />
                        <br />
                    The following twelve states use HDMaster to
                    administer their MOTORCYCLE exam: Arizona,
                    Montana, New Hampshire, North Dakota, New
                    Jersey, Nevada, Ohio, Oklahoma, Oregon, South
                    Dakota, Tennessee, Utah, Wisconsin.</p>
                </div>
            </div>

        </Container>
    )
}
const ListInfoGraphic = (props) => {
    const classes = useStyles(props);
    const bucketUrl = (props.bucket ? props.bucket + "/" : "");
    let srcImage1 = `/images/apps/${bucketUrl}infographic/infographic-1.png`;
    let srcImage2 = `/images/apps/${bucketUrl}infographic/infographic-2.png `;
    return (
        <>
            <Container>
                <Grid container alignItems="stretch">
                    <Grid item xs={12} sm={6}>
                        <img width="100%" src={srcImage1} alt="infographic-1" style={{ display: "block" }}></img>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <h2>Scientifically proven</h2>
                        <p>Research shows that studying in the same way that
                        you’ll be tested can increase your self-assurance, as
                        well as your ability to focus on the test questions.
                        <br />
                                <br />
                        We’ve designed our website training course to
                        duplicate the exam experience, so it becomes familiar.
                        <br />
                                <br />
                        Our TEAS practice tests cover all the patient
                        care topics and personal care skills that are taught in
                        traditional nursing programs and included in the official
                        exam without any classroom instruction</p>
                        <Button className={classes.root} style={{marginTop: '50px'}} onClick={() => scrollToTopic()}>Start your test</Button>
                    </Grid>
                </Grid>
            </Container>
            <div style={{height: "100px", width: "100%"}}></div>
            <Container className="infographic-container">
                <h2>Exam experience, duplicated</h2>
                <p>Our TEAS Certification Exam Simulator is an effective way to practice for the actual exam.</p>
                <div className="list-infographic">
                    <div>
                        <div style={{ fontSize: "36px", color: props.color }}>$0</div>
                        <p style={{ fontSize: "14px" }}>There is no fee to take the TEAS (CAT)</p>
                        <FreeCircle color={props.color} ></FreeCircle>
                    </div>
                    <div>
                        <div style={{ fontSize: "24px", color: props.color }}>Total<br />questions</div>
                        <p style={{ fontSize: "14px", lineHeight: "17px" }}><strong>145</strong> in TEAS (CAT)<br /><strong>225 </strong>in paper-base ASVAB</p>
                        <TotalQuestions color={props.color}></TotalQuestions>
                    </div>
                    <div >
                        <div style={{ fontSize: "36px", color: props.color }}>172k</div>
                        <p style={{ fontSize: "14px" }}>Approx. number of annual enlistees in US millitary</p>
                        <PeopleIcon color={props.color}></PeopleIcon>
                    </div>
                    <div>
                        <div style={{ fontSize: "36px", color: props.color }}>154</div>
                        <p style={{ fontSize: "14px" }}>Total time (minutes) to take the GED</p>
                        <Clock color={props.color}></Clock>
                    </div>

                </div>
            </Container>
            <Container>
                <Grid container alignItems="stretch">
                    <Grid item xs={12} sm={7} >
                        <h2 style={{ fontSize: "36px" }}>Total confidence.<br></br>This is what you get</h2>
                        <p>Research shows that studying in the same way that
                        you’ll be tested can increase your self-assurance, as
                        well as your ability to focus on the test questions.
                    <br />
                            <br />
                    We’ve designed our website training course to
                    duplicate the exam experience, so it becomes familiar.
                    <br />
                            <br />
                    Our TEAS practice tests cover all the patient
                    care topics and personal care skills that are taught in
                    traditional nursing programs and included in the official
                    exam without any classroom instruction</p>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "200px" }}>
                        <Button className={classes.root} onClick={() => scrollToTopic()} fullWidth={false}> Start your test</Button>
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
const Feedback = ({ isMobile }) => {
    return (
        <Container className="feedback-container">
            <NavigateBeforeIcon style={isMobile ? { fontSize: "40px", marginRight: "0px", position: "relative", bottom: "-50px" } : { marginRight: "40px", fontSize: "60px" }}></NavigateBeforeIcon>
            <div className="feedback-content">
                <div >This site helped me so much. I was super nervous about taking my CNA state exam. So when I passed yesterday, I was ecstatic and couldn’t help but tell like everyone I knew.</div>
                <div className="info-feedback">
                    <img src="/images/avatar-feedback.jpg" alt="avatar" style={{ marginTop: "20px", marginBottom: "10px", width: "72px", borderRadius: "50%", height: "auto" }}></img>
                    <div style={{ fontSize: "20px", fontWeight: "bold", lineHeight: 1.33 }}>Karen Worrell</div>
                    <div style={{ fontSize: "20px" }}>Florida</div>
                </div>
            </div>
            <NavigateNextIcon style={isMobile ? { fontSize: "40px", marginRight: "0px", position: "relative", bottom: "-50px" } : { marginRight: "40px", fontSize: "60px" }}></NavigateNextIcon>
        </Container >
    );
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