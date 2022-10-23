import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import moment from 'moment'
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import * as Icons from '@material-ui/icons'
import AdminModal from './AdminModal'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function AdminPayments() {
  const firebase = useFirebase()

  const [userInfo, setUserInfo] = useState({
    date: '',
    openModal: false,
    userEmail: '',
    status: '',
    uid: '',
    infoTitle: '',
  })

  const { userPayments, userSavingPayments } = useSelector(
    (state) => state.firestore.ordered,
  )

  useFirestoreConnect([
    {
      collectionGroup: 'paymentDatas',
      orderBy: ['date', 'desc'],
      storeAs: 'userPayments',
    },

    {
      collectionGroup: 'savingFundings',

      orderBy: ['date', 'desc'],

      storeAs: 'userSavingPayments',
    },
  ])
  const handleStatus = (info) => {
    if (info.statusPending) return info.statusPending
    if (info.statusFailed) return info.statusFailed
    if (info.statusSuccess) return info.statusSuccess
  }
  const handleUsersTransaction = (info, title) => {
    return setUserInfo({
      ...userInfo,
      userEmail: info.email,
      uid: info.uid,
      status: handleStatus(info),
      openModal: true,
      infoTitle: title,
      date: info.date,
    })
  }

  const updateSuccessOption = {
    title: <p>Success</p>,
    text: 'Update success',
    color: 'green',
    icon: 'success',
    showCloseButton: true,
  }
  const deleteSuccessOption = {
    title: <p>Success</p>,
    text: 'Document successfully deleted',
    color: 'green',
    icon: 'success',
    showCloseButton: true,
  }
  const notFoundError = {
    title: 'Error',
    text: 'No document Found',
    color: 'red',
    showCloseButton: true,
    icon: 'error',
  }

  const handlePaymentUpdate = (e) => {
    e.preventDefault()

    const docRef = firebase
      .firestore()
      .collection('payments')
      .doc(userInfo.uid)
      .collection('paymentDatas')

    return handleDocUpdate(docRef)
  }
  const handleSavingUpdate = (e) => {
    e.preventDefault()

    const docRef = firebase
      .firestore()
      .collection('savings')
      .doc(userInfo.uid)
      .collection('savingFundings')

    return handleDocUpdate(docRef)
  }

  const handleSavingDelete = (each) => {
    const docRef = firebase
      .firestore()
      .collection('savings')
      .doc(each.uid)
      .collection('savingFundings')

    return handleDocument(docRef, each)
  }
  const handlePaymentDelete = (each) => {
    const docRef = firebase
      .firestore()
      .collection('payments')
      .doc(each.uid)
      .collection('paymentDatas')

    return handleDocument(docRef, each)
  }

  const handleDocUpdate = (docRef) => {
    docRef
      .where('date', '==', userInfo.date)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          docRef
            .doc(doc.id)
            .update({
              statusPending: userInfo.status === 'pending' ? true : false,
              statusFailed: userInfo.status === 'failed' ? true : false,
              statusSuccess: userInfo.status === 'success' ? true : false,
            })
            .then(() => {
              return MySwal.fire(updateSuccessOption)
            })
        })
      })
  }

  const handleDocument = (docRef, each) => {
    docRef
      .where('date', '==', each.date)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          docRef
            .doc(doc.id)
            .delete()
            .then(() => {
              return MySwal.fire(deleteSuccessOption)
            })
            .catch(() => {
              return MySwal.fire(notFoundError)
            })
        })
      })
      .catch(() => {
        return MySwal.fire(notFoundError)
      })
  }

  return (
    <>
      <AdminModal
        userInfo={userInfo}
        handlePaymentSubmit={handlePaymentUpdate}
        handleSavingSubmit={handleSavingUpdate}
        setUserInfo={setUserInfo}
      />
      <div id="main-wrapper" className="show">
        <div className="content-bod mt-5">
          <div className="container-fluid">
            <div className="row page-titles mx-0 ">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4>All User Transaction Info</h4>
                </div>
              </div>
              <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/adm">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link to="#">AdminInfo</Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header pb-2 d-block d-sm-flex flex-wrap border-0">
                <div className="mb-3">
                  <h4 className="fs-20 text-black">
                    Recent Trading Activities
                  </h4>
                  <p className="mb-0 fs-12">
                    Veiw all your recent trading activities.
                  </p>
                </div>
                <div className="card-action card-tabs mb-3 style-1">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#monthly"
                      >
                        All Payments
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#Weekly">
                        Saving payments
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body tab-content p-0">
                <div className="tab-pane active show fade" id="monthly">
                  <div className="table-responsive">
                    <table className="table shadow-hover card-table border-no tbl-btn short-one">
                      <tbody>
                        {userPayments &&
                          userPayments.map((each) => (
                            <>
                              <tr
                                key={each.date}
                                onClick={() =>
                                  handleUsersTransaction(each, 'payments')
                                }
                              >
                                <td>
                                  <span>
                                    {each.statusSuccess && (
                                      <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 63 63"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <rect
                                          width="63"
                                          height="63"
                                          rx="14"
                                          fill="#71B945"
                                        />
                                        <path
                                          d="M40.6186 32.7207L40.6186 32.7207L40.6353 39.6289C40.6354 39.6328 40.6354 39.6363 40.6353 39.6396M40.6186 32.7207L40.1353 39.6341L40.6353 39.635C40.6353 39.6481 40.6347 39.6583 40.6345 39.6627L40.6344 39.6642C40.6346 39.6609 40.6351 39.652 40.6353 39.6407C40.6353 39.6403 40.6353 39.64 40.6353 39.6396M40.6186 32.7207C40.6167 31.9268 39.9717 31.2847 39.1777 31.2866C38.3838 31.2885 37.7417 31.9336 37.7436 32.7275L37.7436 32.7275L37.7519 36.1563M40.6186 32.7207L37.7519 36.1563M40.6353 39.6396C40.6329 40.4282 39.9931 41.0705 39.2017 41.0726C39.2 41.0726 39.1983 41.0727 39.1965 41.0727L39.1944 41.0727L39.1773 41.0726L32.2834 41.056L32.2846 40.556L32.2834 41.056C31.4897 41.054 30.8474 40.4091 30.8494 39.615C30.8513 38.8211 31.4964 38.179 32.2903 38.1809L32.2903 38.1809L35.719 38.1892L22.5364 25.0066C21.975 24.4452 21.975 23.5351 22.5364 22.9737C23.0978 22.4123 24.0079 22.4123 24.5693 22.9737L37.7519 36.1563M40.6353 39.6396C40.6353 39.6376 40.6353 39.6356 40.6353 39.6336L37.7519 36.1563M39.1964 41.0726C39.1957 41.0726 39.1951 41.0726 39.1944 41.0726L39.1964 41.0726Z"
                                          fill="white"
                                          stroke="white"
                                        />
                                      </svg>
                                    )}
                                    {each.statusPending && (
                                      <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 63 63"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <rect
                                          width="63"
                                          height="63"
                                          rx="14"
                                          fill="#747474"
                                        />
                                        <path
                                          d="M22.1318 30.9043L22.1318 30.9043L22.1151 23.9961C22.1151 23.9922 22.1151 23.9887 22.1152 23.9854M22.1318 30.9043L22.6152 23.9909L22.1152 23.99C22.1152 23.9769 22.1157 23.9667 22.116 23.9623L22.1161 23.9608C22.1159 23.9641 22.1154 23.973 22.1152 23.9843C22.1152 23.9847 22.1152 23.985 22.1152 23.9854M22.1318 30.9043C22.1338 31.6982 22.7788 32.3403 23.5728 32.3384C24.3667 32.3365 25.0088 31.6914 25.0069 30.8975L25.0069 30.8975L24.9986 27.4687M22.1318 30.9043L24.9986 27.4687M22.1152 23.9854C22.1176 23.1968 22.7574 22.5545 23.5488 22.5524C23.5504 22.5524 23.5522 22.5523 23.554 22.5523L23.5561 22.5523L23.5732 22.5524L30.4671 22.569L30.4658 23.069L30.4671 22.569C31.2608 22.571 31.903 23.2159 31.9011 24.01C31.8992 24.8039 31.2541 25.446 30.4602 25.4441L30.4602 25.4441L27.0315 25.4358L40.2141 38.6184C40.7755 39.1798 40.7755 40.0899 40.2141 40.6513C39.6527 41.2127 38.7426 41.2127 38.1812 40.6513L24.9986 27.4687M22.1152 23.9854C22.1152 23.9874 22.1152 23.9894 22.1152 23.9914L24.9986 27.4687M23.5541 22.5524C23.5547 22.5524 23.5554 22.5524 23.5561 22.5524L23.5541 22.5524Z"
                                          fill="white"
                                          stroke="white"
                                        />
                                      </svg>
                                    )}
                                    {each.statusFailed && (
                                      <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 63 63"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <rect
                                          width="63"
                                          height="63"
                                          rx="14"
                                          fill="#FF5757"
                                        />
                                        <path
                                          d="M22.1318 30.9043L22.1318 30.9043L22.1151 23.9961C22.1151 23.9922 22.1151 23.9887 22.1152 23.9854M22.1318 30.9043L22.6152 23.9909L22.1152 23.99C22.1152 23.9769 22.1157 23.9667 22.116 23.9623L22.1161 23.9608C22.1159 23.9641 22.1154 23.973 22.1152 23.9843C22.1152 23.9847 22.1152 23.985 22.1152 23.9854M22.1318 30.9043C22.1338 31.6982 22.7788 32.3403 23.5728 32.3384C24.3667 32.3365 25.0088 31.6914 25.0069 30.8975L25.0069 30.8975L24.9986 27.4687M22.1318 30.9043L24.9986 27.4687M22.1152 23.9854C22.1176 23.1968 22.7574 22.5545 23.5488 22.5524C23.5504 22.5524 23.5522 22.5523 23.554 22.5523L23.5561 22.5523L23.5732 22.5524L30.4671 22.569L30.4658 23.069L30.4671 22.569C31.2608 22.571 31.903 23.2159 31.9011 24.01C31.8992 24.8039 31.2541 25.446 30.4602 25.4441L30.4602 25.4441L27.0315 25.4358L40.2141 38.6184C40.7755 39.1798 40.7755 40.0899 40.2141 40.6513C39.6527 41.2127 38.7426 41.2127 38.1812 40.6513L24.9986 27.4687M22.1152 23.9854C22.1152 23.9874 22.1152 23.9894 22.1152 23.9914L24.9986 27.4687M23.5541 22.5524C23.5547 22.5524 23.5554 22.5524 23.5561 22.5524L23.5541 22.5524Z"
                                          fill="white"
                                          stroke="white"
                                        />
                                      </svg>
                                    )}
                                  </span>
                                </td>
                                <td className="wspace-no">
                                  {each.paymentMethod === 'Bitcoin' && (
                                    <svg
                                      className="mr-2"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M16 9.50011C15.9992 8.67201 15.216 8.00092 14.2501 8H9V11H14.2501C15.216 10.9993 15.9992 10.328 16 9.50011Z"
                                        fill="#FFAB2D"
                                      />
                                      <path
                                        d="M9 16H14.2501C15.2165 16 16 15.3285 16 14.5001C16 13.6715 15.2165 13 14.2501 13H9V16Z"
                                        fill="#FFAB2D"
                                      />
                                      <path
                                        d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM18.0001 14.5713C17.9978 16.4641 16.4641 17.9978 14.5716 17.9999V18.8571C14.5716 19.3305 14.1876 19.7143 13.7144 19.7143C13.2409 19.7143 12.8572 19.3305 12.8572 18.8571V17.9999H11.1431V18.8571C11.1431 19.3305 10.7591 19.7143 10.2859 19.7143C9.8124 19.7143 9.42866 19.3305 9.42866 18.8571V17.9999H6.85733C6.38387 17.9999 6.00013 17.6161 6.00013 17.1429C6.00013 16.6695 6.38387 16.2857 6.85733 16.2857H7.71427V7.71427H6.85733C6.38387 7.71427 6.00013 7.33053 6.00013 6.85707C6.00013 6.38361 6.38387 5.99987 6.85733 5.99987H9.42866V5.14293C9.42866 4.66947 9.8124 4.28573 10.2859 4.28573C10.7593 4.28573 11.1431 4.66947 11.1431 5.14293V5.99987H12.8572V5.14293C12.8572 4.66947 13.2409 4.28573 13.7144 4.28573C14.1879 4.28573 14.5716 4.66947 14.5716 5.14293V5.99987C16.4571 5.99202 17.992 7.5139 18.0001 9.39937C18.0043 10.3978 17.5714 11.3481 16.8152 12C17.5643 12.6445 17.9967 13.5828 18.0001 14.5713Z"
                                        fill="#FFAB2D"
                                      />
                                    </svg>
                                  )}
                                  {each.paymentMethod === 'Litecoin' && (
                                    <svg
                                      className="mr-1"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM16.2857 18.0001H9.42866C8.9552 18.0001 8.57147 17.6164 8.57147 17.1429C8.57147 17.1024 8.57434 17.0618 8.5801 17.0216L9.22515 12.5054L7.92222 12.8313C7.85421 12.8486 7.78437 12.8572 7.71427 12.8572C7.24081 12.8567 6.85759 12.4727 6.85785 11.9992C6.85838 11.6063 7.12571 11.2642 7.50683 11.1684L9.48674 10.6735L10.2942 5.0213C10.3612 4.55254 10.7954 4.22714 11.2642 4.2941C11.7329 4.36107 12.0583 4.79529 11.9914 5.26404L11.2825 10.2247L14.3636 9.4543C14.8222 9.33737 15.2886 9.61439 15.4053 10.0729C15.5222 10.5315 15.2452 10.9979 14.7866 11.1148C14.784 11.1153 14.7814 11.1161 14.7788 11.1166L11.0204 12.0562L10.4164 16.2857H16.2857C16.7592 16.2857 17.1429 16.6695 17.1429 17.1429C17.1429 17.6161 16.7592 18.0001 16.2857 18.0001Z"
                                        fill="#5F5F5F"
                                      />
                                    </svg>
                                  )}
                                  {each.paymentMethod === 'Ethereum' && (
                                    <svg
                                      className="mr-1"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12.3182 13.6531C12.1139 13.7348 11.8863 13.7348 11.682 13.6531L9.48944 12.7761L12.0001 17.7974L14.5107 12.7761L12.3182 13.6531Z"
                                        fill="#DC3CCC"
                                      />
                                      <path
                                        d="M12.0001 11.9341L15.0156 10.7279L12.0001 5.90308L8.98456 10.7279L12.0001 11.9341Z"
                                        fill="#DC3CCC"
                                      />
                                      <path
                                        d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9927 5.37574 18.6243 0.00732425 12 0ZM17.0524 11.5263L12.7667 20.0977C12.5551 20.5212 12.04 20.6928 11.6168 20.4812C11.4507 20.3983 11.3162 20.2638 11.2333 20.0977L6.94757 11.5263C6.81443 11.2589 6.8296 10.9416 6.9876 10.6882L11.2733 3.83111C11.5582 3.42984 12.114 3.33515 12.5153 3.62001C12.5972 3.67808 12.6686 3.74923 12.7267 3.83111L17.0121 10.6882C17.1704 10.9416 17.1856 11.2589 17.0524 11.5263Z"
                                        fill="#DC3CCC"
                                      />
                                    </svg>
                                  )}

                                  {each.paymentMethod === 'Bank' && (
                                    <Icons.Money />
                                  )}
                                  <span className="font-w600 text-black">
                                    {each.paymentMethod}
                                  </span>
                                </td>
                                <td>
                                  <span>{each.email}</span>
                                </td>
                                <td>
                                  <span className="text-black">
                                    {moment(each.date?.toDate()).calendar()}
                                  </span>
                                </td>
                                <td>
                                  <span className="font-w600 text-black">
                                    ${each.amount}
                                  </span>
                                </td>
                                <td>
                                  {each.statusSuccess && (
                                    <Link
                                      className="btn btn-outline-success float-right"
                                      to="#"
                                    >
                                      Completed
                                    </Link>
                                  )}

                                  {each.statusFailed && (
                                    <Link
                                      className="btn btn-outline-danger float-right"
                                      to="#"
                                    >
                                      Failed
                                    </Link>
                                  )}
                                  {each.statusPending && (
                                    <Link
                                      className="btn btn-outline-info float-right"
                                      to="#"
                                    >
                                      Pending
                                    </Link>
                                  )}
                                </td>
                              </tr>
                              <td>
                                <Link
                                  className="btn ml-2 btn-outline-danger float-right"
                                  to="#"
                                  onClick={() => handlePaymentDelete(each)}
                                >
                                  Delete
                                </Link>
                              </td>
                            </>
                          ))}
                        {userPayments?.length === 0 && (
                          <tr className="text-center text-warning row-span-4">
                            <td colSpan={6}>No Transaction Yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane fade" id="Weekly">
                  <div className="table-responsive">
                    <table className="table shadow-hover card-table border-no tbl-btn short-one">
                      <tbody>
                        {userSavingPayments &&
                          userSavingPayments.map((each) => (
                            <>
                              <tr
                                key={each.date}
                                onClick={() =>
                                  handleUsersTransaction(each, 'savingFundings')
                                }
                              >
                                <td>
                                  <span>
                                    {each.statusSuccess && (
                                      <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 63 63"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <rect
                                          width="63"
                                          height="63"
                                          rx="14"
                                          fill="#71B945"
                                        />
                                        <path
                                          d="M40.6186 32.7207L40.6186 32.7207L40.6353 39.6289C40.6354 39.6328 40.6354 39.6363 40.6353 39.6396M40.6186 32.7207L40.1353 39.6341L40.6353 39.635C40.6353 39.6481 40.6347 39.6583 40.6345 39.6627L40.6344 39.6642C40.6346 39.6609 40.6351 39.652 40.6353 39.6407C40.6353 39.6403 40.6353 39.64 40.6353 39.6396M40.6186 32.7207C40.6167 31.9268 39.9717 31.2847 39.1777 31.2866C38.3838 31.2885 37.7417 31.9336 37.7436 32.7275L37.7436 32.7275L37.7519 36.1563M40.6186 32.7207L37.7519 36.1563M40.6353 39.6396C40.6329 40.4282 39.9931 41.0705 39.2017 41.0726C39.2 41.0726 39.1983 41.0727 39.1965 41.0727L39.1944 41.0727L39.1773 41.0726L32.2834 41.056L32.2846 40.556L32.2834 41.056C31.4897 41.054 30.8474 40.4091 30.8494 39.615C30.8513 38.8211 31.4964 38.179 32.2903 38.1809L32.2903 38.1809L35.719 38.1892L22.5364 25.0066C21.975 24.4452 21.975 23.5351 22.5364 22.9737C23.0978 22.4123 24.0079 22.4123 24.5693 22.9737L37.7519 36.1563M40.6353 39.6396C40.6353 39.6376 40.6353 39.6356 40.6353 39.6336L37.7519 36.1563M39.1964 41.0726C39.1957 41.0726 39.1951 41.0726 39.1944 41.0726L39.1964 41.0726Z"
                                          fill="white"
                                          stroke="white"
                                        />
                                      </svg>
                                    )}
                                    {each.statusPending && (
                                      <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 63 63"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <rect
                                          width="63"
                                          height="63"
                                          rx="14"
                                          fill="#747474"
                                        />
                                        <path
                                          d="M22.1318 30.9043L22.1318 30.9043L22.1151 23.9961C22.1151 23.9922 22.1151 23.9887 22.1152 23.9854M22.1318 30.9043L22.6152 23.9909L22.1152 23.99C22.1152 23.9769 22.1157 23.9667 22.116 23.9623L22.1161 23.9608C22.1159 23.9641 22.1154 23.973 22.1152 23.9843C22.1152 23.9847 22.1152 23.985 22.1152 23.9854M22.1318 30.9043C22.1338 31.6982 22.7788 32.3403 23.5728 32.3384C24.3667 32.3365 25.0088 31.6914 25.0069 30.8975L25.0069 30.8975L24.9986 27.4687M22.1318 30.9043L24.9986 27.4687M22.1152 23.9854C22.1176 23.1968 22.7574 22.5545 23.5488 22.5524C23.5504 22.5524 23.5522 22.5523 23.554 22.5523L23.5561 22.5523L23.5732 22.5524L30.4671 22.569L30.4658 23.069L30.4671 22.569C31.2608 22.571 31.903 23.2159 31.9011 24.01C31.8992 24.8039 31.2541 25.446 30.4602 25.4441L30.4602 25.4441L27.0315 25.4358L40.2141 38.6184C40.7755 39.1798 40.7755 40.0899 40.2141 40.6513C39.6527 41.2127 38.7426 41.2127 38.1812 40.6513L24.9986 27.4687M22.1152 23.9854C22.1152 23.9874 22.1152 23.9894 22.1152 23.9914L24.9986 27.4687M23.5541 22.5524C23.5547 22.5524 23.5554 22.5524 23.5561 22.5524L23.5541 22.5524Z"
                                          fill="white"
                                          stroke="white"
                                        />
                                      </svg>
                                    )}
                                    {each.statusFailed && (
                                      <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 63 63"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <rect
                                          width="63"
                                          height="63"
                                          rx="14"
                                          fill="#FF5757"
                                        />
                                        <path
                                          d="M22.1318 30.9043L22.1318 30.9043L22.1151 23.9961C22.1151 23.9922 22.1151 23.9887 22.1152 23.9854M22.1318 30.9043L22.6152 23.9909L22.1152 23.99C22.1152 23.9769 22.1157 23.9667 22.116 23.9623L22.1161 23.9608C22.1159 23.9641 22.1154 23.973 22.1152 23.9843C22.1152 23.9847 22.1152 23.985 22.1152 23.9854M22.1318 30.9043C22.1338 31.6982 22.7788 32.3403 23.5728 32.3384C24.3667 32.3365 25.0088 31.6914 25.0069 30.8975L25.0069 30.8975L24.9986 27.4687M22.1318 30.9043L24.9986 27.4687M22.1152 23.9854C22.1176 23.1968 22.7574 22.5545 23.5488 22.5524C23.5504 22.5524 23.5522 22.5523 23.554 22.5523L23.5561 22.5523L23.5732 22.5524L30.4671 22.569L30.4658 23.069L30.4671 22.569C31.2608 22.571 31.903 23.2159 31.9011 24.01C31.8992 24.8039 31.2541 25.446 30.4602 25.4441L30.4602 25.4441L27.0315 25.4358L40.2141 38.6184C40.7755 39.1798 40.7755 40.0899 40.2141 40.6513C39.6527 41.2127 38.7426 41.2127 38.1812 40.6513L24.9986 27.4687M22.1152 23.9854C22.1152 23.9874 22.1152 23.9894 22.1152 23.9914L24.9986 27.4687M23.5541 22.5524C23.5547 22.5524 23.5554 22.5524 23.5561 22.5524L23.5541 22.5524Z"
                                          fill="white"
                                          stroke="white"
                                        />
                                      </svg>
                                    )}
                                  </span>
                                </td>
                                <td className="wspace-no">
                                  {each.paymentMethod === 'Bitcoin' && (
                                    <svg
                                      className="mr-2"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M16 9.50011C15.9992 8.67201 15.216 8.00092 14.2501 8H9V11H14.2501C15.216 10.9993 15.9992 10.328 16 9.50011Z"
                                        fill="#FFAB2D"
                                      />
                                      <path
                                        d="M9 16H14.2501C15.2165 16 16 15.3285 16 14.5001C16 13.6715 15.2165 13 14.2501 13H9V16Z"
                                        fill="#FFAB2D"
                                      />
                                      <path
                                        d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM18.0001 14.5713C17.9978 16.4641 16.4641 17.9978 14.5716 17.9999V18.8571C14.5716 19.3305 14.1876 19.7143 13.7144 19.7143C13.2409 19.7143 12.8572 19.3305 12.8572 18.8571V17.9999H11.1431V18.8571C11.1431 19.3305 10.7591 19.7143 10.2859 19.7143C9.8124 19.7143 9.42866 19.3305 9.42866 18.8571V17.9999H6.85733C6.38387 17.9999 6.00013 17.6161 6.00013 17.1429C6.00013 16.6695 6.38387 16.2857 6.85733 16.2857H7.71427V7.71427H6.85733C6.38387 7.71427 6.00013 7.33053 6.00013 6.85707C6.00013 6.38361 6.38387 5.99987 6.85733 5.99987H9.42866V5.14293C9.42866 4.66947 9.8124 4.28573 10.2859 4.28573C10.7593 4.28573 11.1431 4.66947 11.1431 5.14293V5.99987H12.8572V5.14293C12.8572 4.66947 13.2409 4.28573 13.7144 4.28573C14.1879 4.28573 14.5716 4.66947 14.5716 5.14293V5.99987C16.4571 5.99202 17.992 7.5139 18.0001 9.39937C18.0043 10.3978 17.5714 11.3481 16.8152 12C17.5643 12.6445 17.9967 13.5828 18.0001 14.5713Z"
                                        fill="#FFAB2D"
                                      />
                                    </svg>
                                  )}
                                  <td>
                                    <span>{each.userEmail}</span>
                                  </td>
                                  {each.paymentMethod === 'Litecoins' && (
                                    <svg
                                      className="mr-1"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM16.2857 18.0001H9.42866C8.9552 18.0001 8.57147 17.6164 8.57147 17.1429C8.57147 17.1024 8.57434 17.0618 8.5801 17.0216L9.22515 12.5054L7.92222 12.8313C7.85421 12.8486 7.78437 12.8572 7.71427 12.8572C7.24081 12.8567 6.85759 12.4727 6.85785 11.9992C6.85838 11.6063 7.12571 11.2642 7.50683 11.1684L9.48674 10.6735L10.2942 5.0213C10.3612 4.55254 10.7954 4.22714 11.2642 4.2941C11.7329 4.36107 12.0583 4.79529 11.9914 5.26404L11.2825 10.2247L14.3636 9.4543C14.8222 9.33737 15.2886 9.61439 15.4053 10.0729C15.5222 10.5315 15.2452 10.9979 14.7866 11.1148C14.784 11.1153 14.7814 11.1161 14.7788 11.1166L11.0204 12.0562L10.4164 16.2857H16.2857C16.7592 16.2857 17.1429 16.6695 17.1429 17.1429C17.1429 17.6161 16.7592 18.0001 16.2857 18.0001Z"
                                        fill="#5F5F5F"
                                      />
                                    </svg>
                                  )}
                                  {each.paymentMethod === 'Ethereum' && (
                                    <svg
                                      className="mr-1"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12.3182 13.6531C12.1139 13.7348 11.8863 13.7348 11.682 13.6531L9.48944 12.7761L12.0001 17.7974L14.5107 12.7761L12.3182 13.6531Z"
                                        fill="#DC3CCC"
                                      />
                                      <path
                                        d="M12.0001 11.9341L15.0156 10.7279L12.0001 5.90308L8.98456 10.7279L12.0001 11.9341Z"
                                        fill="#DC3CCC"
                                      />
                                      <path
                                        d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9927 5.37574 18.6243 0.00732425 12 0ZM17.0524 11.5263L12.7667 20.0977C12.5551 20.5212 12.04 20.6928 11.6168 20.4812C11.4507 20.3983 11.3162 20.2638 11.2333 20.0977L6.94757 11.5263C6.81443 11.2589 6.8296 10.9416 6.9876 10.6882L11.2733 3.83111C11.5582 3.42984 12.114 3.33515 12.5153 3.62001C12.5972 3.67808 12.6686 3.74923 12.7267 3.83111L17.0121 10.6882C17.1704 10.9416 17.1856 11.2589 17.0524 11.5263Z"
                                        fill="#DC3CCC"
                                      />
                                    </svg>
                                  )}
                                  {each.paymentMethod === 'Bank' && (
                                    <Icons.Money />
                                  )}
                                  <span className="font-w600 text-black">
                                    {each.paymentMethod}
                                  </span>
                                </td>
                                <td>
                                  <span className="text-black">
                                    {moment(each.date?.toDate()).calendar()}
                                  </span>
                                </td>
                                <td>
                                  <span className="font-w600 text-black">
                                    ${each.amount}
                                  </span>
                                </td>
                                <td>
                                  {each.statusSuccess && (
                                    <Link
                                      className="btn btn-outline-success float-right"
                                      to="#"
                                    >
                                      Completed
                                    </Link>
                                  )}

                                  {each.statusFailed && (
                                    <Link
                                      className="btn btn-outline-danger float-right"
                                      to="#"
                                    >
                                      Failed
                                    </Link>
                                  )}
                                  {each.statusPending && (
                                    <Link
                                      className="btn btn-outline-info float-right"
                                      to="#"
                                    >
                                      Pending
                                    </Link>
                                  )}
                                </td>
                              </tr>
                              <td>
                                <Link
                                  className="btn ml-2 btn-outline-danger float-right"
                                  to="#"
                                  onClick={() => handleSavingDelete(each)}
                                >
                                  Delete
                                </Link>
                              </td>
                            </>
                          ))}
                        {userSavingPayments?.length === 0 && (
                          <tr className="text-center text-warning row-span-4">
                            <td colSpan={6}>No Transaction Yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminPayments
