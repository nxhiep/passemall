import { Container, Grid } from "@material-ui/core";
import Head from "next/head";
import SEO from "../components/SEO";
import { VERSION } from "../config_app";
import { getWebContext } from "../utils";

const TestPage = ({ url, isMobile }) => {
    const headerMenu = { padding: "20px", color: "blue", textDecoration: "none", fontWeight: "500" };
    return <>
        <Head>
            <meta charset="UTF-8" />
            <meta name="google-site-verification" content="X91De9MR3B7BNl2-ciF8EUnT2A2oybgrzwbNla4YdIA" />
            <meta charset="utf-8" />
            <link rel="icon" href="/info/images/logo60.png" />
            <link rel="apple-touch-icon" href="/info/images/logo60.png" />
            <link rel="preconnect" href="https://webappapi-dot-micro-enigma-235001.appspot.com" />
            <link rel="preconnect" href="https://storage.googleapis.com" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <link rel="manifest" href="manifest.json" />
            <title>TEST PAGE ${VERSION}</title>
            <meta name="title" content={"TEST PAGE " + VERSION} />
            <meta name="description" content="With thousands of our FREE practice questions, we are here to help you achieve your gate of success with our test prep solutions." />
            <meta name="keywords" content="Abc e-learning, abc elearning, study online,practice test, practice question,exam prepare,asvab,teas exam,cdl test,cdl practice,cissp exam,cissp practice,accuplacer,comptia practice test,comptia A+,compTIA Network,comptia security,dmv,dmv practice test,driving theory,driving theory UK,G1 test,GED,hesi,hesi A2,motorcycle permit,pmp,pmp exam,ptcb,ptce,real estate exam,practice app,practice test onl,free practice test,free practice questions,free practice app" />
            <meta property="og:title" content={"Test Page " + VERSION} />
            <meta property="og:description" content="With thousands of our FREE practice questions, we are here to help you achieve your gate of success with our test prep solutions." />
            <meta property="og:image" content="/info/images/logo60.png" />
            <meta property="og:type" content="website" />
            <meta name="next-head-count" content="22" />
        </Head>
        <main style={{
            background: "url(/images/new/banner-left.jpg) no-repeat, url(/images/new/banner-right.jpg) no-repeat",
            backgroundPosition: "top left, top right",
            backgroundSize: "auto, auto 100%"
        }}>
            <header>
                <Container>
                    <Grid container justify="space-between" alignItems="center" style={{height: "100%"}}>
                        <a href="/"><img alt="ABC Elearning Logo" src="/images/logo-landing-2.png" width="240px" height="60px" /></a>

                        <div>
                            <a href="/" style={headerMenu}>HOME</a>
                            <a href="/blog" style={headerMenu}>BLOG</a>
                            <a href="/test" style={headerMenu}>TEST</a>
                            <a href="/support" style={headerMenu}>SUPPORT</a>
                        </div>
                    </Grid>
                </Container>
            </header>
            <section style={{
                minHeight: "500px"
            }}>
                <Container>
                    <h1>Happier study, easier pass with our free practice tests</h1>
                    <p>We are here for your success because your success is our last goal! That's why we have tried our best to bring you all free, friendly, and funny test prep solutions.</p>
                    <h1>SOME OF THE BEST FEATURES</h1>
                    <p>With thousands of exam-simulated questions with detail explanations, lifetime access to the complete Manual, and dozens of test-taking strategies, our Test Prep helps you pass your test with flying colors.</p>
                    <hr />
                    <h2>COMPLETELY FREE</h2>
                    <p>Our application is 100% free, so you can practice your test in our web or in any other devices with our available free app on google play or appStore. No internet connection and no registration required.</p>
                    <h2>PRACTICE BY TOPICS</h2>
                    <p>Test your knowledge by practicing by topics exactly as in real test. Moreover, topic is also divided into small parts which helps you get your interest in studying, just like playing a game.</p>
                    <h2>3 INTERESTING TEST MODES</h2>
                    <p>3 different test modes with increases in difficult level let you experience the test in a very exciting way. Let's get accustomed to the format of the real test.</p>
                    <h2>SPECICAL REVIEW MODE</h2>
                    <p>With this feature, you can review which questions you are weak, medium or strong. And this will help you find out where you need to work more and make the most of your study time.</p>
                </Container>    
            </section>
        </main>
    </>
}

export async function getServerSideProps(context) {
    return getWebContext(context);
}

export default TestPage