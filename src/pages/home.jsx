import { CircularProgress, Container, Grid, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import LazyLoad from "react-lazyload";
import SEO from "../components/SEO";
import { getWebContext } from "../utils";
import DashboardIcon from '@material-ui/icons/Dashboard';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import EditIcon from '@material-ui/icons/Edit';
import { useEffect, useState } from "react";
import { callApi } from "../services";
import Slider from "react-slick";
import { FacebookFooter, GmailFooter, LinkedInFooter, TumblrIcon, TwitterFooter, Youtube } from "../components/Icons";

const useStyles = makeStyles({
    bgheader: {
        background: "url(/images/new/banner-left.jpg) no-repeat, url(/images/new/banner-right.jpg) no-repeat",
        backgroundPosition: "top left, top right",
        backgroundSize: "auto, auto 100%"
    },
    header: {
        height: "70px",
        backgroundColor: "trantransparent"
    },
    flex: {
        display: "flex",
        alignItems: "center"
    },
    headerMenu: {
        padding: "10px",
        textDecoration: "none",
        color: "#4e63bd",
        fontWeight: "500",
        cursor: "pointer",
        '&:hover': {
            textDecoration: "underline"
        }
    },
    tagAFooter: {
        color: "white",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        '&:hover': {
            textDecoration: "underline"
        }
    }
})

const Home = ({ isMobile, url }) => {
    return <>
        <main style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <SEO url={url}>
                <link rel="stylesheet" href="/styles/home/index.css" />
            </SEO>
            <HeaderBannerPanel isMobile={isMobile} />
            <BodyPanel isMobile={isMobile} />
            <FooterPanel isMobile={isMobile} />
        </main>
    </>
}

const HeaderBannerPanel = ({ isMobile }) => {
    const styles = useStyles();
    return <div className={styles.bgheader}>
        <header className={styles.header}>
            <Container style={{height: "100%"}}>
                <Grid container justify="space-between" alignItems="center" style={{height: "100%"}}>
                    <a href="/">
                        <img src="/images/logo-landing-2.png" width="240px" height="60px" />
                    </a>
                    <div className={styles.flex}>
                        <div className={styles.flex}>
                            <a href="/" className={styles.headerMenu}>HOME</a>
                            <a href="/blog" className={styles.headerMenu}>BLOG</a>
                            <span className={styles.headerMenu}>SUPPORT</span>
                        </div>
                        <SearchPanel />
                    </div>
                </Grid>
            </Container>
        </header>
        <Container>
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12} sm={5} md={5}>
                    <h1>Make your study great with our thousands of free practice questions</h1>
                    <p>You want to get 100% ready for your important day? You desire to pass your exam at your first try? You are wondering if you should pay a charge of money buying some practice materials? That’s why we are here to support you achieve the gate of success with our test prep solutions.</p>
                </Grid>
                {isMobile ? null : <Grid item xs={12} sm={5} md={5}>
                    <img width="100%" src="/images/test3.png" />
                </Grid>}
            </Grid>
        </Container>
    </div>
}

const SearchPanel = () => {
    return <div>
        SearchPanel
    </div>
}

const BodyPanel = ({ isMobile }) => {
    const height = "50px";
    return <main>
        <Block1 />
        <div style={{height: height}}></div>
        <Block2 isMobile={isMobile} />
        <div style={{height: height}}></div>
        <Block3 />
        <div style={{height: height}}></div>
    </main>
}

const MyTitle = ({ title, description }) => {
    return <div style={{textAlign: "center", marginTop: "20px"}}>
        <span style={{ fontSize: "24px", fontWeight: "bold", borderTop: "3px solid #fa8e45", padding: "8px 0px" }}>
            <span style={{color: "#4e63bd"}}>ABC</span>
            <span> </span>
            <span style={{color: "#fa8e45"}}>E-learning</span>
        </span>
        <h1>{title}</h1>
        <p style={{
            maxWidth: "500px",
            textAlign: "center",
            margin: "0 auto"
        }}>{description}</p>
    </div>
}

const Block1 = () => {
    return <section>
        <MyTitle title="GREAT APPS FOR YOU" description="Practice right now with our free apps!" />

    </section>
}

