import {Helmet} from "react-helmet-async";
import {metadata} from "../../content_option";
import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import '@fontsource-variable/montserrat';
import './style.css'

export const NotFoundPage = () => {
    const {t} = useTranslation(["common", "navbar"])
    return (
        <>
            <Helmet>
                <title>{metadata.title} | {t("error")}</title>
            </Helmet>
            <div className={"d-flex flex-column align-items-center text-center notFound"} style={{minHeight:"80vh"}}>
                <div className={"my-auto"}>
                    <h2 className={"text-uppercase"}>
                        {t("notFound.title")}
                    </h2>
                    <h1 className={"text-uppercase"}>
                        <span>4</span>
                        <span>0</span>
                        <span>4</span>
                    </h1>
                    <h3 className={"text-uppercase"}>
                        {t("notFound.description")}
                    </h3>
                    <Link className={"link-secondary"}
                          to={t("navbar:navbarElements.home.link")}>{t("navbar:navbarElements.home.name")}</Link>
                </div>
            </div>
        </>
    )
}