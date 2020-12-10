
import { CircularProgress, Container, Grid, Link, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import DashboardIcon from '@material-ui/icons/Dashboard';
import EditIcon from '@material-ui/icons/Edit';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { useEffect, useState } from "react";
import ReactGA from 'react-ga';
import LazyLoad from "react-lazyload";
import Slider from "react-slick";
import FooterPanel from "../components/new/FooterPanel";
import HeaderBannerPanel from "../components/new/HeaderBannerPanel";
import SEO from "../components/SEO";
import { GA_ID } from "../config_app";
import { callApi } from "../services";
import { getNewDomain, getWebContext, isProduction, oldUser, setScrollDownAuto } from "../utils";
import './home.css';

const useStyles = makeStyles({
    flex: {
        display: "flex",
        alignItems: "center"
    },
    appItem: {
        padding: "16px 0",
        borderBottom: "1px solid rgba(250,142,69,.3)",
        display: "block"
    },
    appItemText: {
        textTransform: "uppercase",
        fontSize: "1.2em",
        fontWeight: "500",
        cursor: "pointer",
        color: "#656566",
        '&:hover': {
            color: "#1e3094",
            textDecoration: "underline",
        }
    }
})

ReactGA.initialize(GA_ID);

const Home = ({ isMobile, url }) => {
    useEffect(() => {
        ReactGA.pageview('/homepage');
        setScrollDownAuto()
        oldUser();
    }, [])
    return <>
        <SEO url={url} />
        <main style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <HeaderBannerPanel isMobile={isMobile} />
            <div style={{height: "50px"}}></div>
            <MyTitle isMobile={isMobile} title="PRACTICE RIGHT NOW WITH OUR FREE QUESTIONS!" description="Let's select your exam first" />
            <Block1 isMobile={isMobile} />
            <div style={{height: "80px"}}></div>
            <Block2 isMobile={isMobile} />
            <LazyLoad>
                <link rel="stylesheet" type="text/css" href="/styles/slick.css" />
                <Block3 />
            </LazyLoad>
            <div style={{height: "50px"}}></div>
            <FooterPanel isMobile={isMobile} />
        </main>
    </>
}

const MyTitle = ({ title, description, isMobile }) => {
    return <div style={{textAlign: "center", marginTop: "40px", marginBottom: "40px", padding: "0 20px"}}>
        <span style={{ fontSize: "24px", fontWeight: "bold", borderTop: "3px solid #fa8e45", padding: "8px 0px" }}>
            <span style={{color: "#4e63bd"}}>ABC</span>
            <span> </span>
            <span style={{color: "#ff6b00"}}>E-learning</span>
        </span>
        <h2 style={{ fontSize: isMobile ? "" : "1.8em", color: "#1e3094", marginTop: "16px" }}>{title}</h2>
        <p style={{
            maxWidth: "500px",
            textAlign: "center",
            margin: "0 auto",
            color: "#333",
            fontSize: "1.1em",
            fontWeight: "500"
        }}>{description}</p>
    </div>
}

const Block1 = ({ isMobile }) => {
    const [appInfos, setAppInfos] = useState(null)
    useEffect(() => {
        callApi({ url: '/data?type=get_all_app_info', params: null, method: 'post' }).then((data) => {
            setAppInfos(data)
        })
    }, [])
    return <section id="list-greet-apps">
        <Container>
        {
            !appInfos ? <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "50px"
            }}>
                <CircularProgress />
            </div> : <ListApps appInfos={appInfos} isMobile={isMobile} />
        }
        </Container>
    </section>
}

