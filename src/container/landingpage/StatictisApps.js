import { Container, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { TitleBlock } from '../../components/Widgets';
import HowToRegIcon from '@material-ui/icons/HowToReg';
const StatictisApps = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 960))
    return (
        <section className="statictis-apps">
            <Container>
                <div className="divider"></div>
                <div style={{ textAlign: "center", marginTop: "4px" }}>
                    <strong style={{ color: "#4E63BD", fontSize: "20px" }}>ABC</strong>
                    <strong style={{ position: "relative", color: "#FA8E45", left: "4px", marginLeft: "auto", marginRight: "auto", fontSize: "20px" }}>E-learning</strong>
                </div>
                <TitleBlock
                    title="SOME OF THE BEST FEATURES"
                    description="With thousands of exam-simulated questions with detail explanations, lifetime access to the complete Manual, and dozens of test-taking strategies, our Test Prep helps you pass your test with flying colors."
                />
                <Grid container alignItems="flex-start">
                    <Grid item xs={isMobile ? 12 : 6} >
                        <img data-src="/images/test5.png" alt="static-img" className="image-statictis-apps lazyload" alt='With thousands of exam-simulated questions with detail explanations, lifetime access to the complete Manual, and dozens of test-taking strategies, our Test Prep helps you pass your test with flying colors' />
                    </Grid>
                    <Grid item xs={isMobile ? 12 : 6} className="statictis-apps-items">
                        <StatictisAppItem
                            icon="free"
                            title="COMPLETELY FREE"
                            description="Our application is 100% free, so you can practice your test in our web or in any other devices with our available free app on google play or appStore. No internet connection and no registration required."
                        />
                        <StatictisAppItem
                            icon={<img src="/images/border-color.svg" width="22px" height="22px" alt="border-color"></img>}
                            title="PRACTICE BY TOPICS"
                            description="Test your knowledge by practicing by topics exactly as in real test. Moreover, topic is also divided into small parts which helps you get your interest in studying, just like playing a game."
                        />
                        <StatictisAppItem
                            icon={<DashboardIcon></DashboardIcon>}
                            title="CUSTOMIZE YOUR EXAM"
                            description="You can design your test so that it works best for you. Gradually set the test as close as the real test to ready for it. This is the most effective way that helps many people get over their challenge."
                        />
                        <StatictisAppItem
                            icon={<HowToRegIcon></HowToRegIcon>}
                            title="SPECICAL REVIEW MODE"
                            description="With this feature, you can review which questions you are weak, medium or strong. And this will help you find out where you need to work more and make the most of your study time."
                        />
                    </Grid>
                </Grid>
                <Grid container className="list-number">
                    <Grid item xs={isMobile ? 6 : 3} >
                        <ActiveItem value="10,123" title="Users" />
                    </Grid>
                    <Grid item xs={isMobile ? 6 : 3} >
                        <ActiveItem value="20,432" title="Download" />
                    </Grid>
                    <Grid item xs={isMobile ? 6 : 3} >
                        <ActiveItem value="7871" title="Likes" />
                    </Grid>
                    <Grid item xs={isMobile ? 6 : 3} >
                        <ActiveItem value="945" title="5 star rating" />
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
}

const ActiveItem = ({ value = '', title = '' }) => {
    return (
        <div className="active-item">
            <strong>{value}</strong>
            <span>{title}</span>
        </div>
    );
}

const StatictisAppItem = ({ title = '', description = '', icon }) => {
    return (
        <div className="statictis-app-item">
            <div className="image">{icon}</div>
            <div className="info">
                <strong style={{ color: "#4E63BD" }}>{title}</strong>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default StatictisApps;