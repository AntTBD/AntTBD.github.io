import React from "react"
import {Container} from "react-bootstrap";
import {ExperienceProps} from "../../components/experience/TimelineCard";
import Timeline from "../../components/experience/Timeline";
import {useTranslation} from "react-i18next";
import {ContentTitle} from "../../components/header/ContentTitle";
import xp from "../../i18n/data/workExperience.json"


export const WorkExperience = () => {
    const {t} = useTranslation(["workExperience", "navbar"])
    //const experiences: ExperienceProps[] = t("experiences", {returnObjects: true})

    return (
        <>
            <Container fluid={true} style={{width: "100%"}}>
                <ContentTitle iconName={"id-card"} title={t("navbar:navbarElements.workExperience.name")}/>
                <Timeline experiences={xp.experiences}/>
            </Container>
        </>
    )
}