const next = (firebase, url, user, push) => {
  firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .update({
      photo: url,
    })
    .then(() => {
      // localStorage.setItem("userId", user.uid)
      return push('/verification/signup')
    })
}

export const registerAction = (
  data,
  firebase,
  dispatch,
  setUserData,
  push,
  openPopUp,
  setOpenPopUp,
) => {
  const email = data.email
  const password = data.password

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      firebase
        .firestore()
        .collection('users')
        .doc(user.user.uid)
        .set({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phone: data.phone,
          country: data.country,
          uid: user.user.uid,
          initial: data.firstname[0] + data.lastname[0],
          totalBalance: '0000',
          initialDeposite: '0000',
          bonus: '10.00',
          disableWithdrawal: true,
          disableAccount: false,
          closedForTheWeek: false,
          photo: '',
          verificationCode: '',
          accessCode: '',
          income: '',
          verified: false,
          accessCodeProve: '',
          withdrawalProve: '',
          savingsAccount: false,
          weeklyClosingAlert: true,
          withdrawalFeeProve: '',
          accessCodeData: '',
        })
        .then(() => {
          firebase
            .storage()
            .ref('users')
            .child(user.user.uid)
            .put(data.photo)
            .then(() => {
              firebase
                .storage()
                .ref(`users/${user.user.uid}`)
                .getDownloadURL()
                .then((url) => {
                  return next(firebase, url, user.user, push)
                  // return push('/verification/signup')
                })
            })
        })
    })
    .catch((error) => {
      setUserData.setEmail('')
      setUserData.setPassword('')
      setUserData.setPhone('')
      setUserData.setLastname('')
      setUserData.setFirstname('')
      setUserData.setPhoto('')
      setUserData.setCountry('')
      setUserData.setIsSubmitting('')
      setOpenPopUp({ ...openPopUp, error: true })
      return dispatch({ type: 'SIGNUP_ERROR', error })
    })
}

export const logginAction = (
  data,
  firebase,
  dispatch,
  setFormData,
  push,
  openPopUp,
  setOpenPopUp,
) => {
  const email = data.email
  const password = data.password

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      setFormData({
        ...data,
        email: '',
        password: '',
        isSubmitting: false,
      })

      dispatch({ type: 'LOGIN_SUCCESS', message: 'Login successful' })
      return setOpenPopUp({ ...openPopUp, success: true, error: false })
    })
    .catch((err) => {
      setFormData({
        ...data,
        email: '',
        password: '',
        isSubmitting: false,
      })
      setOpenPopUp({ ...openPopUp, error: true, success: false })
      return dispatch({ type: 'LOGIN_ERROR', error: err })
    })
}

export const forgetAction = (
  dispatch,
  firebase,
  creds,
  setCreds,
  setIsSubmitting,
  openPopUp,
  setOpenPopUp,
) => {
  firebase
    .auth()
    .sendPasswordResetEmail(creds)
    .then(() => {
      dispatch({
        type: 'PASSRESET_SUCCESS',
        message: `A password reset email has been sent to ${creds}`,
      })
      setCreds('')
      setOpenPopUp({ ...openPopUp, success: true })
      setIsSubmitting(false)
    })
    .catch((error) => {
      dispatch({ type: 'PASSRESET_ERROR', error })
      setOpenPopUp({ ...openPopUp, error: true })
      setIsSubmitting(false)

      setCreds('')
    })
}

export const updateProfileAction = (profile, firebase, dispatch, setForm) => {
  const uid = firebase.auth().currentUser.uid
  const userInitial = profile.firstname[0] + profile.lastname[0]

  firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .update({
      firstname: profile.firstname,
      lastname: profile.lastname,
      country: profile.country,
      phone: profile.phone,
      initial: userInitial.toString(),
    })
    .then(() => {
      if (profile.img) {
        return firebase
          .storage()
          .ref('users')
          .child(uid)
          .put(profile.img)
          .then(() =>
            firebase
              .storage()
              .ref(`users/${uid}`)
              .getDownloadURL()
              .then((imgUrl) => {
                firebase
                  .firestore()
                  .collection('users')
                  .doc(uid)
                  .update({ photo: imgUrl })
                  .then(() => {
                    dispatch({
                      type: 'PROFILE_UPLOAD_SUCCESS',
                      message: 'Profile Successfully Updated',
                    })
                    setForm({
                      ...profile,

                      isSubmitting: false,
                    })

                    firebase
                      .firestore()
                      .collection('notifications')
                      .doc(uid)
                      .set({
                        user: profile.firstname,
                        message: 'You have successfully updated your profile',
                        id: uid,
                        date: firebase.firestore.FieldValue.serverTimestamp(),
                      })
                      .then(() => {
                        //return axios
                        //  .post(
                        //    `${process.env.REACT_APP_URL}/api/profileUpdate`,
                        //    firebase.auth().currentUser.email,
                        //  )
                        //  .then((res) => {
                        //    console.log(res)
                        //  })
                        return
                      })
                  })
              }),
          )
      } else {
        dispatch({
          type: 'PROFILE_UPLOAD_SUCCESS',
          message: 'Profile Successfully Updated',
        })

        firebase.firestore().collection('notification').doc(uid).set({
          user: profile.firstname,
          message: 'You have successfully updated your profile',
          id: uid,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        })
        return setForm({
          ...profile,

          isSubmitting: false,
        })
        //return axios
        //  .post(
        //    `${process.env.REACT_APP_URL}/api/profileUpdate`,
        //    firebase.auth().currentUser.uid,
        //  )
        //  .then((res) => {})
      }
    })
    .catch(() => {
      dispatch({ type: 'UPLOAD_ERROR' })
      setForm({
        ...profile,

        isSubmitting: false,
      })
    })
}

