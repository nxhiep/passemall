import React from 'react';
import HomeViewScreen from '../container/home/Home.View'
import path from 'path';
import Head from 'next/head';
import fs from 'fs';
import UserRate from '../models/UserRate';
import ReactGA from 'react-ga';
initializeReactGA();
function initializeReactGA() {
    ReactGA.initialize('UA-167769768-1');
}
const Home = ({ appInfoState, userRateState }) => {
    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                <title>{appInfoState.title}</title>
                <link rel="icon" href={appInfoState.avatar} />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap"></link>
                <link rel="preconnect" href="https://webappapi-dot-micro-enigma-235001.appspot.com"></link>
                <link rel="preconnect" href="https://storage.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <meta property="og:type" content="website" />
                <meta name="title" content={appInfoState.title} />
                <meta name="description" content={appInfoState.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="keywords" content={appInfoState.keywords} />
            </Head>
            <HomeViewScreen appInfoState={appInfoState} userRateState={JSON.parse(userRateState)}></HomeViewScreen>
        </>
    )
}
export async function getStaticProps(context) {
    const { appNameId } = context.params;
    const directoryAppInfo = path.join(process.cwd(), `src/data/${appNameId}.json`)
    var appInfoFile = fs.readFileSync(directoryAppInfo);
    const appInfoState = JSON.parse(appInfoFile);

    const directoryUserRate = path.join(process.cwd(), 'src/data/userRatePerfect.json')
    let userRateFile = fs.readFileSync(directoryUserRate);
    const useRateJSON = Object.values(JSON.parse(userRateFile));

    let appId = appInfoState.id
    let userRateState = [];
    useRateJSON.forEach((u) => {
        let userRate = UserRate.fromJS(u);
        if (appId === userRate.appId) {
            userRateState.push(userRate);
        }
    });

    return {
        props: {
            appInfoState: appInfoState,
            userRateState: JSON.stringify(userRateState)
        }
    }
}
export async function getStaticPaths() {



    const arrayAppNameId = ["dmv-permit-practice-test-2020", "ati-teas-vi-practice-test", "ged-practice-test-free-2020", "comptia-network-exam-training"
        , "comptia-a-exam-training", "hesi-a2-practice-test-free-2020", "pmp-exam-prep-6th-edition", "cissp-practice-test-free-2020", "g1-practice-test-2020", "motorcycle-permit-practice-test",
        "driving-theory-uk-practice-test-2020", "comptia-security-exam-training", "ptcb-pharmacy-technician-certification-exam-prep", "cdl-practice-test-2020", "asvab-practice-test-2020", "dkt-nsw-learner-car-practice-test-2020"
        , "cna-practice-test-free-2020", "real-estate-license-exam-prep", "college-board-accuplacer-study-app"]
    return {
        paths: arrayAppNameId.map(id => (
            { params: { appNameId: id } }
        )),
        fallback: false
    }
}
export default Home;