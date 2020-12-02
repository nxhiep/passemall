import SEO from "../components/SEO";
import { getWebContext } from "../utils";
import HeaderBannerPanel from '../components/new/HeaderBannerPanel'

const TestPage = ({ url, isMobile }) => {

    return <>
        <SEO url={url} appInfo={{
            title: "Test Page"
        }} />
        <HeaderBannerPanel isMobile={isMobile} />
    </>
}

export async function getServerSideProps(context) {
    return getWebContext(context);
}

export default TestPage