export const passwordUpdate = (values, setForm, dispatch, firebase, axios) => {
  const uid = firebase.auth().currentUser.uid
  firebase
    .auth()
    .currentUser.updatePassword(values.password)
    .then(() => {
      dispatch({
        type: 'PASSWORD_UPDATE_SUCCESS',
        message: 'Your password is successfully updated',
      })

      firebase.firestore().collection('notification').doc(uid).set({
        user: values.firstname,
        message: 'Your password was recently changed',
        id: uid,
        date: firebase.firestore.FieldValue.serverTimestamp(),
      })
      return setForm({ ...values, password: '', password1: '' })
      // return axios
      //   .post(`${process.env.REACT_APP_URL}/api/passwordUpdate`)
      //   .then((res) => {
      //   })
    })
}

export const withdrawalAction = (
  profile,
  withdrawalData,
  firebase,
  dispatch,
  handleLoading,
  setWithdrawalData,
  axios,
) => {
  const uid = firebase.auth().currentUser.uid

  const firestore = firebase.firestore()

  firestore
    .collection('withdrawals')
    .doc(uid)
    .collection('withdrawalDatas')
    .add({
      withdrawalAmount: withdrawalData.amount,
      wallet: withdrawalData.wallet,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      currentUserfirstname: profile.firstname,
      currentUserlastname: profile.lastname,
      withdrawerName: withdrawalData.name,
      number: withdrawalData.phone,
      withdrawalMethod: withdrawalData.withdrawalMethod,
      AccountNumber: withdrawalData.accountNumber,
      withdrawalFee: '',
      uid: uid,
      idx: Math.random().toString(),
      statusPending: true,
      statusFailed: false,
      statusSuccess: false,
    })
    .then(() => {
      dispatch({
        type: 'WITHDRAWAL_SUCCESS',
        message:
          'Your withdrawal request has been sent. We will get back to you in less than 24hours.',
      })
      //axios.post(`${process.env.REACT_APP_URL}/api/withdrawals`, email).then(() => {

      // })
      firebase.firestore().collection('notifications').doc(uid).set({
        user: profile.firstname,
        message: 'Your withdrwal has been submitted ',
        id: uid,
        date: firebase.firestore.FieldValue.serverTimestamp(),
      })
      setWithdrawalData({
        ...withdrawalData,
        name: '',
        amount: '',
        wallet: '',
        phone: '',
        accountNumber: '',
      })
    })
    .catch((e) => {
      dispatch({ type: 'WITHDRAWAL_ERROR', message: e })
      handleLoading()
      setWithdrawalData({
        ...withdrawalData,
        name: '',
        amount: '',
        wallet: '',
        phone: '',
        accountNumber: '',
      })
    })
}

