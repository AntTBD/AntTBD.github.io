import React, {useContext} from "react";
import {Icon} from "../icons/Icon";
import {NavDropdown} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Theme, ThemeContext} from "./ThemeContext";

const ThemeToggle = () => {
    const {t} = useTranslation("common")

    const themes = {
        light: {
            nativeName: "Light",
            icon: "sun",
            iconClass: "text-warning",
        },
        dark: {
            nativeName: "Dark",
            icon: "bs-moon-starts-fill",
        },
        auto: {
            nativeName: "Auto",
            icon: "bs-circle-half",
        },
    }
    const { theme, setTheme } = useContext(ThemeContext);


    return (
        <div>
            <NavDropdown
                title={<Icon iconName={Object(themes)[theme].icon}
                             className={Object(themes)[theme].iconClass}/>}
                align={"end"}
            >
                {Object.keys(themes).map((th) => (
                    <NavDropdown.Item
                        key={th}
                        onClick={() => setTheme(th as Theme)}
                        active={th === theme}
                    >
                        <Icon iconName={Object(themes)[th].icon} className={Object(themes)[th].iconClass}/>
                        &nbsp;
                        {
                            // @ts-ignore
                            t(`theme.${th}`)
                        }
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
        </div>

    );
};

export default ThemeToggle;
