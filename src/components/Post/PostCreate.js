import React, { useState } from 'react'
import Axios from 'axios'
import PostForm from './PostForm'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'

const PostCreate = (props) => {
  const [post, setPost] = useState({ title: '', text: '', user_id: props.user.id })

  const handleChange = (event) => {
    event.persist()
    setPost({ ...post, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    Axios({
      method: 'POST',
      url: `${apiUrl}/posts`,
      headers: {
        Authorization: `Token token=${props.user.token}`
      },
      data: { post }
    })
      .then(res => {
        props.alert({
          heading: 'Created',
          message: 'Post created.',
          variant: 'success'
        })
        props.history.push(`/posts/${res.data.post.id}`)
      })
  }

  return (
    <div>
      <h1>New Post</h1>
      <PostForm cancelPath='/home' post={post} handleChange={handleChange} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default withRouter(PostCreate)
