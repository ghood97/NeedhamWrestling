import React, { useEffect, useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import apiUrl from '../../apiConfig'
import formatDate from '../../formatDate'
import './Post.scss'
import CommentModal from '../Comment/CommentModal'
import CommentTable from '../Comment/CommentTable'
import { Button, ButtonGroup, Card } from 'react-bootstrap'

const Post = (props) => {
  const [post, setPost] = useState({ comments: [], created_at: '', id: null, text: '', title: '', user: {} })
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [comment, setComment] = useState({ text: '', user_id: props.user.id, post_id: props.match.params.id })
  const [commentId, setCommentId] = useState(null)

  useEffect(() => {
    Axios({
      url: `${apiUrl}/posts/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => {
        setPost(res.data.post)
      })
      .catch(() => {
        props.alert({
          heading: 'Oops',
          message: 'We couldn\'t find this post. Click \'Home\' to go back to the home page.',
          variant: 'danger'
        })
      })
  }, [])

  const handleChange = (event) => {
    event.persist()
    setComment({ ...comment, [event.target.name]: event.target.value })
  }

  // for comment create modal
  const handleCreateClose = () => {
    setShowCreate(false)
    setComment({ text: '', user_id: props.user.id, post_id: props.match.params.id })
  }
  const handleCreateShow = () => setShowCreate(true)

  // for comment edit modal
  const handleEditClose = () => {
    setShowEdit(false)
    setComment({ text: '', user_id: props.user.id, post_id: props.match.params.id })
  }
  const handleEditShow = (event) => {
    event.persist()
    const id = event.target.dataset.commentId
    Axios({
      method: 'GET',
      url: `${apiUrl}/comments/${id}`,
      headers: {
        Authorization: `Token token=${props.user.token}`
      }
    })
      .then(res => {
        setComment(res.data.comment)
        setCommentId(res.data.comment.id)
        setShowEdit(true)
      })
      .catch(() => {
        handleEditClose()
        props.alert({
          heading: 'Oops',
          message: 'We couldn\'t find your comment. Try again.',
          variant: 'Danger'
        })
      })
  }

  // handleSubmit for comment-create modal
  const handleCommentSubmit = (event) => {
    event.preventDefault()
    Axios({
      method: 'POST',
      url: `${apiUrl}/comments`,
      headers: {
        Authorization: `Token token=${props.user.token}`
      },
      data: { comment }
    })
      .then(res => {
        Axios({
          url: `${apiUrl}/posts/${props.match.params.id}`,
          method: 'GET',
          headers: {
            'Authorization': `Token token=${props.user.token}`
          }
        })
          .then(res => {
            setPost(res.data.post)
          })
      })
      .then(() => {
        handleCreateClose()
        props.alert({
          heading: 'Success',
          message: 'Commented',
          variant: 'success'
        })
      })
      .catch(() => {
        handleCreateClose()
        props.alert({
          heading: 'Oops',
          message: 'Can\t create a comment at this time. Try again.',
          variant: 'danger'
        })
      })
  }

  const handleCommentEdit = (event) => {
    event.preventDefault()
    Axios({
      method: 'PATCH',
      url: `${apiUrl}/comments/${commentId}`,
      headers: {
        Authorization: `Token token=${props.user.token}`
      },
      data: { comment }
    })
      .then(res => {
        Axios({
          url: `${apiUrl}/posts/${props.match.params.id}`,
          method: 'GET',
          headers: {
            'Authorization': `Token token=${props.user.token}`
          }
        })
          .then(res => {
            setPost(res.data.post)
          })
      })
      .then(() => {
        handleEditClose()
        props.alert({
          heading: 'Success',
          message: 'Comment edited',
          variant: 'success'
        })
      })
      .catch(() => {
        props.alert({
          heading: 'Oops',
          message: 'Can\'t edit your comment. Try again.',
          variant: 'danger'
        })
      })
  }

  const handleCommentDelete = (event) => {
    event.preventDefault()
    const commentId = event.target.dataset.commentId
    Axios({
      method: 'DELETE',
      url: `${apiUrl}/comments/${commentId}`,
      headers: {
        Authorization: `Token token=${props.user.token}`
      }
    })
      .then(res => {
        Axios({
          url: `${apiUrl}/posts/${props.match.params.id}`,
          method: 'GET',
          headers: {
            'Authorization': `Token token=${props.user.token}`
          }
        })
          .then(res => {
            setPost(res.data.post)
          })
      })
      .then(() => {
        props.alert({
          heading: 'Deleted',
          message: 'Comment deleted',
          variant: 'danger'
        })
      })
      .catch(() => {
        props.alert({
          heading: 'Oops',
          message: 'Couldn\'t delete your comment. Try Again.',
          variant: 'danger'
        })
      })
  }

  const handleDelete = (event) => {
    event.preventDefault()
    Axios({
      method: 'DELETE',
      url: `${apiUrl}/posts/${props.match.params.id}`,
      headers: {
        Authorization: `Token token=${props.user.token}`
      }
    })
      .then(() => {
        props.alert({
          heading: 'Deleted',
          message: 'Post Deleted.',
          variant: 'danger'
        })
      })
      .then(() => {
        props.history.push('/')
      })
      .catch(() => {
        props.alert({
          heading: 'Oops',
          message: 'Couldn\'t delete your post. Try again.',
          variant: 'danger'
        })
      })
  }

  const formattedDate = formatDate(new Date(post.created_at))

  const deleteJsx = (
    <div className="d-flex flex-column align-items-end">
      <ButtonGroup vertical>
        <Button href={`#posts/${props.match.params.id}/edit`} size="sm" variant="info">Edit</Button>
        <Button onClick={handleDelete} size="sm" variant="danger">Delete</Button>
      </ButtonGroup>
    </div>
  )

  const postJsx = (
    <Fragment>
      <Card bg="light" text="black" className="my-4 post-card">
        <Card.Header>
          <div className="text-right">
            {props.user ? (props.user.id === post.user_id ? deleteJsx : null) : null}
          </div>
          <h6 className="date-line">Created at: {formattedDate} | By: {post.user_email}</h6>
          <h2>{post.title}</h2>
        </Card.Header>
        <Card.Body>
          <Card.Text className="card-text">
            {post.text}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex flex-row justify-content-between mr-auto">
            <h5 className="font-weight-bolder align-self-center">Comments</h5>
            <Button onClick={handleCreateShow} size="sm" variant="success" className="align-self-center">New</Button>
          </div>
          <CommentTable
            user={props.user}
            handleDelete={handleCommentDelete}
            handleEditShow={handleEditShow}
            comments={post.comments}
          />
        </Card.Footer>
      </Card>
      <CommentModal
        header='New comment on '
        action={handleCommentSubmit}
        post={post}
        comment={comment}
        handleChange={handleChange}
        handleClose={handleCreateClose}
        show={showCreate}
      />
      <CommentModal
        header="Update your comment on "
        action={handleCommentEdit}
        post={post}
        comment={comment}
        handleChange={handleChange}
        handleClose={handleEditClose}
        show={showEdit}
      />
    </Fragment>
  )

  return postJsx
}

export default withRouter(Post)
