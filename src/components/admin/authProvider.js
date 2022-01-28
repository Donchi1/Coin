import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin'

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const cred = { username: params.username, password: params.password }
    localStorage.setItem('cred', cred)
    if (
      cred.username === process.env.REACT_APP_ADMIN_USERNAME &&
      cred.password === process.env.REACT_APP_ADMIN_PASSWORD
    ) {
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('cred')
    return Promise.resolve()
  }
  if (type === AUTH_ERROR) {
    const { status } = params
    if (status === 401 || status === 403) {
      localStorage.removeItem('cred')
      return Promise.reject()
    }
    return Promise.resolve()
  }
  if (type === AUTH_CHECK) {
    const data = localStorage.getItem('cred')

    if (data) {
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  }
  return Promise.reject('Bad Method')
}

//import inMemoryJWT from './inMemoryJWT'
//
//const authProvider = {
//  login: ({ username, password }) => {
//    const request = new Request('http://localhost:5000/authenticate', {
//      method: 'POST',
//      body: JSON.stringify({ username, password }),
//      headers: new Headers({ 'Content-Type': 'application/json' }),
//      credentials: 'include',
//      mode: 'no-cors',
//    })
//
//    return fetch(request)
//      .then((response) => {
//        if (response.status < 200 || response.status >= 300) {
//          throw new Error(response.statusText)
//        }
//        return response.json()
//      })
//      .then(({ token }) => inMemoryJWT.setToken(token))
//  },
//
//  logout: () => {
//    inMemoryJWT.ereaseToken()
//    return Promise.resolve()
//  },
//
//  checkAuth: () => {
//    return inMemoryJWT.getToken() ? Promise.resolve() : Promise.reject()
//  },
//
//  checkError: (error) => {
//    const status = error.status
//    if (status === 401 || status === 403) {
//      inMemoryJWT.ereaseToken()
//      return Promise.reject()
//    }
//    return Promise.resolve()
//  },
//  getPermissions: () => {
//    return inMemoryJWT.getToken() ? Promise.resolve() : Promise.reject()
//  },
//}
//
//export default authProvider
