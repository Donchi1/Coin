import React from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute1({ component: Component, ...rest }) {
  const authState = useSelector((state) => state.firebase.auth)
  const userInfo = useSelector((state) => state.firebase.profile)

  return (
    <Route
      {...rest}
      render={(props) => {
        {
          userInfo.uid && !userInfo.verified && (
            <Redirect to="/verification/login" />
          )
        }

        if (isLoaded(authState) && isEmpty(authState)) {
          return <Component {...props} />
        }
        return <Redirect to="/" />
      }}
    ></Route>
  )
}

export default ProtectedRoute1
