import React from "react";

export type Theme = "light" | "dark" | "auto";
export type ThemeContext = {isDarkTheme: boolean; theme: Theme; setTheme: React.Dispatch<React.SetStateAction<Theme>> };


export const ThemeContext = React.createContext<ThemeContext>(
    {} as ThemeContext
);