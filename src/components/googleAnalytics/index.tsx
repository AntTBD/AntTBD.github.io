import {useLocation} from "react-router-dom";
import analytics from "./analytics";
import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";

export default function useGoogleAnalytics() {
    const location = useLocation()

    useEffect(() => {
        analytics.initializeGA()
    }, [])

    useEffect(() => {
        const currentPath = location.pathname + location.search
        analytics.sendPageView(currentPath, document.title)
    }, [location])
}

export const SimpleAnalytics = () => {
    const [isDev, setIsDev] = useState(!process.env.NODE_ENV || process.env.NODE_ENV === "development")

    return (
        <Helmet>
            {/* Simple Analytics - 100% privacy-first analytics */}
            <script async defer src={`https://scripts.simpleanalyticscdn.com/latest${isDev ? ".dev" : ""}.js`}></script>
            <noscript>
                {`
                    <img
                        src="https://queue.simpleanalyticscdn.com/noscript.gif"
                        alt=""
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                `}
            </noscript>
        </Helmet>
    )
}

export const MetaSimpleAnalytics = () => {
    return (
        <Helmet>
            <meta name="sa-verify" content={process.env.REACT_APP_SA_VERIFY}/>
        </Helmet>
    )
}