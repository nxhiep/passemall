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
import { wrapper } from '../../redux/store';
import Routes from '../../routes';
import { callApi } from '../../services';
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
    // console.log("store", store, appInfoState)
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

export async function getStaticProps(context) {
    const { appNameId } = context.params;
    const appInfoState = await callApi({ url: '/data?type=get_app_info&appNameId=' + appNameId, params: null, method: 'post' })

    return {
        props: {
            appInfoState: appInfoState
        }
    }

}

export async function getStaticPaths() {
    const directorytopicNameId = path.join(process.cwd(), 'src/data/topicNameId.json')
    let topicNameIdFile = fs.readFileSync(directorytopicNameId);
    let topicNameIdJson = JSON.parse(topicNameIdFile)
    let arrayTopicNameId = [];
    for (let appNameId in topicNameIdJson) {
        topicNameIdJson[appNameId].forEach(ele => {
            arrayTopicNameId.push({ params: { appNameId: appNameId, screenChild: ele } });
        })
        arrayTopicNameId.push({ params: { appNameId: appNameId, screenChild: "review" } });
        arrayTopicNameId.push({ params: { appNameId: appNameId, screenChild: "test" } });
    }
    return {
        paths: arrayTopicNameId,
        fallback: false
    };
}
function ScreenChild({ appInfoState }) {
    if(APP_NEW_DOMAIN){
        const router = useRouter();
        let screen = router.query.appNameId
        screen = screen ?? '';
        // console.log("screen", screen, 'router.query', router.query)
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
            return <StudyViewScreen appInfoState={appInfoState} />
        }
        return <h1>Not found page!</h1>
    } else {
        const router = useRouter();
        const { practice, appNameId, screenChild } = router.query
        let screen = screenChild
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
            return <StudyViewScreen appInfoState={appInfoState} />
        }
    }
}
export default wrapper.withRedux(GameChildScreen)