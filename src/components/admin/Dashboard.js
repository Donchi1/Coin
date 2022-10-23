import React from 'react'

import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'

import { useFirebase } from 'react-redux-firebase'

import { useNotify } from 'react-admin'

export default function Dashboard() {
  const notify = useNotify()
  const firebase = useFirebase()
  const closedForTheWeek = () => {
    const data = firebase.firestore().collection('users')
    data
      .where('closedForTheWeek', '==', false)
      .get()
      .then((users) => {
        users.forEach((user) => {
          user.ref.update({ closedForTheWeek: true }).then(() => {
            return notify('Successfully Closed for the week', {
              type: 'success',
              undoable: false,
            })
          })
        })
      })
  }

  const openForTheWeek = () => {
    const data = firebase.firestore().collection('users')
    data
      .where('closedForTheWeek', '==', true)
      .get()
      .then((users) => {
        users.forEach((user) => {
          user.ref.update({ closedForTheWeek: false }).then(() => {
            return notify('Successfully Opened for the week', {
              type: 'success',
              undoable: false,
            })
          })
        })
      })
  }

  return (
    <Card>
      <h4 className="text-primary">Welcome Mr J to your admin Controller</h4>
      <CardContent>You can do all you wise here with ease</CardContent>
      <Typography>Close For The Week If Is Time Sir</Typography>
      <ButtonGroup>
        <Button
          className="btn bg-primary text-light"
          onClick={() => closedForTheWeek()}
        >
          CLOSE FOR THE WEEK
        </Button>
        <Button
          className="btn bg-secondary text-light"
          onClick={() => openForTheWeek()}
        >
          OPEN FOR THE WEEK
        </Button>
      </ButtonGroup>
    </Card>
  )
}
