import React from "react";
import {Container} from "react-bootstrap";
import {metadata} from "../../content_option";
import preval from 'preval.macro'
import {useTranslation} from "react-i18next";


function FooterMain() {
    // remember to build app (else it will trigger an error)
    const buildTimestampDay = preval`module.exports = new Date().getDate();`
    const buildTimestampMonth = preval`module.exports = new Date().getMonth();`
    const buildTimestampYear = preval`module.exports = new Date().getFullYear();`

    const {t, i18n} = useTranslation(["footer", "common"])

    return (
        <Container fluid
                   className={"py-3 border-top bg-body-tertiary"} /*style={{borderColor: "var(--secondary-color) !important",}}*/>
            <div className={"text-center"}>
                <span
                    className={"text-muted"}>{t("copyrights")}. &copy; 2020-{new Date().getFullYear()} - {metadata.author}</span>
                <br/>
                <span className={"text-muted"}>{t("lastUpdate")}: {
                    new Date(buildTimestampYear, buildTimestampMonth, buildTimestampDay)
                        .toLocaleDateString(
                            i18n.language,
                            {
                                month: "long",
                                year: "numeric"
                            }
                        )
                }</span>
            </div>
        </Container>
    )
}

export default FooterMain;