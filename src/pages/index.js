import { Container, Grid, IconButton, Link, TextField, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Footer from '../components/Footer';
import HeaderMenu from '../components/HeaderMenu';
import SEO from '../components/SEO';
import { GA_ID } from '../config_app';
import FeedbackApps from '../container/landingpage/FeedbackApps';
import StatictisApps from '../container/landingpage/StatictisApps';
import { oldUser, scrollDown, setScrollDownAuto } from '../utils';

ReactGA.initialize(GA_ID);
const LandingPage = () => {
    useEffect(() => {
        ReactGA.pageview('/homepage');
        setScrollDownAuto()
        oldUser();
    }, [])
    let url = 'http://localhost:3000/';
    return (
        <>
            <SEO url={url ? url : 'http://passemall.com/'} manifest={true}>
                <link rel="stylesheet" type="text/css" href="/styles/slick.css" />
                <link rel="stylesheet" type="text/css" href="/styles/landing-page.css" />
            </SEO>
            <div className='body-panel landing-page'>
                <Header />
                {/* <ListGreatApps /> */}
                <StatictisApps />
                <FeedbackApps />
                <Footer color="#4E63BD"></Footer>
            </div>
        </>
    );
}

const Header = () => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    return <header>
        <Container className="header">
            <HeaderMenu noHeader={true} headerMenu={
                <>
                    <div>
                        <a href="/">HOME</a>
                    </div>
                    <div onClick={() => {
                            ReactGA.event({
                                category: 'Click Blog',
                                action: 'Click Blog Header',
                            })
                        }}>
                        <Link href="/blog">BLOG</Link>
                    </div>
                    <div onClick={() => scrollDown()}>
                        <Link href="/blog">SUPPORT</Link>
                    </div>
                    <SearchPanel />
                </>
            } />
        </Container>
        <div className="header-banner">
            <Container>
                <Grid container alignItems="center" justify="space-between" className="header-media">
                    <Grid item sm={12} md={6} className="header-text-content">
                        <div style={{zIndex: '1', position: 'relative' }}>
                            <h1>Make your study great with our thousands of free practice questions</h1>
                            <p>You want to get 100% ready for your important day? You desire to pass your exam at your first try?
                                You are wondering if you should pay a charge of money buying some practice materials?
                                That’s why we are here to support you achieve the gate of success with our test prep solutions.</p>
                        </div>
                    </Grid>
                    {mdUp ? null : <Grid item xs={1} sm={3} md={false}></Grid>}
                    <Grid item xs={10} sm={6} md={6}>
                        <img style={smDown ? {} : {position: "relative", bottom: "-120px"}} alt='Make your study great with our thousands of free practice questions' width="100%" height="100%" src="/images/test3.png" />
                    </Grid>
                    <Grid item xs={1} sm={3} md={false}></Grid>
                </Grid>
            </Container>
        </div>
    </header>
}

const SearchPanel = () => {
    return <div className="search-header-panel">
        <TextField value={value} placeholder="Search..." id="search-header" color="secondary" className="search-header" onKeyDown={(e) => {
            if(e.keyCode == 'Enter'){
                onSearch(value)
            }
        }} />
        <IconButton
            style={{padding: "0"}}
            onClick={() => {
                onSearch(value)
            }}
        >
            <SearchIcon style={{ fontSize: "25px", color: "white", width: "35px" }} color="inherit"></SearchIcon>
        </IconButton>
    </div>
}

export default LandingPage;
