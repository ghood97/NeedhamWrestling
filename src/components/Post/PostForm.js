import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PostForm = (props) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          name="title"
          value={props.post.title}
          type="text"
          placeholder="Title"
          onChange={props.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="text">
        <Form.Label>Text</Form.Label>
        <Form.Control
          required
          name="text"
          value={props.post.text}
          type="text"
          placeholder="Text"
          onChange={props.handleChange}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
      >
        Submit
      </Button>
      <Link to={props.cancelPath}><Button variant='danger'>Cancel</Button></Link>
    </Form>
  )
}

export default PostForm