const ListApps = ({ appInfos, isMobile }) => {
    appInfos = appInfos.sort((a, b) => a.appName.localeCompare(b.appName))
    const styles = useStyles({ isMobile })
    const [open, setOpen] = useState(false)
    // const router = useRouter()
    // const openApp = (appNameId) => {
    //     // router.push("/" + appNameId)
    //     window.open("/" + appNameId, '_blank')
    // }
    const getLink = (appInfo) => {
        let newDomain = getNewDomain(appInfo.id)
        if(newDomain && isProduction){
            return newDomain;
        }
        return '/' + appInfo.appNameId
    };
    if(isMobile){
        return <>
            <Grid container wrap="wrap">
                { appInfos.slice(0, 5).map(appInfo => {
                    return <Grid item xs={12} sm={6} md={4} key={"appInfo-" + appInfo.id}>
                        <Link className={styles.appItem} href={getLink(appInfo)} target="_blank">
                            <div className={styles.appItemText}>{appInfo.appName}</div>
                        </Link>
                    </Grid>
                }) }
            </Grid>
            {!open ? <Grid item xs={12} sm={6} md={4} style={{ color: "#4e63bd", padding: "10px 0", cursor: "pointer" }} onClick={() => {
                setOpen(true)
            }}>
                <div>Show more</div>
            </Grid> : null}
            {open ? <Grid container wrap="wrap">
                { appInfos.slice(6, appInfos.length).map(appInfo => {
                    return <Grid item xs={12} sm={6} md={4} key={"appInfo-" + appInfo.id}>
                        <Link className={styles.appItem} href={getLink(appInfo)} target="_blank">
                            <div className={styles.appItemText}>{appInfo.appName}</div>
                        </Link>
                    </Grid>
                }) }
            </Grid> : null}
        </>
    }
    return <Grid container wrap="wrap">
        { appInfos.map(appInfo => {
            return <Grid item xs={12} sm={6} md={4} key={"appInfo-" + appInfo.id}>
                <Link className={styles.appItem} href={getLink(appInfo)} target="_blank">
                    <div className={styles.appItemText}>{appInfo.appName}</div>
                </Link>
            </Grid>
        }) }
    </Grid>
}

const Block2 = ({ isMobile }) => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down(960));
    return <section>
        <MyTitle isMobile={isMobile} title="SOME OF THE BEST FEATURES" description="With thousands of exam-simulated questions with detail explanations, lifetime access to the complete Manual, and dozens of test-taking strategies, our FREE Practice Test helps you pass your test with flying colors." />
        <div style={{height: "30px"}}></div>
        <Container>
            <Grid container spacing={3} alignItems="center">
                {isMobile || sm ? null : <Grid item xs={12} sm={6} md={3}>
                    <LazyLoad><img width="100%" src="/images/test5.jpg" alt="static-img" alt='With thousands of exam-simulated questions with detail explanations, lifetime access to the complete Manual, and dozens of test-taking strategies, our FREE Practice questions helps you pass your test with flying colors' /></LazyLoad>
                </Grid>}
                <Grid item xs={12} sm={12} md={9}>
                    <Grid container>
                        <Block2Item
                            isMobile={isMobile}
                            icon={<span>free</span>}
                            title="COMPLETELY FREE"
                            description="Our application is 100% free, so you can practice your test in our web or in any other devices with our available free app on google play or appStore. No internet connection and no registration required."
                        />
                        <Block2Item
                            isMobile={isMobile}
                            icon={<EditIcon />}
                            title="PRACTICE QUESTIONS BY TOPICS"
                            description="Test your knowledge by practicing by topics exactly as in real test. Moreover, topic is also divided into small parts which helps you get your interest in studying, just happier study, easier pass."
                        />
                        <Block2Item
                            isMobile={isMobile}
                            icon={<DashboardIcon />}
                            title="3 INTERESTING TEST MODES"
                            description="3 different test modes with increases in difficult level let you experience the test in a very exciting way. Let's get accustomed to the format of the real test."
                        />
                        <Block2Item
                            isMobile={isMobile}
                            icon={<HowToRegIcon />}
                            title="SPECICAL REVIEW MODE"
                            description="With this feature, you can review which questions you are weak, medium or strong. And this will help you find out where you need to work more and make the most of your study time."
                        />
                    </Grid>
                </Grid>
            </Grid>
            <div style={{height: "70px"}}></div>
            <Grid container>
                <ActiveItem isMobile={isMobile} value="10,123" title="Users" />
                <ActiveItem isMobile={isMobile} value="20,432" title="Download" />
                <ActiveItem isMobile={isMobile} value="7871" title="Likes" />
                <ActiveItem isMobile={isMobile} value="945" title="5 star rating" />
            </Grid>
            <div style={{height: "50px"}}></div>
        </Container>
    </section>
}

