import { Button, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import Image from '../components/Image';
import { FixedContainer, MainWidget } from '../components/Widgets';
import { onScrollToElement } from '../models/Utils';
import FeedbackApps from '../container/landingpage/FeedbackApps';
import ListGreatApps from '../container/landingpage/ListGreatApps';
import StatictisApps from '../container/landingpage/StatictisApps';
import ReactGA from 'react-ga';
import Footer from '../components/Footer';
import fs from 'fs';
import path from 'path'
import Head from 'next/head';
function initializeReactGA() {
    ReactGA.initialize('UA-167769768-1');
}
initializeReactGA();
const LandingPage = ({ appInfoState, userRateState }) => {
    const description = "With thousands of our FREE practice questions, we are here to help you achieve your gate of success with our test prep solutions."
    const title = "ABC Learning"

    useEffect(() => {
        ReactGA.pageview('/homepage');
    }, [])
    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                <title>ABC Learning</title>
                <link rel="apple-touch-icon" href="images/logo60.png" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap"></link>
                <link rel="manifest" href="manifest.json" />
                <link rel="icon" href="images/logo.svg" />
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                <link rel="stylesheet" type="text/css" href="/styles/landing-page.css" />
                <link rel="stylesheet" type="text/css" href="/styles/main.css" />
                <link rel="stylesheet" type="text/css" href="/styles/index.css" />
                <link rel="preconnect" href="https://storage.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <meta property="og:type" content="website" />
                <meta name="title" content={title} />
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="keywords" content="Abc e-learning, abc elearning, study online, practice test, practice question, exam prepare, asvab, teas exam, cdl test, cdl practice, cissp exam, cissp practice, accuplacer, comptia practice test, comptia A+, compTIA Network, comptia security, dmv, dmv practice test, driving theory, driving theory UK, G1 test, GED, hesi, hesi A2, motorcycle permit, pmp, pmp exam, ptcb, ptce, real estate exam, practice app, practice test onl, free practice test, free practice questions, free practice app" />
            </Head>

            <MainWidget className={'landing-page'}>
                <Header />
                <StatictisApps />
                <FeedbackApps userRateState={userRateState} />
                <ListGreatApps appInfoState={appInfoState} />
                <Footer alt="ABC Elearning" />
            </MainWidget>
        </>
    );
}

const Header = () => {
    return (
        <header>
            <FixedContainer>
                <Grid container alignItems="center" justify="space-between" className="header-tab-panel">
                    <div className="parent-logo">
                        <a href="/" className="logo">
                            <strong>A B C</strong>
                            <div>E-Learning</div>
                        </a>
                    </div>
                    <div className="menu-appbar">
                        <div className="space-header"></div>
                        <Button
                            className="header-button header-button-right"
                            variant="contained"
                            color="secondary"
                            suppressHydrationWarning={true}
                            onClick={(event) => {
                                onScrollToElement('.list-great-apps');
                            }}
                        >
                            Explore Our Exams
                        </Button>
                    </div>
                </Grid>
                <div style={{ width: "100%", height: "20px" }}></div>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item xs={12} sm={7} className="header-content">
                        <h1 style={{ fontWeight: 600 }}>Make your study great with our thousands of free practice questions</h1>
                        <p>You want to get 100% ready for your important day? You desire to pass your exam at your first try?
                        You are wondering if you should pay a charge of money buying some practice materials?
                            That’s why we are here to support you achieve the gate of success with our test prep solutions.</p>
                    </Grid>
                    <Grid item xs={12} sm={5} className="header-image-content">
                        <Image alt='Make your study great with our thousands of free practice questions' src="/images/ImageHeader.png" />
                    </Grid>
                </Grid>
            </FixedContainer>
        </header>
    );
}
export async function getStaticProps(context) {
    const directoryAppInfo = path.join(process.cwd(), 'src/data/appInfo.json')
    var appInfoFile = fs.readFileSync(directoryAppInfo);
    const appInfoState = Object.values(JSON.parse(appInfoFile))
    const directoryUserRate = path.join(process.cwd(), 'src/data/userRatePerfect.json')
    let userRateFile = fs.readFileSync(directoryUserRate);
    const useRateState = Object.values(JSON.parse(userRateFile));
    return {
        props: {
            appInfoState: appInfoState,
            userRateState: useRateState
        }

    }
}

export default LandingPage;
