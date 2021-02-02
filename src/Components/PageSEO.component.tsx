import React from 'react';
import Head from 'next/head';
import { PageSEOProps } from '@/Services/Interfaces.interface';



interface Props {
    data: PageSEOProps
}

function PageSEO(props: Props) {


    if (props?.data) {

        const { metaDescription, metaKeywords, metaTitle } = props.data;

        return (
            <Head >
                <title>{metaTitle}</title>
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                {/* <meta property="og:url" content="" /> */}
                <meta content={metaKeywords} name="keywords" />
            </Head>
        );
    } else {
        return (
            <Head>
            </Head>
        )
    }
}

export default PageSEO;