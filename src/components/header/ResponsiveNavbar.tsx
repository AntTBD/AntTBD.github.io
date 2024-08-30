import logo from "../../assets/images/logo/logo site2.svg";
import {logoText} from "../../content_option";
import React from "react";
import ThemeToggle from "../themeToggle";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {LanguageSelector} from "./LanguageSelector";
import {Link, NavLink} from "react-router-dom";

function ResponsiveNavbar() {
    const {t} = useTranslation("navbar")
    const navbarElements = t("navbarElements", {returnObjects: true})

    return (
        <Navbar
            //fixed={"top"}
            //sticky={"top"}
            collapseOnSelect
            expand="lg"
            className={"border-bottom bg-body-tertiary"}
        >
            <Container fluid>
                <Navbar.Brand href="/">
                    <img src={logo} alt={logoText} width="40px" height="40px"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
                    <Nav className="mx-auto">
                        {Object.values(navbarElements).map(({name, link}, i) => {
                            return (
                                <NavLink
                                    key={i}
                                    to={link}
                                    //active={window.location.pathname === link}
                                    className={"nav-link"}
                                >
                                    {name}
                                </NavLink>
                            )
                        })}
                    </Nav>
                    <Nav>
                        <ThemeToggle/>
                        <LanguageSelector/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default ResponsiveNavbar;