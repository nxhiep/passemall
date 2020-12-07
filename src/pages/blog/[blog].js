import { CircularProgress, Container, Grid, IconButton, Link, makeStyles, SwipeableDrawer, useMediaQuery, useTheme } from '@material-ui/core';
import { ExpandLess as ExpandLessIcon, Menu as MenuIcon } from '@material-ui/icons';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import fs from "fs";
import { useRouter } from 'next/router';
import path from "path";
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import ReactHtmlParser from 'react-html-parser';
import LazyLoad from 'react-lazyload';
import Slider from 'react-slick';
import FooterPanel from '../../components/new/FooterPanel';
import SEO from '../../components/SEO';
import { SocialWidget } from '../../components/SocialWidget';
import { GA_ID } from '../../config_app';
import SEOInfo from '../../models/SEOInfo';
import { callApi } from '../../services';
import { addRecentPost, getWebContext, isAppDMV, scrollDown } from '../../utils';
import './blog-info.css';

const useStyles = makeStyles({
    bgheader: props => {
        return {
            background: props.isMobile ? "url(/images/new/banner-right.jpg) no-repeat" : "url(/images/new/banner-left.jpg) no-repeat, url(/images/new/banner-right.jpg) no-repeat",
            backgroundPosition: props.isMobile ? "top" : "top left, top right",
            backgroundSize: props.isMobile ? "cover" : "auto, auto 100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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
                fontWeight: "500",
                cursor: "pointer",
            }
        }
        return {
            padding: "10px 20px",
            textDecoration: "none",
            color: "#3f51b5",
            fontWeight: "600",
            cursor: "pointer",
            position: "relative",
        }
    },
    menuButton: {
        backgroundColor: "transparent",
        border: "none",
        outline: "none"
    },
    headerMenuActive: {
        position: "relative",
        '&::after': {
            content: '""',
            position: "absolute",
            border: "0",
            width: "30px",
            height: "3px",
            background: "orange",
            bottom: "-2px",
            left: "20px",
            borderRadius: "5px"
        }
    }
});

ReactGA.initialize(GA_ID);

const Blog = ({ newInfo, appInfo, isMobile, url }) => {
    console.log("newInfo", newInfo, 'appInfo', appInfo)
    const seoInfo = new SEOInfo(newInfo);
    useEffect(() => {
        ReactGA.pageview('/blog-info', [newInfo.title]);
        addRecentPost(newInfo.id);
    }, [])
    return (
        <>
            <SEO url={url} appInfo={seoInfo} />
            <main style={{height:"100%"}}>
                <LazyLoad height={1000}>
                    <HeaderBannerPanel newInfo={newInfo} appInfo={appInfo} isMobile={isMobile} />
                </LazyLoad>
                <SocialWidget bottom={100} />
                <div style={{ height: "50px" }}></div>
                <BodyPanel newInfo={newInfo} appInfo={appInfo} isMobile={isMobile} />
            </main>
        </>
    );
}

const HeaderBannerPanel = ({ isMobile, appInfo, newInfo }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const handleOpenDrawer = (open) => setOpenDrawer(open)
    const bannerUrl = "/images/blog-background"+(isMobile ? "-mobile" : "")+".jpg";
    const styles = useStyles({ isMobile, bannerUrl });
    return <div className={styles.bgheader}>
        <header className={styles.header}>
            <Container style={{height: "100%"}}>
                <Grid container justify="space-between" alignItems="center" style={{height: "100%"}}>
                    <a href="/" style={{outline:'none'}}><img alt="ABC Elearning Logo" src="/images/logo/logo-dark.svg" width="240px" height="60px" /></a>
                    {isMobile ? <button className={styles.menuButton}
                    onClick={() => {
                        setOpenDrawer(true)
                    }}
                    >
                        <MenuIcon style={{ color: "#3f51b5" }} />
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
                        color: "#3f51b5",
                    }}>{newInfo.title}</h1>
                    <p style={{
                        minHeight: isMobile ? "120px" : "0",
                        display: "flex",
                        alignItems: "center",
                        color: "#3f51b5",
                        fontSize: "1.1em",
                    }}>{newInfo.description}</p>
                    <div style={{height: "32px"}}></div>

                    <DownloadWidget appInfo={appInfo} />
                </Grid>
            </Grid>
        </Container>
        <div></div>
    </div>
}

const DownloadWidget = ({ appInfo }) => {
    if(!appInfo || !appInfo.id){
        return null;
    }
    return <div className={"dropdown-app-panel"} style={{width: "320px"}}>
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
    </div>;
}

const HeaderMenu = ({ styles, isMobile, appInfo }) => {
    return <>
        <div className={isMobile ? "" : styles.flex}>
            <a href="/" className={styles.headerMenu}>HOME</a>
            <a href={"/blog"} className={`${styles.headerMenu} ${styles.headerMenuActive}`}>BLOG</a>
            <span className={styles.headerMenu} onClick={() => {
                scrollDown()
            }}>SUPPORT</span>
            {isAppDMV(appInfo.id) ? <a href={'/faq?appId=' + appInfo.id} className={styles.headerMenu}>FAQ</a> : null}
        </div>
    </>
}

const BodyPanel = ({ newInfo, appInfo, isMobile }) => {
    return <>
        <section>
            <PostContent content={newInfo.content} />
            <LazyLoad>
                <link rel="stylesheet" type="text/css" href="/styles/slick.css" />
                <RelatedStories topicId={newInfo.topicId} isMb={isMobile} />
            </LazyLoad>
            <FooterPanel isMobile={isMobile} />
        </section>
    </>
}

