import fs from "fs";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import path from "path";
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Provider, useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SEO from '../../components/SEO';
import { APP_NEW_DOMAIN, GA_ID } from "../../config_app";
import ErrorPage from '../../container/error';
import Routes from '../../routes';
import { oldUser, setScrollDownAuto } from '../../utils';
const StudyViewScreen = dynamic(() => import('../../container/study/Study.View'), { ssr: false })
const TestViewScreen = dynamic(() => import('../../container/test/Test.View'), { ssr: false })
const ReviewViewScreen = dynamic(() => import('../../container/review/Review.View'), { ssr: false })

ReactGA.initialize(GA_ID);
const GameChildScreen = ({ appInfo, url, topicId }) => {
    if(!appInfo || Object.keys(appInfo).length === 0 && appInfo.constructor === Object){
        return <ErrorPage title="Not found app" />
    }
    useEffect(() => {
        ReactGA.pageview('/appGame');
        setScrollDownAuto()
        oldUser()
    }, [])
    const store = useStore((state) => state);
    return (
        <>
            <SEO appInfo={appInfo} url={url}>
                <link rel="stylesheet" type="text/css" href="/styles/game.css" />
                <link rel="stylesheet" type="text/css" href="/styles/review.css" />
                <link rel="stylesheet" type="text/css" href="/styles/test.css" />
                <link rel="stylesheet" type="text/css" href="/styles/study.css" />
                <link rel="stylesheet" type="text/css" href="/styles/header.css" />
            </SEO>
            <div style={{width:"100%", height:"100%"}}>
                <Provider store={store}>
                    <PersistGate
                        persistor={store.__persistor}
                    >
                        <ScreenChild appInfo={appInfo} topicId={topicId} />
                    </PersistGate>
                </Provider>
            </div>
        </>
    )
}


function ScreenChild({ appInfo, topicId }) {
    const router = useRouter();
    let screen = router.query.screenChild
    screen = screen ?? '';
    // console.log("ScreenChild", screen)
    if (screen.startsWith(Routes.TEST_SCREEN)) {
        return <TestViewScreen topicId={topicId} appInfo={appInfo} />
    }
    if (screen.startsWith(Routes.REVIEW_SCREEN)) {
        return <ReviewViewScreen appInfo={appInfo} />
    }
    if (screen.length > 0 && topicId > -1) {
        return <StudyViewScreen appInfo={appInfo} topicId={topicId} />
    }
    return <ErrorPage />
}

export async function getServerSideProps(context) {
    const appNameId = APP_NEW_DOMAIN ? APP_NEW_DOMAIN : context.params.appNameId;
    const directoryAppInfos = path.join(process.cwd(), 'src/data/appInfos.json')
    let appInfosData = fs.readFileSync(directoryAppInfos);
    let mapAppInfos = JSON.parse(appInfosData)
    const appInfo = mapAppInfos[appNameId] || {};
    let topicId = -1;
    let screen = context.params && context.params.screenChild;
    if(screen){
        let offset = screen.lastIndexOf('-');
        if (offset > -1) {
            offset += 1;
            topicId = offset > -1 ? parseInt(screen.substring(offset, screen.length)) : -1;
        }
    }
    // console.log("topicId", topicId)
    return {
        props: {
            appInfo,
            topicId
        }
    }
}

export default GameChildScreen