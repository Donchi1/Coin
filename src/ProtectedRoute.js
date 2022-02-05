import React from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute({ children, ...rest }) {
  const authState = useSelector((state) => state.firebase.auth)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoaded(authState) && !isEmpty(authState)) {
          return children
        } else {
          return <Redirect to="/login" />
        }
      }}
    ></Route>
  )
}

export default ProtectedRoute
