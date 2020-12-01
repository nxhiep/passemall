import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import { Computer as ComputerIcon, ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import fs from "fs";
import path from "path";
import { useState } from "react";
import LazyLoad from "react-lazyload";
import SEO from "../../components/SEO";
import { APP_NEW_DOMAIN } from "../../config_app";
import { getHeaderBanner, getWebContext, isSuperApp, scrollDown, scrollToTopic } from "../../utils";
import './app.css';

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
                backgroundSize: "1000px"
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
            color: props.bannerUrl ? "white" : "#4e63bd",
            fontWeight: "600",
            cursor: "pointer",
            '&:hover': {
                textDecoration: "underline"
            }
        }
    },
});

const App = ({ appInfo, url, isMobile }) => {
    return <main style={{
        display: "flex",
        flexDirection: "column"
    }}>
        <SEO url={url} appInfo={appInfo} />
        <HeaderBannerPanel isMobile={isMobile} appInfo={appInfo} />
        <BodyPanel isMobile={isMobile} />
        <FooterPanel isMobile={isMobile} />
    </main>
}

const HeaderBannerPanel = ({ isMobile, appInfo }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const handleOpenDrawer = (open) => setOpenDrawer(open)
    const superApp = isSuperApp(appInfo.id)
    const bannerUrl = superApp ? getHeaderBanner(appInfo.id) : null
    const [openDownload, setOpenDownload] = useState(false)
    const styles = useStyles({ isMobile, bannerUrl: bannerUrl, openDownload });
    return <>
        <div className={styles.bgheader}>
            <div className={styles.headerTemp}>
                <header className={styles.header}>
                    <Container style={{height: "100%"}}>
                        <Grid container justify="space-between" alignItems="center" style={{height: "100%"}}>
                            <a href="/"><img src={superApp ? "/images/logo-landing.png" : "/images/logo-landing-2.png"} width="240px" height="60px" /></a>
                            {isMobile ? <button className={styles.menuButton}
                            onClick={() => {
                                setOpenDrawer(true)
                            }}
                            >
                                <MenuIcon />
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
                                    <a href="/"><img width="200px" height="48px" src="/images/logo-landing.png" /></a>
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
                                minHeight: isMobile ? "180px" : "0",
                                display: "flex",
                                alignItems: "center",
                                color: superApp ? "white" : "#1e3094"
                            }}>Make your study great with our thousands of free practice questions</h1>
                            <p style={{
                                minHeight: isMobile ? "180px" : "0",
                                display: "flex",
                                alignItems: "center",
                                color: superApp ? "white" : "#333",
                                fontSize: "1.1em",
                                fontWeight: "500"
                            }}>You want to get 100% ready for your important day? You desire to pass your exam at your first try? You are wondering if you should pay a charge of money buying some practice materials? That’s why we are here to support you achieve the gate of success with our test prep solutions.</p>
                            <div style={{height: "32px"}}></div>
                            <div className={styles.flex} style={{flexWrap: "wrap"}}>
                                <Button variant="contained" color="inherit" style={{
                                    borderRadius: "40px",
                                    fontWeight: "bold",
                                    marginTop: "10px"
                                }} >
                                    <ComputerIcon />
                                    <span style={{width: "10px"}}></span>
                                    <span>Start your test</span>
                                </Button>
                                <div style={{width: "32px"}}></div>
                                <div className="dropdown-app-panel">
                                    <button variant="outlined" color="inherit">
                                        <span>Download on your mobile device</span>
                                        <span style={{width: "10px"}}></span>
                                        {openDownload ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
                        </Grid>
                        {isMobile ? null : <Grid item xs={12} sm={5} md={5}>
                            <img width="100%" src="/images/test3.png" style={superApp ? {} : {
                                position: "relative",
                                bottom: "-60px"
                            }} />
                        </Grid>}
                    </Grid>
                </Container>
            </div>
        </div>
    </>
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

const BodyPanel = ({ isMobile }) => {
    return <div>
        BodyPanel {isMobile}
    </div>
}

const FooterPanel = ({ isMobile }) => {
    return <div>
        FooterPanel {isMobile}
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

export default App;