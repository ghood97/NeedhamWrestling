import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import apiUrl from '../../apiConfig'
import ScheduleForm from './ScheduleForm'

const ScheduleCreate = (props) => {
  const [eventItem, setEvent] = useState({
    date: new Date(),
    date_formatted: '',
    opponent: '',
    location: '',
    result: '',
    own_score: '',
    opp_score: '',
    user_id: props.user.id
  })

  const handleChange = (event) => {
    setEvent({ ...eventItem, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    Axios({
      method: 'POST',
      url: `${apiUrl}/events`,
      headers: {
        Authorization: `Token token=${props.user.token}`
      },
      data: { event: eventItem }
    })
      .then(res => {
        props.alert({
          heading: 'Created',
          message: 'Event created.',
          variant: 'success'
        })
        props.history.push('/schedule')
      })
      .catch(console.error)
  }

  return (
    <ScheduleForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      event={eventItem}
      actionText='Submit'
      cancelPath='#schedule'
    />
  )
}

export default withRouter(ScheduleCreate)
