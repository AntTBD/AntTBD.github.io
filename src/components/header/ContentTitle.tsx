import {Col, Row} from "react-bootstrap";
import {Icon} from "../icons/Icon";
import React from "react";
import {Helmet} from "react-helmet-async";
import {metadata} from "../../content_option";

export const ContentTitle = ({title, iconName}: { title: string, iconName: string }) => {
    return (
        <>
            <Helmet>
                <title>{title} | {metadata.title}</title>
            </Helmet>
            <Row className="mt-2">
                <Col>
                    <h1><Icon iconName={iconName} size={40}/> {title}</h1>
                    <hr className="t_border my-4 ml-0 text-left"/>
                </Col>
            </Row>
        </>
    );
}