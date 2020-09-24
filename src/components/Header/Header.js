import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const headerStyle = {
  backgroundStyle: {
    backgroundColor: '#FFDF00'
  },
  linkStyle: {
    color: 'black',
    fontFamily: 'Black Ops One, cursive'
  },
  brandStyle: {
    fontFamily: 'Black Ops One, cursive'
  }
}

const adminOptions = (
  <Nav.Link style={headerStyle.linkStyle} href="#create-post">New Post</Nav.Link>
)

const authenticatedOptions = (
  <Fragment>
    <Nav.Link style={headerStyle.linkStyle} href="#change-password">Change Password</Nav.Link>
    <Nav.Link style={headerStyle.linkStyle} href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link style={headerStyle.linkStyle} href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link style={headerStyle.linkStyle} href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link style={headerStyle.linkStyle} href="#info">Info</Nav.Link>
    <Nav.Link style={headerStyle.linkStyle} href="#home">Home</Nav.Link>
    <Nav.Link style={headerStyle.linkStyle} href="#schedule">Schedule</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar collapseOnSelect sticky="top" style={headerStyle.backgroundStyle} variant="light" expand="md">
    <Navbar.Brand style={headerStyle.brandStyle} href="#home">
      Needham Wrestling
    </Navbar.Brand>
    <Navbar.Brand>
      <a target="_blank" rel="noopener noreferrer" href="https://needhamwrestling.teamapp.com"><img width="150" height="50" title="Find us on Team App" alt="Find us on Team App" src="https://assets.teamapp.com/assets/app/social/find-us-on-teamapp-231137bec5248ed2abe25c47e9c9f4ec66e92c665f7dbbd04ce93d8d8c5e69e7.png" /></a>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { alwaysOptions }
        { user && user.admin === true ? adminOptions : null}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
