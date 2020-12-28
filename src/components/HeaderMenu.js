import { Container, Grid, Link, SwipeableDrawer, useMediaQuery, useTheme } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from "react";
import ReactGA from 'react-ga';
import { APP_NEW_DOMAIN } from "../config_app";
import { isSuperApp } from "../utils";

const HeaderMenu = ({ appInfo, darkMode, noHeader, headerMenu }) => {
    if(noHeader === true){
        return <Content appInfo={appInfo} darkMode={darkMode} headerMenu={headerMenu} />
    }
    return <header>
        <Content appInfo={appInfo} darkMode={darkMode} headerMenu={headerMenu} />
    </header>
}

const Content = ({ appInfo, headerMenu, darkMode }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    const [openDrawer, setOpenDrawer] = useState(false);
    const handleOpenDrawer = (open) => setOpenDrawer(open)
    return <Container style={isMobile ? {padding: "0"} : {}}>
        <Grid container alignItems="center" justify="space-between">
            <a href="/" style={{padding: "10px 0"}}>
                <img src={darkMode ? "/images/logo/logo-light.svg" : "/images/logo/logo-dark.svg"} alt="ABC Elearning" width={isMobile ? "185px" : "240px"} height={isMobile ? "45px" : "60px"}></img>
            </a>
            {!isMobile ? <div className="header-menu">
                {headerMenu ? headerMenu : <MenuList isMobile={isMobile} appInfo={appInfo} />}
            </div> : <div className="header-menu-mobile">
                {/* <IconButton onClick={() => handleOpenDrawer(true)}>
                    <MenuIcon style={{ color: "#fff" }}></MenuIcon>
                </IconButton> */}
                <button style={{backgroundColor: "transparent", outline: "none", border: "none"}} onClick={() => handleOpenDrawer(true)}>
                    <MenuIcon style={{ color: darkMode ? "white" : "#1E3094" }}></MenuIcon>
                </button>
                <SwipeableDrawer
                    className="header-menu-swipe"
                    anchor="right"
                    open={openDrawer}
                    onClose={() => {
                        handleOpenDrawer(false);
                    }}
                    onOpen={() => handleOpenDrawer(true)}
                >
                    <div style={{ width: "200px" }} className="menu-list">
                        <div className="header-mobile-bg">
                            <a href="/">
                                <img src="/images/logo-landing.png" alt="ABC Elearning" width="100%"></img>
                            </a>
                        </div>
                        {headerMenu ? headerMenu : <MenuList isMobile={isMobile} appInfo={appInfo} />}
                    </div>
                </SwipeableDrawer>
            </div>}
        </Grid>
    </Container>
}

const MenuList = ({ appInfo, isMobile }) => {
    let rootLink = '/';
    if(!APP_NEW_DOMAIN && appInfo && appInfo.id){
        rootLink = '/' + appInfo.appNameId;
    }
    return <>
        {(appInfo && appInfo.urlAndroid || appInfo && appInfo.urlIos) ? <div style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center"
        }}>
            {appInfo && appInfo.urlAndroid ? <a 
                style={isMobile ? { padding: "5px" } : {}}
                target="_blank" 
                className="tag-a" 
                href={appInfo.urlAndroid}>
                <img alt="google play link" width="120px" src="/images/googlePlayIcon.png" />
            </a> : null}
            {isMobile ? null : <div style={{width: "15px"}}></div>}
            {appInfo && appInfo.urlIos ? <a
                style={isMobile ? { padding: "5px" } : {}}
                target="_blank" className="tag-a" href={appInfo.urlIos}>
                <img alt="app store link" width="120px" src="/images/appStoreIcon.png" />
            </a> : null}
        </div> : null}
        <div>
            <a href={rootLink} onClick={() => {
                ReactGA.event({
                    action: "click-header-home",
                    label: "Click Header Menu Home",
                    category: "click-header-menu",
                })
            }}>HOME</a>
        </div>
        <div onClick={() => {
                ReactGA.event({
                    action: "click-header-learn",
                    label: "Click Header Menu Learn",
                    category: "click-header-menu",
                })
            }}>
            <Link href={rootLink}>LEARN</Link>
        </div>
        <div onClick={() => {
                ReactGA.event({
                    action: "click-header-test",
                    label: "Click Header Menu Test",
                    category: "click-header-menu",
                })
            }}>
            <Link href={rootLink + (rootLink == '/' ? "" : "/") + "test"}>TEST</Link>
        </div>
        <div onClick={() => {
                ReactGA.event({
                    action: "click-header-review",
                    label: "Click Header Menu Review",
                    category: "click-header-menu",
                })
            }}>
            <Link href={rootLink + (rootLink == '/' ? "" : "/") + "review"}>REVIEW</Link>
        </div>
        <div onClick={() => {
                ReactGA.event({
                    action: "click-header-blog",
                    label: "Click Header Menu Blog",
                    category: "click-header-menu",
                })
            }}>
            <Link href={"/blog" + (appInfo ? "?appId=" + appInfo.id : '')}>BLOG</Link>
        </div>
    </>
}

export default HeaderMenu;