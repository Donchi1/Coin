import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import firebase from './database/firebasedb'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import BeforeComponents from './components/Auths/BeforeComponents'
import rootReducer from './components/Auths/RootReducer'

import 'bootstrap/dist/css/bootstrap.min.css'
import './components/CSS/App.css'

import App from './App'

const config = {}

const initialState = {}
const store = createStore(rootReducer, initialState)
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      createFirestoreInstance={createFirestoreInstance}
      dispatch={store.dispatch}
      config={{
        useFirestoreForProfile: 'true',
        userProfile: 'users',
        attachAuthIsReady: 'true',
      }}
    >
      <BeforeComponents>
        <App />
      </BeforeComponents>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
)
