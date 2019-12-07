import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import Axios from 'axios'

import apiUrl from '../../apiConfig'
import PostForm from './PostForm'

const PostEdit = (props) => {
  const [post, setPost] = useState({ comments: [], created_at: '', id: null, text: '', title: '', user: {} })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    Axios(`${apiUrl}/posts/${props.match.params.id}`)
      .then(res => {
        setPost(res.data.post)
      })
      .catch(() => {
        props.alert({
          heading: 'Oops',
          message: 'Something went wrong. Try Again.',
          variant: 'danger'
        })
      })
  }, [])

  const handleChange = (event) => {
    event.persist()
    setPost({ ...post, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    Axios({
      url: `${apiUrl}/posts/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: { post }
    })
      .then(res => {
        props.alert({ heading: 'Success', message: 'Post updated', variant: 'success' })
        setUpdated(true)
      })
      .catch(() => {
        props.alert({
          heading: 'Oops',
          message: 'Something went wrong. Please try again.',
          variant: 'danger'
        })
      })
  }

  if (updated) {
    return <Redirect to={`/posts/${props.match.params.id}`} />
  }

  return (
    <PostForm cancelPath={`/posts/${props.match.params.id}`} post={post} handleChange={handleChange} handleSubmit={handleSubmit}/>
  )
}

export default withRouter(PostEdit)
