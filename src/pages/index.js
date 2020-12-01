import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import LazyLoad from 'react-lazyload';
import Footer from '../components/Footer';
import HeaderBanner from '../components/HeaderBanner';
import SEO from '../components/SEO';
import { GA_ID } from '../config_app';
import FeedbackApps from '../container/landingpage/FeedbackApps';
import ListGreatApps from '../container/landingpage/ListGreatApps';
import StatictisApps from '../container/landingpage/StatictisApps';
import { getWebContext, oldUser, setScrollDownAuto } from '../utils';

ReactGA.initialize(GA_ID);
const LandingPage = ({ isMobile, url }) => {
    useEffect(() => {
        ReactGA.pageview('/homepage');
        setScrollDownAuto()
        oldUser();
    }, [])
    return (
        <>
            <SEO url={url}>
                <link rel="stylesheet" type="text/css" href="/styles/landing-page.css" />
            </SEO>
            <div className='body-panel landing-page'>
                <HeaderBanner isMobile={isMobile} />
                <LazyLoad>
                    <ListGreatApps />
                </LazyLoad>
                <LazyLoad><StatictisApps /></LazyLoad>
                <LazyLoad>
                    <link rel="stylesheet" type="text/css" href="/styles/slick.css" />
                </LazyLoad>
                <LazyLoad><FeedbackApps /></LazyLoad>
                <Footer color="#4E63BD"></Footer>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    return getWebContext(context);
}

export default LandingPage;
