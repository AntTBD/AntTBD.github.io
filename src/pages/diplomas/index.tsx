import {Container} from "react-bootstrap";
import DiplomasCard from "../../components/diplomas";
import {useTranslation} from "react-i18next";
import {ContentTitle} from "../../components/header/ContentTitle";
import React from "react";
import diplomas from "../../i18n/data/diplomas.json"

export const Diplomas = () => {
    const {t} = useTranslation(["diplomas", "navbar"])
    //const diplomas = t("diplomas", {returnObjects: true})

    return (
        <>
            <Container>
                <ContentTitle iconName={"diploma"} title={t("navbar:navbarElements.diplomas.name")}/>
                {diplomas.diplomas.map((diploma, i) => {
                    return (
                        <DiplomasCard
                            key={i}
                            title={diploma.title}
                            location={diploma.location}
                            date={diploma.date}
                            subTitle1={diploma.subTitle1}
                            subTitle2={diploma.subTitle2}
                            badge={diploma.badge}
                            image={diploma.image}
                            progressBar={diploma.progressBar}
                        />
                    )
                })}
            </Container>
        </>
    )
}