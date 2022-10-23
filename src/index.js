import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import firebase from './database/firebasedb'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import AuthIsReady from './AuthIsReady'
import './components/CSS/App.css'

import App from './App'
import { store, adminAuthDatabase } from './database/createAdminStore'
import { dataProvider, history } from '../src/components/admin/AdminPage'
import authProvider from './components/admin/authProvider'

ReactDOM.render(
  <Provider store={adminAuthDatabase(authProvider, dataProvider, history)}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      createFirestoreInstance={createFirestoreInstance}
      dispatch={store.dispatch}
      config={{
        useFirestoreForProfile: true,
        userProfile: 'users',
      }}
    >
      <AuthIsReady>
        <App />
      </AuthIsReady>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
)
