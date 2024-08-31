import {Helmet} from 'react-helmet-async';
import {MetaSimpleAnalytics} from "../googleAnalytics";

interface SEOProps {
    url: string,
    title: string,
    description: string,
    image: string,
    author: string,
    keywords: string[],
}

export default function SEO({url, title, description, image, author, keywords}: SEOProps) {
    return (
        <>
            <Helmet>
                {/* Standard metadata tags */}
                <title>{title}</title>
                <meta name="title" content={title}/>
                <meta name="description" content={description}/>
                <meta name="author" content={author}/>
                <meta name="keywords" content={keywords.join(", ")}/>
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={url}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:image" content={url + "/assets/img/logo/" + image}/>
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content={url}/>
                <meta name="twitter:title" content={title}/>
                <meta name="twitter:description" content={description}/>
                <meta name="twitter:image" content={url + "/assets/img/logo/" + image}/>
                <meta name="twitter:creator" content={author}/>
                <meta name="robots" content="Index"/>
                <link rel="manifest" href="/manifest.json"/>
                {/* Favicon */}
                {/*<link rel="apple-touch-icon" sizes="120x120" href="./favicon.png"/>*/}
                {/*<link rel="icon" type="image/png" sizes="32x32" href="./favicon.png"/>*/}
                <link rel="icon" type="image/ico" sizes="16x16" href={url + "/assets/img/logo/favicon.ico"}/>
            </Helmet>
            <MetaSimpleAnalytics/>
        </>
    )
}