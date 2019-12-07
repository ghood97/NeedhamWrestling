import React from 'react'
import { withRouter } from 'react-router-dom'
import { Table, Button, ButtonGroup } from 'react-bootstrap'
import './CommentTable.scss'
import formatDate from '../../formatDate'

const CommentTable = (props) => {
  const commentJsx = props.comments.map(x => (
    <tr key={x.id}>
      <td className="font-weight-bold tableRow text-wrap text-break col-6">{x.text}</td>
      <td className="font-weight-bold tableRow text-right col-4">{x.user.email}</td>
      <td className="font-weight-bold tableRow text-right col-4">{formatDate(new Date(x.created_at))}</td>
      {props.user.id === x.user.id
        ? <td className="text-right col-2">
          <ButtonGroup vertical>
            <Button
              size="sm"
              variant="info"
              data-comment-id={x.id}
              className="comment-btn-group"
              onClick={props.handleEditShow}>
              Edit
            </Button>
            <Button
              size="sm"
              data-comment-id={x.id}
              onClick={props.handleDelete}
              variant="danger"
              className="comment-btn-group"
            >
              Delete
            </Button>
          </ButtonGroup>
        </td>
        : <td className="font-weight-bold tableRow no-delete-text text-center col-2">{'Can\'t delete'}</td>}
    </tr>
  ))

  return (
    <Table striped bordered hover size="sm" responsive className="mt-3">
      <thead>
      </thead>
      <tbody>
        {commentJsx}
      </tbody>
    </Table>
  )
}

export default withRouter(CommentTable)
