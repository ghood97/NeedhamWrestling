import React from 'react'

const footerStyle = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '2.5rem',
  backgroundColor: '#292b2c',
  color: 'white'
}

const Footer = (props) => {
  return (
    <div style={footerStyle} className="d-flex flex-row justify-content-center">
      <p className="align-self-end"><small>A website by Griffin Hood</small></p>
    </div>
  )
}

export default Footer
