import { Button, Collapse, Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Slider from "react-slick";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Image from '../../components/Image';
import SelectStatePopup from '../../components/SelectStatePopup';
import { FixedContainer, MainWidget } from '../../components/Widgets';
import { formatDate } from '../../utils';
import dynamic from 'next/dynamic'
const HomeContent = dynamic(() => import('../home/HomeContent'), { ssr: false })
import { useRouter } from 'next/router'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configStore from '../../redux/storeInHome';
import '../../resources/styles/main.css'
import '../../resources/styles/home.css'
import '../../resources/styles/slick.css'
import '../../resources/styles/slick-theme.css'
import '../../resources/styles/index.css'

const HomeViewScreen = ({ appInfoState, userRateState }) => {
    const store = configStore();
    const router = useRouter();
    const { appNameId } = router.query;
    const [openPopupChangeState, setOpenPopupChangeState] = useState(false);
    let appInfo = appInfoState
    useEffect(() => {
        ReactGA.pageview('/homepage/' + appInfo.title);
    }, [])


    return (
        <MainWidget>
            <Header alt={appInfo.appName ?? appInfo.title} />
            <AppInfoUI appInfoState={appInfoState} userRateState={userRateState} />
            <Provider store={store.store}>
                <PersistGate
                    persistor={store.persistor}
                >
                    <HomeContent

                        appInfo={appInfo} appNameId={appNameId}
                        hasState={appInfo && appInfo.hasState}
                        onChangeState={() => {
                            setOpenPopupChangeState(true);
                        }}
                    />
                    <Footer alt={appInfo.appName ?? appInfo.title} />
                    {appInfo && appInfo.hasState ?
                        <SelectStatePopup
                            appInfo={appInfo}
                            openPopupChangeState={openPopupChangeState}
                            onHidden={() => {
                                setOpenPopupChangeState(false);
                            }} /> : ''}
                </PersistGate>
            </Provider>


        </MainWidget>
    );
}

const AppInfoUI = ({ appInfoState, userRateState }) => {
    const [openCollapse, setOpenCollapse] = useState(false);
    let appInfo = appInfoState;
    let content = appInfo.content ? appInfo.content : '';
    let showButtonShowMore = content.length > 500;
    return (
        <FixedContainer>
            <div className="space-height"></div>
            <Grid className="user-info-panel"
                container
                direction="row"
                justify='space-between'
                spacing={3}
            >
                <Grid item xs={12} sm={12} md={8} className="user-info-content-panel">
                    <h1>{appInfo.title}</h1>
                    <Collapse style={{ color: '#555' }} in={openCollapse || !showButtonShowMore} collapsedHeight="300px">
                        <div>{ReactHtmlParser(content.replace(/<o:p>/g, '').replace(/<\/o:p>/, ''))}</div>
                    </Collapse>
                    {showButtonShowMore ?
                        <Button
                            style={{ float: 'right', margin: '10px 0' }}
                            variant="outlined"
                            color="primary"
                            onClick={() => setOpenCollapse(!openCollapse)}>
                            {openCollapse ? "Show less" : "Show more"}
                        </Button> : ''}
                </Grid>
                <Grid item xs={12} sm={12} md={4} className="user-avatar-content-panel" style={{ overflow: 'hidden' }}>
                    <div className="parent-app-info-name">
                        <div className="app-info-name">
                            <Image src={appInfo.avatar} alt={appInfo.appName} width="100px" height="100px" />
                            <div className="app-child-name">
                                <div><strong>{appInfo.appName}</strong></div>
                                <Rating name="read-only" value={5} readOnly size="small" style={{ marginTop: '10px' }} />
                            </div>
                        </div>
                        <div className="link-app-store">
                            <a href={appInfo.urlAndroid} target="_blank" rel="noopener noreferrer">
                                <Image alt="Link google app" src="/images/googlePlayIcon.png" />
                            </a>
                            <div style={{ width: '20px' }}></div>
                            <a href={appInfo.urlIos} target="_blank" rel="noopener noreferrer">
                                <Image alt="Link app store" src="/images/appStoreIcon.png" />
                            </a>
                        </div>
                    </div>
                    <UserRateAppSliderUI userRateState={userRateState} />
                </Grid>
            </Grid>
        </FixedContainer>
    );
}

const UserRateAppSliderUI = ({ userRateState }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: "review-app-slider",
    };
    let userRates = userRateState;
    return (
        <Slider {...settings}>
            {
                userRates.map((userRate) => {
                    return <ReviewAppItem
                        key={"ReviewAppItem-" + userRate.id}
                        value={5}
                        content={userRate.content}
                        name={userRate.userName}
                        createTime={userRate.createDate}
                    />
                })
            }
        </Slider>
    );
}

const ReviewAppItem = ({ content, name, createTime, value }) => {
    return (
        <div className="review-app-item">
            <div>
                <p className="dot-3">{content}</p>
                <Grid container alignItems="center" className="info" justify="space-between">
                    <div>
                        <strong>{name}</strong>
                        <div className="time">{formatDate(createTime)}</div>
                    </div>
                    <Rating size="small" value={value} readOnly />
                </Grid>
            </div>
        </div>
    );
}

export default HomeViewScreen




