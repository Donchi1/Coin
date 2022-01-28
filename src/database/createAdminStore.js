import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { firestoreReducer } from 'redux-firestore'
import { authReducer } from '../components/Auths/AuthReducer'
import { combineReducers } from 'redux'
import { projectReducer } from '../components/Transactions/ProjectReducer'
import { adminReducer, USER_LOGOUT, adminSaga } from 'react-admin'

import { all, fork } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'
import { firebaseReducer } from 'react-redux-firebase'

export let store

export const adminAuthDatabase = (authProvider, dataProvider, history) => {
  const rootReducer = combineReducers({
    admin: adminReducer,
    router: connectRouter(history),
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    authReducer,
    projectReducer: projectReducer,
  })

  const resettableAppReducer = (state, action) =>
    rootReducer(action.type !== USER_LOGOUT ? state : undefined, action)

  const saga = function* rootsaga() {
    yield all([adminSaga(dataProvider, authProvider)].map(fork))
  }

  const sagaMiddleware = createSagaMiddleware()
  const composeEnhencers =
    (process.env.Node_ENV === 'development' &&
      typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })) ||
    compose

  const initialState = {}
  store = createStore(
    resettableAppReducer,
    initialState,
    composeEnhencers(
      applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    ),
  )
  sagaMiddleware.run(saga)
  return store
}
