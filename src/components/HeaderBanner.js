import { CircularProgress, Container, Grid, Link, TextField, useMediaQuery, useTheme } from "@material-ui/core"
import HeaderMenu from "./HeaderMenu"
import { Search as SearchIcon } from '@material-ui/icons'
import { useState } from "react";
import SearchResultsModal from '../container/home/SearchResultsModal'
import { scrollDown } from "../utils";
import { callApi } from "../services";

const HeaderBanner = () => {
    const [searchResults, setSearchResults] = useState(null);
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    return <>
        <header className={(smDown ? "sm" : "")}>
            <Container className="header">
                <HeaderMenu noHeader={true} headerMenu={
                    <>
                        <div>
                            <a href="/">HOME</a>
                        </div>
                        <div onClick={() => {
                            ReactGA.event({
                                category: 'Click Blog',
                                action: 'Click Blog Header',
                            })
                        }}>
                            <Link href="/blog">BLOG</Link>
                        </div>
                        <div onClick={() => scrollDown()}>
                            <span className="tag-a">SUPPORT</span>
                        </div>
                        <SearchPanel setSearchResults={(value, results) => {
                            setSearchResults({value, results})
                        }} smDown={smDown} />
                    </>
                } />
            </Container>
            <div className="header-banner">
                <Container>
                    <Grid container alignItems="center" justify="space-between" className="header-media">
                        <Grid item sm={12} md={5}>
                            <h1 style={{ color: "#1E3094" }}>Make your study great with our thousands of free practice questions</h1>
                            <p style={{ color: "#555555", fontWeight: '500', fontSize: "18px" }}>You want to get 100% ready for your important day? You desire to pass your exam at your first try?
                                You are wondering if you should pay a charge of money buying some practice materials?
                                    That’s why we are here to support you achieve the gate of success with our test prep solutions.</p>
                        </Grid>
                        {mdUp ? null : <Grid item xs={1} sm={3} md={false}></Grid>}
                        <Grid item xs={10} sm={6} md={5}>
                            {!smDown ? <img style={{ position: "relative", bottom: "-120px" }} alt='Make your study great with our thousands of free practice questions' width="100%" height="100%" src="/images/test3.png" /> : null}
                        </Grid>
                        <Grid item xs={1} sm={3} md={false}></Grid>
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