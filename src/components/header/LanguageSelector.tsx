import {Helmet} from "react-helmet-async";
import {NavDropdown} from "react-bootstrap";
import React from "react";
import {useTranslation} from "react-i18next";

// flags: https://www.alt-codes.net/flags
export const languages = {
    en: {
        nativeName: "English",
        icon: "🇬🇧",
    },
    fr: {
        nativeName: "Français",
        icon: "🇫🇷",
    }
}

export interface DataInternationalized<T> {
    en: T
    fr: T
}

export const GetLanguage = () : "fr"| "en" => {
    const {i18n} = useTranslation("common")

    let language = i18n.language || window.localStorage.i18nextLng
    if (language in languages)
        return language

    return "en"
}

export const LanguageSelector = () => {
    const {t, i18n} = useTranslation("navbar")

    const changeLanguage = (lng: string) => {
        /*
        // to adapt url with language
        const routes = t("navbarElements", {returnObjects: true})
        const currentPathname = window.location.pathname//.replace(/\/+$/, '')
        const currentRouteKey = Object.keys(routes).find((key) => {
            return Object(routes)[key].link === currentPathname
        });

        let redirectionRoute = "\\"
        const navbarElementsTrad = t("navbarElements", {returnObjects: true, lng: lng})
        if (currentRouteKey !== undefined) {
            if (Object(navbarElementsTrad)[currentRouteKey] !== undefined)
                redirectionRoute = Object(navbarElementsTrad)[currentRouteKey].link
        }

        //window.history.replaceState(null,  "", redirectionRoute)
        window.location.replace(redirectionRoute)
        */

        i18n.changeLanguage(lng)
            .then(r => r)
    }


    return (
        <>
            <Helmet>
                <html lang={GetLanguage()}/>
            </Helmet>
            <NavDropdown
                title={Object(languages)[GetLanguage()].icon}
                align={"end"}
            >
                {Object.keys(languages).map((lng) => (
                    <NavDropdown.Item
                        key={lng}
                        onClick={() => changeLanguage(lng)}
                        active={GetLanguage() === lng}
                    >
                        {Object(languages)[lng].icon} {Object(languages)[lng].nativeName}
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
        </>
    )
}