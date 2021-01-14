import SEO from "../components/SEO"

const XXX = ({ headers }) => {
    console.log("headers", headers)
    console.log("process.env", process.env)
    return <>
        <SEO />
        <main>
            {
                Object.keys(headers).map(key => {
                    return <div className="item">
                        {headers[key]}
                    </div>
                })
            }
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