import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import Head from 'next/head';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Footer from '../components/Footer';
import { Container, Divider, Grid, IconButton, Link, useMediaQuery, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import { getRecentPosts } from '../utils';
import { HeaderBlog, BannerBlog } from '../components/blog/HeaderBlog';
import SEOInfo from '../models/SEOInfo';
function initializeReactGA() {
    ReactGA.initialize('UA-167769768-1');
}

initializeReactGA();
const seoInfo = new SEOInfo();
const ListBlog = ({ data, url }) => {
    const seoInfo = new SEOInfo();
    seoInfo.title = 'ABC Learning - Blog';
    useEffect(() => {
        ReactGA.pageview('/homepage');
    }, [])
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    const displayNone = useMediaQuery(theme.breakpoints.down("md"))
    return (
        <>
            <Head>
                <title>ABC Learning - Blog</title>
                <link rel="icon" href="/images/logo.svg" />
                <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" type="text/css" href="/styles/index.css" />
                <link rel="stylesheet" type="text/css" href="/styles/listblog.css" />
                <link rel="preconnect" href="https://storage.googleapis.com" />
                <link rel="canonical" href="https://passemall.com"></link>
                <meta property="og:type" content="website" />
                <meta name="theme-color" content="#000000" />
                <link rel="canonical" href={"https://passemall.com" + url}></link>

                <meta name="title" content={seoInfo.title} />
                <meta name="description" content={seoInfo.description} />
                <meta name="keywords" content={seoInfo.keyword} />
                <meta property="og:title" content={seoInfo.title} />
                <meta property="og:description" content={seoInfo.descriptionSEO} />
                <meta property="og:image" content={seoInfo.image} />

            </Head>
            <div className='body-panel landing-page list-blog'>
                <HeaderBlog />
                <BannerBlog />
                <Container style={{ paddingTop: "40px" }}>
                    <Grid container spacing={2}>
                        <Grid container item xs={12} sm={12} md={8}>
                            {data.map(el => {
                                return (
                                    <BlogItem data={el} isMobile={isMobile} key={el.id}></BlogItem>
                                )
                            })}
                            {/*
                            <Divider style={displayNone ? { backgroundColor: "rgba(250, 142, 69, 0.3)", marginTop: "40px", width: "100%", marginLeft: "auto" } : { backgroundColor: "rgba(250, 142, 69, 0.3)", marginTop: "40px", width: "calc(100% - 230px )", marginLeft: "auto" }}></Divider>
                            <IconButton style={{ display: "block", borderRadius: "0px", backgroundColor: "#4E63BD", color: "#fff", padding: "8px", fontSize: "18px", marginTop: "32px", marginLeft: "auto" }}>
                                Next Page<NavigateNextIcon></NavigateNextIcon>
                            </IconButton>
                            */}
                        </Grid>
                        <Grid container item xs={12} sm={12} md={4}>
                            <RecentPosts data={data} />
                        </Grid>
                    </Grid>
                </Container>
                <Footer color="#4E63BD"></Footer>
            </div>
        </>
    )
}

const getLink = (name, id) => {
    return ("/blog/" + name.toLowerCase().replace("?", "").replace(/ /g, "-") + "-").replace("--", "-") + id
}

const BlogItem = ({ isMobile, data }) => {
    const router = useRouter();
    if (!data.bannerImage) {
        data.bannerImage = 'https://storage.googleapis.com/micro-enigma-235001.appspot.com/resources/images/how-to-pass-the-ged-math-test.jpg';
    }
    return (
        <div className="post-item">
            <Link href={getLink(data.title, data.id)} >
                <Grid container spacing={3}>
                    <Grid container item xs={12} sm={4}>
                        <div className="wrapper-image">
                            <img src={data.bannerImage} alt={data.title}></img>
                        </div>
                    </Grid>
                    <Grid container item xs={12} sm={8} alignContent="flex-start" direction="column">
                        <h2 style={{ color: "#4E63BD" }} title={data.title}>{data.title}</h2>
                        <p style={{ fontSize: "18px", marginBottom: "10px" }} className="dot-5" title={data.description}>{data.description}</p>
                        <div style={{ marginTop: "auto", }}>
                            <IconButton
                                style={{
                                    borderRadius: "0px",
                                    backgroundColor: "#4E63BD",
                                    color: "#fff",
                                    padding: "8px 16px",
                                    fontSize: "18px"
                                }}
                                onClick={() => router.push(getLink(data.title, data.id))}>
                                Read More<NavigateNextIcon></NavigateNextIcon>
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
            </Link>
        </div>
    )
}

const RecentPosts = ({ data }) => {
    const [recentPostIds, setRecentPostIds] = useState([]);
    useEffect(() => {
        setRecentPostIds(getRecentPosts());
    }, [])
    if (!recentPostIds || recentPostIds.length == 0) {
        return null;
    }
    let recentPosts = [];
    data && data.forEach(element => {
        if (recentPostIds.indexOf(element.id) > -1) {
            recentPosts.push(element);
        }
    });
    return (<div className="recent-posts">
        <h2 style={{
            fontSize: "20px",
            fontWeight: "600",
            marginTop: "0",
            textDecoration: 'underline',
        }}>Recent Posts</h2>
        <div className="list-recent-posts">
            {recentPosts.map((item, index) => {
                return (
                    <div key={index} className="recent-post-item">
                        <Link href={getLink(item.title, item.id)} >
                            <Grid container spacing={1}>
                                <Grid container item xs={5} sm={4}>
                                    <div className="wrapper-image">
                                        <img src={item.bannerImage} alt={item.title}></img>
                                    </div>
                                </Grid>
                                <Grid container item xs={7} sm={8}>
                                    <div style={{ color: "#4E63BD" }} className="dot-1" title={item.title}><strong>{item.title}</strong></div>
                                    <div style={{ height: "8px", width: "100%" }}></div>
                                    <div style={{ fontSize: "16px" }} className="dot-1" title={item.description}>{item.description}</div>
                                    <div style={{ height: "8px", width: "100%" }}></div>
                                    <IconButton
                                        style={{ borderRadius: "0px", backgroundColor: "#4E63BD", color: "#fff", padding: "0px 6px", fontSize: "13px" }}
                                        onClick={() => router.push(getLink(item.title, item.id))}>
                                        Read More<NavigateNextIcon></NavigateNextIcon>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Link>
                    </div>
                );
            })}
        </div>
    </div>);
}

export async function getServerSideProps(context) {
    console.log("xxxx context", context.query)
    let url = 'https://micro-enigma-235001.appspot.com/new/api?type=get-all-new-info';
    if (context.query.appId) {
        url += '&appId=' + context.query.appId;
    }
    const res = await fetch(url);
    const data = await res.json();

    return { props: { data: data, url: context.req.url } }
}
export default ListBlog