import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import ReactHtmlParser from 'react-html-parser';
import Head from 'next/head';
import LinkIcon from '@material-ui/icons/Link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { IconButton } from '@material-ui/core';
import { useRouter } from 'next/router';
function initializeReactGA() {
    ReactGA.initialize('UA-167769768-1');
}

initializeReactGA();
const Blog = ({ data }) => {
    const description = "With thousands of our FREE practice questions, we are here to help you achieve your gate of success with our test prep solutions."
    const title = "ABC Learning"
    useEffect(() => {
        ReactGA.pageview('/homepage');
    }, [])
    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                <title>ABC Learning</title>
                <link rel="icon" href="/images/logo.svg" />
                <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" type="text/css" href="/styles/header.css" />
                <link rel="stylesheet" type="text/css" href="/styles/blog.css" />
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
                            <img src="/images/facebook.svg" alt="facebook"></img>
                        </IconButton>
                        <IconButton>
                            <LinkIcon style={{ color: "#fff", fontSize: "30px" }}></LinkIcon>
                        </IconButton>
                    </div>
                </div>
                <section style={{ boxSizing: "border-box", padding: "40px 175px 40px 40px" }}>
                    <div style={{ display: "flex", }}>
                        <div style={{ width: "25%", border: "2px solid rgba(78, 99, 189, 0.46)", borderRadius: "15px", display: "flex", flexDirection: "column", textAlign: "start", wordBreak: "keep-all" }}>
                            <span style={{ marginLeft: "24px", marginTop: "24px", color: "#4E63BD" }}>Table of contents</span>
                            <a style={{ margin: "4px 41px 4px 41px" }}>1. Can you drive independently without instruction?</a>
                            <a style={{ margin: "4px 41px 4px 41px" }}>2. Can you drive independently without instruction?</a>
                            <a style={{ margin: "4px 41px 4px 41px" }}>3. Can you drive independently without instruction?</a>
                            <a style={{ margin: "4px 41px 4px 41px" }}>4. Can you drive independently without instruction?</a>
                            <a style={{ margin: "4px 41px 4px 41px" }}>5. Can you drive independently without instruction?</a>

                        </div>
                        <div className="blog-content">
                            {ReactHtmlParser(data.content)}
                        </div>
                    </div>
                </section>
                <section style={{ marginBottom: "60px", marginTop: "40px" }}>
                    <h2 className="related-post">Related stories</h2>
                    <div style={{ display: "flex", marginRight: "40px", marginLeft: "40px", justifyContent: "space-between" }}>
                        <a style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "33.33%", marginRight: "40px", marginLeft: "40px", border: "1px solid #dadce0" }}>
                            <div style={{ maxHeight: "250px" }}>
                                <img src="https://s3.amazonaws.com/utpimg.com/test-prep/test-prep.jpg" alt="blog" height="100%" width="100%"></img>
                            </div>
                            <div style={{ padding: "0 40px 40px 40px" }}>
                                <div >
                                    <h4 style={{ fontSize: "14px", marginBottom: "8px", marginTop: "30px", letterSpacing: "1.5px", fontWeight: 400 }}>ASVAB PRACTICE TEST</h4>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: "22px", marginTop: "0px", fontWeight: 400 }}>Computer science education still has diversity gaps</h3>
                                </div>
                                <div style={{ marginBottom: "32px" }}>When preparing for a test, people often pay close attention to the long-term aspects,
                                such as studying, keeping healthy, and making sure everything is ready to take the actual</div>
                                <div style={{ margin: "auto 0px 16px 0px" }}>By Jennie Magiera - Sep 24,2020</div>
                            </div>
                        </a>
                        <a style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "33.33%", marginRight: "40px", marginLeft: "40px", border: "1px solid #dadce0" }}>
                            <div style={{ maxHeight: "250px" }}>
                                <img src="https://s3.amazonaws.com/utpimg.com/test-prep/test-prep.jpg" alt="blog" height="100%" width="100%"></img>
                            </div>
                            <div style={{ padding: "0 40px 40px 40px" }}>
                                <div >
                                    <h4 style={{ fontSize: "14px", marginBottom: "8px", marginTop: "30px", letterSpacing: "1.5px", fontWeight: 400 }}>ASVAB PRACTICE TEST</h4>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: "22px", marginTop: "0px", fontWeight: 400 }}>Computer science education still has diversity gaps</h3>
                                </div>
                                <div style={{ marginBottom: "32px" }}>When preparing for a test, people often pay close attention to the long-term aspects,
                                such as studying, keeping healthy, and making sure everything is ready to take the actual</div>
                                <div style={{ margin: "auto 0px 16px 0px" }}>By Jennie Magiera - Sep 24,2020</div>
                            </div>
                        </a>
                        <a style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "33.33%", marginRight: "40px", marginLeft: "40px", border: "1px solid #dadce0" }}>
                            <div style={{ maxHeight: "250px" }}>
                                <img src="https://s3.amazonaws.com/utpimg.com/test-prep/test-prep.jpg" alt="blog" height="100%" width="100%"></img>
                            </div>
                            <div style={{ padding: "0 40px 40px 40px" }}>
                                <div >
                                    <h4 style={{ fontSize: "14px", marginBottom: "8px", marginTop: "30px", letterSpacing: "1.5px", fontWeight: 400 }}>ASVAB PRACTICE TEST</h4>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: "22px", marginTop: "0px", fontWeight: 400 }}>Computer science education still has diversity gaps</h3>
                                </div>
                                <div style={{ marginBottom: "32px" }}>When preparing for a test, people often pay close attention to the long-term aspects,
                                such as studying, keeping healthy, and making sure everything is ready to take the actual</div>
                                <div style={{ margin: "auto 0px 16px 0px" }}>By Jennie Magiera - Sep 24,2020</div>
                            </div>
                        </a>
                    </div>
                </section>
                <Footer color="#4E63BD"></Footer>
            </div>
        </>
    );
}
export async function getServerSideProps(context) {
    let blogId = context.params.blog.substring(context.params.blog.length - 16)
    console.log("xxx", blogId);
    const res = await fetch(`https://micro-enigma-235001.appspot.com/new/api?type=get-new-info-by-id&id=${blogId}`);
    const data = await res.json();
    return { props: { data } }
}
export default Blog;
