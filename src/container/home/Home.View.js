import { Button, Collapse, Container, Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Slider from "react-slick";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Image from '../../components/Image';
import SelectStatePopup from '../../components/SelectStatePopup';
import { formatDate } from '../../utils';
import HomeContent from '../home/HomeContent';
import { useRouter } from 'next/router'
import ReactGA from 'react-ga'

const HomeViewScreen = ({ appInfoState, userRateState }) => {

    const router = useRouter();
    const { appNameId } = router.query;
    const [openPopupChangeState, setOpenPopupChangeState] = useState(false);
    let appInfo = appInfoState
    useEffect(() => {
        ReactGA.pageview('/homepage/' + appInfo.title);
    }, [])


    return (

        <div className="body-panel">
            <Header alt={appInfo.appName ?? appInfo.title} isStudy={true} />
            <AppInfoUI appInfoState={appInfoState} userRateState={userRateState} />

            <HomeContent
                appInfo={appInfo} appNameId={appNameId}
                hasState={appInfo && appInfo.hasState}
                onChangeState={() => {
                    setOpenPopupChangeState(true);
                }}
            />

            {appInfo && appInfo.hasState ?
                <SelectStatePopup
                    appInfo={appInfo}
                    openPopupChangeState={openPopupChangeState}
                    onHidden={() => {
                        setOpenPopupChangeState(false);
                    }} /> : ''}


            <Footer isStudy={true} alt={appInfo.appName ?? appInfo.title} />
        </div>


    );
}

const AppInfoUI = ({ appInfoState, userRateState }) => {
    const [openCollapse, setOpenCollapse] = useState(false);
    let appInfo = appInfoState;
    let content = appInfo.content ? appInfo.content : '';
    let showButtonShowMore = content.length > 500;
    return (
        <Container>
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
        </Container>
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




