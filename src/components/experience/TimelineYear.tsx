import {Row} from "react-bootstrap";
import "./style.css"

const TimelineYear = ({year}: { year: number }) => {
    return (
        <Row className={"g-0"} key={year}>
            <div className={"year"}>
                <h2>{year?.toString()}</h2>
            </div>
        </Row>
    )
}
export default TimelineYear