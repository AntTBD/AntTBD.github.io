import {Route, Routes} from "react-router-dom";
// import withRouter from "../hooks/withRouter"
import {Home} from "../pages/home";
import {Portfolio} from "../pages/projects";
import {ContactUs} from "../pages/contact";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import {Diplomas} from "../pages/diplomas";
import {Suspense} from "react";
import {useTranslation} from "react-i18next";
import {WorkExperience} from "../pages/experiences";
import {NotFoundPage} from "../pages/notFound";
import {Loader} from "../components/loader";
import useGoogleAnalytics from "../components/googleAnalytics";
import { Fade } from "react-bootstrap";


// const AnimatedRoutes = withRouter(({location}) => (
//   <TransitionGroup>
//     <CSSTransition
//       key={location.key}
//       timeout={{
//         enter: 400,
//         exit: 400,
//       }}
//       classNames="page"
//       unmountOnExit
//     >
//       <Routes location={location}>
//         <Route path="/" element={<Home />} />
//         <Route path="/diplomas" element={<Diplomas />} />
//         <Route path="/work_experience" element={<Portfolio />} />
//         <Route path="/projects" element={<Portfolio />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="*" element={<Home />} />
//       </Routes>
//     </CSSTransition>
//   </TransitionGroup>
// ));

// function AppRoutes() {
//   return (
//     <div className="s_c">
//       <AnimatedRoutes />
//     </div>
//   );
// }

function AppRoutes() {
    const {t, i18n} = useTranslation("navbar")

    useGoogleAnalytics()

    return (
        <Suspense fallback={<Loader/>}>
            <Routes>
                <Route path={t('navbarElements.home.link', {lng: i18n.language})} element={<Home/>}/>
                <Route path={t('navbarElements.diplomas.link', {lng: i18n.language})} element={<Diplomas/>}/>
                <Route path={t('navbarElements.workExperience.link', {lng: i18n.language})} element={<WorkExperience/>}/>
                <Route path={t('navbarElements.projects.link', {lng: i18n.language})} element={<Portfolio/>}/>
                <Route path={t('navbarElements.contact.link', {lng: i18n.language})} element={<ContactUs/>}/>
                {/*<Route path={"*"} element={<Navigate to={localesString+"/"} />}/>*/}
                <Route path={"*"} element={<NotFoundPage/>}/>
            </Routes>
        </Suspense>
    )
}

export default AppRoutes;
