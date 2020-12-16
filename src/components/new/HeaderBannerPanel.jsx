import { CircularProgress, Container, Grid, makeStyles, SwipeableDrawer, TextField } from "@material-ui/core"
import { Menu as MenuIcon, Search as SearchIcon } from '@material-ui/icons'
import { useState } from "react"
import SearchResultsModal from "../../container/home/SearchResultsModal"
import { callApi } from "../../services"

const useStyles = makeStyles({
    bgheader: props => {
        if(props.isMobile){
            return {
                background: "url(/images/new/banner-right.jpg) no-repeat",
                backgroundPosition: "top",
                backgroundSize: "cover",
            }
        }
        return {
            background: "url(/images/new/banner-left.jpg) no-repeat, url(/images/new/banner-right.jpg) no-repeat",
            backgroundPosition: "top left, top right",
            backgroundSize: "auto, auto 100%"
        }
    },
    header: {
        height: "100px",
        backgroundColor: "transparent"
    },
    flex: {
        display: "flex",
        alignItems: "center"
    },
    headerMenu: props => {
        if(props.isMobile) {
            return {
                display: "block",
                padding: "10px",
                textDecoration: "none",
                color: "white",
                fontWeight: "500",
                cursor: "pointer",
                '&:hover': {
                    textDecoration: "underline"
                }
            }
        }
        return {
            padding: "10px 20px",
            textDecoration: "none",
            color: "#4e63bd",
            fontWeight: "500",
            cursor: "pointer",
            '&:hover': {
                textDecoration: "underline"
            }
        }
    },
    menuButton: {
        backgroundColor: "transparent",
        border: "none",
        outline: "none"
    },
})

const HeaderBannerPanel = ({ isMobile }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const handleOpenDrawer = (open) => setOpenDrawer(open)
    const [searchResults, setSearchResults] = useState(null);
    const styles = useStyles({ isMobile });
    return <>
        <div className={styles.bgheader}>
            <header className={styles.header}>
                <Container style={{height: "100%"}}>
                    <Grid container justify="space-between" alignItems="center" style={{height: "100%"}}>
                        <a href="/"><img alt="ABC Elearning" src="/images/logo/logo-dark.svg" width="240px" height="60px" /></a>
                        {isMobile ? <button className={styles.menuButton}
                        onClick={() => {
                            setOpenDrawer(true)
                        }}
                        >
                            <MenuIcon />
                        </button> : <div className={styles.flex}>
                            <HeaderMenu isMobile={isMobile} setSearchResults={(value, results) => {
                                setSearchResults({ value, results })
                            }} />
                        </div>}
                        { isMobile ? <SwipeableDrawer
                            className="header-menu-swipe"
                            anchor="right"
                            open={openDrawer}
                            onClose={() => {
                                handleOpenDrawer(false);
                            }}
                            onOpen={() => handleOpenDrawer(true)}
                        >
                            <div style={{padding: "10px"}}>
                                <a href="/"><img alt="ABC Elearning" width="200px" height="48px" src="/images/logo-landing.png" /></a>
                            </div>
                            <HeaderMenu isMobile={isMobile} setSearchResults={(value, results) => {
                                setSearchResults({ value, results })
                            }} />
                        </SwipeableDrawer> : null }
                    </Grid>
                </Container>
            </header>
            <Container>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={12} sm={5} md={5}>
                        <h1 style={{ color: "#1e3094" }}>Happier study, easier pass with our free practice questions</h1>
                        <p style={{
                            // minHeight: isMobile ? "180px" : "0",
                            display: "flex",
                            alignItems: "center",
                            color: "#333",
                            fontSize: "1.1em",
                            fontWeight: "500"
                        }}>We are here for your success because your success is our last goal! That's why we have tried our best to bring you all free, friendly, and funny test prep solutions.</p>
                    </Grid>
                    {isMobile ? null : <Grid item xs={12} sm={5} md={5}>
                        <img width="100%" src="/images/test3.png" alt="Happier study, easier pass with our free practice questions" style={{
                            position: "relative",
                            bottom: "-60px"
                        }} />
                    </Grid>}
                    {/* <Grid item xs={12} sm={5} md={5} style={{textAlign: isMobile ? "center" : ""}}>
                        <img width="100%" src="/images/test3.png" style={{
                            position: "relative",
                            bottom: isMobile ? "0" : "-60px",
                        }} />
                    </Grid> */}
                </Grid>
            </Container>
        </div>
        <SearchResultsModal results={searchResults ? searchResults.results : null} value={searchResults ? searchResults.value : null} />
    </>
}

const HeaderMenu = ({ isMobile, setSearchResults }) => {
    const styles = useStyles({ isMobile });
    return <>
        <div className={isMobile ? "" : styles.flex}>
            <a href="/" className={styles.headerMenu}>HOME</a>
            <a href="/blog" className={styles.headerMenu}>BLOG</a>
            <span className={styles.headerMenu} onClick={() => {
                scrollDown()
            }}>SUPPORT</span>
        </div>
        <div style={{width: "50px"}}></div>
        <SearchPanel isMobile={isMobile} setSearchResults={setSearchResults} />
    </>
}

const SearchPanel = ({ isMobile, setSearchResults }) => {
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
            // console.log("data", results)
            setSearchResults(value, results)
        } else {
            setSearchResults(value, null)
        }
        setLoading(false)
    }

    const [value, setValue] = useState("");
    const color = isMobile ? "white" : "#1E3094";
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

export default HeaderBannerPanel