import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import Head from 'next/head';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
function initializeReactGA() {
    ReactGA.initialize('UA-167769768-1');
}

initializeReactGA();
const Blog = ({ appInfoState, userRateState }) => {
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
                <link rel="icon" href="images/logo.svg" />
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
                </div>
                <section style={{ marginTop: "40px" }}>
                    <div style={{ display: "flex", }}>
                        <div style={{ width: "20%", border: "2px solid rgba(78, 99, 189, 0.46)", borderRadius: "15px", margin: "0px 40px", display: "flex", flexDirection: "column", textAlign: "start", wordBreak: "keep-all" }}>
                            <span style={{ marginLeft: "24px", marginTop: "24px" }}>Table of contents</span>
                            <a style={{ margin: "4px 41px 4px 41px" }}>1. Can you drive independently without instruction?</a>
                            <a style={{ margin: "4px 41px 4px 41px" }}>2. Can you drive independently without instruction?</a>
                            <a style={{ margin: "4px 41px 4px 41px" }}>3. Can you drive independently without instruction?</a>
                            <a style={{ margin: "4px 41px 4px 41px" }}>4. Can you drive independently without instruction?</a>
                            <a style={{ margin: "4px 41px 4px 41px" }}>5. Can you drive independently without instruction?</a>

                        </div>
                        <div style={{ width: "80%", marginRight: "200px" }}>
                            <h1>Here we list 5 things to ask yourself when preparing to book or take your practical driving test</h1>
                            <div style={{ marginBottom: "64px" }}>
                                <div>1. Can you drive independently without instruction?</div>
                                <div>Once you have passed your driving test you will no longer need to be accompanied in the car. To prepare you for this, the
                                examiners will offer very little instruction and see how you drive. You should be driving independently for a period of time
                                before taking your test to ensure you have the necessary skills.</div>
                            </div>
                            <div style={{ marginBottom: "64px" }}>
                                <div>1. Can you drive independently without instruction?</div>
                                <div>Once you have passed your driving test you will no longer need to be accompanied in the car. To prepare you for this, the
                                examiners will offer very little instruction and see how you drive. You should be driving independently for a period of time
                                before taking your test to ensure you have the necessary skills.</div>
                            </div>
                            <div style={{ marginBottom: "64px" }}>
                                <div>1. Can you drive independently without instruction?</div>
                                <div>Once you have passed your driving test you will no longer need to be accompanied in the car. To prepare you for this, the
                                examiners will offer very little instruction and see how you drive. You should be driving independently for a period of time
                                before taking your test to ensure you have the necessary skills.</div>
                            </div>
                            <div style={{ marginBottom: "64px" }}>
                                <div>1. Can you drive independently without instruction?</div>
                                <div>Once you have passed your driving test you will no longer need to be accompanied in the car. To prepare you for this, the
                                examiners will offer very little instruction and see how you drive. You should be driving independently for a period of time
                                before taking your test to ensure you have the necessary skills.</div>
                            </div>
                            <div style={{ marginBottom: "64px" }}>
                                <div>1. Can you drive independently without instruction?</div>
                                <div>Once you have passed your driving test you will no longer need to be accompanied in the car. To prepare you for this, the
                                examiners will offer very little instruction and see how you drive. You should be driving independently for a period of time
                                before taking your test to ensure you have the necessary skills.</div>
                            </div>
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
                <Footer></Footer>
            </div>
        </>
    );
}

export default Blog;
