import {MutableRefObject, Ref, useEffect, useState} from "react";
import {trackGAEvent} from "./analytics";
import useEventListener from "./useEventListener";

type UseOnHoverAnalyticsProps = {
    ref:  MutableRefObject<HTMLElement>,
    category: string,
    action: string,
    label: string,
}

export function useOnHoverAnalytics({ref, category, action, label}:UseOnHoverAnalyticsProps) {
    const [hovered, setHovered] = useState<boolean>(false)

    useEffect(() => {
        if(hovered){
            trackGAEvent(category, action, label)
        }
    }, [hovered])

    useEventListener("mouseenter", () => setHovered(true), ref)
    useEventListener("mouseleave", () => setHovered(false), ref)

    return hovered
}

export function useOnClickAnalytics({ref, category, action, label}:UseOnHoverAnalyticsProps) {
    const [clicked, setClicked] = useState<boolean>(false)

    useEffect(() => {
        if(clicked){
            trackGAEvent(category, action, label)
        }
    }, [clicked])

    useEventListener("mouseup", () => setClicked(true), ref)
    useEventListener("mousedown", () => setClicked(false), ref)

    return clicked
}