import { Container, Drawer, IconButton, List, ListItem, ListItemText, SwipeableDrawer } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import MenuIcon from '@material-ui/icons/Menu';
import { SocialWidget } from '../SocialWidget';
import MenuIconButton from '@material-ui/icons/Menu';

export const HeaderBlog = () => {
    const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    return <header className="header-blog">
        <Container style={{ display: "flex", height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="header-app" onClick={() => router.push("/")}>
                <img src="/images/logo-landing.png" alt="logo-app"></img>
            </div>
            {isMobile ? <MenuPanel /> : <div className="header-menu-pc">
                <a href='/'>Home</a>
                <a href='/blog' className="active">Blog</a>
                <a href='/faq'>FAQ</a>
            </div>}
        </Container>
    </header>
}

const MenuPanel = () => {
    // return <div></div>
    return <MyDrawer />
}

export const BannerBlog = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    const styles = { zIndex: "1000", position: "absolute", top: "50px", right: "80px", color: "#fff", display: "flex", flexDirection: "column" };
    if(isMobile){
        styles.position = '';
        styles.textAlign = 'center';
        styles.marginTop = '20px';
    }
    return <div className="banner-blog">
        <div style={styles}>
            <strong style={{ fontSize: isMobile ? "42px" : "52px" }}>5 top questions</strong>
            <span style={{ fontSize: isMobile ? "20px" : "24px", fontStyle: 'normal', fontWeight: '300' }}>Ready for your practical driving test</span>
        </div>
        <SocialWidget />
    </div>
}

const MyDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (event, open) => {
    if (typeof event === 'undefined' || event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    console.log("xxxxxxx open", open);
    setOpen(open);
  };

  return <Fragment>
        <IconButton aria-label="menu" size="small" onClick={ (event) => toggleDrawer(event, true) }>
            <MenuIconButton htmlColor="white" />
        </IconButton>
        <SwipeableDrawer anchor="right" open={open} 
            onOpen={ (event) => toggleDrawer(event, true) }
            onClose={ (event) => toggleDrawer(event, false) }
            >
            <div className="header-menu-mobile">
                <div><a href='/'>Home</a></div>
                <div><a href='/blog' className="active">Blog</a></div>
                <div><a href='/faq'>FAQ</a></div>
            </div>
        </SwipeableDrawer>
    </Fragment>;
}
