import {
    FaAward,
    FaBookOpen,
    FaBrain, FaBriefcase,
    FaCube, FaEnvelope,
    FaGamepad, FaGithub,
    FaGlobe, FaGraduationCap, FaIdCard,
    FaItchIo,
    FaLightbulb, FaLinkedin, FaLocationDot,
    FaMedal, FaMobileScreen,
    FaMoon,
    FaRobot,
    FaSun,
    FaVideo,
    FaVrCardboard
} from "react-icons/fa6";
import {FaCalendarAlt, FaMapMarkerAlt} from "react-icons/fa";
import React from "react";
import {IconBaseProps} from "react-icons/lib/iconBase";
import {BsCircleHalf, BsMoonStarsFill, BsSunFill} from "react-icons/bs";
import {BiSolidContact} from "react-icons/bi";

interface IconProps extends IconBaseProps {
    iconName: string;
}

export const Icon = ({iconName, ...props}: IconProps) => {
    switch (iconName) {
        case "gamepad":
            return <FaGamepad {...props}/>
        case "itch-io":
            return <FaItchIo {...props}/>
        case "github":
            return <FaGithub {...props}/>
        case "linkedin":
            return <FaLinkedin {...props} />
        case "video":
            return <FaVideo {...props}/>
        case "vr":
            return <FaVrCardboard {...props}/>//
        case "cube":
            return <FaCube {...props}/>
        case "book-open":
            return <FaBookOpen {...props}/>
        case "diploma":
            return <FaGraduationCap {...props}/>
        case "brain":
            return <FaBrain {...props}/>
        case "globe":
            return <FaGlobe {...props}/>
        case "lightbulb":
            return <FaLightbulb {...props}/>
        case "robot":
            return <FaRobot {...props}/>
        case "award":
            return <FaAward {...props}/>
        case "medal":
            return <FaMedal {...props}/>
        case "calendar-alt":
            return <FaCalendarAlt {...props}/>
        case "map-marker-alt":
            return <FaMapMarkerAlt {...props}/>
        case "sun":
            return <FaSun {...props}/>
        case "moon":
            return <FaMoon {...props}/>
        case "bs-sun-fill":
            return <BsSunFill {...props}/>
        case "bs-moon-starts-fill":
            return <BsMoonStarsFill {...props}/>
        case "bs-circle-half":
            return <BsCircleHalf {...props}/>
        case "briefcase":
            return <FaBriefcase {...props} />
        case "id-card":
            return <FaIdCard {...props} />
        case "contact":
            return <BiSolidContact {...props} />
        case "tel":
            return <FaMobileScreen {...props} />
        case "mail":
            return <FaEnvelope {...props} />
        case "location":
            return <FaLocationDot {...props} />
        default:
            return <></>
    }

}