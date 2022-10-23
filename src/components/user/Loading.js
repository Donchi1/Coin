import { CircularProgress } from '@material-ui/core'
import React from 'react'

function Loading() {
  return (
    <div className="loading">
      <CircularProgress variant="indeterminate" color="secondary" size={90} />
    </div>
  )
}

export default Loading
