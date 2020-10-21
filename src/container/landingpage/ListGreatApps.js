import { Container, Divider, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { FixedContainer, TitleBlock } from '../../components/Widgets';
const ListGreatApps = ({ appInfoState }) => {
    let appInfos = appInfoState
    return (
        <section className="list-great-apps">
            <div className="divider"></div>
            <div style={{ textAlign: "center", marginTop: "4px" }}>
                <strong style={{ color: "#4E63BD", fontSize: "20px" }}>ABC</strong>
                <strong style={{ position: "relative", color: "#FA8E45", left: "4px", marginLeft: "auto", marginRight: "auto", fontSize: "20px" }}>E-learning</strong>
            </div>
            <Container>
                <TitleBlock
                    title="GREAT APPS FOR YOU"
                    description="Practice right now with our free apps!"
                />
                <Grid container alignItems="stretch" spacing={2}>
                    {
                        appInfos
                            .sort((a, b) => a.appName.localeCompare(b.appName))
                            .map((appInfo, index) => {

                                return (
                                    <AppInfoItem appInfo={appInfo} index={index} key={"AppInfoItem-" + index} />

                                )
                            })
                    }
                </Grid>
            </Container>
            <div style={{ width: "100%", height: "100px" }}></div>
        </section >
    );
}

const AppInfoItem = ({ appInfo, index }) => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    let appNameId = appInfo.appNameId;
    let appName = appInfo.appName ? appInfo.appName : appInfo.title;
    let link = "/" + appNameId
    return (
        <>
            <Grid item xs={isMobile ? 12 : 4} className="app-info-item" >
                <a href={link} target="_blank">
                    <div style={isMobile ? { textAlign: "center" } : {}}>{appName.toUpperCase()}</div>
                </a>
            </Grid>
            {isMobile ? (<Divider className="line"></Divider>) : (index % 3 === 2 ? <Divider className="line"></Divider> : null)}
        </>

    );
}

export default ListGreatApps;