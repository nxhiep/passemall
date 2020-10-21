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
                <meta charset="UTF-8" />
                <title>ABC Learning</title>
                <link rel="icon" href="/images/logo.svg" />
                <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" type="text/css" href="/styles/header.css" />
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
            <div className="body-panel">
                <Header isBlog={true}></Header>
                <section className="background-header">
                    <div className="list-social">
                        <IconButton >
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
                    <h1 className="name-blog">Passemall Blog</h1>
                </section>
                <div className="list-blog-container">

                    <div style={displayNone ? { width: "100%", marginTop: "100px" } : { width: "70%", marginTop: "100px" }} >
                        {data.map(el => {
                            return (
                                <BlogItem data={el} isMobile={isMobile} key={el.id}></BlogItem>
                            )
                        })}
                        <Divider style={displayNone ? { backgroundColor: "rgba(250, 142, 69, 0.3)", marginTop: "40px", width: "100%", marginLeft: "auto" } : { backgroundColor: "rgba(250, 142, 69, 0.3)", marginTop: "40px", width: "calc(100% - 230px )", marginLeft: "auto" }}></Divider>
                        <IconButton style={{ display: "block", borderRadius: "0px", backgroundColor: "#4E63BD", color: "#fff", padding: "8px", fontSize: "18px", marginTop: "32px", marginLeft: "auto" }}>
                            Next Page<NavigateNextIcon></NavigateNextIcon>
                        </IconButton>
                    </div>
                    <div style={displayNone ? { display: "none" } : { maxWidth: "20%", marginLeft: "100px", marginTop: "36px", marginRight: "60px" }}>
                        <h2 style={{ fontSize: "20px", marginBottom: "16px", fontWeight: "400" }}>Recent Posts</h2>
                        <a style={{ display: "flex", marginBottom: "16px" }}>
                            <img src="https://s3.amazonaws.com/utpimg.com/test-prep/test-prep.jpg" height="60px" width="60px"></img>
                            <div style={{ whiteSpace: "nowrap", marginLeft: "16px", overflow: "hidden" }}>
                                <p style={{ marginTop: "0px", fontSize: "16px", textOverflow: "ellipsis", overflow: "hidden", fontWeight: "bold" }}>Ten Tips and Tricks for Successful Test-Taking</p>
                                <p style={{ fontSize: "14px", textOverflow: "ellipsis", overflow: "hidden" }}>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                            </div>
                        </a>
                        <a style={{ display: "flex", marginBottom: "16px" }}>
                            <img src="https://s3.amazonaws.com/utpimg.com/test-prep/test-prep.jpg" height="60px" width="60px"></img>
                            <div style={{ whiteSpace: "nowrap", marginLeft: "16px", overflow: "hidden" }}>
                                <p style={{ marginTop: "0px", fontSize: "16px", textOverflow: "ellipsis", overflow: "hidden", fontWeight: "bold" }}>Ten Tips and Tricks for Successful Test-Taking</p>
                                <p style={{ fontSize: "14px", textOverflow: "ellipsis", overflow: "hidden" }}>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                            </div>
                        </a>
                        <a style={{ display: "flex", marginBottom: "16px" }}>
                            <img src="https://s3.amazonaws.com/utpimg.com/test-prep/test-prep.jpg" height="60px" width="60px"></img>
                            <div style={{ whiteSpace: "nowrap", marginLeft: "16px", overflow: "hidden" }}>
                                <p style={{ marginTop: "0px", fontSize: "16px", textOverflow: "ellipsis", overflow: "hidden", fontWeight: "bold" }}>Ten Tips and Tricks for Successful Test-Taking</p>
                                <p style={{ fontSize: "14px", textOverflow: "ellipsis", overflow: "hidden" }}>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                            </div>
                        </a>
                    </div>
                </div>
                <Footer color="#4E63BD"></Footer>
            </div>
        </>
    )
}
const BlogItem = ({ isMobile, data }) => {
    const router = useRouter();
    const getLink = (name, id) => {
        return ("/blog/" + name.toLowerCase().replace("?", "").replace(/ /g, "-") + "-").replace("--", "-") + id
    }
    return (
        <a href={getLink(data.title, data.id)} style={{ display: "flex", marginBottom: "40px", textDecoration: "none", color: "#000" }}>
            <div style={isMobile ? { display: "none" } : { marginRight: "48px" }}>
                <div style={{ position: "relative", backgroundColor: "#F37E5F" }}>
                    <img src={data.bannerImage} style={{ maxHeight: "169px", position: "relative", bottom: "8px", right: "8px", marginLeft: "auto", display: "block", marginTop: "20px", width: "275px" }}></img>
                </div>
            </div>
            <div style={isMobile ? { padding: "0 24px" } : {}}>
                <h2 style={{ color: "#4E63BD" }}>{data.title}</h2>
                <p style={{ fontSize: "18px" }}>{data.description}</p>
                <IconButton
                    style={{ borderRadius: "0px", backgroundColor: "#4E63BD", color: "#fff", padding: "8px", fontSize: "18px" }}
                    onClick={() => router.push("/blog/blog")}>
                    Read More<NavigateNextIcon></NavigateNextIcon>
                </IconButton>
            </div>
        </a>
    )
}
export async function getServerSideProps() {
    const res = await fetch("https://micro-enigma-235001.appspot.com/new/api?type=get-all-new-info");
    const data = await res.json()

    return { props: { data } }
}
export default ListBlog