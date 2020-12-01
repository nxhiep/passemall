import { CircularProgress, Container, Grid, makeStyles, SwipeableDrawer, TextField, useMediaQuery, useTheme } from "@material-ui/core";
import DashboardIcon from '@material-ui/icons/Dashboard';
import EditIcon from '@material-ui/icons/Edit';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactGA from 'react-ga';
import LazyLoad from "react-lazyload";
import Slider from "react-slick";
import { FacebookFooter, GmailFooter, LinkedInFooter, TumblrIcon, TwitterFooter, Youtube } from "../components/Icons";
import SEO from "../components/SEO";
import { GA_ID } from "../config_app";
import SearchResultsModal from "../container/home/SearchResultsModal";
import { callApi } from "../services";
import { getWebContext, oldUser, scrollDown, setScrollDownAuto } from "../utils";
import './home.css';

const useStyles = makeStyles({
    bgheader: props => {
        if(props.isMobile){
            return {
                background: "url(/images/new/banner-right.jpg) no-repeat",
                backgroundPosition: "top",
                backgroundSize: "1000px"
            }
        }
        return {
            background: "url(/images/new/banner-left.jpg) no-repeat, url(/images/new/banner-right.jpg) no-repeat",
            backgroundPosition: "top left, top right",
            backgroundSize: "auto, auto 100%"
        }
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
                fontWeight: "600",
                cursor: "pointer",
                '&:hover': {
                    textDecoration: "underline"
                }
            }
        }
        return {
            padding: "10px 20px",
            textDecoration: "none",
            color: "#4e63bd",
            fontWeight: "600",
            cursor: "pointer",
            '&:hover': {
                textDecoration: "underline"
            }
        }
    },
    tagAFooter: {
        color: "#4e63bd",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        '&:hover': {
            textDecoration: "underline"
        }
    },
    menuButton: {
        backgroundColor: "transparent",
        border: "none",
        outline: "none"
    },
    appItem: {
        padding: "16px 0",
        borderBottom: "1px solid rgba(250,142,69,.3)"
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
        <main style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <SEO url={url} />
            <HeaderBannerPanel isMobile={isMobile} />
            <BodyPanel isMobile={isMobile} />
            <FooterPanel isMobile={isMobile} />
        </main>
    </>
}

const HeaderBannerPanel = ({ isMobile }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const handleOpenDrawer = (open) => setOpenDrawer(open)
    const [searchResults, setSearchResults] = useState(null);
    const styles = useStyles({ isMobile });
    return <>
        <div className={styles.bgheader}>
            <header className={styles.header}>
                <Container style={{height: "100%"}}>
                    <Grid container justify="space-between" alignItems="center" style={{height: "100%"}}>
                        <a href="/"><img src="/images/logo-landing-2.png" width="240px" height="60px" /></a>
                        {isMobile ? <button className={styles.menuButton}
                        onClick={() => {
                            setOpenDrawer(true)
                        }}
                        >
                            <MenuIcon />
                        </button> : <div className={styles.flex}>
                            <HeaderMenu isMobile={isMobile} setSearchResults={(value, results) => {
                                setSearchResults({ value, results })
                            }} />
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
                                <a href="/"><img width="200px" height="48px" src="/images/logo-landing.png" /></a>
                            </div>
                            <HeaderMenu isMobile={isMobile} setSearchResults={(value, results) => {
                                setSearchResults({ value, results })
                            }} />
                        </SwipeableDrawer> : null }
                    </Grid>
                </Container>
            </header>
            <Container>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={12} sm={5} md={5}>
                        <h1 style={{
                            minHeight: isMobile ? "180px" : "0",
                            display: "flex",
                            alignItems: "center",
                            color: "#1e3094"
                        }}>Make your study great with our thousands of free practice questions</h1>
                        <p style={{
                            minHeight: isMobile ? "180px" : "0",
                            display: "flex",
                            alignItems: "center",
                            color: "#333",
                            fontSize: "1.1em",
                            fontWeight: "500"
                        }}>You want to get 100% ready for your important day? You desire to pass your exam at your first try? You are wondering if you should pay a charge of money buying some practice materials? That’s why we are here to support you achieve the gate of success with our test prep solutions.</p>
                    </Grid>
                    {isMobile ? null : <Grid item xs={12} sm={5} md={5}>
                        <img width="100%" src="/images/test3.png" style={{
                            position: "relative",
                            bottom: "-60px"
                        }} />
                    </Grid>}
                </Grid>
            </Container>
        </div>
        <SearchResultsModal results={searchResults ? searchResults.results : null} value={searchResults ? searchResults.value : null} />
    </>
}

