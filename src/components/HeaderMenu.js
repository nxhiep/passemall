import { Container, Grid, IconButton, SwipeableDrawer, useMediaQuery, useTheme } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Link from "next/link";
import { useState } from "react";
import { APP_NEW_DOMAIN } from "../config_app";
import { isSuperApp, scrollToTopic } from "../utils";
import ReactGA from 'react-ga';

const HeaderMenu = ({ appInfo }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    const [openDrawer, setOpenDrawer] = useState(false);
    const handleOpenDrawer = (open) => setOpenDrawer(open)
    return <header>
        <Container>
            <Grid container alignItems="center" justify="space-between">
                <a href="/" style={{padding: "10px 0"}}>
                    <img src="/images/logo-landing.png" alt="logo-app" height={isMobile ? "45px" : "60px"}></img>
                </a>
                {!isMobile ? <div className="header-menu">
                    <MenuList appInfo={appInfo} />
                </div> : <div className="header-menu-mobile">
                    <IconButton onClick={() => handleOpenDrawer(true)}>
                        <MenuIcon style={{ color: "#fff" }}></MenuIcon>
                    </IconButton>
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
                                    <img src="/images/logo-landing.png" alt="logo-app" width="100%"></img>
                                </a>
                            </div>
                            <MenuList appInfo={appInfo} />
                        </div>
                    </SwipeableDrawer>
                </div>}
            </Grid>
        </Container>
    </header>
}

const MenuList = ({ appInfo }) => {
    let rootLink = '/';
    if(appInfo && (!isSuperApp(appInfo.id) || !APP_NEW_DOMAIN)){
        rootLink = appInfo.appNameId+'/';
    }
    return <>
        <div>
            <a href={rootLink}>HOME</a>
        </div>
        {!APP_NEW_DOMAIN ? <div>
            <span className="tag-a" href={rootLink} onClick={() => {
                ReactGA.event({
                    category: 'Click Learn',
                    action: 'Click Learn Header'
                })
                scrollToTopic()
            }}>LEARN</span>
        </div> : null}
        {/* <div>
            <Link href={rootLink + "test"}><a>TEST</a></Link>
        </div> */}
        <div>
            <Link href={rootLink + "review"} onClick={() => {
                ReactGA.event({
                    category: 'Click Review',
                    action: 'Click Review Header'
                })
            }}><a>REVIEW</a></Link>
        </div>
        <div>
            <Link href={"/blog" + (appInfo ? "?appId=" + appInfo.id : '')} onClick={() => {
                ReactGA.event({
                    category: 'Click Blog',
                    action: 'Click Blog Header',
                    value: appInfo.id
                })
            }}><a>BLOG</a></Link>
        </div>
    </>
}

export default HeaderMenu;