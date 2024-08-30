import {Badge, Card, Col, Fade, Row} from "react-bootstrap";
import "./style.css"
import {Icon} from "../icons/Icon";
import {ExtractHtmlFromJsonString} from "../jsonParser/ExtractHtmlFromJsonString";
import {DataInternationalized, GetLanguage} from "../header/LanguageSelector";
import {useOnHoverAnalytics} from "../googleAnalytics/onHoverAnalytics";
import {useRef} from "react";
import {useIsVisible} from "../../hooks/useIsVisible"; // add with yarn add dompurify and @types/dompurify


export interface ExperienceProps {
    year: number,
    cardTitle?: DataInternationalized<string>
    cardDetailedText?: DataInternationalized<string[]>
    duration?: DataInternationalized<string>
    cardSubtitle?: DataInternationalized<string>
    media?: {
        alt?: string
        src?: string
        link?: string
        type: string | "SQUARE" | "RECTANGLE"
    }
}


const TimelineCard = ({xp, i}: { xp: ExperienceProps, i: number }) => {
    const isAlignLeft = (i % 2) === 0
    const refCard = useRef<HTMLDivElement>(null!)
    const language = GetLanguage()


    useOnHoverAnalytics({
        ref: refCard,
        category: "experience",
        action: "onOver_" + xp.cardTitle?.[language] + "_" + xp.year,
        label: "On over " + xp.cardTitle?.[language] + "_" + xp.year
    })

    const isVisible = useIsVisible(refCard);

    return (
        <Row
            key={i}
            className={"xp " + (isAlignLeft ? "left" : "right") + " pb-4"}
        >
            <Col
                md={5}
                className={(isAlignLeft ? "me-auto" : "ms-auto")}
            >
                <Fade
                    in={true}
                    appear={true}
                >
                <Card
                    ref={refCard}
                    className={"arrow p-3 shadow hover-shadow bg-body-tertiary " + (isVisible ? "fadeTransform" : "")}
                    style={{width: "100%"}}
                >
                    <Row className={"g-0"}>
                        {xp.media &&
                            <Col xs={12} md={4}
                                className={
                                    "bg-body-secondary order-0 order-md-" + (isAlignLeft ? "2" : "0") +
                                    " d-flex align-items-center justify-content-center"
                                }
                            >
                                <a target={"_blank"} href={xp.media?.link} rel="noreferrer">
                                    <Card.Img
                                        loading={"lazy"}
                                        src={xp.media?.src && ("/assets/img/experiences/" + xp.media?.src.replace("%20", " "))}
                                        alt={xp.media?.alt}
                                        style={{
                                            width: "auto",
                                            maxHeight: `${xp?.media?.type === "RECTANGULAR" ? "4rem" : "10rem"}`
                                        }}
                                        className={"img-fluid rounded m-2 mx-auto"}
                                    />
                                </a>
                            </Col>
                        }
                        <Col
                            xs={12}
                            md={xp.media ? 8 : 12}
                            className={"order-1"}
                        >
                            <Card.Body>
                                <Card.Title><h4>{xp.cardTitle?.[language]}</h4></Card.Title>
                                <Card.Subtitle className={"my-1"}>
                                    <Badge bg={"primary"}>{xp.cardSubtitle?.[language]}</Badge>
                                </Card.Subtitle>
                                <Card.Text><ExtractHtmlFromJsonString
                                    jsonText={xp.cardDetailedText?.[language]?.join("")}/></Card.Text>
                                <Card.Text>
                                    <small className={"text-muted"}>
                                        <Icon iconName={"calendar-alt"} size={15}/> <ExtractHtmlFromJsonString
                                        jsonText={xp.duration?.[language]}/>
                                    </small>
                                </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
                </Fade>
            </Col>
            <div className={"point"}/>
        </Row>
    )
}

export default TimelineCard