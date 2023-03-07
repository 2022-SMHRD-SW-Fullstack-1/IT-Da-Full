import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Attendance from '../../../components/main/Attendance';
import Announcement from '../../../components/main/Announcement';
import Schedule from '../../../components/main/Schedule';

const T_main = () => {

  return (
    <Container>
      <Row>
        <Col lg={12} xl={5}>
          <Attendance />
          <Announcement />
        </Col>
        <Col lg={12} xl={7}>
          <Schedule />
        </Col>
      </Row>
    </Container>
  )
}

export default T_main