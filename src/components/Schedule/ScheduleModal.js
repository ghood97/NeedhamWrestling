import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import formattedDateWOTime from '../../formatDateWOTime'
import './ScheduleModal.scss'
import './ScheduleTable.scss'

const ScheduleModal = (props) => {
  const eventJsx = (
    props.events.map(x => {
      const btnJsx = (
        <div className='d-flex flex-row justify-content-end'>
          <Button
            href={`#events/${x.id}/edit`}
            size="sm"
            variant="info"
            data-comment-id={x.id}
            className="schedule-btn-group">
          Edit
          </Button>
          <Button
            size="sm"
            data-event-id={x.id}
            onClick={props.handleDelete}
            variant="danger"
            className="schedule-btn-group ml-2"
          >
            Delete
          </Button>
        </div>
      )
      if (formattedDateWOTime(new Date(x.date)) === formattedDateWOTime(new Date(props.date))) {
        let time = ''
        if (x.time[0] === '0') {
          time = x.time.substring(1, x.time.length)
        } else {
          time = x.time
        }
        let result
        if (x.own_score > x.opp_score) {
          result = 'winModal'
        } else if (x.own_score < x.opp_score) {
          result = 'loss'
        } else {
          result = 'tieModal'
        }
        return (
          <div key={x.id} className="mb-2">
            <p><span className="font-weight-bold">When:</span> {x.day}, {x.date_formatted} at {time}</p>
            <p><span className="font-weight-bold">Who:</span> {x.opponent}</p>
            <p><span className="font-weight-bold">Where:</span> {x.location}</p>
            <p><span className="font-weight-bold">Score: </span><span className={result}>{x.own_score} -- {x.opp_score}</span></p>
            {props.user && props.user.id === x.user_id ? btnJsx : null}
            <hr />
          </div>
        )
      }
    })
  )
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formattedDateWOTime(new Date(props.date))}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {eventJsx}
      </Modal.Body>
      <Modal.Footer>
        <Button size="md" variant="secondary" onClick={props.handleClose} className="ml-2">Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ScheduleModal
