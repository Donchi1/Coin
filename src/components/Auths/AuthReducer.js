const initialAuth = {
  loginError: '',
  loginSuccess: '',
  logout: '',
  signupSuccess: '',
  signupError: '',
  passResetSuccss: '',
  passError: '',
  userData: [],
  profileMessage: '',
  passwordMessage: '',
}

export const authReducer = (state = initialAuth, action) => {
  switch (action.type) {
    case 'PROFILE_UPLOAD_SUCCESS':
      return {
        ...state,
        profileMessage: action.message,
      }
    case 'PASSWORD_UPDATE_SUCCESS':
      return {
        ...state,
        passwordMessage: action.message,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loginSuccess: action.message,
      }
    case 'VERIFY_USER':
      return {
        ...state,
        userData: action.user,
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        loginError: action.error.message,
      }
    case 'LOGOUT':
      return {
        ...state,
        logout: 'logout Success',
      }
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        signupSuccess: 'Signup Success',
      }
    case 'SIGNUP_ERROR':
      return {
        ...state,
        signupError: action.error.message,
      }
    case 'PASSRESET_SUCCESS':
      return {
        ...state,
        passResetSuccss: 'A password reset email has been sent to you',
      }
    case 'PASSRESET_ERROR':
      return {
        ...state,
        passResetError: action.error.message,
      }
    case 'USER_TYPING':
      return {
        ...state,
        userData: [...state.userData, { typing: true }],
      }
    case 'USER_NOT_TYPING':
      return {
        ...state,
        userData: [...state.userData, { typing: false }],
      }

    default:
      return state
  }
}