const Block2Item = ({ isMobile, icon, title, description }) => {
    return <>
        <Grid item xs={false} sm={1} md={1}></Grid>
        <Grid item xs={12} sm={5} md={5} style={isMobile ? {
            display: "flex",
            alignItems: "end",
            marginTop: "10px"
        } : {}}>
            <div style={{
                width: "50px",
                height: "50px",
                backgroundColor: "rgb(78, 99, 189)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                borderRadius: "100%"
            }}>{icon}</div>
            <div style={{ marginTop: "20px", marginBottom: "20px", width: isMobile ? "calc(100% - 60px)" : "100%", marginLeft: isMobile ? "10px" : "" }}>
                <p style={{marginBottom: "8px"}}><strong style={{ color: "rgb(78, 99, 189)" }}>{title}</strong></p>
                <p style={{
                    color: "#333"
                }}>{description}</p>
            </div>
        </Grid>
    </>
}

const ActiveItem = ({ isMobile, value = '', title = '' }) => {
    const styles = useStyles()
    return (
        <Grid item xs={6} sm={3} style={{textAlign: isMobile ? "left" : "center", marginBottom: isMobile ? "10px" : ""}}>
            <div className="text-bg">{value}</div>
            <span>{title}</span>
        </Grid>
    );
}

const Block3 = ({ isMobile }) => {
    const [userRates, setUserRates] = useState(null);
    useEffect(() => {
        callApi({ url: '/data?type=get_user_rates_perfectest', params: null, method: 'post' }).then((data) => {
            if(data){
                setUserRates(data.slice(0, 3))
            } else {
                setUserRates([])
            };
        })
    }, []);
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down("xs"));
    const sm = useMediaQuery(theme.breakpoints.down("md"));
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: xs ? 1 : (sm ? 2 : 3),
        slidesToScroll: xs ? 1 : (sm ? 2 : 3),
        className: "feedback-slider",
        autoPlay: true,
        autoplaySpeed: 1500,
        arrows: false
    };
    if(!userRates){
        return <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress />
        </div>
    }
    if(userRates.length == 0){
        return null
    }
    return (
        <section>
            <Container>
                <MyTitle isMobile={isMobile} title="LET'S TAKE A LOOK AT OUR USER FEEDBACKS" />
                <Slider {...settings}>
                    {
                        userRates.map((userRate, index) => {
                            return <FeedbackItem
                                key={"FeedbackItem-" + userRate.id}
                                content={userRate.content}
                                name={userRate.userName}
                                createTime={userRate.createDate}
                                index={index}
                            />
                        })
                    }
                </Slider>
            </Container>
        </section>
    );
}

const FeedbackItem = ({ content, name, index }) => {
    return (
        <div style={{
            padding: "20px"
        }}>
            <div style={{
                backdropFilter: "blur(10px)",
                filter: "drop-shadow(5px 5px 10px rgba(38, 38, 38, 0.35))",
                textAlign: "center", 
                color: "white",
                borderRadius: "20px",
                padding: "30px",
                background: "linear-gradient(180deg,#C8ADC2 0%,#A08FBA 100%),linear-gradient(0deg,rgba(255,255,255,0.8),rgba(255,255,255,0.8))"
            }}>
                <LazyLoad><img 
                    style={{ margin: "20px auto", display: "block" }}
                    src={index % 3 === 0 ? "/images/avatar-1.png" : (index % 3 === 1 ? "/images/avatar-2.png" : "/images/avatar-3.png")} alt="avatar"></img></LazyLoad>
                <div>
                    <div style={{ margin: "20px auto", fontSize: "1.1em" }}><strong>{name}</strong></div>
                    <div title={content} style={{ minHeight: "180px" }} className="dot-7">{content}</div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    return getWebContext(context);
}

export default Home