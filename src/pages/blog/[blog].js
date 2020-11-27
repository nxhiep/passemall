import { CircularProgress, Container, Grid, IconButton, Link, useMediaQuery, useTheme } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import ReactHtmlParser from 'react-html-parser';
import Slider from "react-slick";
import { BannerBlog, HeaderBlog } from '../../components/blog/HeaderBlog';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { GA_ID } from '../../config_app';
import SEOInfo from '../../models/SEOInfo';
import { addRecentPost } from '../../utils';

ReactGA.initialize(GA_ID);

const Blog = ({ newInfo, url }) => {
    const seoInfo = new SEOInfo(newInfo);
    useEffect(() => {
        ReactGA.pageview('/blog-info', [newInfo.title]);
        addRecentPost(newInfo.id);
    }, [])
    return (
        <>
            <SEO url={url}
                appInfo={seoInfo}
            >
                <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" type="text/css" href="/styles/index.css" />
                <link rel="stylesheet" type="text/css" href="/styles/header.css" />
                <link rel="stylesheet" type="text/css" href="/styles/blog.css" />
                <link rel="stylesheet" type="text/css" href="/styles/listblog.css" />
                <link rel="stylesheet" type="text/css" href="/styles/slick.css" />
            </SEO>

            <div className='body-panel landing-page'>
                <HeaderBlog appId={newInfo ? newInfo.appId : -1} />
                <BannerBlog title={newInfo ? newInfo.title : ''} bannerImage={newInfo.bannerImage} />
                <PostContent content={newInfo.content} />
                <RelatedStories topicId={newInfo.topicId} />
                <Footer color="#4E63BD"></Footer>
            </div>
        </>
    );
}

const RelatedStories = ({ topicId }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    const isTablet = useMediaQuery(theme.breakpoints.between(0, 1200));
    const [relativeds, setRelativeds] = useState(null)
    useEffect(() => {
        fetch(`https://micro-enigma-235001.appspot.com/new/api?type=get-new-info-relatived&topicId=${topicId}`)
            .then((data) => data.json()).then((data) => {
                setRelativeds(data)
            }).catch(e => {
                setRelativeds([])
            })
    }, [])
    if(!relativeds){
        return <CircularProgress />;
    }
    if(relativeds.length == 0){
        return null;
    }
    if(relativeds.length >= 4){
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: isMobile ? 1 : (isTablet ? 2 : 3),
            slidesToScroll: isMobile ? 1 : (isTablet ? 2 : 3),
            className: "related-stories-slider",
            centerPadding: '20px'
        };
        return (
            <Container style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                <h2 style={{textAlign: "center"}}>Related Stories</h2>
                <Slider {...settings}>
                    {
                        relativeds.map(e => {
                            return <div key={e.id} className="padding-10">
                                <BlogItem item={e} />
                            </div>
                        })
                    }
                </Slider>
            </Container>
        );
    }
    return <Container style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <h2 style={{textAlign: "center"}}>Related Stories</h2>
        <Grid wrap="wrap" container spacing={3}>
            {relativeds.map(e => {
                return <Grid key={e.id} className="recent-post-item post-item" item container xs={12} sm={6} lg={4}>
                    <BlogItem item={e} />
                </Grid>
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
            { hasMenu ? <Grid item container xs={12} sm={3} direction="column">
                <div
                    style={{ 
                    padding: '24px', 
                    border: '2px solid rgba(78, 99, 189, 0.46)',
                    boxSizing: 'border-box',
                    borderRadius: '16px',
                    height: '100%'
                    }}
                >
                    <h3 style={{ color: '#4E63BD' }}>Table of contents</h3>
                    <div id="post-menu-auto-gen"></div>
                </div> 
            </Grid> : null}
            <Grid item container xs={12} sm={hasMenu ? 9 : 12} id={elementId}>
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
            itemP.classList.add('item');
            itemP.appendChild(item);
            panel.appendChild(itemP);
        });
    }
}

export async function getServerSideProps(context) {
    // console.log("context.req", context.req);
    let blogId = context.params.blog.substring(context.params.blog.length - 16)
    const res = await fetch(`https://micro-enigma-235001.appspot.com/new/api?type=get-new-info-by-id&id=${blogId}`);
    const newInfo = await res.json();
    return { props: { newInfo: newInfo, url: context.req.url } }
}
export default Blog;
