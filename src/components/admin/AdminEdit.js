import React from 'react'

import {
  BooleanInput,
  DateInput,
  Edit,
  ImageInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin'

export const UserEdit = (props) => (
  <Edit {...props} title="Edit UserInfo">
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput source="id" reference="users">
        <SelectInput optionText="firstname" />
      </ReferenceInput>
      <TextInput source="firstname" />
      <TextInput source="lastname" />
      <TextInput source="email" />
      <TextInput source="age" />
      <TextInput source="totalBalance" />
      <TextInput source="initialDeposite" />
      <TextInput source="gender" />
      <TextInput source="state" />
      <TextInput source="country" />
      <TextInput source="bonus" />
      <TextInput source="initial" />
      <TextInput source="phone" />
      <ImageInput source="photo" />
      <TextInput source="accessCode" />
      <TextInput source="accessCodeProve" />
      <TextInput source="verificationCode" />
      <BooleanInput source="savingsAccount" />
      <BooleanInput source="closedForTheWeek" />
      <BooleanInput source="disableWithdrawal" />
      <BooleanInput source="disableAccount" />
    </SimpleForm>
  </Edit>
)
export const SavingsEdit = (props) => (
  <Edit title="Edit savings" {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput source="id" reference="savings">
        <SelectInput optionText="firstname" />
      </ReferenceInput>
      <TextInput source="firstname" />
      <TextInput source="lastname" />
      <TextInput source="email" />
      <TextInput source="phone" />
      <TextInput source="country" />
      <TextInput source="state" />
      <TextInput source="accountNumber" />
      <DateInput source="dateOfBirth" />
      <TextInput source="idNumber" />
      <ImageInput source="idCardPhoto" />

      <TextInput source="initialAmount" />
      <ImageInput source="prove" />
      <TextInput source="total" />
      <TextInput source="profit" />
      <TextInput source="income" />
      <TextInput source="personalWithdrawalCode" />
      <DateInput source=" date" />
    </SimpleForm>
  </Edit>
)
export const UserEditPayments = (props) => (
  <Edit {...props} title="Edit Payments">
    <SimpleForm>
      <TextInput disabled source="uid" />
      <ReferenceInput source="id" reference="payments">
        <SelectInput optionText="currentUserfirstname" />
      </ReferenceInput>
      <TextInput source="withdrawerName" />
      <TextInput source="currentUserlastname" />
      <TextInput source="email" />
      <TextInput source="date" />
      <TextInput source="paymentAmount" />
      <TextInput source="paymentMethod" />
      <TextInput source="paymentProve" />

      <BooleanInput source="statusPending" />
      <BooleanInput source="statusFailed" />
      <BooleanInput source="statusSuccess" />
    </SimpleForm>
  </Edit>
)
export const UserEditWithdrawals = (props) => (
  <Edit {...props} title="Edit Withdrawal">
    <SimpleForm>
      <TextInput disabled source="uid" />
      <ReferenceInput source="id" reference="withdrawals">
        <SelectInput optionText="firstname" />
      </ReferenceInput>
      <TextInput source="currentUserfirstname" />
      <TextInput source="currentUserlastname" />
      <TextInput source="email" />
      <TextInput source="date" />
      <TextInput source="withdrawalAmount" />
      <TextInput source="wallet" />
      <TextInput source="accountNumber" />
      <TextInput source="withdrawerName" />
      <TextInput source="withdrawalMethod" />
      <TextInput source="withdrawalFee" />
      <TextInput source=" number" />
      <TextInput source=" AccountNumber" />
      <TextInput source=" uid" />
      <TextInput source=" idx" />
      <BooleanInput source=" statusPending" />
      <BooleanInput source=" statusFailed" />
      <BooleanInput source=" statusSuccess" />
      <TextInput multiline source="body" />
    </SimpleForm>
  </Edit>
)
export const UserEditLetter = (props) => (
  <Edit {...props} title="Edit Letter">
    <SimpleForm>
      <TextInput disabled source="uid" />
      <ReferenceInput source="id" reference="newsletters">
        <SelectInput optionText="newsletter" />
      </ReferenceInput>

      <TextInput source="newsLetter" />
    </SimpleForm>
  </Edit>
)
export const UserEditContacts = (props) => (
  <Edit {...props} title="Edit Contact ">
    <SimpleForm>
      <TextInput disabled source="uid" />
      <ReferenceInput source="id" reference="Contacts">
        <SelectInput optionText="contactName" />
      </ReferenceInput>
      <TextInput source="contactName" />

      <TextInput source="contactEmail" />
      <TextInput source="phone" />
      <TextInput source="subject" />
      <TextInput source="message" />
    </SimpleForm>
  </Edit>
)
export const UserEditTestimonial = (props) => (
  <Edit title="Edit Testimonial" {...props}>
    <SimpleForm>
      <TextInput disabled source="uid" />
      <ReferenceInput source="id" reference="testimonials">
        <SelectInput optionText="message" />
      </ReferenceInput>
      <TextInput source="message" />
      <ImageInput source="photo" />
      <DateInput source="date" />
    </SimpleForm>
  </Edit>
)
