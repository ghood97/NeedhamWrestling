import React from 'react'
import { Button, Modal, Form, Container } from 'react-bootstrap'

const CommentModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`${props.header}"${props.post.title}"`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={props.action}>
          <Form.Group controlId="text">
            <Form.Label>Write your comment below</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              required
              name="text"
              value={props.comment.text}
              type="text"
              placeholder="Comment goes here"
              onChange={props.handleChange}
            />
          </Form.Group>
          <Container fluid="true" className="d-flex flex-row justify-content-end">
            <Button size="md" variant="primary"type="submit">Submit</Button>
            <Button size="md" variant="secondary" onClick={props.handleClose} className="ml-2">Close</Button>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  )
}

export default CommentModal
