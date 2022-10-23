import React, { useEffect, useState } from 'react'

import AdminNav from './AdminNav'
import { useFirebase } from 'react-redux-firebase'

const options = {
  filterType: 'dropdown',
  onRowClick: (row, index) => {
    console.log(row)
  },
  responsive: 'scroll',
  selectableRows: true,
}

function Admin() {
  const firebase = useFirebase()

  const [data, setData] = useState({
    title: 'User List',
    columns: [],
  })

  const [testimonialData, setTestimonialData] = useState({
    image: '',
    message: '',
  })

  const [collections, setCollections] = useState({
    singleCollection: [],
  })

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data())
        setCollections({ ...collections, singleCollection: data })
      })
  }, [])

  const fetchCollectionData = (name, column) => {
    if (name === 'withdrawals') {
      firebase
        .firestore()
        .collectionGroup('withdrawalDatas')
        .orderBy({ date: 'desc' })
        .onSnapshot((snap) => {
          const data = snap.docs.map((doc) => doc.data())
          setCollections({ ...collections, singleCollection: data })
          setData({ ...data, title: `${name} List`, columns: column })
        })
    }
    if (name === 'payments') {
      firebase
        .firestore()
        .collectionGroup('paymentDatas')
        .orderBy({ date: 'desc' })
        .onSnapshot((snap) => {
          const data = snap.docs.map((doc) => doc.data())
          setCollections({ ...collections, singleCollection: data })
          setData({ ...data, title: `${name} List`, columns: column })
        })
    }
    firebase
      .firestore()
      .collection(name)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data())
        setCollections({ ...collections, singleCollection: data })
        setData({ ...data, title: `${name} List`, columns: column })
      })
  }

  const addTestimonial = () => {
    firebase.firestore().collection('testimonials').add({
      photo: testimonialData.image,
      message: testimonialData.message,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }
  return (
    <>
      <AdminNav fetchCollection={fetchCollectionData} />
    </>
  )
}

export default Admin
