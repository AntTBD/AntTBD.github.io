import ReactGA from "react-ga4"

export const initializeGA = () => {
    if (!ReactGA.isInitialized && process.env.REACT_APP_GA_MEASUREMENT_ID) {
        // Enable debug mode on the local development environment
        const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development"
        ReactGA.initialize(
            process.env.REACT_APP_GA_MEASUREMENT_ID,
            {
                testMode: isDev,
                gaOptions: {
                    cookieFlags: "SameSite=None;Secure",
                    cookieDomain: "auto",
                }
            }
        )

        console.log("GA INITIALIZED")
        if (isDev)
            console.log("GA is in testMode")
    }
}

export const trackGAEvent = (category: string, action: string, label: string) => {
    if (ReactGA.isInitialized) {
        //console.log("GA event:", category, ":", action, ":", label)
        ReactGA.event({
            category: category,
            action: action,
            label: label,
        })
    }
}

export const sendPageView = (path: string, title: string) => {
    if (ReactGA.isInitialized) {
        //ReactGA.send({hitType: "pageview", page: path, title: title});
    }
}


export default {
    initializeGA,
    trackGAEvent,
    sendPageView
}