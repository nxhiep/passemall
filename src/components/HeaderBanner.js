import { CircularProgress, Container, Grid, Link, TextField, useMediaQuery, useTheme } from "@material-ui/core";
import { Search as SearchIcon } from '@material-ui/icons';
import { useState } from "react";
import ReactGA from 'react-ga';
import SearchResultsModal from '../container/home/SearchResultsModal';
import { callApi } from "../services";
import { getDarkModeCustom, isAppCDL, scrollDown, scrollToTopic } from "../utils";
import HeaderMenu from "./HeaderMenu";

const HeaderBanner = ({ title, description, buttonPractice, blogLink, reviewLink, appInfo }) => {
    const [searchResults, setSearchResults] = useState(null);
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    let darkMode = getDarkModeCustom(appInfo ? appInfo.id : null);
    let isCDL = isAppCDL(appInfo ? appInfo.id : null);
    let textColor = darkMode ? "white" : null;
    return <>
        <header className={(smDown ? "sm" : "") + (darkMode && !isCDL ? " darkmode" : "")}>
            <Container className="header">
                <HeaderMenu darkMode={darkMode} appInfo={appInfo} noHeader={true} headerMenu={
                    <>
                        {buttonPractice ? 
                            <div onClick={() => scrollToTopic()}>
                                <span className="tag-a">LEARN</span>
                            </div> : 
                            <div>
                                <a href="/">HOME</a>
                            </div>}
                        {buttonPractice ? <div onClick={() => {
                            ReactGA.event({
                                category: 'Click Review',
                                action: 'Click Review Header',
                            })
                        }}>
                            <Link href={reviewLink ? reviewLink : "/review"}>REVIEW</Link>
                        </div> : null}
                        <div onClick={() => {
                            ReactGA.event({
                                category: 'Click Blog',
                                action: 'Click Blog Header',
                            })
                        }}>
                            <Link href={blogLink ? blogLink : "/blog"}>BLOG</Link>
                        </div>
                        <div onClick={() => scrollDown()}>
                            <span className="tag-a">SUPPORT</span>
                        </div>
                        {buttonPractice ? null : <SearchPanel setSearchResults={(value, results) => {
                            setSearchResults({value, results})
                        }} smDown={smDown} />}
                    </>
                } />
            </Container>
            <div className="header-banner">
                <Container className="container-x">
                    <Grid container alignItems="center" justify="space-between" className="header-media">
                        <Grid item sm={12} md={buttonPractice ? 7 : 5}>
                            <h1 style={{ color: textColor ? textColor : "#1E3094" }}>{title ? title : "Make your study great with our thousands of free practice questions"}</h1>
                            <p style={{ color: textColor ? textColor : "#555555", fontWeight: '500', fontSize: "18px" }}>{ description ? description : `You want to get 100% ready for your important day? You desire to pass your exam at your first try?
                                You are wondering if you should pay a charge of money buying some practice materials?
                                That’s why we are here to support you achieve the gate of success with our test prep solutions.`}</p>
                            {buttonPractice}
                        </Grid>
                        {!buttonPractice ? <>
                            {mdUp ? null : <Grid item xs={1} sm={3} md={false}></Grid>}
                            {smDown ? null : <Grid item xs={10} sm={6} md={5}>
                                {<img style={{ position: "relative", bottom: "-120px" }} alt='Make your study great with our thousands of free practice questions' width="100%" height="100%" src="/images/test3.png" />}
                            </Grid>}
                            <Grid item xs={1} sm={3} md={false}></Grid>
                        </> : null}
                    </Grid>
                </Container>
            </div>
        </header>
        <SearchResultsModal results={searchResults ? searchResults.results : null} value={searchResults ? searchResults.value : null} />
    </>
}

const SearchPanel = ({ setSearchResults, smDown }) => {
    const [appInfos, setAppInfos] = useState(null)
    const [loading, setLoading] = useState(false)
    const onSearch1 = (value) => {
        setLoading(true)
        if (appInfos) {
            onSearch(appInfos, value)
        } else {
            callApi({ url: '/data?type=get_all_app_info', params: null, method: 'post' }).then((data) => {
                setAppInfos(data)
                onSearch(data, value)
            })
        }
    }
    const onSearch = (appInfos, value) => {
        if (appInfos && value) {
            let results = [];
            appInfos.forEach(element => {
                let data = (element.description + element.appName).toLowerCase().replace(/ /g, "");
                if (data.search(value.toLowerCase()) > -1) {
                    results.push(element);
                }
            });
            console.log("data", results)
            setSearchResults(value, results)
        } else {
            setSearchResults(value, null)
        }
        setLoading(false)
    }

    const [value, setValue] = useState("");
    const color = smDown ? "white" : "#1E3094";
    return <div className="search-header-panel">
        <TextField value={value}
            placeholder="Search..." id="search-header"
            color="secondary" className="search-header"
            onKeyDown={(e) => {
                if (e.keyCode == 13) {
                    onSearch1(value)
                }
            }}
            onChange={(e) => setValue(e.target.value)}
        />
        <button
            style={{ padding: "0", background: 'none', border: 'none' }}
            onClick={() => {
                if (loading) {
                    return;
                }
                onSearch1(value)
            }}
        >
            {loading ? <CircularProgress style={{ width: "30px", height: "30px", color: color }} /> : <SearchIcon style={{ fontSize: "25px", width: "35px", color: color }} color="inherit"></SearchIcon>}
        </button>
    </div>
}

export default HeaderBanner