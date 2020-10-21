import Document, { Html, Head, Main, NextScript } from 'next/document';

import React from 'react';
import { ServerStyleSheets } from '@material-ui/core/styles';

class MyDocument extends Document {

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="google-site-verification" content="X91De9MR3B7BNl2-ciF8EUnT2A2oybgrzwbNla4YdIA" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
MyDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};
export default MyDocument