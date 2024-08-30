import {Badge, Card, Col, Fade, Image, ProgressBar, Row} from "react-bootstrap";
import * as React from "react";
import "./style.css"
import {useRef, useState} from "react";
import {Icon} from "../icons/Icon";
import {DataInternationalized, GetLanguage} from "../header/LanguageSelector";
import {useOnHoverAnalytics} from "../googleAnalytics/onHoverAnalytics";

interface DiplomasType {
    key: React.Key
    title: DataInternationalized<string>
    location: DataInternationalized<string>
    date: DataInternationalized<string>
    subTitle1?: DataInternationalized<string>
    subTitle2?: DataInternationalized<string>
    badge: DataInternationalized<string>
    image: {
        link: string
        src: string
        alt: string
    }
    progressBar: {
        val: number
        max: number
        class: string
    }
}

function DiplomasCard(diploma: DiplomasType) {
    const [progressNow, setProgressNow] = useState(0)
    const refCard = useRef<HTMLDivElement>(null!)
    const language = GetLanguage()

    const updateProgressNowHandler = setInterval(() => {
        if (progressNow >= diploma.progressBar.val) {
            setProgressNow(diploma.progressBar.val)
            clearInterval(updateProgressNowHandler)
        }
        setProgressNow(s => s + (diploma.progressBar.max / 100/* % */))
    }, 100)


    useOnHoverAnalytics({
        ref: refCard,
        category: "diploma",
        action: "onOver_" + diploma.title?.[language],
        label: "On over " + diploma.title?.[language]
    })

    return (
        <Fade
            in={true}
            appear={true}
        >
            <Card className={"hover-shadow mb-5"} ref={refCard}>
                <Card.Header className={"bg-body-secondary"}>
                    <Row>
                        <Col xs={12} sm={7} className={"order-0"}>
                            <Card.Title><h4>{diploma.title?.[language]}</h4></Card.Title>
                        </Col>
                        <Col className={"order-1 d-flex align-items-center flex-sm-row-reverse flex-row"}>
                            <Card.Text>
                                <Icon iconName={"calendar-alt"} size={20}/> {diploma.date?.[language]}
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className={"bg-body-tertiary"}>
                    <Row>
                        <Col xs={12} sm={8} className={"order-1"}>
                            <Card.Subtitle className="mb-2 text-muted">
                                <Icon iconName={"location"} size={18}/> {diploma.location?.[language]}
                            </Card.Subtitle>
                            {diploma.subTitle1?.[language] &&
                                <Card.Subtitle className="mb-2">{diploma.subTitle1?.[language]}</Card.Subtitle>
                            }
                            {diploma.subTitle2?.[language] &&
                                <Card.Subtitle className="mb-2">{diploma.subTitle2?.[language]}</Card.Subtitle>
                            }
                        </Col>
                        <Col className={"mb-2 order-xs-0 order-sm-2 text-sm-end"}>
                            <Card.Text as={"h5"}>
                                <Badge bg={diploma.progressBar.class}>{diploma.badge?.[language]}</Badge>
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className={"my-3"}>
                        <Col>
                            <a href={diploma.image.link} target={"_blank"} rel="noreferrer">
                                <Image
                                    rounded
                                    src={`/assets/img/diplomas/${diploma.image.src}`}
                                    alt={diploma.image.alt}
                                    height={50}
                                    className={"bg-body-secondary p-1 rounded"}
                                />
                            </a>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ProgressBar
                                striped
                                variant={diploma.progressBar.class}
                                //now={diploma.progressBar.val / diploma.progressBar.max * 100}
                                now={progressNow}
                                min={0}
                                max={diploma.progressBar.max}
                                animated={diploma.progressBar.val < diploma.progressBar.max}
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Fade>
    )
}

export default DiplomasCard;