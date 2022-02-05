import React from 'react'

import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'

import { useFirebase } from 'react-redux-firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function Dashboard() {
  const firebase = useFirebase()
  const closedForTheWeek = () => {
    const data = firebase.firestore().collection('users')
    data
      .where('closedForTheWeek', '==', false)
      .get()
      .then((users) => {
        users.forEach((user) => {
          data
            .doc(user.id)
            .update({ closedForTheWeek: true })
            .then(() => {
              return MySwal.fire({
                title: <p>Success</p>,
                text: 'Successful Closed for the week',
                icon: 'success',

                showCloseButton: true,
                closeButtonText: 'OK',
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
          data
            .doc(user.id)
            .update({ closedForTheWeek: false })
            .the(() => {
              return MySwal.fire({
                title: <p>Success</p>,
                text: 'Successful opened for the week',
                icon: 'success',

                showCloseButton: true,
                closeButtonText: 'OK',
              })
            })
        })
      })
  }

  return (
    <Card>
      <h4 className="text-primary">Welcome Mr J to your admin Controller</h4>
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
