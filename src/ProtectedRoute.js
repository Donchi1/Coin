import React from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { Redirect, Route } from 'react-router-dom'
import Closed from './components/user/Closed'
import Disable from './components/user/Disable'

function ProtectedRoute({ component: Component, ...rest }) {
  const authState = useSelector((state) => state.firebase.auth)
  const userInfo = useSelector((state) => state.firebase.profile)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoaded(authState) && !isEmpty(authState)) {
          if (userInfo.closedForTheWeek) {
            return <Closed />
          }
          if (userInfo.disableAccount) {
            return <Disable />
          }
          if (!userInfo.verificationCode) {
            return <Redirect to="verification/login" />
          }

          return <Component {...props} />
        } else {
          return <Redirect to="/login" />
        }
      }}
    ></Route>
  )
}

export default ProtectedRoute
