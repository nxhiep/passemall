import { Grid } from '@material-ui/core';
import { CalendarToday as CalendarTodayIcon } from '@material-ui/icons';
import React from 'react';
import { FixedContainer, TitleBlock } from '../../components/Widgets';
import Image from '../../components/Image';

const StatictisApps = () => {
    return (
        <section className="statictis-apps">
            <FixedContainer>
                <TitleBlock
                    title="Some of the best features"
                    description="With thousands of exam-simulated questions with detail explanations, lifetime access to the complete Manual, and dozens of test-taking strategies, our Test Prep helps you pass your test with flying colors."
                />
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Image className="image-statictis-apps" alt='With thousands of exam-simulated questions with detail explanations, lifetime access to the complete Manual, and dozens of test-taking strategies, our Test Prep helps you pass your test with flying colors' src="/images/ImageStatictisApps.jpg" />
                    </Grid>
                    <Grid item xs={12} sm={6} className="statictis-apps-items">
                        <StatictisAppItem
                            title="Completely free"
                            description="Our application is 100% free, so you can practice your test in our web or in any other devices with our available free app on google play or appStore. No internet connection and no registration required."
                        />
                        <StatictisAppItem
                            title="Practice by topics"
                            description="Test your knowledge by practicing by topics exactly as in real test. Moreover, topic is also divided into small parts which helps you get your interest in studying, just like playing a game."
                        />
                        <StatictisAppItem
                            title="Customize your exam"
                            description="You can design your test so that it works best for you. Gradually set the test as close as the real test to ready for it. This is the most effective way that helps many people get over their challenge."
                        />
                        <StatictisAppItem
                            title="Special review mode"
                            description="With this feature, you can review which questions you are weak, medium or strong. And this will help you find out where you need to work more and make the most of your study time."
                        />
                    </Grid>
                </Grid>
                <Grid container className="list-number">
                    <Grid item xs={12} sm={3}>
                        <ActiveItem value="10,123" title="Users" />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <ActiveItem value="20,432" title="Download" />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <ActiveItem value="7871" title="Likes" />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <ActiveItem value="945" title="5 star rating" />
                    </Grid>
                </Grid>
            </FixedContainer>
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

const StatictisAppItem = ({ title = '', description = '' }) => {
    return (
        <div className="statictis-app-item">
            <div className="image"><CalendarTodayIcon /></div>
            <div className="info">
                <strong className="title">{title}</strong>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default StatictisApps;