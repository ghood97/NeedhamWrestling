import React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button, Container, Col } from 'react-bootstrap'

const ScheduleForm = (props) => {
  return (
    <Container fluid className="d-flex flex-row justify-content-center">
      <Form onSubmit={props.handleSubmit} className="col-sm-12 col-md-8 col-lg-10">
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            required
            name="date"
            type="datetime-local"
            value={props.event.date}
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="opponent">
          <Form.Label>Opponent</Form.Label>
          <Form.Control
            required
            name="opponent"
            value={props.event.opponent}
            type="text"
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            required
            name="location"
            value={props.event.location}
            type="text"
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Row className="col-sm-12 col-md-6 p-0">
          <Form.Group as={Col} controlId="own-score">
            <Form.Label>{'Your team\'s score'}</Form.Label>
            <Form.Control
              name="own_score"
              value={props.event.own_score}
              type="number"
              onChange={props.handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="opp-score">
            <Form.Label>{'Opponent\'s Score'}</Form.Label>
            <Form.Control
              name="opp_score"
              value={props.event.opp_score}
              type="number"
              onChange={props.handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group className="d-flex flex-row justify-content-between">
          <Button
            variant="primary"
            type="submit"
          >
            {props.actionText}
          </Button>
          <Button href={props.cancelPath} variant='danger'>Cancel</Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default withRouter(ScheduleForm)
