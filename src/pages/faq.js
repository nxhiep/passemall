import { Container, Grid } from '@material-ui/core';
import Head from 'next/head';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Routes from "../routes";
import path from 'path';
import fs from 'fs';
import { ConnectAppStore } from '../components/Widgets';

const FAQ = ({ questions }) => {
    useEffect(() => {
        ReactGA.pageview(Routes.FAQ_SCREEN);
    }, [])
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <title>FAQ</title>
                <link rel="icon" href="/images/logo.svg" />
                <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" type="text/css" href="/styles/index.css" />
                <link rel="stylesheet" type="text/css" href="/styles/header.css" />
                <link rel="stylesheet" type="text/css" href="/styles/listblog.css" />
                <link rel="preconnect" href="https://storage.googleapis.com" />
                <link rel="canonical" href="https://passemall.com"></link>
                <meta property="og:type" content="website" />
                <meta name="theme-color" content="#000000" />
                <meta name="title" content="Passemall Blog" />
                <meta name="description" content="xxxxx" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="keywords" content="Abc e-learning, abc elearning, study online,practice test, practice question,exam prepare,asvab,teas exam,cdl test,cdl practice,cissp exam,cissp practice,accuplacer,comptia practice test,comptia A+,compTIA Network,comptia security,dmv,dmv practice test,driving theory,driving theory UK,G1 test,GED,hesi,hesi A2,motorcycle permit,pmp,pmp exam,ptcb,ptce,real estate exam,practice app,practice test onl,free practice test,free practice questions,free practice app" />
            </Head>
            <div className="body-panel">
                <Header isBlog={true}></Header>
                <Container maxWidth="lg">
                    <Grid container>
                        <Grid item xs={12} sm={5}>
                            <h1></h1>
                            {/*<ConnectAppStore />*/}
                        </Grid>
                        <Grid item xs={12} sm={7}></Grid>
                    </Grid>
                </Container>
                <Footer color="#4E63BD"></Footer>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    let appNameId = context.query.appId;
    if(!appNameId){
        return {};
    }
    const directoryAppInfo = path.join(process.cwd(), `src/data/${appNameId}.json`)
    var appInfoFile = fs.readFileSync(directoryAppInfo);
    const appInfo = JSON.parse(appInfoFile);

    console.log('appInfo', appInfo);

    return { props: { appInfo: appInfo } }
}
export default FAQ