const HeaderMenu = ({ isMobile, setSearchResults }) => {
    const styles = useStyles({ isMobile });
    return <>
        <div className={isMobile ? "" : styles.flex}>
            <a href="/" className={styles.headerMenu}>HOME</a>
            <a href="/blog" className={styles.headerMenu}>BLOG</a>
            <span className={styles.headerMenu} onClick={() => {
                scrollDown()
            }}>SUPPORT</span>
        </div>
        <div style={{width: "50px"}}></div>
        <SearchPanel isMobile={isMobile} setSearchResults={setSearchResults} />
    </>
}

const SearchPanel = ({ isMobile, setSearchResults }) => {
    const [appInfos, setAppInfos] = useState(null)
    const [loading, setLoading] = useState(false)
    const onSearch1 = (value) => {
        setLoading(true)
        if (appInfos) {
            onSearch(appInfos, value)
        } else {
            callApi({ url: '/data?type=get_all_app_info', params: null, method: 'post' }).then((data) => {
                setAppInfos(data)
                onSearch(data, value)
            })
        }
    }
    const onSearch = (appInfos, value) => {
        if (appInfos && value) {
            let results = [];
            appInfos.forEach(element => {
                let data = (element.description + element.appName).toLowerCase().replace(/ /g, "");
                if (data.search(value.toLowerCase()) > -1) {
                    results.push(element);
                }
            });
            console.log("data", results)
            setSearchResults(value, results)
        } else {
            setSearchResults(value, null)
        }
        setLoading(false)
    }

    const [value, setValue] = useState("");
    const color = isMobile ? "white" : "#1E3094";
    return <div className="search-header-panel">
        <TextField value={value}
            placeholder="Search..." id="search-header"
            color="secondary" className="search-header"
            onKeyDown={(e) => {
                if (e.keyCode == 13) {
                    onSearch1(value)
                }
            }}
            onChange={(e) => setValue(e.target.value)}
        />
        <button
            style={{ padding: "0", background: 'none', border: 'none' }}
            onClick={() => {
                if (loading) {
                    return;
                }
                onSearch1(value)
            }}
        >
            {loading ? <CircularProgress style={{ width: "30px", height: "30px", color: color }} /> : <SearchIcon style={{ fontSize: "25px", width: "35px", color: color }} color="inherit"></SearchIcon>}
        </button>
    </div>
}

const BodyPanel = ({ isMobile }) => {
    const height = "50px";
    return <main>
        <div style={{height: height}}></div>
        <Block1 isMobile={isMobile} />
        <div style={{height: height}}></div>
        <LazyLoad><Block2 isMobile={isMobile} /></LazyLoad>
        <div style={{height: height}}></div>
        <LazyLoad>
            <link rel="stylesheet" type="text/css" href="/styles/slick.css" />
        </LazyLoad>
        <LazyLoad><Block3 /></LazyLoad>
        <div style={{height: height}}></div>
    </main>
}

const MyTitle = ({ title, description, isMobile }) => {
    return <div style={{textAlign: "center", marginTop: "40px", marginBottom: "40px", padding: "0 20px"}}>
        <span style={{ fontSize: "24px", fontWeight: "bold", borderTop: "3px solid #fa8e45", padding: "8px 0px" }}>
            <span style={{color: "#4e63bd"}}>ABC</span>
            <span> </span>
            <span style={{color: "#fa8e45"}}>E-learning</span>
        </span>
        <h1 style={{ fontSize: isMobile ? "" : "1.8em", color: "#1e3094" }}>{title}</h1>
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
    return <section>
        <MyTitle isMobile={isMobile} title="GREAT APPS FOR YOU" description="Practice right now with our free apps!" />
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
    const router = useRouter()
    const openApp = (appNameId) => {
        router.push("/" + appNameId)
    }
    if(isMobile){
        return <>
            <Grid container wrap="wrap">
                { appInfos.slice(0, 5).map(appInfo => {
                    return <Grid item xs={12} sm={6} md={4} key={"appInfo-" + appInfo.id} className={styles.appItem} onClick={() => {
                        openApp(appInfo.appNameId)
                    }}>
                        <div className={styles.appItemText}>{appInfo.appName}</div>
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
                    return <Grid item xs={12} sm={6} md={4} key={"appInfo-" + appInfo.id} className={styles.appItem} onClick={() => {
                        openApp(appInfo.appNameId)
                    }}>
                        <div className={styles.appItemText}>{appInfo.appName}</div>
                    </Grid>
                }) }
            </Grid> : null}
        </>
    }
    return <Grid container wrap="wrap">
        { appInfos.map(appInfo => {
            return <Grid item xs={12} sm={6} md={4} key={"appInfo-" + appInfo.id} className={styles.appItem} onClick={() => {
                    openApp(appInfo.appNameId)
                }}>
                <div className={styles.appItemText}>{appInfo.appName}</div>
            </Grid>
        }) }
    </Grid>
}

