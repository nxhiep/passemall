import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import ReactHtmlParser from 'react-html-parser';
import Head from 'next/head';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Container, Grid, IconButton, Link } from '@material-ui/core';
import { useRouter } from 'next/router';
import { addRecentPost } from '../../utils';
import { SocialWidget } from '../../components/SocialWidget';
function initializeReactGA() {
    ReactGA.initialize('UA-167769768-1');
}

initializeReactGA();
const Blog = ({ newInfo, relativeds }) => {
    const description = "With thousands of our FREE practice questions, we are here to help you achieve your gate of success with our test prep solutions."
    const title = "ABC Learning"
    useEffect(() => {
        ReactGA.pageview('/homepage');
        addRecentPost(newInfo.id);
    }, [])
    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                <title>ABC Learning</title>
                <link rel="icon" href="/images/logo.svg" />
                <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" type="text/css" href="/styles/index.css" />
                <link rel="stylesheet" type="text/css" href="/styles/header.css" />
                <link rel="stylesheet" type="text/css" href="/styles/blog.css" />
                <link rel="stylesheet" type="text/css" href="/styles/listblog.css" />
                <link rel="preconnect" href="https://storage.googleapis.com" />
                <link rel="canonical" href="https://passemall.com"></link>
                <meta property="og:type" content="website" />
                <meta name="theme-color" content="#000000" />
                <meta name="title" content={title} />
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="keywords" content="Abc e-learning, abc elearning, study online,practice test, practice question,exam prepare,asvab,teas exam,cdl test,cdl practice,cissp exam,cissp practice,accuplacer,comptia practice test,comptia A+,compTIA Network,comptia security,dmv,dmv practice test,driving theory,driving theory UK,G1 test,GED,hesi,hesi A2,motorcycle permit,pmp,pmp exam,ptcb,ptce,real estate exam,practice app,practice test onl,free practice test,free practice questions,free practice app" />
            </Head>

            <div className='body-panel landing-page'>
                <Header />
                <div className="background-title-blog">
                    <div style={{ zIndex: "1000", position: "absolute", top: "50px", right: "80px", color: "#fff", display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: "72px" }}>5 top questions</strong>
                        <span style={{ fontSize: "32px" }}>Ready for your practical driving test</span>
                    </div>
                    <SocialWidget />
                </div>
                <PostContent content={newInfo.content} />
                <RelatedStories relativeds={relativeds} />
                <Footer color="#4E63BD"></Footer>
            </div>
        </>
    );
}

const RelatedStories = ({ relativeds }) => {
    if(!relativeds){
        return null;
    }
    return <Container style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <h2 style={{textAlign: "center"}}>Related Stories</h2>
        <Grid wrap="wrap" container spacing={3}>
            {relativeds.map(e => {
                return <BlogItem item={e} key={e.id} />
            })}
        </Grid>
    </Container>
}

const getLink = (name, id) => {
    return ("/blog/" + name.toLowerCase().replace("?", "").replace(/ /g, "-") + "-").replace("--", "-") + id
}

const BlogItem = ({ item }) => {
    const router = useRouter();
    if (!item.bannerImage) {
        item.bannerImage = 'https://storage.googleapis.com/micro-enigma-235001.appspot.com/resources/images/how-to-pass-the-ged-math-test.jpg';
    }
    return (
        <Grid className="recent-post-item post-item" item container xs={12} sm={6} lg={4}>
            <Link href={getLink(item.title, item.id)} style={{width: "100%"}}>
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
        </Grid>
    );
}

const PostContent = ({content}) => {
    let hasMenu = content.includes('h1') || content.includes('h2') || content.includes('h3');
    let elementId = 'ssadasdasdszcx';
    useEffect(() => {
        replaceHTML(elementId);
    }, []);
    return <Container style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <Grid container alignItems="flex-start" spacing={3}>
            { hasMenu ? <Grid item container xs={12} sm={4} direction="column">
                <h3>Menu</h3>
                <div id="post-menu-auto-gen"></div> 
            </Grid> : null}
            <Grid item container xs={12} sm={hasMenu ? 8 : 12} id={elementId}>
                {ReactHtmlParser(content)}
            </Grid>
        </Grid>
    </Container>
}

function replaceHTML(elementId) {
    if(typeof window !== 'undefined'){
        // window.location.hash = '';
        let element = document.getElementById(elementId);
        let h1s = element.querySelectorAll("h1,h2,h3");
        let panel = document.getElementById('post-menu-auto-gen');
        panel.innerHTML = '';
        h1s.forEach(function(e) {
            let text = e.innerText;
            let id = text.replace(/[^a-zA-Z0-9]/g,'_').toLowerCase();
            e.setAttribute('id', id);
            let item = document.createElement("a");
            item.innerHTML = text;
            item.setAttribute('href', '#' + id);
            let itemP = document.createElement("div");
            itemP.appendChild(item);
            panel.appendChild(itemP);
        });
    }
}

export async function getServerSideProps(context) {
    let blogId = context.params.blog.substring(context.params.blog.length - 16)
    const res = await fetch(`https://micro-enigma-235001.appspot.com/new/api?type=get-new-info-by-id&id=${blogId}`);
    const newInfo = await res.json();
    console.log("newInfo", newInfo);
    let relativeds;
    if(newInfo){
        const res2 = await fetch(`https://micro-enigma-235001.appspot.com/new/api?type=get-new-info-relatived&topicId=${newInfo.topicId}`);
        relativeds = await res2.json();
    }
    return { props: { newInfo: newInfo, relativeds: relativeds } }
}
export default Blog;