const PostContent = ({content}) => {
    let hasMenu = content.includes('h1') || content.includes('h2') || content.includes('h3');
    let elementId = 'ssadasdasdszcx';
    useEffect(() => {
        replaceHTML(elementId);
    }, []);
    return <Container style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <Grid container alignItems="flex-start" spacing={3}>
            { hasMenu ? <Grid item container xs={12} sm={3} direction="column">
                <div
                    style={{ 
                    padding: '24px', 
                    border: '2px solid rgba(78, 99, 189, 0.46)',
                    boxSizing: 'border-box',
                    borderRadius: '16px',
                    height: '100%'
                    }}
                >
                    <h3 style={{ color: '#4E63BD' }}>Table of contents</h3>
                    <div id="post-menu-auto-gen"></div>
                </div> 
            </Grid> : null}
            <Grid item container xs={12} sm={hasMenu ? 9 : 12} id={elementId}>
                {ReactHtmlParser(content)}
            </Grid>
        </Grid>
    </Container>
}

function replaceHTML(elementId) {
    if(typeof window !== 'undefined'){
        // window.location.hash = '';
        let element = document.getElementById(elementId);
        let h1s = element.querySelectorAll("h1,h2,h3");
        let panel = document.getElementById('post-menu-auto-gen');
        panel.innerHTML = '';
        h1s.forEach(function(e) {
            let text = e.innerText;
            let id = text.replace(/[^a-zA-Z0-9]/g,'_').toLowerCase();
            e.setAttribute('id', id);
            let item = document.createElement("a");
            item.innerHTML = text;
            item.setAttribute('href', '#' + id);
            let itemP = document.createElement("div");
            itemP.classList.add('item');
            itemP.appendChild(item);
            panel.appendChild(itemP);
        });
    }
}

const RelatedStories = ({ topicId, isMb }) => {
    const theme = useTheme();
    const isMobile = isMb || useMediaQuery(theme.breakpoints.between(0, 780));
    const isTablet = useMediaQuery(theme.breakpoints.between(0, 1200));
    const [relativeds, setRelativeds] = useState(null)
    useEffect(() => {
        callApi({
            url: `/new/api?type=get-new-info-relatived&topicId=${topicId}`
        }).then((data) => {
            setRelativeds(data)
        }).catch(e => {
            setRelativeds([])
        })
    }, [topicId])
    if(!relativeds){
        return <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "30px auto"
        }}>
            <CircularProgress />
        </div>
    }
    if(relativeds.length == 0){
        return null;
    }
    if(relativeds.length >= 4 || (isMobile && relativeds.length > 1) || (isTablet && relativeds.length > 2)){
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: isMobile ? 1 : (isTablet ? 2 : 3),
            slidesToScroll: isMobile ? 1 : (isTablet ? 2 : 3),
            className: "related-stories-slider",
            centerPadding: '20px'
        };
        return (
            <Container style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                <h2 style={{textAlign: "center"}}>Related Stories</h2>
                <Slider {...settings}>
                    {
                        relativeds.concat(relativeds).map(e => {
                            return <div key={e.id} className="padding-10">
                                <BlogItem item={e} />
                            </div>
                        })
                    }
                </Slider>
            </Container>
        );
    }
    return <Container style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <h2 style={{textAlign: "center"}}>Related Stories</h2>
        <Grid wrap="wrap" container spacing={3}>
            {relativeds.map(e => {
                return <Grid key={e.id} className="recent-post-item post-item" item container xs={12} sm={6} lg={4}>
                    <BlogItem item={e} />
                </Grid>
            })}
        </Grid>
    </Container>
}

const getLink = (name, id) => {
    return ("/blog/" + name.toLowerCase().replace("?", "").replace(/ /g, "-") + "-").replace("--", "-") + id
}

const BlogItem = ({ item }) => {
    const router = useRouter();
    if (!item.bannerImage) {
        item.bannerImage = 'https://storage.googleapis.com/micro-enigma-235001.appspot.com/resources/images/how-to-pass-the-ged-math-test.jpg';
    }
    return (
            <Link href={getLink(item.title, item.id)} style={{width: "100%", textDecoration: "none"}}>
                <Grid container spacing={1}>
                    <Grid container item xs={12}>
                        <div className="wrapper-image">
                            <img src={item.bannerImage}></img>
                        </div>
                    </Grid>
                    <Grid container item xs={12}>
                        <div className="dot-2" style={{ color: "#4E63BD", margin: "10px 0", fontSize: "1.2em", minHeight: "47px" }}>
                            <strong>{item.title}</strong>
                        </div>
                        <div style={{height: "8px", width: "100%"}}></div>
                        <div style={{ fontSize: "16px", minHeight: "56px" }} className="dot-3">{item.description}</div>
                        <div style={{height: "8px", width: "100%"}}></div>
                        <IconButton
                            style={{ borderRadius: "0px", backgroundColor: "#4E63BD", color: "#fff", padding: "4px 8px", fontSize: "16px" }}
                            onClick={() => router.push(getLink(item.title, item.id))}>
                            Read More<NavigateNextIcon></NavigateNextIcon>
                        </IconButton>
                    </Grid>
                </Grid>
            </Link>
    );
}

export async function getServerSideProps(context) {
    let blogId = context.params.blog.substring(context.params.blog.length - 16)
    const newInfo = await callApi({ url: `/new/api?type=get-new-info-by-id&id=${blogId}`, params: null, method: 'post' })
    let appInfo = {};
    if(newInfo && newInfo.appId){
        const directoryAppInfos = path.join(process.cwd(), 'src/data/appInfos.json')
        let appInfosData = fs.readFileSync(directoryAppInfos);
        let mapAppInfos = JSON.parse(appInfosData)
        appInfo = mapAppInfos[newInfo.appId] || {};
    }
    return getWebContext(context, {
        appInfo,
        newInfo
    });
}
export default Blog;
