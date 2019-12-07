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

const authenticatedOptions = (
  <Fragment>
    <Nav.Link style={headerStyle.linkStyle} href="#create-post">New Post</Nav.Link>
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
    <Nav.Link style={headerStyle.linkStyle} href="#home">Home</Nav.Link>
    <Nav.Link style={headerStyle.linkStyle} href="#schedule">Schedule</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar collapseOnSelect sticky="top" style={headerStyle.backgroundStyle} variant="light" expand="md">
    <Navbar.Brand style={headerStyle.brandStyle} href="#home">
      TeamNotiphy
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
