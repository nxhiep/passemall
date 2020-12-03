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
const GameChildScreen = ({ appInfoState, url }) => {
    useEffect(() => {
        ReactGA.pageview('/appGame');
        setScrollDownAuto()
        oldUser()
    }, [])
    const store = useStore((state) => state);
    return (
        <>
            <SEO appInfo={appInfoState} url={url}>
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
                        <ScreenChild appInfoState={appInfoState} />
                    </PersistGate>
                </Provider>
            </div>
        </>
    )
}


function ScreenChild({ appInfoState }) {
    const router = useRouter();
    let screen = APP_NEW_DOMAIN ? router.query.screenChild : router.query.appNameId
    screen = screen ?? '';
    if (screen.startsWith(Routes.TEST_SCREEN)) {
        let offset = screen.lastIndexOf('-');
        let topicId = -1;
        if (offset > -1) {
            offset += 1;
            topicId = offset > -1 ? parseInt(screen.substring(offset, screen.length)) : -1;
        }
        return <TestViewScreen topicId={topicId} appInfoState={appInfoState} />
    }
    if (screen.startsWith(Routes.REVIEW_SCREEN)) {
        return <ReviewViewScreen appInfoState={appInfoState} />
    }
    if (screen.length > 0) {
        let offset = screen.lastIndexOf('-');
        let topicId = -1;
        if (offset > -1) {
            offset += 1;
            topicId = offset > -1 ? parseInt(screen.substring(offset, screen.length)) : -1;
        }
        return <StudyViewScreen appInfoState={appInfoState} topicId={topicId} />
    }
    return <ErrorPage />
}

export async function getServerSideProps(context) {
    const appNameId = APP_NEW_DOMAIN ? APP_NEW_DOMAIN : context.params.appNameId;
    const directoryAppInfos = path.join(process.cwd(), 'src/data/appInfos.json')
    let appInfosData = fs.readFileSync(directoryAppInfos);
    let mapAppInfos = JSON.parse(appInfosData)
    const appInfo = mapAppInfos[appNameId] || {};
    return {
        props: {
            appInfoState: appInfo
        }
    }
}

export default GameChildScreen