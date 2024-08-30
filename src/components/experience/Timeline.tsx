import TimelineCard, {ExperienceProps} from "./TimelineCard";
import TimelineYear from "./TimelineYear";
import React from "react";
import "./style.css"
import {Col, Row} from "react-bootstrap";


const Timeline = ({experiences}: { experiences: ExperienceProps[] }) => {

    let previousYear = 0;//new Date().getFullYear();

    const generateCardAndYears = (xp: ExperienceProps, i: number) => {
        let upperYearComponent = []
        let lastYearComponent = []

        if (xp.year !== previousYear) {
            if (previousYear - xp.year > 1 && i !== 0) {
                //previous year if difference is too large and is not first element
                upperYearComponent.push(<TimelineYear key={Math.random()}
                                                      year={xp.year + (previousYear - xp.year) - 1}/>)
            }
            // current year
            upperYearComponent.push(<TimelineYear key={Math.random()} year={xp.year}/>)

        }
        previousYear = xp.year

        if (i === experiences.length - 1) {
            // previous year if last element
            lastYearComponent.push(<TimelineYear key={Math.random()} year={xp.year - 1}/>)
        }
        return (
            <React.Fragment key={i}>
                {upperYearComponent}
                <TimelineCard
                    key={i}
                    xp={xp}
                    i={i}
                />
                {lastYearComponent}
            </React.Fragment>
        )
    }

    return (
        <Row key={"experiences_"+experiences.length} className={"timeline mx-auto overflow-hidden"}>
            <Col>
                {
                    experiences.map((xp, i) => {
                            return generateCardAndYears(xp, i)
                        }
                    )}
            </Col>
        </Row>
    );
}
export default Timeline