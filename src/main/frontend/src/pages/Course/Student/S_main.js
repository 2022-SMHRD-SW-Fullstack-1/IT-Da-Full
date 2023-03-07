import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Announcement from '../../../components/main/Announcement';
import Schedule from '../../../components/main/Schedule';
import BoardButton from './BoardButton';

const S_main = () => {

  return (
    <Container>
      <Row>
        <Col lg={12} xl={5}>
          <Announcement />
          <BoardButton />
        </Col>
        <Col lg={12} xl={7}>
          <Schedule />
        </Col>
      </Row>
    </Container>
  )
}

export default S_main