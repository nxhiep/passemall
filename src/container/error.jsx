import { Container } from "@material-ui/core"
import { useEffect } from "react";
import ReactGA from 'react-ga';

ReactGA.initialize(GA_ID);

const ErrorPage = ({ title }) => {
    title = title ? title : "Error"
    useEffect(() => {
        ReactGA.pageview(window.location.pathname, ["error-page"], 'error-page');
    }, [])
    return <>
        <link rel="icon" href='/info/images/logo60.png' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="manifest.json" />
        <title>{title.toUpperCase()}</title>
        <header style={{height: "70px", backgroundColor: "#1e3094"}}>
            <Container style={{height: "100%", display: 'flex', alignItems: "center"}}>
                <a href="/"><img alt="ABC Elearning" src={"/images/logo/logo-dark.svg"} width="240px" height="60px" /></a>
            </Container>
        </header>
        <Container>
            <main>
                <h1>{title}</h1>
            </main>
        </Container>
    </>
}

export default ErrorPage