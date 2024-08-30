import {useLocation} from "react-router-dom";
import analytics from "./analytics";
import {useEffect} from "react";

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