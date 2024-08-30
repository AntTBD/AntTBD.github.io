import {MutableRefObject, useEffect, useRef} from "react"

export default function useEventListener(
    eventType: string,
    callback: (this: HTMLElement, ev: Event) => any,
    element: MutableRefObject<HTMLElement> | null
) {
    const callbackRef = useRef<(ev: Event) => any>(callback)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        if (element === null) return
        const handler = (e: Event) => callbackRef.current(e)
        element.current?.addEventListener(eventType, handler)

        return () => {
            if (element === null) return
            element.current?.removeEventListener(eventType, handler)
        }
    }, [eventType, element?.current])
}