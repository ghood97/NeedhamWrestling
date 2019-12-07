import React, { useState, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Axios from 'axios'
import apiUrl from '../../apiConfig'
import ScheduleForm from './ScheduleForm'

const ScheduleEdit = (props) => {
  const [eventItem, setEvent] = useState({
    date: '',
    date_formatted: '',
    opponent: '',
    location: '',
    result: '',
    own_score: '',
    opp_score: '',
    user_id: props.user.id
  })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    Axios(`${apiUrl}/events/${props.match.params.id}`)
      .then(res => {
        setEvent(res.data.event)
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
    setEvent({ ...eventItem, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    Axios({
      url: `${apiUrl}/events/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: { event: eventItem }
    })
      .then(res => {
        props.alert({ heading: 'Success', message: 'Event updated', variant: 'success' })
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
    return <Redirect to={'/schedule'} />
  }

  return (
    <ScheduleForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      event={eventItem}
      actionText='Edit'
      cancelPath="#schedule"
    />
  )
}

export default withRouter(ScheduleEdit)
