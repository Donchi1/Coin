import React from 'react'

import {
  BooleanInput,
  Create,
  DateInput,
  ImageInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  ImageField,
  FunctionField,
} from 'react-admin'

const MyfunctionImage = (props) => (
  <FunctionField
    {...props}
    render={(record) => <img src={record.filename} title="my test Image" />}
  />
)

export const UserCreate = (props) => (
  <Create title="create user" {...props}>
    <SimpleForm>
      <ReferenceInput source="uid" reference="users">
        <SelectInput optionText="firstname" />
      </ReferenceInput>
      <TextInput source="firstname" />
      <TextInput source="lastname" />
      <TextInput source="email" />
      <TextInput source="totalBalance" />
      <TextInput source="initialDeposite" />
      <TextInput source="state" />
      <TextInput source="country" />
      <TextInput source="bonus" />
      <TextInput source="income" />
      <TextInput source="initial" />
      <TextInput source="phone" />
      <BooleanInput source="disableWithdrawal" />
      <ImageInput source="photo">
        <ImageField source="src" />
      </ImageInput>
      <TextInput source="accessCode" />
      <ImageInput source="accessCodeProve">
        <ImageField source="src" />
      </ImageInput>
      <TextInput source="verificationCode" />
      <BooleanInput source="verified" />
      <BooleanInput source="commission" />
      <BooleanInput source="savingsAccount" />
      <BooleanInput source="closedForTheWeek" />
      <BooleanInput source="disableWithdrawal" />
      <BooleanInput source="disableAccount" />
    </SimpleForm>
  </Create>
)
export const SavingsCreate = (props) => (
  <Create title="create savings" {...props}>
    <SimpleForm>
      <ReferenceInput source="uid" reference="savings">
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
      <ImageInput source="idCardPhoto">
        <ImageField source="src" />
      </ImageInput>
      <TextInput source="withdrawalAuthorization" />
      <TextInput source="nextOfKingsFirstname" />
      <TextInput source="nextOfKingsLastname" />
      <TextInput source="nextOfKingsEmail" />
      <TextInput source="nextOfKingsPhone" />
      <TextInput source="initialAmount" />
      <ImageInput source="prove">
        <ImageField source="src" />
      </ImageInput>
      <TextInput source="total" />
      <TextInput source="profit" />
      <TextInput source="income" />
      <TextInput source="personalWithdrawalCode" />
      <DateInput source=" date" />
    </SimpleForm>
  </Create>
)

export const UserCreatePayments = (props) => (
  <Create title="create payment" {...props}>
    <SimpleForm>
      <ReferenceInput source="uid" reference="payments">
        <SelectInput optionText="firstname" />
      </ReferenceInput>
      <TextInput source="firstname" />
      <TextInput source="lastname" />
      <DateInput source="date" />
      <TextInput source="paymentAmount" />
      <TextInput source="paymentProve">
        <ImageField source="src" />
      </TextInput>
      <TextInput source="paymentAmount" />
      <TextInput source="paymentMethod" />
      <BooleanInput source="statusPending" />
      <BooleanInput source="statusFailed" />
      <BooleanInput source="statusSuccess" />
    </SimpleForm>
  </Create>
)
export const UserCreateWithdrawals = (props) => (
  <Create title="Create Withdrawal" {...props}>
    <SimpleForm>
      <ReferenceInput source="id" reference="withdrawals">
        <SelectInput optionText="firstname" />
      </ReferenceInput>

      <TextInput source="firstname" />
      <TextInput source="lastname" />
      <TextInput source="email" />
      <DateInput source="date" />
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
    </SimpleForm>
  </Create>
)
export const UserCreateTestimonial = (props) => (
  <Create title="Create Testimonial" {...props}>
    <SimpleForm>
      <ReferenceInput source="id" reference="testimonials">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <TextInput source="message" />
      <ImageInput source="photo">
        <ImageField source="photo" />
      </ImageInput>
      <DateInput source="date" />
    </SimpleForm>
  </Create>
)
export const UserCreateletter = (props) => (
  <Create title="Create letter" {...props}>
    <SimpleForm>
      <ReferenceInput source="id" reference="newsletters">
        <SelectInput optionText="email" />
      </ReferenceInput>

      <TextInput source="newsLetter" />
    </SimpleForm>
  </Create>
)
export const UserCreateContacts = (props) => (
  <Create title="Create Contacts" {...props}>
    <SimpleForm>
      <ReferenceInput source="id" reference="contacts">
        <SelectInput optionText="contactName" />
      </ReferenceInput>
      <TextInput source="contactName" />
      <TextInput source="contactEmail" />
      <TextInput source="message" />
      <TextInput source="phone" />
      <TextInput source="subject" />
    </SimpleForm>
  </Create>
)
