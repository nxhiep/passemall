import SEO from "../components/SEO"

const XXX = ({ headers }) => {
    console.log("headers", headers)
    console.log("process.env", process.env)
    return <>
        <SEO />
        <main>
            XXXXX
        </main>
    </>
}

export async function getServerSideProps(context) {
    return {
        props: {
            headers: context.req.headers
        }
    }
}

export default XXX