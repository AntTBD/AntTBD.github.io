import {Col, Container, Row} from "react-bootstrap";

export const Loader = () => {
    return <Container fluid={true} style={{minHeight:"80vh"}}>
        <Row style={{minHeight:"80vh"}}>
            <Col className={"text-center d-flex justify-content-center flex-column"}>
                <h1 className={"mx-auto"}>Loading...</h1>
            </Col>
        </Row>
    </Container>
}