import {Card, Col, Fade, Row} from "react-bootstrap";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Icon} from "../icons/Icon";
import {ExtractHtmlFromJsonString} from "../jsonParser/ExtractHtmlFromJsonString";
import React, {useRef} from "react";
import {ProjectProps} from "../../pages/projects";
import "./style.css";
import {GetLanguage} from "../header/LanguageSelector";
import {useOnClickAnalytics, useOnHoverAnalytics} from "../googleAnalytics/onHoverAnalytics";

export const ProjectCard = ({project}: { project: ProjectProps }) => {
    const refCard = useRef<HTMLDivElement>(null!)
    const refARepo = useRef<HTMLAnchorElement>(null!)
    const refAWebsite = useRef<HTMLAnchorElement>(null!)
    const language = GetLanguage()

    useOnHoverAnalytics({
        ref: refCard,
        category: "project",
        action: "onOver_" + project.title.project?.[language],
        label: "On over " + project.title.project?.[language]
    })

    useOnClickAnalytics({
        action: "projects",
        category: "repositoryLink_" + project.title.project?.[language],
        label: "Check out Repository " + project.title.project?.[language],
        ref: refARepo
    })
    useOnClickAnalytics({
        action: "projects",
        category: "websiteLink_" + project.title.project?.[language],
        label: "Check out Website " + project.title.project?.[language],
        ref: refAWebsite
    })


    return (
        <Fade
            in={true}
            appear={true}
        >
            <Card
                key={project.title.project?.[language]}
                className={"h-100 project hover-shadow"}
                ref={refCard}
            >
                <Card.Header key={"header"} className={"text-center bg-body-secondary"}>
                    <Row className={"g-0"}>
                        {project.icon !== undefined &&
                            <div
                                key={"icon"}
                                className="d-flex align-items-center"
                            >
                                <LazyLoadImage
                                    src={"/assets/img/projects/" + project.icon.src}
                                    //width={200} height={200}
                                    //placeholderSrc={PlaceHolderImageTransparent}
                                    alt={project.icon.alt}
                                    className={"rounded icon m-2"}
                                />
                            </div>
                        }
                        <Col
                            key={"image"}
                            xs={12}
                            className={"d-flex align-items-center"}
                            style={{height: "200px"}}
                        >
                            <LazyLoadImage
                                src={"/assets/img/projects/" + project.image.src}
                                //width={200} height={200}
                                //placeholderSrc={PlaceHolderImageTransparent}
                                alt={project.image.alt}
                                className={"rounded m-2 mx-auto w-auto h-auto mw-100 mh-100"}
                            />
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body key={"body"} className={"bg-body-tertiary"}>
                    <Card.Title key={"title"} className={"text-center fw-bold"}>
                        <Icon iconName={project.title.icon} size={30}/>
                        &nbsp;{project.title.project?.[language]}
                    </Card.Title>
                    <Card.Subtitle key={"subtitle"} className={"text-center"}>
                        <ExtractHtmlFromJsonString jsonText={project.title.subtitle?.[language]}/>
                    </Card.Subtitle>
                    <hr/>
                    <Card.Text key={"description"}>
                        <ExtractHtmlFromJsonString jsonText={project.description?.[language].join("")}/>
                    </Card.Text>
                    {
                        project.ranking !== undefined &&
                        <hr/> &&
                        project.ranking.map(({link, icon, name}, i) =>
                            <Card.Text key={"ranking_" + i}>
                                {
                                    (link !== "") ?
                                        <a target="_blank" rel="noreferrer" href={link}>
                                            {icon !== undefined && <Icon iconName={icon} size={20}/>}
                                            <ExtractHtmlFromJsonString jsonText={name?.[language]}/>
                                        </a> :
                                        <>
                                            {icon !== undefined && <Icon iconName={icon} size={20}/>}
                                            <ExtractHtmlFromJsonString jsonText={name?.[language]}/>
                                        </>
                                }
                            </Card.Text>
                        )
                    }
                </Card.Body>
                {
                    (project.website || project.repository) &&
                    <Card.Footer key={"footer"} className={"text-center bg-body-secondary d-grid gap-2"}>
                        {
                            project.website?.link &&
                            <a
                                key={"websiteLink"}
                                ref={refAWebsite}
                                target="_blank"
                                rel="noreferrer"
                                href={project.website.link}
                            >
                                <button className={"btn btn-primary w-100"}>
                                    <Icon iconName={project.website.icon}
                                          size={20}/> {project.website.name?.[language]}
                                </button>
                            </a>
                        }
                        {
                            project.repository?.link &&
                            <a
                                key={"repositoryLink"}
                                ref={refARepo}
                                target="_blank"
                                rel="noreferrer"
                                href={project.repository.link}
                            >
                                <button className={"btn btn-secondary w-100"}>
                                    <Icon iconName={project.repository.icon}
                                          size={20}/> {project.repository.name?.[language]}
                                </button>
                            </a>
                        }
                    </Card.Footer>
                }
            </Card>
        </Fade>
    );
}