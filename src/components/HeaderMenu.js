import { Container, Grid, IconButton, SwipeableDrawer, useMediaQuery, useTheme } from "@material-ui/core";
import { isSuperApp } from "../utils";
import { redirectToNewDomain } from '../utils'
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from "react";
import Link from "next/link";

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
    let rootLink = '';
    if(appInfo && (!isSuperApp(appInfo.id) || !redirectToNewDomain)){
        rootLink = '/'+appInfo.appNameId+'/';
    }
    return <>
        <div>
            <a href={rootLink}>HOME</a>
        </div>
        <div>
            <Link href={rootLink}><a>LEARN</a></Link>
        </div>
        <div>
            <Link href={rootLink + "test"}><a>TEST</a></Link>
        </div>
        <div>
            <Link href={rootLink + "review"}><a>REVIEW</a></Link>
        </div>
        <div>
            <Link href={"/blog" + (appInfo ? "?appId=" + appInfo.id : '')}><a>BLOG</a></Link>
        </div>
    </>
}

export default HeaderMenu;