import React, {Suspense} from 'react'
import {createRoot} from "react-dom/client";
import App from "./app/App";
import "./index.css"

// import i18n (needs to be bundled ;))
import i18n from './i18n/i18n.config';
import {I18nextProvider} from "react-i18next";
import {ThemeProvider} from "./components/themeToggle/ThemeProvider";
import {Loader} from "./components/loader";

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <Suspense fallback={<Loader/>}>
                <ThemeProvider>
                    <App/>
                </ThemeProvider>
            </Suspense>
        </I18nextProvider>
    </React.StrictMode>
);