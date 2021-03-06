import React, { useState, useEffect, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Axios from 'axios'
import apiUrl from '../../apiConfig'
import { Card, Button } from 'react-bootstrap'
import formatDate from '../../formatDate'

const postBodyStyle = {
  maxHeight: '300px',
  overflowY: 'auto'
}

const Home = (props) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    Axios(`${apiUrl}/posts`)
      .then(res => {
        setPosts(res.data.posts)
      })
      .catch(() => {
        props.alert({
          heading: 'Oops',
          message: 'Something went wrong. Try again.',
          variant: 'danger'
        })
      })
  }, [])

  const postJsx = posts.map(post => {
    const date = new Date(post.created_at)
    const postBtnJsx = (
      <Link to={`/posts/${post.id}`}><Button size="sm" variant="info">View post</Button></Link>
    )
    return (
      <Card bg="secondary" text="white" key={post.id} className="my-4 posts-card">
        <Card.Header as="h2" className='font-weight-bold'>{post.title}</Card.Header>
        <Card.Body>
          <Card.Text style={postBodyStyle}>
            {post.text}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex flex-row">
          <div>
            <small>{formatDate(date)}</small>
          </div>
          <div className="ml-auto">
            {props.user ? postBtnJsx : null}
          </div>
        </Card.Footer>
      </Card>
    )
  })

  const unAuthHeader = (
    <Fragment>
      <h2 className='text-center font-weight-bold'>Sign-up or Sign-in to view comments.</h2>
      <div className="border-top my-3"></div>
    </Fragment>
  )
  let authHeader = ''
  if (props.user) {
    authHeader = (
      <Fragment>
        <h2 className='text-center font-weight-bold'>{`Welcome, ${props.user.first_name}!`}</h2>
        {posts.length < 1 ? null : <h3 className='text-center'>{'Click on \'View post\' to see comments'}</h3>}
        <div className="border-top my-3"></div>
      </Fragment>
    )
  }

  return (
    <div>
      {props.user ? authHeader : unAuthHeader}
      {posts.length < 1 ? <h1 className='text-center'>No posts to show at this time</h1> : postJsx}
    </div>
  )
}

export default withRouter(Home)
