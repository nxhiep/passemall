import { Button, Container, Grid, Input, MenuItem, Select } from '@material-ui/core';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import ReactHtmlParser from 'react-html-parser';
import { HeaderBlog } from '../components/blog/HeaderBlog';
import Footer from '../components/Footer';
import { ConnectAppStore, LoadingWidget } from '../components/Widgets';
import SEOInfo from '../models/SEOInfo';
import Routes from "../routes";
import { callApi } from '../services';
import { getNewDomain, setScrollDownAuto } from '../utils';

const FAQ = ({ appInfo, url }) => {
    let seoInfo = new SEOInfo();
    seoInfo.title = 'ABC ELearning - FAQ';
    useEffect(() => {
        setScrollDownAuto()
        ReactGA.pageview(Routes.FAQ_SCREEN);
    }, [])
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <title>ABC ELearning - FAQ</title>
                <link rel="icon" href="/images/logo.svg" />
                <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" type="text/css" href="/styles/index.css" />
                <link rel="stylesheet" type="text/css" href="/styles/header.css" />
                <link rel="stylesheet" type="text/css" href="/styles/faq.css" />
                <link rel="stylesheet" type="text/css" href="/styles/listblog.css" />
                <link rel="preconnect" href="https://storage.googleapis.com" />
                <link rel="canonical" href="https://passemall.com"></link>
                <meta property="og:type" content="website" />
                <meta name="theme-color" content="#000000" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <link rel="canonical" href={"https://passemall.com" + url}></link>

                <meta name="title" content={seoInfo.title} />
                <meta name="description" content={seoInfo.description} />
                <meta name="keywords" content={seoInfo.keyword} />
                <meta property="og:title" content={seoInfo.title} />	
                <meta property="og:description" content={seoInfo.descriptionSEO} />
                <meta property="og:image" content={seoInfo.image} />
            </Head>
            <div className="body-panel">
                <HeaderBlog faq={true} appId={appInfo.id} />
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
                    width: "100%",
                    backgroundSize: "100%",
                    backgroundRepeat: 'no-repeat'
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
                                onClick={() => {
                                    let link = '/' + appInfo.appNameId + '/test';
                                    let domain = getNewDomain(appInfo.id);
                                    if(domain){
                                        link = domain + '/test';
                                    }
                                    window.location.href = link;
                                }}
                            >START PRACTICE TEST</Button>
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
        let url = "https://micro-enigma-235001.appspot.com/new/api?type=get-states&appId=" + appId;
        fetch(url).then((res) => res.json()).then(data => {
            setStatusState(2);
            setStates(data && data.length > 0 ? data : []);
            if(data && data.length > 4){
                setStateId(data[5].id)
                getFAQByStateIdAndAppId(data[5].id, appInfo.id);
            }
        })
    };
    const getFAQByStateIdAndAppId = (stateId, appId) => {
        // console.log("getFAQByStateIdAndAppId stateId", stateId)
        if(stateId < 0){
            return;
        }
        setStatusFAQ(3);
        if(5082322646859776 == appId){
            appId = 5638501471092736;
            stateId = -1;
        }
        let url = "https://micro-enigma-235001.appspot.com/new/api?type=get-faq&appId=" + appId + "&stateId=" + stateId;
        fetch(url).then((res) => res.json()).then(data => {
            ('faqs data', data);
            setStatusFAQ(4);
            setFaqs(data && data.length > 0 ? data : []);
        })
    }
    return <Container>
        <h2>FAQs</h2>
        {appInfo.hasState ? <Grid className="list-state-selector" 
            container 
            alignItems="center" 
            style={{ padding: "8px 0", marginBottom: "20px"}}>
            <div style={{ marginRight: "16px", fontWeight: '600' }}>Choose State</div>
            { statusState == 2 ? <Select
                id="select-state"
                value={stateId}
                onChange={(e) => {
                    let stateId = e.target.value;
                    setStateId(stateId);
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
    let appId = -1;
    if(appNameId.length < 20){
        try {
            appId = parseInt(appNameId);
        } catch(e){}
    }
    const appInfo = await callApi({ url: '/data?type=get_app_info&appNameId=' + (appId > -1 ? appId : appNameId), params: null, method: 'post' })
    // console.log("faq appInfo ", appInfo)
    // if(typeof appId !== 'number' || appId < 0){
    //     const directoryAppInfo = path.join(process.cwd(), `src/data/${appNameId}.json`)
    //     var appInfoFile = fs.readFileSync(directoryAppInfo);
    //     appInfo = JSON.parse(appInfoFile);
    //     const appInfoState = await callApi({ url: '/data?type=get_app_info&appNameId=' + appNameId, params: null, method: 'post' })
    // } else {
    //     const directoryAppInfo = path.join(process.cwd(), 'src/data/appInfo.json')
    //     var appInfoFile = fs.readFileSync(directoryAppInfo);
    //     const appInfos = JSON.parse(appInfoFile);
    //     for(let i = 0; i < appInfos.length; i++ ){
    //         if(appInfos[i].id == appId){
    //             appInfo = appInfos[i];
    //             break;
    //         }
    //     }
    // }
    return { props: { appInfo: appInfo, url: context.req.url } }
}
export default FAQ