import React from 'react'

import { makeStyles, useMediaQuery } from '@material-ui/core'
import {
  List,
  BooleanField,
  Datagrid,
  DateField,
  EmailField,
  ImageField,
  SimpleList,
  TextField,
  EditButton,
} from 'react-admin'
import {
  TestimonialFilter,
  WithdrawalFilter,
  UserFilter,
  PaymentFilter,
  LetterFilter,
  SavingsFilter,
  ContactFilter,
} from './AdminFilters'

const useStyles = makeStyles({
  button: {
    fontWeight: 'bold',
    color: 'orange',
    backgroundColor: 'red',
  },
  tr: {
    backgroundColor: '#ccc',
    color: 'white',
  },
})
const MyEditButton = (props) => {
  const classes = useStyles()
  return <EditButton className={classes.button} {...props} />
}

export const UserList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const classes = useStyles()

  return (
    <List filters={<UserFilter />} {...props} className={classes.tr}>
      {isSmall ? (
        <SimpleList
          primaryText={(records) => records.title}
          secondaryText={(records) => records.lastname}
          tertiaryText={(records) => records.email}
        />
      ) : (
        <Datagrid rowClick="edit">
          <ImageField source="photo" src="photo" color="primary" />
          <TextField source="uid" color="primary" />
          <TextField source="firstname" color="primary" />
          <TextField source="lastname" color="primary" />
          <EmailField source="email" color="primary" />
          <DateField source="age" color="primary" />
          <TextField source="totalBalance" color="primary" />
          <TextField source="initialDeposite" color="primary" />
          <TextField source="gender" color="primary" />
          <TextField source="state" color="primary" />
          <TextField source="country" color="primary" />
          <TextField source="bonus" color="primary" />
          <TextField source="initial" color="primary" />
          <TextField source="phone" color="primary" />
          <TextField source="accessCode" color="primary" />
          <TextField source="accessCodeProve" color="primary" />
          <TextField source="verificationCode" color="primary" />
          <BooleanField source="savingsAccount" color="primary" />
          <BooleanField source="closedForTheWeek" color="primary" />
          <BooleanField source="disableWithdrawal" color="primary" />
          <BooleanField source="disableAccount" color="primary" />
          <MyEditButton />
        </Datagrid>
      )}
    </List>
  )
}
export const SavingsList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const classes = useStyles()

  return (
    <List filters={<SavingsFilter />} {...props} className={classes.tr}>
      {isSmall ? (
        <SimpleList
          primaryText={(records) => records.title}
          secondaryText={(records) => records.lastname}
          tertiaryText={(records) => records.email}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="firstname" />
          <TextField source="lastname" />
          <TextField source="email" />
          <TextField source="phone" />
          <TextField source="country" />
          <TextField source="state" />
          <TextField source="accountNumber" />
          <DateField source="dateOfBirth" />
          <TextField source="idNumber" />
          <ImageField source="idCardPhoto" />
          <TextField source="initialAmount" />
          <ImageField source="prove" />
          <TextField source="total" />
          <TextField source="profit" />
          <TextField source="income" />
          <TextField source="personalWithdrawalCode" />
          <DateField source=" date" />
          <MyEditButton />
        </Datagrid>
      )}
    </List>
  )
}

export const UserPaymentList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const classes = useStyles()
  return (
    <List filters={<PaymentFilter />} {...props} className={classes.tr}>
      {isSmall ? (
        <SimpleList
          primaryText={(records) => records.firstname}
          secondaryText={(records) => records.lastname}
          tertiaryText={(records) => records.paymentAmount}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="idx" color="primary" />
          <TextField source="currentUserfirstname" color="primary" />
          <TextField source="currentUserlastname" color="primary" />
          <DateField source="date" showTime color="primary" />
          <TextField source="paymentAmount" color="primary" />
          <TextField source="paymentMethod" color="primary" />
          <TextField source="uid" color="primary" />
          <ImageField source="paymentProve" color="primary" />
          <BooleanField source="statusPending" color="primary" />
          <BooleanField source="statusFailed" color="primary" />
          <BooleanField source="statusSuccess" color="primary" />
          <TextField source="uid" color="primary" />

          <MyEditButton />
        </Datagrid>
      )}
    </List>
  )
}
export const UserWithdrawalList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const classes = useStyles()
  return (
    <List filters={<WithdrawalFilter />} {...props} className={classes.tr}>
      {isSmall ? (
        <SimpleList
          primaryText={(records) => records.firstname}
          secondaryText={(records) => records.withdrawalAmount}
          tertiaryText={(records) => records.wallet}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" color="primary" />
          <TextField source="currentUserfirstname" color="primary" />
          <TextField source="currentUserlastname" color="primary" />
          <DateField source="date" showTime color="primary" />
          <TextField source="withdrawalAmount" color="primary" />
          <TextField source="wallet" color="primary" />
          <TextField source="withdrawerName" color="primary" />
          <TextField source="withdrawalMethod" color="primary" />
          <TextField source="withdrawalFee" color="primary" />
          <TextField source=" number" color="primary" />
          <TextField source=" AccountNumber" color="primary" />
          <TextField source=" uid" color="primary" />
          <TextField source=" idx" color="primary" />
          <BooleanField source=" statusPending" color="primary" />
          <BooleanField source=" statusFailed" color="primary" />
          <BooleanField source=" statusSuccess" color="primary" />

          <MyEditButton />
        </Datagrid>
      )}
    </List>
  )
}
export const LetterList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const classes = useStyles()
  return (
    <List filters={<LetterFilter />} {...props} className={classes.tr}>
      {isSmall ? (
        <SimpleList
          primaryText={(records) => records.newsLetter}
          secondaryText={(records) => records.id}
          tertiaryText={(records) => records.date}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" color="primary" />
          <TextField source="newsLetter" color="primary" />
          <MyEditButton />
        </Datagrid>
      )}
    </List>
  )
}
export const ContactList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const classes = useStyles()
  return (
    <List filters={<ContactFilter />} {...props} className={classes.tr}>
      {isSmall ? (
        <SimpleList
          primaryText={(records) => records.contactName}
          secondaryText={(records) => records.message}
          tertiaryText={(records) => records.contactEmail}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" color="primary" />
          <TextField source="contactName" color="primary" />
          <TextField source="contactEmail" color="primary" />
          <TextField source="message" color="primary" />
          <MyEditButton />
        </Datagrid>
      )}
    </List>
  )
}
export const UserTestimonialList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const classes = useStyles()
  return (
    <List filters={<TestimonialFilter />} {...props} className={classes.tr}>
      {isSmall ? (
        <SimpleList
          primaryText={(records) => records.message}
          secondaryText={(records) => records.photo}
          tertiaryText={(records) => records.id}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" color="primary" />
          <TextField source="message" color="primary" />
          <ImageField source="photo" color="primary" />

          <MyEditButton />
        </Datagrid>
      )}
    </List>
  )
}
