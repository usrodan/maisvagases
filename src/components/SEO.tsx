import Head from 'next/head'
import configs from '../configs'
 

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    shoudExcludeTitleSuffix?: boolean;
    notIndexPage?: boolean;
    siteName: string;

}

export default function SEO({
    title = "",
    description,
    image,
    shoudExcludeTitleSuffix = false,
    notIndexPage = false,
    siteName

}: SEOProps) {
    const pageTitle = `${title} ${!shoudExcludeTitleSuffix ? `| ${siteName} ` : ''}`
    const pageImage = image ? image : null
    return (

        <Head>
            <title>{pageTitle}</title>
            {description && <meta name="description" content={description} />}
            {pageImage && <meta name="image" content={pageImage} />}
            {notIndexPage && <meta name="robots" content="noindex,nofollow" />} 

            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />

            <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
            <meta name="MobileOptimized" content="320" />
            <meta name="HandheldFriendly" content="True" />
            <meta name="theme-color" content={configs.primary} />
            <meta name="msapplication-TileColor" content={configs.primary} />
            <meta name="referrer" content="no-referrer-when-downgrade" />
            <meta name="google" content="notranslate" />

            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:locale" content="pt_BR" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={pageTitle} />
            <meta property="og:image" content={pageImage} />
            <meta property="og:image:secure_url" content={pageImage} />
            <meta property="og:image:alt" content="Thumbnail" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@rocketseat" />
            <meta name="twitter:creator" content="@rocketseat" />
            <meta name="twitter:image" content={pageImage} />
            <meta name="twitter:image:src" content={pageImage} />
            <meta name="twitter:image:alt" content="Thumbnail" />
            <meta name="twitter:image:width" content="1200" />
            <meta name="twitter:image:height" content="620" />


           
        </Head>
    )
}