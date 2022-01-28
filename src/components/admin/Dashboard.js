import React from 'react'

import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import { Title } from 'react-admin'
import { useFirebase } from 'react-redux-firebase'

export default function Dashboard() {
  const firebase = useFirebase()
  const closedForTheWeek = () => {
    const data = firebase.firestore().collection('users')
    data
      .where('closedForTheWeek', '==', false)
      .get()
      .then((users) => {
        users.forEach((user) => {
          data.doc(user.id).update({ closedForTheWeek: true })
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
          data.doc(user.id).update({ closedForTheWeek: false })
        })
      })
  }

  return (
    <Card>
      <Title>Welcom Mr J to your admin Controller</Title>
      <CardContent>You can do all yo wise here with ease</CardContent>
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
