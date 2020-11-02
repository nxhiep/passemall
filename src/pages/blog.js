import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Head from 'next/head';
import LinkIcon from '@material-ui/icons/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Divider, IconButton, useMediaQuery, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
function initializeReactGA() {
    ReactGA.initialize('UA-167769768-1');
}

initializeReactGA();
const ListBlog = ({ appInfoState, userRateState }) => {
    const description = "With thousands of our FREE practice questions, we are here to help you achieve your gate of success with our test prep solutions."
    const title = "ABC Learning";
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
                <meta charset="UTF-8" />
                <title>ABC Learning</title>
                <link rel="icon" href="images/logo.svg" />
                <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" type="text/css" href="/styles/header.css" />
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
            <div className="body-panel">
                <Header isBlog={true}></Header>
                <section className="background-header">
                    <div className="list-social">
                        <IconButton s>
                            <img src="/images/twitter.svg" alt="twitter"></img>
                        </IconButton>
                        <IconButton>
                            <img src="/images/likedin.svg" alt="likedin"></img>
                        </IconButton>
                        <IconButton>
                            <img src="/images/snapchat.svg" alt="snapchat"></img>
                        </IconButton>
                        <IconButton>
                            <img src="images/facebook.svg" alt="facebook"></img>
                        </IconButton>
                        <IconButton>
                            <LinkIcon style={{ color: "#fff", fontSize: "30px" }}></LinkIcon>
                        </IconButton>
                    </div>
                    <h1 style={{ position: "absolute", bottom: "40px", color: "#fff", left: "40px", fontSize: "48px" }}>Passemall Blog</h1>
                </section>
                <Container style={{ marginBottom: "40px", display: "flex" }}>

                    <div style={displayNone ? { width: "100%", marginTop: "100px" } : { width: "75%", marginTop: "100px" }} >
                        {a.map(el => {
                            return (
                                <BlogItem isMobile={isMobile} key={el}></BlogItem>
                            )
                        })}
                        <Divider style={displayNone ? { backgroundColor: "rgba(250, 142, 69, 0.3)", marginTop: "40px", width: "100%", marginLeft: "auto" } : { backgroundColor: "rgba(250, 142, 69, 0.3)", marginTop: "40px", width: "calc(100% - 230px )", marginLeft: "auto" }}></Divider>
                        <IconButton style={{ display: "block", borderRadius: "0px", backgroundColor: "#4E63BD", color: "#fff", padding: "8px", fontSize: "18px", marginTop: "32px", marginLeft: "auto" }}>
                            Next Page<NavigateNextIcon></NavigateNextIcon>
                        </IconButton>
                    </div>
                    <div>
                        <h2 style={{ fontSize: "20px" }}>Recent Posts</h2>
                        <div>
                            <img src="https://s3.amazonaws.com/utpimg.com/test-prep/test-prep.jpg" height="60px" width="60px"></img>
                            <h3>Ten Tips and Tricks for Successful Test-Taking</h3>
                            <div>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                        </div>
                    </div>

                </Container>
                <Footer></Footer>
            </div>
        </>

    )

}
const BlogItem = ({ isMobile }) => {
    const router = useRouter()
    return (
        <a href="/blog/blog" onClick={() => router.push("/blog/blog")} style={{ display: "flex", marginBottom: "40px", textDecoration: "none", color: "#000" }}>
            <div style={isMobile ? { display: "none" } : { width: "100%", marginRight: "48px" }}>
                <img src="/images/write-blog.png" style={{ marginLeft: "auto", display: "block", marginTop: "20px" }}></img>
            </div>
            <div style={isMobile ? { padding: "0 24px" } : {}}>
                <h2 style={{ color: "#4E63BD" }}>The Best Food to Fuel a Test</h2>
                <p style={{ fontSize: "18px" }}>When preparing for a test, people often pay close attention to the long-term
                aspects, such as studying, keeping healthy, and making sure everything is
                ready to take the actual test, such as purchasing calculators, notebooks, or
                    other items needed for test-taking. Even the night before, many peopl...</p>
                <IconButton
                    style={{ borderRadius: "0px", backgroundColor: "#4E63BD", color: "#fff", padding: "8px", fontSize: "18px" }}
                    onClick={() => router.push("/blog/blog")}>
                    Read More<NavigateNextIcon></NavigateNextIcon>
                </IconButton>
            </div>
        </a>
    )
}
export default ListBlog