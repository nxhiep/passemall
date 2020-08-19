import { Button, Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import Image from '../../components/Image';
import { FixedContainer, TitleBlock } from '../../components/Widgets';
import ReactGA from 'react-ga';
import Link from 'next/link'
const ListGreatApps = ({ appInfoState }) => {
    let appInfos = appInfoState
    return (
        <section className="list-great-apps">
            <FixedContainer>
                <TitleBlock
                    title="Great apps for you"
                    description="Practice right now with our free apps!"
                />
                <Grid container alignItems="stretch" spacing={2}>
                    {
                        appInfos
                            .sort((a, b) => a.appName.localeCompare(b.appName))
                            .map((appInfo, index) => {
                                return <AppInfoItem appInfo={appInfo} key={"AppInfoItem-" + index} />
                            })
                    }
                </Grid>
            </FixedContainer>
            <div style={{ width: "100%", height: "100px" }}></div>
        </section>
    );
}

const AppInfoItem = ({ appInfo }) => {
    let appName = appInfo.appName ? appInfo.appName : appInfo.title;
    return (
        <Grid item xs={6} sm={4} md={2} className="app-info-item">
                <Button href={"/" + appInfo.appNameId} target="_blank"
                    onClick={() => {
                        ReactGA.event({
                            category: 'click-app',
                            action: 'Clicked ' + appInfo.appName
                        });
                    }}>
                    <div>
                        <Image src={appInfo.avatar} alt={appName} width="100%" />
                    </div>
                    <div className="title">
                        <strong>{appName}</strong>
                    </div>
                    <div className="rating">
                        <Rating size="small" value={5} readOnly />
                    </div>
                </Button>

        </Grid>
    );
}

export default ListGreatApps;