const Block2 = ({ isMobile }) => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down(960));
    return <section>
        <MyTitle isMobile={isMobile} title="SOME OF THE BEST FEATURES" description="With thousands of exam-simulated questions with detail explanations, lifetime access to the complete Manual, and dozens of test-taking strategies, our Test Prep helps you pass your test with flying colors." />
        <Container>
            <Grid container spacing={3} alignItems="center">
                {isMobile || sm ? null : <Grid item xs={12} sm={6} md={3}>
                    <LazyLoad><img width="100%" src="/images/test5.jpg" alt="static-img" alt='With thousands of exam-simulated questions with detail explanations, lifetime access to the complete Manual, and dozens of test-taking strategies, our Test Prep helps you pass your test with flying colors' /></LazyLoad>
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
                            title="PRACTICE BY TOPICS"
                            description="Test your knowledge by practicing by topics exactly as in real test. Moreover, topic is also divided into small parts which helps you get your interest in studying, just like playing a game."
                        />
                        <Block2Item
                            isMobile={isMobile}
                            icon={<DashboardIcon />}
                            title="CUSTOMIZE YOUR EXAM"
                            description="You can design your test so that it works best for you. Gradually set the test as close as the real test to ready for it. This is the most effective way that helps many people get over their challenge."
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
            <div style={{height: "50px"}}></div>
            <Grid container>
                <ActiveItem isMobile={isMobile} value="10,123" title="Users" />
                <ActiveItem isMobile={isMobile} value="20,432" title="Download" />
                <ActiveItem isMobile={isMobile} value="7871" title="Likes" />
                <ActiveItem isMobile={isMobile} value="945" title="5 star rating" />
            </Grid>
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
                <strong style={{ color: "rgb(78, 99, 189)" }}>{title}</strong>
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
            <strong className="text-bg">{value}</strong>
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
                <MyTitle isMobile={isMobile} title="FEEDBACKS" />
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
                    <div style={{ minHeight: "140px" }} className="dot-7">{content}</div>
                </div>
            </div>
        </div>
    );
}

const FooterPanel = ({ isMobile }) => {
    const styles = useStyles()
    return <footer style={{ backgroundColor: "#DAD3F1", padding: "50px 0", color: "#4e63bd" }}>
        <Container>
            <Grid container>
                <Grid item xs={12} sm={6} md={4}>
                    <a href="/">
                        <img src="/images/logo-landing-2.png" width="240px" height="60px" />
                    </a>
                </Grid>
                <Grid item xs={12} sm={6} md={3} style={{paddingTop: "20px"}}>
                    <div style={{fontSize: "20px", marginBottom: "20px"}}><strong>Resources</strong></div>
                    <div>
                        <div><a href="/blog" className={styles.tagAFooter}>Blog</a></div>
                        <div style={{height:"10px"}}></div>
                        <div><a href="https://passemall.com/blog/about-us-5634123102158848" className={styles.tagAFooter}>About us</a></div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={5} style={{paddingTop: "20px"}}>
                    <div style={{fontSize: "20px", marginBottom: "20px"}}><strong>Social</strong></div>
                    <SocialWidget />
                </Grid>
            </Grid>
        </Container>
    </footer>
}

const SocialWidget = ({ color }) => {
    const styles = useStyles()
    return <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
            <a href="https://twitter.com/abcelearningapp" target="_blank" rel="noopener" className={styles.tagAFooter}>
                <TwitterFooter color={color}></TwitterFooter>
                <span style={{ marginLeft: "8px" }}>Twitter</span>
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <a href="https://www.facebook.com/ABC-E-learning-110654290809849" target="_blank" rel="noopener" className={styles.tagAFooter}>
                <FacebookFooter color={color}></FacebookFooter>
                <span style={{ marginLeft: "8px" }}>Facebook</span>
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <a href="https://www.youtube.com/channel/UCkLKqup_8asTJGtQIgXCOZg" target="_blank" rel="noopener" className={styles.tagAFooter}>
                <Youtube color={color}></Youtube>
                <span style={{ marginLeft: "8px" }}>Youtube</span>
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <a href="https://www.tumblr.com/blog/view/abcelearningapps" target="_blank" rel="noopener" className={styles.tagAFooter}>
                <TumblrIcon color={color} bgColor="white"></TumblrIcon>
                <span style={{ marginLeft: "8px" }}>Tumblr</span>
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <a href="https://www.linkedin.com/in/abc-elearningapps-ab9a231b8" target="_blank" rel="noopener" className={styles.tagAFooter}>
                <LinkedInFooter color={color}></LinkedInFooter>
                <span style={{ marginLeft: "8px" }}>LinkedIn</span>
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
            <a href="mailto:abc.elearningapps@gmail.com" target="_blank" className={styles.tagAFooter}>
                <GmailFooter color={color}></GmailFooter>
                <span style={{ marginLeft: "8px" }}>abc.elearningapps@gmail.com</span>
            </a>
        </Grid>
    </Grid>
}

export async function getServerSideProps(context) {
    return getWebContext(context);
}

export default Home