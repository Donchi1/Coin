import React from 'react'
import { Filter, SearchInput } from 'react-admin'

export const UserFilter = (props) => (
  <Filter {...props}>
    <SearchInput
      source={('email' || 'firstName' || 'uid' || 'lastName', 'phone')}
      resettable
      alwaysOn
    />
  </Filter>
)
export const SavingsFilter = (props) => (
  <Filter {...props}>
    <SearchInput
      source={'firstName' || 'uid' || 'email' || 'amount'}
      resettable
      alwaysOn
    />
  </Filter>
)
export const PaymentFilter = (props) => (
  <Filter {...props}>
    <SearchInput
      source={'firstName' || 'uid' || 'lastname' || 'email'}
      resettable
      alwaysOn
    />
  </Filter>
)
export const WithdrawalFilter = (props) => (
  <Filter {...props}>
    <SearchInput source={'firstName' || 'uid' || 'email'} resettable alwaysOn />
  </Filter>
)
export const TestimonialFilter = (props) => (
  <Filter {...props}>
    <SearchInput source={'uid' || 'lastname' || 'email'} resettable alwaysOn />
  </Filter>
)
export const LetterFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="id" resettable alwaysOn />
  </Filter>
)
export const ContactFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="email" resettable alwaysOn />
  </Filter>
)
