import { Accordion, AccordionDetails, AccordionSummary, Container, Divider, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { FixedContainer, TitleBlock } from '../../components/Widgets';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const ListGreatApps = ({ appInfoState }) => {
    let appInfos = appInfoState

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

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
                <div>
                    {sm ? <ListAppMobile appInfos={appInfos} /> : <ListAppPC appInfos={appInfos} />}
                </div>
            </Container>
            <div style={{ width: "100%", height: "100px" }}></div>
        </section >
    );
}

const ListAppPC = ({ appInfos }) => {
    return <Grid container alignItems="stretch" spacing={2}>
        {
            appInfos
                .sort((a, b) => a.appName.localeCompare(b.appName))
                .map((appInfo, index) => {
                    return <AppInfoItem appInfo={appInfo} index={index} key={"AppInfoItem-" + index} />
                })
        }
    </Grid>
}

const ListAppMobile = ({ appInfos }) => {
    let appInfos1 = appInfos.slice(0, 5);
    let appInfos2 = appInfos.slice(6, appInfos.length);
    return <div>
            <div>
            {
                appInfos1
                    .sort((a, b) => a.appName.localeCompare(b.appName))
                    .map((appInfo, index) => {
                        return <AppInfoItem appInfo={appInfo} index={index} key={"AppInfoItem-" + index} />
                    })
            }
            </div>
            <Accordion style={{
                border: 'none',
                boxShadow: 'none',
                background: 'transparent',
            }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} className="AccordionSummaryxxx">
                    Show more
                </AccordionSummary>
                <AccordionDetails style={{padding: '0'}}>
                    <div>
                    {
                        appInfos2
                            .sort((a, b) => a.appName.localeCompare(b.appName))
                            .map((appInfo, index) => {
                                return <AppInfoItem appInfo={appInfo} index={index} key={"AppInfoItem-" + index} />
                            })
                    }
                    </div>
                </AccordionDetails>
            </Accordion>
    </div>
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
            <Grid item xs={12} sm={3} md={4} className="app-info-item" >
                <a href={link} target="_blank">
                    <div>{appName.toUpperCase()}</div>
                </a>
            </Grid>
            {isMobile ? (<Divider className="line"></Divider>) : (index % 3 === 2 ? <Divider className="line"></Divider> : null)}
        </>

    );
}

export default ListGreatApps;