const options = {
  filter: true,
  sort: true,
}
export const userColumns = [
  {
    photo: 'photo',
    label: 'Photo',
    options,
  },
  {
    name: 'name',
    label: 'Name',
    options,
  },
  {
    email: 'email',
    label: 'Email',
    options,
  },
  {
    id: 'id',
    label: 'Id',
    options,
  },
  {
    phone: 'phone',
    label: 'Phone',
    options,
  },
  {
    country: 'country',
    label: 'Country',
    options,
  },
  {
    totalBalance: 'totalBalance',
    label: 'TotalBalance',
    options,
  },
  {
    bonus: 'bonus',
    label: 'Bonus',
    options,
  },

  {
    accessCode: 'accessCode',
    label: 'AccessCode',
    options,
  },
  {
    name: 'Actions',

    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            <button>Edit</button>
            <button>Add</button>
          </>
        )
      },
    },
  },
]

export const withdrawalColumns = [
  {
    amount: 'amount',
    label: 'Amount',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    withdrawerName: 'withdrawerName',
    label: 'WithdrawerName',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    currentUserfirstname: '  currentUserfirstname',
    label: '  CurrentUserfirstname',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    idx: 'idx',
    label: 'Id',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    number: 'number',
    label: 'Number',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    AccountNumber: 'AccountNumber',
    label: 'AccountNumber',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'Actions',

    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            <button>Edit</button>
            <button>Add</button>
          </>
        )
      },
    },
  },
]
export const paymentColumn = [
  {
    firstname: 'firstname',
    label: 'Firstname',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    lastname: 'lastname',
    label: 'Lastname',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    date: 'date',
    label: 'Date',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    idx: 'idx',
    label: 'Id',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'Actions',

    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            <button>Edit</button>
            <button>Add</button>
          </>
        )
      },
    },
  },
]

export const savingsColumn = [
  'lastname',

  'email',
  'phone',
  'country',
  'state',
  'accountNumber',
  'dateOfBirth',
  'accountReason',
  'idNumber',
  'idCardPhoto',
  'amount',
  'prove',
  'personalWithdrawalCode',
  {
    name: 'Actions',

    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            <button>Edit</button>
            <button>Add</button>
          </>
        )
      },
    },
  },
]
export const letterColumn = [
  'email',
  'id',
  {
    name: 'Actions',

    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            <button>Edit</button>
            <button>Add</button>
          </>
        )
      },
    },
  },
]
export const contactColumn = [
  'contactName',
  'contactEmail',
  'message',
  'subject',
  'phone',
  'id',
  {
    name: 'Actions',

    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            <button>Edit</button>
            <button>Add</button>
          </>
        )
      },
    },
  },
]

export const testimonialColumn = [
  'message',
  'photo',
  'date',
  {
    name: 'Actions',

    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            <button>Edit</button>
            <button>Add</button>
          </>
        )
      },
    },
  },
]
export const notificationColumn = [
  'user',
  'id',
  'date',
  'message',
  'status',
  {
    name: 'Actions',

    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            <button>Edit</button>
            <button>Add</button>
          </>
        )
      },
    },
  },
]
