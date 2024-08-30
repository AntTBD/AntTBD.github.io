import React, {useRef} from "react";
import "./style.css";
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import {ContentTitle} from "../../components/header/ContentTitle";
import {useTranslation} from "react-i18next";
import {Icon} from "../../components/icons/Icon";
import contact from "../../i18n/data/contact.json"
import {useOnClickAnalytics} from "../../components/googleAnalytics/onHoverAnalytics";

export const ContactUs = () => {
    const {t} = useTranslation(["contact", "navbar"])

    const refTel = useRef<HTMLAnchorElement>(null!)
    const refMail = useRef<HTMLAnchorElement>(null!)
    const refGithub = useRef<HTMLAnchorElement>(null!)
    const refItchIo = useRef<HTMLAnchorElement>(null!)
    const refLinkedin = useRef<HTMLAnchorElement>(null!)
    const refLocation = useRef<HTMLAnchorElement>(null!)
    useOnClickAnalytics({
        ref: refTel,
        category: "contact",
        action: "onClick_Tel",
        label: "On click Tel"
    })
    useOnClickAnalytics({
        ref: refMail,
        category: "contact",
        action: "onClick_Mail",
        label: "On click Mail"
    })
    useOnClickAnalytics({
        ref: refGithub,
        category: "contact",
        action: "onClick_Github",
        label: "On click Github"
    })
    useOnClickAnalytics({
        ref: refItchIo,
        category: "contact",
        action: "onClick_ItchIo",
        label: "On click ItchIo"
    })
    useOnClickAnalytics({
        ref: refLinkedin,
        category: "contact",
        action: "onClick_Linkedin",
        label: "On click Linkedin"
    })
    useOnClickAnalytics({
        ref: refLocation,
        category: "contact",
        action: "onClick_Location",
        label: "On click Location"
    })

    return (
        <>
            <Container>
                <ContentTitle iconName={"contact"} title={t("navbar:navbarElements.contact.name")}/>
                <Row className={"align-item-center justify-content-center"}>
                    <Col sm={12} md={10} lg={8} xl={7} className={"mx-auto"}>
                        <Card className={"rounded shadow mb-5"}>
                            <Card.Header className={"text-center bg-body-secondary"}>
                                <h4>{contact.name}</h4>
                            </Card.Header>
                            <Card.Body className={"bg-body-tertiary"}>
                                <Image
                                    thumbnail={true}
                                    roundedCircle={true}
                                    src={`/assets/img/contact/${contact.image.src}`}
                                    alt={contact.image.alt}
                                    className={"mx-auto d-block bg-body"}
                                    style={{maxHeight: "200px"}}
                                />
                                <hr/>
                                <Row>
                                    <Col xs={12} sm={6}>
                                        <Card.Text>
                                            <Icon iconName={"tel"}/>
                                            &nbsp; :&nbsp;
                                            <a
                                                ref={refTel}
                                                href={`tel:${contact.tel}`}
                                            >
                                                {contact.tel}
                                            </a>
                                        </Card.Text>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <Card.Text>
                                            <Icon iconName={"mail"}/>
                                            &nbsp; :&nbsp;
                                            <a
                                                ref={refMail}
                                                href={`mailto:${contact.mail}`}
                                            >
                                                {contact.mail}
                                            </a>
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={6}>
                                        <Card.Text>
                                            <Icon iconName={"github"}/>
                                            &nbsp; :&nbsp;
                                            <a
                                                ref={refGithub}
                                                target="_blank"
                                                rel="noreferrer"
                                                href={contact.github.link}
                                            >
                                                {contact.github.name}
                                            </a>
                                        </Card.Text>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <Card.Text>
                                            <Icon iconName={"linkedin"}/>
                                            &nbsp; :&nbsp;
                                            <a
                                                ref={refLinkedin}
                                                target="_blank"
                                                rel="noreferrer"
                                                href={contact.linkedin.link}
                                            >
                                                {contact.linkedin.name}
                                            </a>
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={6}>
                                        <Card.Text>
                                            <Icon iconName={"itch-io"}/>
                                            &nbsp; :&nbsp;
                                            <a
                                                ref={refItchIo}
                                                target="_blank"
                                                rel="noreferrer"
                                                href={contact.itch_io.link}
                                            >
                                                {contact.itch_io.name}
                                            </a>
                                        </Card.Text>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <Card.Text>
                                            <Icon iconName={"location"}/>
                                            &nbsp; :&nbsp;
                                            <a
                                                ref={refLocation}
                                                target="_blank"
                                                rel="noreferrer"
                                                href={contact.location.link}
                                            >
                                                {contact.location.name}
                                            </a>
                                        </Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/*<Row>
                    <Col sm={12} md={10} lg={8} xl={7} className={"mx-auto"}>
                        <Row>
                            <Col xs={10}>
                                <h4><FaIdCard/> {contact.title_2}</h4>
                            </Col>
                            <Col xs={2}>
                                <h2 className={"text-end"}><FaMinusSquare/></h2>
                            </Col>
                        </Row>
                        <hr/>
                        <Row className={"text-center mb-3"}>
                            <Col xs={12} md={6} className={"mx-auto"}>
                                <a
                                    target={"_blank"}
                                    href={contact.CV.src}
                                >
                                    <Button variant={"primary"} className={"shadow"}>
                                        <FaFilePdf/> {contact.CV.name}
                                    </Button>
                                </a>
                            </Col>
                        </Row>
                    </Col>
                </Row>*/}
            </Container>
        </>
    );
};
