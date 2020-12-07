import { CircularProgress, Container, Grid, IconButton, Link, makeStyles, SwipeableDrawer } from "@material-ui/core";
import { Menu as MenuIcon } from '@material-ui/icons';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import fs from "fs";
import { useRouter } from "next/router";
import path from "path";
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import LazyLoad from "react-lazyload";
import FooterPanel from "../../components/new/FooterPanel";
import SEO from '../../components/SEO';
import { APP_NEW_DOMAIN, GA_ID } from '../../config_app';
import { callApi } from "../../services";
import { getRecentPosts, getWebContext, scrollDown } from '../../utils';
import './blog.css';

const useStyles = makeStyles({
    bgheader: props => {
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
            backgroundSize: "auto, auto 100%",
            height: "100%",
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
const ListBlog = ({ appInfo, url, isMobile }) => {
    useEffect(() => {
        ReactGA.pageview('/blog');
    }, [])
    console.log("appInfo", appInfo)
    return (
        <>
            <SEO url={url} appInfo={appInfo ? appInfo : { title: "ABC Elearning - Blog" }}
            />
            <main style={{height:"100%"}}>
                <LazyLoad height={1000}>
                    <HeaderBannerPanel appInfo={appInfo} isMobile={isMobile} />
                </LazyLoad>
                <div style={{ height: "50px" }}></div>
                <LazyLoad height={2000}>
                    <BodyPanel appInfo={appInfo} isMobile={isMobile} />
                </LazyLoad>
            </main>
        </>
    )
}

const HeaderBannerPanel = ({ isMobile, appInfo }) => {
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
                        <MenuIcon style={{ color: isMobile ? "white" : "#3f51b5" }} />
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
                        color: isMobile ? "white" : "#3f51b5",
                    }}>Happier study, easier pass with our free practice tests</h1>
                    <p style={{
                        minHeight: isMobile ? "120px" : "0",
                        display: "flex",
                        alignItems: "center",
                        color: isMobile ? "white" : "#3f51b5",
                        fontSize: "1.1em",
                    }}>We are here for your success because your success is our last goal! That's why we have tried our best to bring you all free, friendly, and funny test prep solutions.</p>
                    <div style={{height: "32px"}}></div>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                
            </Grid>
        </Container>
        <div></div>
    </div>
}

const HeaderMenu = ({ styles, isMobile, appInfo }) => {
    return <>
        <div className={isMobile ? "" : styles.flex}>
            <a href="/" className={styles.headerMenu}>HOME</a>
            <a href={"/blog"} className={`${styles.headerMenu} ${styles.headerMenuActive}`}>BLOG</a>
            <span className={styles.headerMenu} onClick={() => {
                scrollDown()
            }}>SUPPORT</span>
        </div>
    </>
}

const BodyPanel = ({ appInfo, isMobile }) => {
    console.log("xxxxxxxxx")
    const [postInfos, setPostInfos] = useState(null)
    useEffect(() => {
        callApi({ url: '/new/api?type=get-all-new-info' + (appInfo.id ? '&appId=' + appInfo.id : ''), params: null, method: 'post' }).then((data) => {
            setPostInfos(data)
        });
    }, [appInfo])
    if(!postInfos){
        return <div style={{
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            padding: "40px"
        }}>
            <CircularProgress />
        </div>
    }
    if(postInfos.length == 0){
        return null;
    }
    return <>
        <section>
            <div style={{height: "50px"}}></div>
            <Container>
                <Grid container spacing={2}>
                    <Grid container item xs={12} sm={12} md={8}>
                        { postInfos.map((postInfo) => {
                            if(postInfo.title.toLowerCase().includes('about us')){
                                return null
                            }
                            return <BlogItem key={postInfo.id + "-111"} isMobile={isMobile} data={postInfo} />
                        }) }
                    </Grid>
                    <Grid container item xs={12} sm={12} md={4}>
                        <RecentPosts data={postInfos} isMobile={isMobile} />
                    </Grid>
                </Grid>
            </Container>
        </section>
        <FooterPanel isMobile={isMobile} />
    </>
}

const RecentPosts = ({ data, isMobile }) => {
    const [recentPostIds, setRecentPostIds] = useState([]);
    useEffect(() => {
        setRecentPostIds(getRecentPosts());
    }, [])
    if (!recentPostIds || recentPostIds.length == 0) {
        return null;
    }
    let recentPosts = [];
    data && data.forEach(element => {
        if(recentPostIds.indexOf(element.id) > -1){
            recentPosts.push(element);
        } 
    });
    return (<div className="recent-posts">
        <h2 style={{ 
            fontWeight: "600",
            marginTop: "0",
            textDecoration: 'underline',
            marginBottom: "35px"
        }}>Recent Posts</h2>
        <div className="list-recent-posts">
            {recentPosts.map((item, index) => {
                return <BlogItem key={"xxas" + index} data={item} isMobile={isMobile} small={!isMobile && true} />;
            })}
        </div>
    </div>);
}

const getLink = (name, id) => {
    return ("/blog/" + name.toLowerCase().replace("?", "").replace(/ /g, "-") + "-").replace("--", "-") + id
}

const BlogItem = ({ isMobile, data, small }) => {
    const router = useRouter();
    if (!data.bannerImage) {
        data.bannerImage = 'https://storage.googleapis.com/micro-enigma-235001.appspot.com/resources/images/how-to-pass-the-ged-math-test.jpg';
    }
    return (
        <div className="post-item" style={{ marginBottom: small ? "16px" : "32px" }}>
            <Link href={getLink(data.title, data.id)} style={{ textDecoration: "none" }}>
                <Grid container spacing={3}>
                    <Grid container item xs={12} sm={4}>
                        <div className="wrapper-image">
                            <LazyLoad><img height="100%" width="100%" src={data.bannerImage} alt={data.title}></img></LazyLoad>
                        </div>
                    </Grid>
                    <Grid container item xs={12} sm={8} alignContent="flex-start" direction="column">
                        <h2 
                            style={{ 
                                color: "#4E63BD", 
                                fontSize: small ? "16px" : "", 
                                marginBottom: small ? "4px" : "",
                                minHeight: small ? "20px" : "57px"
                            }} 
                            title={data.title}
                            className={ small ? "dot-1" : "dot-2" }
                            >
                            {data.title}
                        </h2>
                        <p style={{ fontSize: small ? "14px" : "18px", marginBottom: "10px", minHeight: small ? "20px" : "90px" }} 
                            className={small ? "dot-2" : "dot-4"}
                            title={data.description}>{data.description}</p>
                        <div style={{marginTop: "auto"}}>
                            <IconButton
                                style={{ 
                                    borderRadius: "0px", 
                                    backgroundColor: "#4E63BD", 
                                    color: "#fff", 
                                    padding: small ? "2px 8px" : "8px 16px", 
                                    fontSize: small ? "12px" : "18px" }}
                                onClick={() => router.push(getLink(data.title, data.id))}>
                                Read More<NavigateNextIcon></NavigateNextIcon>
                            </IconButton>
                        </div>
                    </Grid>
            </Grid>
            </Link>
        </div>
    )
}

// let url = 'https://micro-enigma-235001.appspot.com/new/api?type=get-all-new-info';

export async function getServerSideProps(context) {
    const appNameId = APP_NEW_DOMAIN ? APP_NEW_DOMAIN : (context.params || '').appNameId;
    const directoryAppInfos = path.join(process.cwd(), 'src/data/appInfos.json')
    let appInfosData = fs.readFileSync(directoryAppInfos);
    let mapAppInfos = JSON.parse(appInfosData)
    const appInfo = mapAppInfos[appNameId] || {};
    return getWebContext(context, {
        appInfo
    });
}
export default ListBlog