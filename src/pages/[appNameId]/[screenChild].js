import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
const StudyViewScreen = dynamic(() => import('../../container/study/Study.View'), { ssr: false })
const TestViewScreen = dynamic(() => import('../../container/test/Test.View'), { ssr: false })
const ReviewViewScreen = dynamic(() => import('../../container/review/Review.View'), { ssr: false })
import Head from 'next/head';
import configStore from '../../redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useRouter } from 'next/router';
import Routes from '../../routes';
import ReactGA from 'react-ga';
import { oldUser, setScrollDownAuto } from '../../utils';
import path from "path";
import fs from "fs"
import { callApi } from '../../services';
initializeReactGA();
function initializeReactGA() {
    ReactGA.initialize('UA-167769768-1');
}
const Screen = ({ appInfoState }) => {
    useEffect(() => {
        setScrollDownAuto()
        oldUser()
    }, [])
    const store = configStore();
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <title>{appInfoState.title}</title>
                <link rel="icon" href={appInfoState.avatar} />
                <link rel="preconnect" href="https://webappapi-dot-micro-enigma-235001.appspot.com"></link>
                <link rel="stylesheet" type="text/css" href="/styles/game.css" />
                <link rel="stylesheet" type="text/css" href="/styles/review.css" />
                <link rel="stylesheet" type="text/css" href="/styles/test.css" />
                <link rel="stylesheet" type="text/css" href="/styles/study.css" />
                <link rel="stylesheet" type="text/css" href="/styles/header.css" />
                <meta property="og:type" content="website" />
                <meta name="title" content={appInfoState.title} />
                <meta name="description" content={appInfoState.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="keywords" content={appInfoState.keywords} />
            </Head>
            <Provider store={store.store}>
                <PersistGate
                    persistor={store.persistor}
                >
                    <ScreenChild appInfoState={appInfoState} />;
                </PersistGate>
            </Provider>
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
export default Screen