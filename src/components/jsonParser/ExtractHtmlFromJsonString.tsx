import {sanitize} from "dompurify";
//import {useEffect, useRef, useState} from "react";

export const ExtractHtmlFromJsonString = ({jsonText}: { jsonText: string | undefined }) => {

    // const spanRef = useRef<HTMLSpanElement>(null)
    // const [htmlElement, setHtmlElement] = useState(jsonText)
    // useEffect(() => {
    //     if (spanRef.current) {
    //         if (htmlElement != undefined) {
    //             // https://stackoverflow.com/a/60040648
    //             spanRef.current.innerHTML = sanitize(htmlElement)
    //         }
    //     }
    // }, [spanRef.current, htmlElement])
    //
    // useEffect(() => {
    //     setHtmlElement(jsonText)
    // }, [jsonText])
    //
    // return <span ref={spanRef}/>

    if(jsonText !== undefined)
        return <span dangerouslySetInnerHTML={{__html: sanitize(jsonText)}}/>
    else
        return <></>
}