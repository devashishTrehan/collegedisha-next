import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { Theme } from '@/Services/App.service'

const theme = responsiveFontSizes(createMuiTheme())

class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="theme-color" content={Theme.primary} />
                    <title>College disha</title>
                    <meta name="description" content="college disha" />
                    <style jsx global>
                        {`
              html,
              body {
                height: 100%;
                width: 100%;
              }
              *,
              *:after,
              *:before {
                box-sizing: border-box;
              }
              body {
                font-family: 'gordita,'sans-serif','Roboto', 'Helvetica', 'Arial', ;
                font-size: 1rem;
                margin: 0;
              }
            `}
                    </style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async ctx => {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: App => props => sheets.collect(<App {...props} />)
        })

    const initialProps = await Document.getInitialProps(ctx)

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
            <React.Fragment key="styles">
                {initialProps.styles}
                {sheets.getStyleElement()}
            </React.Fragment>
        ]
    }
}

export default MyDocument