import Head from "next/head";
import { GOOGLE_SITE_VERIFICATION } from '../config_app'

const SEO = ({ url, appInfo, children, mapFAQ }) => {
    let title = 'ABC Elearning - Free Practice Questions and Exam Prep';
    let description = 'With thousands of our FREE practice questions, we are here to help you achieve your gate of success with our test prep solutions.';
    let keywords = 'Abc e-learning, abc elearning, study online,practice test, practice question,exam prepare,asvab,teas exam,cdl test,cdl practice,cissp exam,cissp practice,accuplacer,comptia practice test,comptia A+,compTIA Network,comptia security,dmv,dmv practice test,driving theory,driving theory UK,G1 test,GED,hesi,hesi A2,motorcycle permit,pmp,pmp exam,ptcb,ptce,real estate exam,practice app,practice test onl,free practice test,free practice questions,free practice app';
    let image = '/info/images/logo60.png';
    let imageShare = '/info/images/logo60.png';
    if (appInfo) {
        appInfo.title && (title = appInfo.title);
        appInfo.description && (description = appInfo.description.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/g, ' '));
        appInfo.descriptionSEO && (description = appInfo.descriptionSEO);
        appInfo.keywords && (keywords = appInfo.keywords);
        appInfo.imageShare && (imageShare = appInfo.imageShare);
        appInfo.avatar && (image = appInfo.avatar);
    }
    let array = [];
    mapFAQ && Object.keys(mapFAQ).forEach((key) => {
        array.push({
            "@type": "Question",
            "name": key,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": mapFAQ[key]
            }
        });
    })
    return <Head>
        <link rel="icon" href={image} />
        <link rel="apple-touch-icon" href={image}></link>

        <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />

        {/* <link rel="preload" href="/fonts/Poppins-Bold.ttf" as="font" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Poppins-Italic.ttf" as="font" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Poppins-Regular.ttf" as="font" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Poppins-SemiBold.ttf" as="font" crossOrigin="anonymous" />
        <link rel="preload" href="index.css" as="style"></link>
        <link rel="stylesheet" href="index.css"></link> */}

        <link rel="preconnect" href="https://micro-enigma-235001.appspot.com"></link>
        <link rel="preconnect" href="https://storage.googleapis.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href={url || 'https://passemall.com/'}></link>
        <title>{title.toUpperCase()}</title>
        <meta name="title" content={title.toUpperCase()} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        { !!(imageShare || image) ? <meta property="og:image" content={imageShare || image} /> : null}
        <meta property="og:type" content="website" />
        {children}
        {mapFAQ && array.length > 0 ? <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": array
            }) }}
        ></script> : null}
    </Head>
}

export default SEO;