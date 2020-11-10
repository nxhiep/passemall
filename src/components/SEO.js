import Head from "next/head";

const SEO = ({ url, appInfo, children }) => {
    let title = 'ABC Learning';
    let description = 'With thousands of our FREE practice questions, we are here to help you achieve your gate of success with our test prep solutions.';
    let keywords = 'Abc e-learning, abc elearning, study online,practice test, practice question,exam prepare,asvab,teas exam,cdl test,cdl practice,cissp exam,cissp practice,accuplacer,comptia practice test,comptia A+,compTIA Network,comptia security,dmv,dmv practice test,driving theory,driving theory UK,G1 test,GED,hesi,hesi A2,motorcycle permit,pmp,pmp exam,ptcb,ptce,real estate exam,practice app,practice test onl,free practice test,free practice questions,free practice app';
    let image = 'images/logo.svg';
    if(appInfo){
        appInfo.title && (title = appInfo.title);
        appInfo.description && (description = appInfo.description);
        appInfo.keywords && (keywords = appInfo.keywords);
        appInfo.avatar && (image = appInfo.avatar);
    }
    return <Head>
        <link rel="icon" href={image} />
        <link rel="preconnect" href="https://webappapi-dot-micro-enigma-235001.appspot.com"></link>
        <link rel="preconnect" href="https://storage.googleapis.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {url ? <link rel="canonical" href={url}></link> : null}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />	
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="website" />
        {children}
    </Head>
}

export default SEO;