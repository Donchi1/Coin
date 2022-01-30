import React from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute({ component: Component, ...rest }) {
  const authState = useSelector((state) => state.firebase.auth)
  const userInfo = useSelector((state) => state.firebase.profile)
  console.log(userInfo)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoaded(authState) && !isEmpty(authState)) {
          return <Component {...props} />
        } else {
          return <Redirect to="/login" />
        }
      }}
    ></Route>
  )
}

export default ProtectedRoute
