import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./routes";
import HeaderMain from "../components/header";
import "./App.css";
import FooterMain from "../components/footer/FooterFixedBottom";
import {HelmetProvider} from "react-helmet-async";
import SEO from "../components/Helmet/SEO";
import {HashRouter} from "react-router-dom";
import React from "react";
import {metadata} from "../content_option";

export default function App() {
    return (
        <HelmetProvider>
            <SEO
                url={metadata.url}
                title={metadata.title}
                description={metadata.description}
                author={metadata.author}
                image={metadata.image}
                keywords={metadata.keywords}
            />
            <HashRouter /*basename={process.env.PUBLIC_URL}*/>
                <header className={"sticky-top"}>
                    <HeaderMain/>
                </header>
                <main className={"mb-auto"}>
                    <AppRoutes/>
                </main>
                <footer>
                    <FooterMain/>
                </footer>
            </Router>
            </HashRouter>
        </HelmetProvider>
    )
}