export const paymentAction = (
  amount,
  profile,
  userProve,
  firebase,
  dispatch,
  setUserProve,
) => {
  const uid = firebase.auth().currentUser.uid
  const firestore = firebase.firestore()
  firestore
    .collection('payments')
    .doc(uid)
    .collection('paymentDatas')
    .add({
      paymentAmount: amount ? amount : 1,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      firstname: profile.firstname,
      lastname: profile.lastname,
      paymentMethod: userProve.method,
      uid: uid,
      idx: Math.random().toString(),
      statusPending: true,
      statusFailed: false,
      statusSuccess: false,
    })
    .then(() => {
      firebase
        .storage()
        .ref('paymentProves')
        .child(uid)
        .put(userProve.prove)
        .then(() => {
          firebase
            .storage()
            .ref(`paymentProves/${uid}`)
            .getDownloadURL()
            .then((url) => {
              firestore
                .collection('payments')
                .doc(uid)
                .update({ paymentProve: url })
                .then(() => {
                  dispatch({ type: 'PAYMENT_SUCCESS' })
                  //axios.post(`${process.env.REACT_APP_URL}/api/paymentProve`, email).then(() => {

                  // })
                  firebase
                    .firestore()
                    .collection('notifications')
                    .doc(uid)
                    .set({
                      user: profile.firstname,
                      message: 'Your payment prove successfully submitted',
                      id: uid,
                      date: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                  setUserProve({ ...userProve, prove: '', method: '' })
                })
            })
        })
    })
    .catch(() => {
      dispatch({ type: 'PAYMENT_SUCCESS' })
      setUserProve({ ...userProve, prove: '', method: '' })
    })
}

export const savingAction = (
  firebase,
  dispatch,
  values,
  push,
  setSavingInfo,
  idCard,
  setIdCardPhoto,
) => {
  const user = firebase.auth().currentUser
  firebase
    .storage()
    .ref('savings')
    .child(user.uid)
    .put(idCard)
    .then(() => {
      firebase
        .storage()
        .ref(`savings/${user.uid}`)
        .getDownloadURL()
        .then((url) => {
          firebase
            .firestore()
            .collection('savings')
            .doc(user.uid)
            .set({
              firstname: values.firstname,
              lastname: values.lastname,
              email: values.email,
              phone: values.phone,
              country: values.country,
              state: values.state,
              accountNumber: values.accountNumber,
              dateOfBirth: values.dateOfBirth,
              accountReason: values.accountReason,
              idNumber: values.idNumber,
              idCardPhoto: url,
              initialAmount: '',
              prove: '',
              profit: '5',
              total: '0',
              income: '0',
              occupation: values.occupation,
              nextOfKingsFirstname: values.nFirstname,
              nextOfKingsLastname: values.nLastname,
              nextOfKingsEmail: values.nEmail,
              nextOfKingsPhone: values.nPhone,
              personalWithdrawalCode: values.PWC,
              id: firebase.auth().currentUser.uid,
              withdrawalAuthorization: '',
              date: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((info) => {
              firebase
                .firestore()
                .collection('users')
                .doc(user.uid)
                .update({ savingsAccount: true })
              setSavingInfo({
                ...values,
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                country: '',
                state: '',
                accountNumber: '',
                dateOfBirth: '',
                accountReason: '',
                idNumber: '',
              })
              setIdCardPhoto('')
              dispatch({
                type: 'SAVING_SUCCESS',
                message: 'savings account successfully created',
              })
              //axios.post(`${process.env.REACT_APP_URL}/api/savings`, value).then(() => {

              // })
              firebase
                .firestore()
                .collection('notifications')
                .doc(user.uid)
                .collection('notificationDatas')
                .add({
                  user: values.firstname,
                  message: 'Your savings account successfully created',
                  id: user.uid,
                  date: firebase.firestore.FieldValue.serverTimestamp(),
                })
              return push('/savings/dashboard')
            })
            .catch((e) => {
              setSavingInfo({
                ...values,
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                country: '',
                state: '',
                accountNumber: '',
                dateOfBirth: '',
                accountReason: '',
                idNumber: '',
                idCardPhoto: '',
              })
              dispatch({
                type: 'SAVING_ERROR',
              })
            })
        })
    })
}
export const fundingAction = (firebase, dispatch, values, setValues, name) => {
  const user = firebase.auth().currentUser
  firebase
    .storage()
    .ref('fundingProves')
    .child(user.uid)
    .put(values.prove)
    .then(() => {
      firebase
        .storage()
        .ref(`fundingProves/${user.uid}`)
        .getDownloadURL()
        .then((url) => {
          firebase
            .firestore()
            .collection('savings')
            .doc(user.uid)
            .collection('savingFundings')
            .add({
              prove: url,
              paymentMethod: values.method,
              amount: values.amount,
              date: firebase.firestore.FieldValue.serverTimestamp(),
              statusSuccess: false,
              statusFailed: false,
              statusPending: true,
              userEmail: user.email,
            })
            .then((data) => {
              firebase
                .firestore()
                .collection('savings')
                .doc(user.uid)
                .update({
                  prove: url,
                })
                .then(() => {
                  dispatch({
                    type: 'FUNDING_SUCCESS',
                    message:
                      'Your information has been sent successfully.Wait for less than 24 hours for data verification',
                    open: true,
                  })

                  //axios.post(`${process.env.REACT_APP_URL}/api/newsletter`, email).then(() => {

                  // })
                  firebase
                    .firestore()
                    .collection('notifications')
                    .doc(user.uid)
                    .set({
                      user: name,
                      message:
                        'Your account funding prove successfully submitted',
                      id: user.uid,
                      date: firebase.firestore.FieldValue.serverTimestamp(),
                    })

                  setValues({
                    ...values,
                    isSubmitting: false,
                    prove: '',
                    amount: '',
                  })
                })
            })
            .catch((e) => {
              dispatch({
                type: 'SAVING_ERROR',
                message: e,
                open: true,
              })
              setValues({
                ...values,
                isSubmitting: false,
                prove: '',
                amount: '',
              })
            })
        })
    })
}

export const savingWithdrawalAction = (
  profileInfo,
  values,
  firebase,
  dispatch,
  setWithdrawalAmount,
) => {
  firebase
    .firestore()
    .collection('savings')
    .doc(firebase.auth().currentUser.uid)
    .collection('savingWithdrawals')
    .add({
      withdrawalMethod: values.withdrawalMethod,
      amount: values.amount,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      statusSuccess: false,
      statusFailed: false,
      statusPending: true,
      wallet: values.wallet,
      name: values.name,
      accountNumber: values.accountNumber,
      phone: values.phone,
      bankName: values.bankName,
      userEmail: profileInfo.email,
    })
    .then(() => {
      dispatch({
        type: 'SAVING_WITHDRAWAL_SUCCESS',
        message:
          'Your request has been received.Wait for less than 24hours while we process your withdrawal',
      })
      //axios.post(`${process.env.REACT_APP_URL}/api/savingsW`, profileInfo).then(() => {

      // })
      firebase
        .firestore()
        .collection('notifications')
        .doc(firebase.auth().currentUser.uid)
        .collection('notificationDatas')
        .add({
          user: profileInfo.firstname,
          message: 'Your saving withdrawal request successfully submitted',
          id: firebase.auth().currentUser.uid,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        })
      setWithdrawalAmount({
        ...values,
        amount: 1,
        wallet: '',
        withdrawalMethod: '',
        name: '',
        accountNumber: 'none',
        phone: '',
        bankName: '',
        withdrawalAuthorization: '',
      })
    })
    .catch((e) => {
      dispatch({
        type: 'SAVING_WITHDRAWAL_ERROR',
        message: e,
      })
      setWithdrawalAmount({
        ...values,
        amount: 1,
        wallet: '',
        withdrawalMethod: '',
        name: '',
        accountNumber: 'none',
        phone: '',
        bankName: '',
        withdrawalAuthorization: '',
      })
    })
}

export const LogoutAction = (firebase, dispatch, handleLogoutRoute) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      handleLogoutRoute()
      localStorage.removeItem('userId')
      return dispatch({ type: 'LOGOUT' })
    })
}

export const newsLetterAction = (email, firebase, dispatch, setinput) => {
  firebase
    .firestore()
    .collection('newsletters')
    .add({
      newsLetter: email,
      id: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      dispatch({ type: 'SUBCRIPTION_SUCCESSFUL' })
      //axios.post(`${process.env.REACT_APP_URL}/api/newsletter`, email).then(() => {

      // })
      setinput('')
    })
    .catch((error) => {
      dispatch({ type: 'SUBCRIPTION_ERROR', error })
      setinput('')
    })
}

//const googleSignimAction = () => {
//  const provider = new firebase.auth().GoogleAuthProvider()
//}

export const contactAction = (
  contactInfo,
  firebase,
  dispatch,
  setContactInfo,
  setopenSnack,
  setopenSnackError,
) => {
  firebase
    .firestore()
    .collection('contacts')
    .add({
      contactName: contactInfo.name,
      contactEmail: contactInfo.email,
      message: contactInfo.message,
      subject: contactInfo.subject,
      phone: contactInfo.phone,
      id: Date.now().toString(),
    })
    .then(() => {
      dispatch({ type: 'MESSAGE_SUCCESS' })
      setopenSnack(true)
      // axios.post(`${process.env.REACT_APP_URL}/api/contact`, contactInfo.email)
      return setContactInfo({
        ...contactInfo,
        name: '',
        email: '',
        message: '',
        subject: '',
        phone: '',
      })
    })
    .catch(() => {
      dispatch({ type: 'MESSAGE_ERROR' })
      setContactInfo({
        ...contactInfo,
        name: '',
        email: '',
        message: '',
        subject: '',
        phone: '',
      })
      setopenSnackError(true)
    })
}
