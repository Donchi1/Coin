export const registerAction = (data, firebase, dispatch) => {
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
          gender: data.gender,
          age: data.date,
          country: data.country,
          state: data.state,
          uid: user.user.uid,
          initial: data.firstname[0] + data.lastname[0],
          totalBalance: '0000',
          initialDeposite: '0000',
          bonus: '20.00',
        })
      return firebase.auth().currentUser.sendEmailVerification()
    })
    .then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' })
    })
    .catch((err) => dispatch({ type: 'SIGNUP_ERROR', error: err }))
}

export const logginAction = (data, firebase, dispatch) => {
  const email = data.email
  const password = data.password
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => dispatch({ type: 'LOGIN_SUCCESS' }))
    .catch((err) => dispatch({ type: 'LOGIN_ERROR', error: err }))
}

export const forgetAction = (dispatch, firebase) => {
  const currentUser = firebase.auth().currentUser
  if (currentUser === null) return

  firebase
    .auth()
    .sendPasswordResetEmail(currentUser)
    .then(() => dispatch({ type: 'PASSRESET_SUCCESS' }))
    .catch((err) => dispatch({ type: 'PASSRESET_ERROR', error: err }))
}

export const updateProfileAction = (profile, firebase, dispatch) => {
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
      state: profile.state,
      initial: isNaN(userInitial) ? '' : userInitial.toString(),
    })
    .then(() => {
      if (profile.password) {
        firebase
          .auth()
          .currentUser.updatePassword(profile.password)
          .then(() => console.log('password updated'))
      }
      if (profile.fileUpload) {
        firebase
          .storage()
          .ref('users')
          .child(uid)
          .put(profile.fileUpload)
          .then(() =>
            firebase
              .storage()
              .ref(`users/${uid}`)
              .getDownloadURL()
              .then((imgUrl) =>
                firebase
                  .firestore()
                  .collection('users')
                  .doc(uid)
                  .update({ image: imgUrl })
                  .then(() => dispatch({ type: 'UPLOAD_SUCCESS' })),
              ),
          )
      }
    })
    .catch(() => dispatch({ type: 'UPLOAD_ERROR' }))
}

export const withdrawalAction = (amount, address, dispatch, firebase) => {
  const uid = firebase.auth().currentUser.uid

  const firestore = firebase.firestore()
  firestore
    .collection('withdrawals')
    .doc(uid)
    .set(
      { withdrawalAmount: amount, wallet: address, date: new Date() },
      { merge: true },
    )
    .then(() => dispatch({ type: 'WITHDRAWAL_ERROR' }))
    .catch(() => dispatch({ type: 'WITHDRAWAL_ERROR' }))
}

export const paymentAction = (amount, file, firebase, dispatch) => {
  const uid = firebase.auth().currentUser.uid
  const firestore = firebase.firestore()
  firestore
    .collection('payments')
    .doc(uid)
    .set({ paymentAmount: amount, date: new Date() }, { merge: true })
    .then(() => {
      firebase
        .storage()
        .ref('paymentProves')
        .child(uid)
        .put(file)
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
                .then(() => dispatch({ type: 'PAYMENT_SUCCESS' }))
            })
        })
    })
    .catch(() => dispatch({ type: 'PAYMENT_SUCCESS' }))
}

export const LogoutAction = (firebase, dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: 'LOGOUT' })
    })
}

export const newsLetterAction = (email, firebase, dispatch) => {
  firebase
    .firestore()
    .collection('users')
    .add({
      newsLetter: email,
    })
    .then(() => dispatch({ type: 'SUBCRIPTION_SUCCESSFUL' }))
    .catch(() => dispatch({ type: 'SUBCRIPTION_ERROR' }))
}

//const googleSignimAction = () => {
//  const provider = new firebase.auth().GoogleAuthProvider()
//}
