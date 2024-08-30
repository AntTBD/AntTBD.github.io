import React, {useEffect, useState} from "react";
import {getStorage, setStorage} from "../localStorage/Storage";
import {useNavigatorThemeDetector} from "./useNavigatorThemeDetector";
import {Theme, ThemeContext} from "./ThemeContext";


// https://dev.to/nas5w/toggling-light-dark-theme-in-react-with-usecontext-39hn
export const ThemeProvider = ({ children }:{ children: string | JSX.Element | JSX.Element[] }) => {
    const themeStorageKey = "data-bs-theme"
    const [theme, setTheme] = useState<Theme>(getStorage(themeStorageKey) as Theme || "auto")
    const isDarkThemeNavigator = useNavigatorThemeDetector()
    const [isDarkTheme, setIsDarkTheme] = useState(theme === "auto"? isDarkThemeNavigator : theme === "dark")


    useEffect(() => {

        let realThemeSelected = theme
        if(theme === "auto"){
            realThemeSelected = isDarkThemeNavigator ? "dark" : "light"
        }
        if(realThemeSelected !== (getStorage(themeStorageKey) as Theme)) {
            // add loaded class to enable transition css for all page (not only body) (defined in src/index.css)
            document.documentElement.setAttribute("class", "themeTransition")
        }
        document.documentElement.setAttribute(themeStorageKey, realThemeSelected)
        setStorage(themeStorageKey, theme)
        setIsDarkTheme(realThemeSelected === "dark")

        setTimeout(()=>{
            document.documentElement.removeAttribute("class")
        }, 1000)
    }, [theme, isDarkThemeNavigator])

    return (
        <ThemeContext.Provider value={{isDarkTheme, theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
