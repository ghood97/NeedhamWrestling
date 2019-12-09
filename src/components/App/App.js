import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import './App.scss'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AuthenticatedSuperRoute from '../AuthenticatedSuperRoute/AuthenticatedSuperRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Info from '../Info/Info'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Home from '../Home/Home'
import Post from '../Post/Post'
import PostCreate from '../Post/PostCreate'
import PostEdit from '../Post/PostEdit.js'
import Schedule from '../Schedule/Schedule'
import ScheduleCreate from '../Schedule/ScheduleCreate'
import ScheduleEdit from '../Schedule/ScheduleEdit'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <div className="page-container">
        <Header user={user} />
        <div className="alerts-container">
          {alerts.map((alert, index) => (
            <AutoDismissAlert
              key={index}
              heading={alert.heading}
              variant={alert.variant}
              message={alert.message}
            />
          )).reverse()}
        </div>
        <main className="container my-4">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/info' render={() => (
            <Info alert={this.alert} />
          )} />
          <Route exact path='/' render={() => (
            <Redirect to='/home'/>
          )} />
          <Route exact path='/home' render={() => (
            <Home alert={this.alert} user={user}/>
          )} />
          <Route exact path='/schedule' render={() => (
            <Schedule alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/posts/:id' render={() => (
            <Post alert={this.alert} user={user} />
          )} />
          <AuthenticatedSuperRoute user={user} path='/create-post' render={() => (
            <PostCreate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/posts/:id/edit' render={() => (
            <PostEdit alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-event' render={() => (
            <ScheduleCreate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/events/:id/edit' render={() => (
            <ScheduleEdit alert={this.alert} user={user} />
          )} />
        </main>
        <Footer/>
      </div>
    )
  }
}

export default App
