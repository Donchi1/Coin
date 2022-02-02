const initialAuth = {
  paymentError: null,
  paymentSuccess: '',
  withdrawalError: null,
  withdrawalSuccess: null,
  paymentAmount: '',
  qrCodeEth: false,
  qrCodeLit: false,
  qrCodeBtc: false,
  subcriptionSuccess: '',
  subcriptionError: null,
  uploadSuccess: '',
  uploadError: null,
  contactMessageError: null,
  contactMessageSuccess: '',
  withdrawalData: [],
  paymentData: [],
  savingMessageSuccess: '',
  savingMessageError: '',
  savingsData: [],
  pwcError: null,
  pwcSuccess: '',
  accessCodeError: null,
  accessCodeSuccess: null,
  notifications: [],
  accessCodeProveSuccess: '',
  accessCodeProveError: '',
  fundingProveSuccess: '',
  fundingProveError: '',
  paymentAmountData: '',
  fundingData: [],
  savingWithdrawalData: [],
  savingWithdrawalMessage: '',
  withdrawalAccessPopUp: false,
  isTyping: { user: null, admin: null },
  openSuccess: false,
  openError: false,
  openFundingSuccess: false,
  openFundingError: false,
}

export const projectReducer = (state = initialAuth, action) => {
  switch (action.type) {
    case 'NO_WITHDRAWAL_ACCESS':
      return {
        ...state,
        withdrawalAccessPopUp: action.accessPopUp,
      }
    case 'SAVING_SUCCESS':
      return {
        ...state,
        savingMessageSuccess: action.message,
      }
    case 'SAVING_DATA':
      return {
        ...state,
        savingsData: action.data,
      }
    case 'SAVING_ERROR':
      return {
        ...state,
        savingMessageError: action.message,
      }
    case 'FUNDING_SUCCESS':
      return {
        ...state,
        fundingProveSuccess: action.message,
        openFundingSuccess: action.open,
      }
    case 'FUNDING_ERROR':
      return {
        ...state,
        fundingProveError: action.message,
        openFundingError: action.open,
      }
    case 'FUNDING_DATA':
      return {
        ...state,
        fundingData: action.data,
      }
    case 'PWC_ERROR':
      return {
        ...state,
        pwcError: action.message,
        openError: action.openError,
      }
    case 'PWC_SUCCESS':
      return {
        ...state,
        pwcSuccess: action.message,
        openSuccess: action.openSuccess,
      }
    case 'ACCESS_ERROR':
      return {
        ...state,
        accessCodeError: action.message,
      }
    case 'ACCESS_SUCCESS':
      return {
        ...state,
        accessCodeSuccess: action.message,
      }
    case 'PROVE_SUCCESS':
      return {
        ...state,
        accessCodeProveSuccess: action.message,
      }
    case 'PROVE_ERROR':
      return {
        ...state,
        accessCodeProveSuccess: action.message,
      }
    case 'NOTIFICATION_SUCCESS':
      return {
        ...state,
        notification: action.data,
      }

    case 'PAYMENT_SUCCESS':
      return {
        ...state,
        paymentSuccess:
          'Wait for less than 24hours while we review your payment prove',
      }
    case 'SAVING_WITHDRAWAL_SUCCESS':
      return {
        ...state,
        savingWithdrawalMessage: action.message,
      }
    case 'SAVING_WITHDRAWAL_DATA':
      return {
        ...state,

        savingWithdrawalData: action.data,
      }
    case 'PAYMENT_DATA':
      return {
        ...state,
        paymentData: action.payment,
      }

    case 'WITHDRAWAL_ERROR':
      return {
        ...state,
        withdrawalError: action.message,
      }
    case 'WITHDRAWAL_SUCCESS':
      return {
        ...state,
        withdrawalSuccess: action.message,
      }
    case 'WITHDRAWAL_DATA':
      return {
        ...state,
        withdrawalData: action.withdrawal,
      }

    case 'SUBCRIPTION_SUCCESS':
      return {
        ...state,
        subcriptionSuccess:
          'Subcription successfull. Thanks for subcribing to our newsletter',
      }
    case 'SUBCRIPTION_ERROR':
      return {
        ...state,
        subcriptionError: action.error.message,
      }
    case 'PAYMENT_SET_BTC':
      return {
        ...state,
        paymentAmountData: action.amount,
        qrCodeBtc: action.qrcode,
        qrCodeEth: false,
        qrCodeLit: false,
      }
    case 'PAYMENT_SET_LIT':
      return {
        ...state,
        paymentAmountData: action.amount,
        qrCodeLit: action.qrcode,
        qrCodeEth: false,
        qrCodeBtc: false,
      }
    case 'PAYMENT_SET_ETH':
      return {
        ...state,
        paymentAmountData: action.amount,
        qrCodeEth: action.qrcode,
        qrCodeLit: false,
        qrCodeBtc: false,
      }
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        uploadSuccess: 'upload Successful',
      }
    case 'UPLOAD_ERROR':
      return {
        ...state,
        uploadError: 'upload Could not be completed',
      }
    case 'MESSAGE_ERROR':
      return {
        ...state,
        contactMessageError: 'sorry message not sent',
      }
    case 'MESSAGE_SUCCESS':
      return {
        ...state,
        contactMessageSuccess: 'Message was sent successfully',
      }
    case 'TYPING':
      return {
        ...state,
        isTyping: { user: action.userTyping, admin: action.adminTyping },
      }

    default:
      return state
  }
}
