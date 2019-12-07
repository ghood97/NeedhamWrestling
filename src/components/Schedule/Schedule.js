import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Axios from 'axios'
import apiUrl from '../../apiConfig'
import ScheduleTable from './ScheduleTable'
import { Button } from 'react-bootstrap'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import './DayPicker.scss'
import './Schedule.scss'
import ScheduleModal from './ScheduleModal'
import useWindowDimensions from '../../useWindowDimensions'

const Schedule = (props) => {
  const { width } = useWindowDimensions()
  const [events, setEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState()
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => setShow(true)

  useEffect(() => {
    Axios(`${apiUrl}/events`)
      .then(res => {
        setEvents(res.data.events)
      })
      .catch(console.error)
  }, [])

  const handleDayClick = (day) => {
    setSelectedDate(day)
    if (event.target.classList.contains('DayPicker-Day--highlighted')) {
      handleShow()
    }
  }

  const handleDelete = (event) => {
    event.preventDefault()
    const eventId = event.target.dataset.eventId
    Axios({
      method: 'DELETE',
      url: `${apiUrl}/events/${eventId}`,
      headers: {
        Authorization: `Token token=${props.user.token}`
      }
    })
      .then(res => {
        Axios({
          url: `${apiUrl}/events`,
          method: 'GET',
          headers: {
            'Authorization': `Token token=${props.user.token}`
          }
        })
          .then(res => {
            setEvents(res.data.events)
          })
      })
      .then(() => {
        props.alert({
          heading: 'Deleted',
          message: 'Event deleted',
          variant: 'danger'
        })
      })
      .then(() => {
        handleClose()
      })
      .catch(() => {
        props.alert({
          heading: 'Oops',
          message: 'Couldn\'t delete your event. Try Again.',
          variant: 'danger'
        })
      })
  }

  // highlights all event dates in green on calendar
  const datesToHighlight = []
  events.forEach(x => {
    const date = new Date(x.date)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    datesToHighlight.push(new Date(year, month, day))
  })

  // object for DayPicker where highlight will make the date a different color
  const modifiers = {
    highlighted: datesToHighlight
  }

  const modalJsx = (
    <ScheduleModal
      user={props.user}
      date={selectedDate}
      events={events}
      handleClose={handleClose}
      handleDelete={handleDelete}
      show={show}
    />
  )

  if (width <= 576) {
    if (events.length < 1) {
      const unAuthLoading = (
        <h1 className='text-center'>{'No events. Sign-in to add an event'}</h1>
      )
      const authLoading = (
        <div>
          <h1 className='text-center'>{'No events. Click \'New event\' to add one.'}</h1>
          <div className='d-flex flex-row justify-content-center'>
            <Link to='/create-event'><Button variant='success'>New Event</Button></Link>
          </div>
        </div>
      )
      return props.user ? authLoading : unAuthLoading
    } else {
      return (
        <div>
          <h5 className='text-center'><em>You have events on the dates highlighed in <span style={{ color: 'green', fontWeight: 'bold' }}>green</span></em></h5>
          <div className="d-flex flex-row justify-content-center">
            <DayPicker
              className="day-picker"
              modifiers={modifiers}
              selectedDays={selectedDate}
              onDayClick={handleDayClick}
            />
            {modalJsx}
          </div>
          <div className="d-flex flex-row justify-content-center mt-3">
            {props.user ? <Link to='/create-event'><Button variant='success'>New Event</Button></Link> : null}
          </div>
        </div>
      )
    }
  } else {
    if (events.length < 1) {
      const unAuthLoading = (
        <h1 className='text-center'>{'No events. Sign-in to add an event'}</h1>
      )
      const authLoading = (
        <div>
          <h1 className='text-center'>{'No events. Click \'New event\' to add one.'}</h1>
          <div className='d-flex flex-row justify-content-center'>
            <Link to='/create-event'><Button variant='success'>New Event</Button></Link>
          </div>
        </div>
      )
      return props.user ? authLoading : unAuthLoading
    } else {
      return (
        <div>
          {props.user ? <Link to='/create-event'><Button variant='success'>New Event</Button></Link> : null}
          <ScheduleTable user={props.user} events={events} handleDelete={handleDelete}/>
        </div>
      )
    }
  }
}

export default withRouter(Schedule)
