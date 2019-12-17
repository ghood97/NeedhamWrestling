import React from 'react'

const Info = (props) => {
  return (
    <div>
      <section>
        <h1 className='display-4 text-center'><u>How To Use This Site</u></h1>
        <ul className='font-weight-bold'>
          <h4 className='font-weight-bold'><u>Account</u></h4>
          <li>
              In the navigation bar at the top of the screen, you can sign-up for an account or sign-in.
          </li>
          <br/>
          <li>
              PLEASE DO NOT USE YOUR REAL EMAIL! Use something like {'\'wrestling@parent\''}.
          </li>
          <br/>
          <li>
              PLEASE use your real first and last name. This is how you will be identified while using this site.
          </li>
          <br/>
          <li>
              If you get an error trying to sign-up it means that either your passwords did not match or the email is already taken by another user.
          </li>
          <br/>
          <li>
              REMEMBER THIS EMAIL! This is what you will use to sign into the website.
          </li>
          <br/>
          <li>
              As of right now, there is no password reset feature. If you forget your password you will have to create a new account. All this means is that you will not be able to edit or delete any comments made from the forgotten account.
          </li>
        </ul>
      </section>
      <hr/>
      <section>
        <ul className='font-weight-bold'>
          <h4 className='font-weight-bold'><u>Navigating the app</u></h4>
          <li>
            In the navigation bar at the top, you can click on {'\'Schedule\''} to view upcoming events.
            <ul>
              <li>
                <em>*Note*</em> On smaller screens, like an IPhone, the schedule table will display as a calendar. Dates highlighted in green are dates where we have events scheduled. You can click a green date to show more info about the events on that day.
              </li>
            </ul>
          </li>
          <br/>
          <li>
            You can also click on {'\'Home\''} to view all of the posts/notifications.
          </li>
          <br/>
          <li>
            You can click the {'\'View post\''} button to see all of the comments on a certain post.
            <ul>
              <li>
                On this page, you can comment on a post as well as edit or delete one of your own comments.
              </li>
            </ul>
          </li>
        </ul>
        <br/>
        <h5 className='font-weight-bold'>
           Please remember this site is intended to be used for informational purposes only. Please do not post anything personal or anything that might be offensive to others. If you have any personal concerns please contact the coaches directly. Thank you and go rockets!
        </h5>
        <hr/>
        <p className='font-weight-bold'>
           If you are getting any unexpected errors, please feel free to <a style={{ color: 'blue' }} href='mailto:griffinhood@verizon.net'>email me</a> with any questions.
        </p>
      </section>
    </div>
  )
}

export default Info
