import { Button, Container, Grid, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import fs from 'fs';
import Head from 'next/head';
import path from 'path';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { ConnectAppStore, LoadingWidget } from '../components/Widgets';
import ReactHtmlParser from 'react-html-parser';
import Routes from "../routes";

const FAQ = ({ appInfo }) => {
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
                <link rel="stylesheet" type="text/css" href="/styles/faq.css" />
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
                            <h1 style={{
                                color: '#4E63BD',
                                textAlign: 'center'
                            }}>Happier study easier pass with our FREE {appInfo.appName.toUpperCase()}</h1>
                            <div className="app-info-panel">
                                <ConnectAppStore appInfo={appInfo} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <img src={'/images/screenshot.png'} style={{ width: "100%", margin: "0 auto", display: "block" }} />
                        </Grid>
                    </Grid>
                </Container>
                <section style={{
                    backgroundImage: "url(/images/background-header.png)",
                    height: "120px", 
                    width: "100%"
                }}>
                    <Container style={{ height: '100%' }}>
                        <Grid style={{ height: '100%' }} container alignItems="center" justify="space-between">
                            <h2
                                style={{ color: 'white' }}
                            >Practice using our expertly crafted question!</h2>
                            <Button
                                style={{ 
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    fontSize: '18px',
                                    padding: '8px 16px',
                                    color: '#673AB7'
                                }}
                            >Start Practice Test</Button>
                        </Grid>
                    </Container>
                </section>

                <FAQsWidget appInfo={appInfo} />
                <Footer color="#4E63BD"></Footer>
            </div>
        </>
    )
}



const FAQsWidget = ({ appInfo }) => {
    const [stateId, setStateId] = useState(-1);
    const [states, setStates] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [statusState, setStatusState] = useState(0);
    const [statusFAQ, setStatusFAQ] = useState(0);
    useEffect(() => {
        if(appInfo.hasState){
            getStates(appInfo.id);
        } else {
            getFAQByStateIdAndAppId(-1, appInfo.id);
        }
    }, [appInfo]);
    const getStates = (appId) => {
        setStatusState(1);
        let url = "https://hiep-dot-micro-enigma-235001.appspot.com/new/api?type=get-states&appId=" + appId;
        fetch(url).then((res) => res.json()).then(data => {
            setStatusState(2);
            setStates(data && data.length > 0 ? data : []);
        })
    };
    const getFAQByStateIdAndAppId = (stateId, appId) => {
        if(stateId < 0){
            return;
        }
        setStatusFAQ(3);
        if(5082322646859776 == appId){
            appId = 5638501471092736;
            stateId = -1;
        }
        let url = "https://hiep-dot-micro-enigma-235001.appspot.com/new/api?type=get-faq&appId=" + appId + "&stateId=" + stateId;
        console.log("getFAQByStateIdAndAppId url", url, 'appId', appId, 'stateId', stateId)
        fetch(url).then((res) => res.json()).then(data => {
            console.log('faqs data', data);
            setStatusFAQ(4);
            setFaqs(data && data.length > 0 ? data : []);
        })
    }
    console.log("states -----", states.length, 'statusFAQ', statusFAQ, 'statusState', statusState);
    return <Container>
        <h2>FAQs</h2>
        {appInfo.hasState ? <Grid className="list-state-selector" 
            container 
            alignItems="center" 
            style={{ padding: "8px", marginBottom: "20px"}}>
            <div style={{ marginRight: "16px" }}>Choose State</div>
            { statusState == 2 ? <Select
                id="select-state"
                value={stateId}
                onChange={(e) => {
                    let stateId = e.target.value;
                    setStateId(stateId);
                    console.log("getFAQByStateIdAndAppId url",stateId)
                    getFAQByStateIdAndAppId(stateId, appInfo.id);
                }}
                input={<Input />}
                >
                {states.map(state => {
                    return <MenuItem  key={state.id} value={state.id}>{state.name}</MenuItem>
                })}
            </Select> : <LoadingWidget style={{width: "44px", margin: "0"}} />}
        </Grid> : null}
        <div className="list-faqs">
            {
                statusFAQ == 4 ? faqs.map((faq, index) => {
                    return <div key={faq.id} style={{ marginBottom: '20px' }}>
                        <div><strong>{index}.</strong> {ReactHtmlParser(faq.question)}</div>
                        <div>{ReactHtmlParser(faq.explanation)}</div>
                    </div>
                }) : ((!appInfo.hasState || stateId > 0) ? LoadingWidget() : null)
            }
        </div>
    </Container>
}

export async function getServerSideProps(context) {
    let appNameId = context.query ? context.query.appId : null;
    if(!appNameId){
        return {};
    }
    const directoryAppInfo = path.join(process.cwd(), `src/data/${appNameId}.json`)
    var appInfoFile = fs.readFileSync(directoryAppInfo);
    const appInfo = JSON.parse(appInfoFile);
    if(!appInfo){
        return {};
    }
    // let url = "https://hiep-dot-micro-enigma-235001.appspot.com/dataapi?type=get-faq&appId=" + appInfo.id;
    // console.log("url", url);
    // const res = await fetch(url);
    // const questions = await res.json();
    // console.log('questions', questions ? questions.length : null);
    return { props: { appInfo: appInfo } }
}
export default FAQ