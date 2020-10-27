import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Head from 'next/head';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Divider, Grid, IconButton, Link, useMediaQuery, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import { getRecentPosts } from '../utils';
import { SocialWidget } from '../components/SocialWidget';
import { HeaderBlog, BannerBlog } from '../components/blog/HeaderBlog';
function initializeReactGA() {
    ReactGA.initialize('UA-167769768-1');
}

initializeReactGA();
const ListBlog = ({ data }) => {
    let a = [1, 2, 3, 4, 5, 6]
    useEffect(() => {
        ReactGA.pageview('/homepage');
    }, [])
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    const displayNone = useMediaQuery(theme.breakpoints.down("md"))
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <title>ABC Learning</title>
                <link rel="icon" href="/images/logo.svg" />
                <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" type="text/css" href="/styles/index.css" />
                <link rel="stylesheet" type="text/css" href="/styles/listblog.css" />
                <link rel="preconnect" href="https://storage.googleapis.com" />
                <link rel="canonical" href="https://passemall.com"></link>
                <meta property="og:type" content="website" />
                <meta name="theme-color" content="#000000" />
                <meta name="title" content="Passemall Blog" />
                <meta name="description" content="xxxxx" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="keywords" content="Abc e-learning, abc elearning, study online,practice test, practice question,exam prepare,asvab,teas exam,cdl test,cdl practice,cissp exam,cissp practice,accuplacer,comptia practice test,comptia A+,compTIA Network,comptia security,dmv,dmv practice test,driving theory,driving theory UK,G1 test,GED,hesi,hesi A2,motorcycle permit,pmp,pmp exam,ptcb,ptce,real estate exam,practice app,practice test onl,free practice test,free practice questions,free practice app" />
            </Head>
            <div className='body-panel landing-page'>
                <HeaderBlog />
                <BannerBlog />
                <div style={{ height: "40px", width: '100%' }}></div>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Grid container item xs={12} sm={9}>
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
                        <Grid container item xs={12} sm={3} direction="column">
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
                <Grid container spacing={2}>
                    <Grid container item xs={12} sm={4}>
                        <div className="wrapper-image">
                            <img src={data.bannerImage}></img>
                        </div>
                    </Grid>
                    <Grid container item xs={12} sm={8} alignContent="flex-start" direction="column">
                        <h2 style={{ color: "#4E63BD" }}>{data.title}</h2>
                        <p style={{ fontSize: "18px", marginBottom: "10px" }} className="dot-5">{data.description}</p>
                        <div style={{marginTop: "auto",}}>
                            <IconButton
                                style={{ 
                                    borderRadius: "0px", 
                                    backgroundColor: "#4E63BD", 
                                    color: "#fff", 
                                    padding: "8px 16px", 
                                    fontSize: "18px" }}
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
    let recentPostIds = getRecentPosts();
    // console.log("recentPostIds", recentPostIds, 'data', data);
    if (!recentPostIds || recentPostIds.length == 0) {
        return null;
    }
    let recentPosts = [];
    data && data.forEach(element => {
        if(recentPostIds.indexOf(element.id) > -1){
            recentPosts.push(element);
        } 
    });
    console.log("recentPosts ", recentPosts, 'recentPostIds', recentPostIds);
    return <div className="recent-posts">
        <h2 style={{ fontSize: "20px", marginBottom: "16px", fontWeight: "400" }}>Recent Posts</h2>
        <div className="list-recent-posts">
            {recentPosts.map((item, index) => {
                return (
                    <div key={index} className="recent-post-item">
                        <Link href={getLink(item.title, item.id)} >
                            <Grid container spacing={1}>
                                <Grid container item xs={12}>
                                    <div className="wrapper-image">
                                        <img src={item.bannerImage}></img>
                                    </div>
                                </Grid>
                                <Grid container item xs={12}>
                                    <div style={{ color: "#4E63BD" }}><strong>{item.title}</strong></div>
                                    <div style={{height: "8px", width: "100%"}}></div>
                                    <div style={{ fontSize: "16px" }} className="dot-3">{item.description}</div>
                                    <div style={{height: "8px", width: "100%"}}></div>
                                    <IconButton
                                        style={{ borderRadius: "0px", backgroundColor: "#4E63BD", color: "#fff", padding: "4px 8px", fontSize: "16px" }}
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
    </div>
}

export async function getServerSideProps() {
    const res = await fetch("https://micro-enigma-235001.appspot.com/new/api?type=get-all-new-info");
    const data = await res.json();

    return { props: { data } }
}
export default ListBlog