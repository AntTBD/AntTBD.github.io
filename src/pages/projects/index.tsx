import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {ContentTitle} from "../../components/header/ContentTitle";
import {ProjectCard} from "../../components/project/ProjectCard";
import projects from "../../i18n/data/projects.json"
import {DataInternationalized} from "../../components/header/LanguageSelector";

export interface ProjectProps {
    image: {
        src: string
        alt: string
    }
    icon?: {
        src: string
        alt: string
    }
    title: {
        icon: string
        project: DataInternationalized<string>
        subtitle: DataInternationalized<string>
    }
    description: DataInternationalized<string[]>
    ranking?: {
        link: string
        icon?: string
        name: DataInternationalized<string>
    }[]
    repository?: {
        link: string
        icon: string
        name: DataInternationalized<string>
    }
    website?: {
        link: string
        icon: string
        name: DataInternationalized<string>
    }
}

export const Portfolio = () => {
    const {t} = useTranslation(["projects", "navbar"])
    //const projects = t("projects", {returnObjects: true})

    return (
        <>
            <Container className="About-header">
                <ContentTitle iconName={"briefcase"} title={t("navbar:navbarElements.projects.name")}/>
                <Row xs={1} md={2} lg={3} className={"align-item-center justify-content-center"}>
                    {projects.projects.map((project, i) => {
                        return (
                            <Col key={i} className={"mb-4"}>
                                <ProjectCard project={project}/>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
};
