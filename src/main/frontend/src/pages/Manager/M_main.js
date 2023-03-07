import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';

import M_onCourse from './component/M_onCourse'
import M_announcement from './component/M_announcement'
import M_approve from './component/M_approve'

const M_main = () => {

    return (
        <Container>
            <Row>
                <Col xl={12} xxl={7}>
                    <M_onCourse />
                </Col>
                <Col xl={12} xxl={5}>
                    <M_approve />
                    <M_announcement />
                </Col>
            </Row>
        </Container>
    )
}

export default M_main