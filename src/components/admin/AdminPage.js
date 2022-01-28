import React, { useEffect } from 'react'

//import authProvider from './authProvider'

import { Admin, Resource, Sidebar, AppBar, Layout } from 'react-admin'
import { makeStyles } from '@material-ui/core/styles'
import UserIcon from '@material-ui/icons/Group'
import PaymentsIcon from '@material-ui/icons/AddShoppingCart'
import WithdrawalsIcon from '@material-ui/icons/Atm'
import ContactIcon from '@material-ui/icons/TextFields'
import LetterIcon from '@material-ui/icons/Label'
import SavingsIcon from '@material-ui/icons/SaveAlt'
import TestimonialsIcon from '@material-ui/icons/Comment'
import { FirebaseDataProvider } from 'react-admin-firebase'
import { createHashHistory } from 'history'

import authProvider from './authProvider'
import CostomMenu from './CostomMenu'

import {
  UserCreateTestimonial,
  UserCreate,
  UserCreateWithdrawals,
  UserCreateContacts,
  UserCreatePayments,
  UserCreateletter,
  SavingsCreate,
} from './AdminCreate'
import {
  UserEdit,
  UserEditContacts,
  UserEditLetter,
  UserEditPayments,
  UserEditTestimonial,
  UserEditWithdrawals,
  SavingsEdit,
} from './AdminEdit'
import {
  ContactList,
  LetterList,
  UserList,
  UserPaymentList,
  UserTestimonialList,
  UserWithdrawalList,
  SavingsList,
} from './AdminLists'
import { useFirebase } from 'react-redux-firebase'
import { firebaseConfig } from '../../database/firebasedb'
import Dashboard from './Dashboard'

const MySideBar = (props) => {
  const useSidebarStyles = makeStyles({
    drawerPaper: {
      backgroundColor: 'orange',
    },
  })
  const classes = useSidebarStyles()
  return <Sidebar classes={classes} {...props} />
}
const MyAppBar = (props) => {
  const useAppbarStyles = makeStyles({
    headerWidth: {
      height: '6vh',
    },
  })
  const classes = useAppbarStyles()
  return <AppBar className={classes.headerWidth} {...props} />
}

const myLayOut = (props) => (
  <Layout {...props} sidebar={MySideBar} appBar={MyAppBar} />
)

export const dataProvider = FirebaseDataProvider(firebaseConfig)
//export const authProvider = FirebaseAuthProvider(firebaseConfig)

export const history = createHashHistory()

const AdminPage = () => {
  const firebase = useFirebase()

  useEffect(() => {
    const subscribe = firebase.firestore().collection('users')
  }, [])
  return (
    <Admin
      dataProvider={dataProvider}
      title={'Welcome to Ultimatecoins Admin'}
      authProvider={authProvider}
      history={history}
      layout={myLayOut}
      menu={CostomMenu}
      dashboard={Dashboard}
    >
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        icon={UserIcon}
      />
      <Resource
        name="payments"
        list={UserPaymentList}
        edit={UserEditPayments}
        create={UserCreatePayments}
        icon={PaymentsIcon}
      />
      <Resource
        name="savings"
        list={SavingsList}
        edit={SavingsEdit}
        create={SavingsCreate}
        icon={SavingsIcon}
      />
      <Resource
        name="withdrawals"
        list={UserWithdrawalList}
        edit={UserEditWithdrawals}
        create={UserCreateWithdrawals}
        icon={WithdrawalsIcon}
      />
      <Resource
        name="testimonials"
        list={UserTestimonialList}
        edit={UserEditTestimonial}
        create={UserCreateTestimonial}
        icon={TestimonialsIcon}
      />
      <Resource
        name="contacts"
        list={ContactList}
        edit={UserEditContacts}
        create={UserCreateContacts}
        icon={ContactIcon}
      />
      <Resource
        name="newsletters"
        list={LetterList}
        edit={UserEditLetter}
        create={UserCreateletter}
        icon={LetterIcon}
      />
    </Admin>
  )
}

export default AdminPage
