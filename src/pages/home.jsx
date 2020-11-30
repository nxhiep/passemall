import { Container, Grid, makeStyles } from "@material-ui/core";
import LazyLoad from "react-lazyload";
import SEO from "../components/SEO";
import { getWebContext } from "../utils";
import DashboardIcon from '@material-ui/icons/Dashboard';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import EditIcon from '@material-ui/icons/Edit';

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
    }
})

const Home = ({ isMobile, url }) => {
    return <>
        <SEO url={url} />
        <HeaderBannerPanel isMobile={isMobile} />
        <BodyPanel isMobile={isMobile} />
        <FooterPanel isMobile={isMobile} />
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
        <Block4 />
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
    return (
        <Grid item xs={6} sm={3} style={{textAlign: "center"}}>
            <strong style={{
                fontSize: "35px",
                color: "#639",
                marginRight: "10px",
                fontWeight: "700",
                backgroundImage: "url(/images/background-text.jpg)",
                backgroundRepeat: "repeat",
                backgroundClip: "text",
                webkitBackgroundClip: "text",
                webkitTextFillColor: "transparent",
                textAlign: "center",
                fontWeight: "bold",
                textTransform: "uppercase",
                webkitFontSmoothing: "antialiased"
            }}>{value}</strong>
            <span>{title}</span>
        </Grid>
    );
}

const Block3 = () => {
    return <section>

    </section>
}

const Block4 = () => {
    return <section>
        Block3
    </section>
}

const FooterPanel = ({ isMobile }) => {
    return <main>
        Footer
    </main>
}

export async function getServerSideProps(context) {
    return getWebContext(context);
}

export default Home