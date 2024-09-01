import ReactGA from "react-ga4"

export const initializeGA = () => {
    const doNotTrack = navigator.doNotTrack === "1" || navigator.doNotTrack === "yes"

    if (doNotTrack)
        console.warn("DoNotTrack navigator setting is enable")

    // Enable debug mode on the local development environment
    const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development"

    if (!doNotTrack && !ReactGA.isInitialized && process.env.REACT_APP_GA_MEASUREMENT_ID) {
        ReactGA.initialize(
            process.env.REACT_APP_GA_MEASUREMENT_ID,
            {
                testMode: isDev,
                gaOptions: {
                    cookieFlags: "SameSite=Lax",
                    cookieDomain: isDev ? "localhost" : "anttbd.github.io",
                    //anonymizeIp: true,
                }
            }
        )

    }

    if(ReactGA.isInitialized){
        console.log("GA INITIALIZED")
        if (ReactGA._testMode)
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

    // @ts-ignore
    //window.sa_event(category + "_" + action)
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