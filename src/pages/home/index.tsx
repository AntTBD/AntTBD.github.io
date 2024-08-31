import React from "react";
import "./style.css";
import Typewriter from "typewriter-effect";
import {Col, Container, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {FaChevronDown} from "react-icons/fa6";
import {MainScene} from "../../components/3d/Main";
import {trackGAEvent} from "../../components/googleAnalytics/analytics";
import {metadata} from "../../content_option";

export const Home = () => {
    const {t} = useTranslation(["home", "contact"])
    return (
        <>
            <Container fluid style={{height: "95vh"}} id={"containerHome3d"}>
                <Row className="z-0 position-absolute w-100" style={{height: "95vh"}}>
                    <MainScene/>
                </Row>
                <Row
                    className="h-100 z-1 position-relative"
                    style={{
                        pointerEvents: "none"
                    }}
                >
                    <Col xs={12} className={"d-flex flex-column overflow-hidden"}>
                        <div
                            className={"mt-auto mb-5 text-center text-wrap name-title"}
                            style={{
                                pointerEvents: "all",
                            }}
                        >
                            <h1 className={"display-1"}>
                                {metadata.author}
                            </h1>
                            <a
                                href={"#resume"}
                                onClick={() => trackGAEvent("3d", "onClick_Chevron", "On click Chevron")}
                            >
                                <p className={"w-100 mx-auto"}>
                                    <FaChevronDown/>
                                </p>
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/*<Container id={"resume"}>
                <Row>
                    <Col xs={12}>
                        <div className="intro_sec d-block d-lg-flex align-items-center ">
                            <div
                                className="h_bg-image order-1 order-lg-2 h-100 "
                                style={{backgroundImage: `url(${introdata.your_img_url})`}}
                            >
                            </div>
                            <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
                                <div className="align-self-center ">
                                    <div className="intro mx-auto">
                                        <h2 className="mb-1x">{introdata.title}</h2>
                                        <h1 className="fluidz-48 mb-1x">
                                            <Typewriter
                                                options={{
                                                    // strings: [
                                                    //   introdata.animated.first
                                                    // ],
                                                    autoStart: true,
                                                    loop: false,
                                                    // deleteSpeed: 10,
                                                }}

                                                onInit={(typewriter) => {
                                                    typewriter
                                                        .typeString(t("title"))
                                                        .pause()
                                                        // .deleteAll()
                                                        // .typeString(introdata.animated.second)
                                                        // .pause()
                                                        // .deleteAll()
                                                        // .typeString(introdata.animated.third)
                                                        // .pause()
                                                        // .deleteAll()
                                                        .start()
                                                }}
                                            />
                                        </h1>
                                        <p className="mb-1x">
                                            {t("description.1")}
                                            <br/>
                                            {t("description.2")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>*/}
            <Container id={"resume"}>
                <Row className={"my-4"}>
                    <Col xs={12}>
                        <div className="d-block d-lg-flex align-items-center ">
                            <div className="text h-100 d-lg-flex justify-content-center">
                                <div className="align-self-center ">
                                    <div className="mx-auto">
                                        <h1 className="fluidz-48 mb-1x">
                                            <Typewriter
                                                options={{
                                                    // strings: [
                                                    //   introdata.animated.first
                                                    // ],
                                                    autoStart: true,
                                                    loop: false,
                                                    // deleteSpeed: 10,
                                                }}

                                                onInit={(typewriter) => {
                                                    typewriter
                                                        .typeString(t("title"))
                                                        .pause()
                                                        // .deleteAll()
                                                        // .typeString(introdata.animated.second)
                                                        // .pause()
                                                        // .deleteAll()
                                                        // .typeString(introdata.animated.third)
                                                        // .pause()
                                                        // .deleteAll()
                                                        .start()
                                                }}
                                            />
                                        </h1>
                                        <p className="mb-1x">
                                            {t("description.1")}
                                            <br/>
                                            {t("description.2")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