const Block2 = ({ isMobile }) => {
    return <section>
        <MyTitle title="SOME OF THE BEST FEATURES" description="With thousands of exam-simulated questions with detail explanations, lifetime access to the complete Manual, and dozens of test-taking strategies, our Test Prep helps you pass your test with flying colors." />
        <Container>
            <Grid container spacing={3} alignItems="center">
                {isMobile ? null : <Grid item xs={12} sm={6} md={3}>
                    <LazyLoad><img src="/images/test5.png" alt="static-img" alt='With thousands of exam-simulated questions with detail explanations, lifetime access to the complete Manual, and dozens of test-taking strategies, our Test Prep helps you pass your test with flying colors' /></LazyLoad>
                </Grid>}
                <Grid item xs={12} sm={12} md={9}>
                    <Grid container>
                        <Block2Item
                            icon={<span>free</span>}
                            title="COMPLETELY FREE"
                            description="Our application is 100% free, so you can practice your test in our web or in any other devices with our available free app on google play or appStore. No internet connection and no registration required."
                        />
                        <Block2Item
                            icon={<EditIcon />}
                            title="PRACTICE BY TOPICS"
                            description="Test your knowledge by practicing by topics exactly as in real test. Moreover, topic is also divided into small parts which helps you get your interest in studying, just like playing a game."
                        />
                        <Block2Item
                            icon={<DashboardIcon />}
                            title="CUSTOMIZE YOUR EXAM"
                            description="You can design your test so that it works best for you. Gradually set the test as close as the real test to ready for it. This is the most effective way that helps many people get over their challenge."
                        />
                        <Block2Item
                            icon={<HowToRegIcon />}
                            title="SPECICAL REVIEW MODE"
                            description="With this feature, you can review which questions you are weak, medium or strong. And this will help you find out where you need to work more and make the most of your study time."
                        />
                    </Grid>
                </Grid>
            </Grid>
            <div style={{height: "50px"}}></div>
            <Grid container>
                <ActiveItem value="10,123" title="Users" />
                <ActiveItem value="20,432" title="Download" />
                <ActiveItem value="7871" title="Likes" />
                <ActiveItem value="945" title="5 star rating" />
            </Grid>
        </Container>
    </section>
}

const Block2Item = ({ icon, title, description }) => {
    return <>
        <Grid item xs={false} sm={1} md={1}></Grid>
        <Grid item xs={12} sm={5} md={5}>
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
            <div style={{marginTop: "20px", marginBottom: "20px"}}>
                <strong>{title}</strong>
                <p>{description}</p>
            </div>
        </Grid>
    </>
}

const ActiveItem = ({ value = '', title = '' }) => {
    const styles = useStyles()
    return (
        <Grid item xs={6} sm={3} style={{textAlign: "center"}}>
            <strong className="text-bg">{value}</strong>
            <span>{title}</span>
        </Grid>
    );
}

const Block3 = () => {
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
        return <CircularProgress />
    }
    if(userRates.length == 0){
        return null
    }
    return (
        <section>
            <Container>
                <MyTitle title="FEEDBACKS" />
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
                borderRadius: "20px",
                padding: "20px",
                background: "linear-gradient(180deg,#C8ADC2 0%,#A08FBA 100%),linear-gradient(0deg,rgba(255,255,255,0.8),rgba(255,255,255,0.8))"
            }}>
                <LazyLoad><img 
                    style={{ margin: "20px auto", display: "block" }}
                    src={index % 3 === 0 ? "/images/avatar-1.png" : (index % 3 === 1 ? "/images/avatar-2.png" : "/images/avatar-3.png")} alt="avatar"></img></LazyLoad>
                <div>
                    <div style={{ textAlign: "center", margin: "20px auto", fontSize: "1.1em" }}><strong>{name}</strong></div>
                    <div style={{ minHeight: "140px" }} className="dot-7">{content}</div>
                </div>
            </div>
        </div>
    );
}

const FooterPanel = ({ isMobile }) => {
    const styles = useStyles()
    return <footer style={{ backgroundColor: "#4E63BD", padding: "20px 0" }}>
        <Container>
            <Grid container>
                <Grid item xs={12} sm={6} md={4}>
                    <a href="/">
                        <img src="/images/logo-landing.png" width="240px" height="60px" />
                    </a>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <div style={{fontSize: "20px", marginBottom: "20px"}}><strong>Resources</strong></div>
                    <div>
                        <div><a href="/blog" className={styles.tagAFooter}>Blog</a></div>
                        <div><a href="https://passemall.com/blog/about-us-5634123102158848" className={styles.tagAFooter}>About us</a></div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
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