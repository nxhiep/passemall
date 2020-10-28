import { Container, Drawer, IconButton, List, ListItem, ListItemText, SwipeableDrawer } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import MenuIcon from '@material-ui/icons/Menu';
import { SocialWidget } from '../SocialWidget';
import MenuIconButton from '@material-ui/icons/Menu';
import ReactHtmlParser from 'react-html-parser';

export const HeaderBlog = ({ appId, faq }) => {
    const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    return <header className="header-blog">
        <Container style={{ display: "flex", height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <a href='/'>
                <div className="header-app">
                    <img src="/images/logo-landing.png" alt="logo-app"></img>
                </div>
            </a>
            {isMobile ? <MenuPanel /> : <div className="header-menu-pc">
                <a href='/'>Home</a>
                <a href='/blog' className={faq ? "" : "active"}>Blog</a>
                {appId && appId > 0 ? <a href={'/faq?appId=' + appId} className={faq ? "active" : ""}>FAQ</a> : null}
            </div>}
        </Container>
    </header>
}

const MenuPanel = () => {
    // return <div></div>
    return <MyDrawer />
}

export const BannerBlog = ({title, bannerImage}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    const styles = { zIndex: "1000", position: "absolute", top: "100px", right: "80px", color: "#fff", display: "flex", flexDirection: "column" };
    if(isMobile){
        styles.position = '';
        styles.textAlign = 'center';
        styles.marginTop = '20px';
    }
    if(title){
        styles.fontSize = '40px';
        styles.fontWeight = '600';
    }
    let arr = title ? title.split(" ") : [];
    if(title && arr.length > 7){
        let temp = [];
        for(let s of title.split(arr[4])){
            temp.push(s + (temp.length == 0 ? arr[4] : ''));
        }
        title = temp;
        styles.textAlign = 'center';
    }
    return <div className="banner-blog" style={bannerImage ? { backgroundImage: 'url('+bannerImage+')' } : {}}>
        <div className="wrapper-banner-image">
        </div>
        {typeof title === 'string' ? <div style={styles}>{title}</div> : 
        (typeof title === 'object' ? <div style={styles}>{title.map((e, i) => {
            return <div key={i}>{e}</div>
        })}</div> : null)}
        <SocialWidget />
    </div>
}

const MyDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (event, open) => {
    if (typeof event === 'undefined' || event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    // console.log("xxxxxxx open", open);
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
