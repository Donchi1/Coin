import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Home from './components/navigation/Home'
import Login from './components/Auths/Login'
import SignUp from './components/Auths/SignUp'
import Pricing from './components/navigation/Pricing'
import contacts from './components/navigation/contacts'

import About from './components/navigation/About'
import './components/CSS/App.css'

import AdminPage from './components/admin/AdminPage'
import Empty from './components/navigation/Empty'
import User from './components/user/User'
import Profile from './components/user/Profile'

import { isLoaded, isEmpty } from 'react-redux-firebase'

import ForgetPassword from './components/navigation/ForgetPassword'

import Teams from './components/body/Teams'
import FAQ from './components/body/AskedQuestions'

import Features from './components/body/Features'

import Payments from './components/user/Payments'
import Withdrawals from './components/user/Withdrawals'

import { useSelector } from 'react-redux'
import Invest from './components/user/Invest'
import Savings from './components/user/Savings'
import Funding from './components/user/Funding'
import SavingWithdrawal from './components/user/SavingWithdrawal'
import Notifications from './components/user/Notifications'
import Admin from './components/admin/Admin'
import ChatAuth from './components/user/ChatAuth'
import AdminChat from './components/admin/AdminChat'

import AccountVerifySignup from './components/navigation/AccountVerifySignup'

import NavBar from './components/navigation/NavBar'
import HistoryData from './components/user/HistoryData'
import AccountVerifyLogin from './components/navigation/AccountVerifyLogin'
import ProtectedRoute from './ProtectedRoute'
import Closed from './components/user/Closed'
import Disable from './components/user/Disable'

function App() {
  const authState = useSelector((state) => state.firebase.auth)

  const userInfo = useSelector((state) => state.firebase.profile)

  const protectRoute1 = (Component) => {
    if (isLoaded(authState) && isEmpty(authState)) {
      return Component
    }
    if (
      isLoaded(authState) &&
      !isEmpty(authState) &&
      !!userInfo.verificationCode
    ) {
      return <Redirect to="/verification/login" />
    }
    return <Redirect to="/" />
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}>
          <NavBar />
          <Home />
        </Route>
        <Route exact path="/login" component={() => protectRoute1(<Login />)} />
        <Route
          exact
          path="/signup"
          component={() => protectRoute1(<SignUp />)}
        />
        <Route exact path="/pricing" component={Pricing} />
        <Route exact path="/contacts" component={contacts} />
        <Route exact path="/about" component={About} />
        <Route exact path="/features" component={Features} />
        <Route exact path="/passReset" component={ForgetPassword} />
        <Route exact path="/teams" component={Teams} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/adm" component={AdminPage} />
        <Route exact path="/admin/chats" component={AdminChat} />
        <Route exact path="/admin" component={Admin} />
        <ProtectedRoute exact path="/user/chats">
          {userInfo.verificationCode === '' && (
            <Redirect to="/verification/login" />
          )}
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          <ChatAuth />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/savings">
          {userInfo.verificationCode === '' && (
            <Redirect to="/verification/login" />
          )}
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          <Savings />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/user/savings">
          {userInfo.verificationCode === '' && (
            <Redirect to="/verification/login" />
          )}
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          <Savings />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/notifications">
          {userInfo.verificationCode === '' && (
            <Redirect to="/verification/login" />
          )}
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          <Notifications />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/history">
          {userInfo.verificationCode === '' && (
            <Redirect to="/verification/login" />
          )}
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          <HistoryData />
        </ProtectedRoute>
        <ProtectedRoute exact path="/savings/withdrawals">
          {userInfo.verificationCode === '' && (
            <Redirect to="/verification/login" />
          )}
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          <SavingWithdrawal />
        </ProtectedRoute>
        <ProtectedRoute exact path="/savings/dashboard">
          {userInfo.verificationCode === '' && (
            <Redirect to="/verification/login" />
          )}
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          {userInfo.savingsAccount ? <Funding /> : <Savings />}
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/dashboard">
          {userInfo.verificationCode === '' && (
            <Redirect to="/verification/login" />
          )}
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}

          <User />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/profile">
          {userInfo.verificationCode === '' && (
            <Redirect to="/verification/login" />
          )}
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/user/profile">
          {userInfo.verificationCode === '' && (
            <Redirect to="/verification/login" />
          )}
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          <Profile />
        </ProtectedRoute>

        <Route
          exact
          path="/verification/signup"
          render={() => {
            if (localStorage.getItem('userId')) {
              return <AccountVerifySignup />
            }
            return <Redirect to="/login" />
          }}
        />
        <Route
          exact
          path="/verification/login"
          render={() => {
            if (localStorage.getItem('userId')) {
              return <AccountVerifyLogin />
            }
            return <Redirect to="/login" />
          }}
        />
        <Route
          exact
          path="user/verification/login"
          render={() => {
            if (localStorage.getItem('userId')) {
              return <AccountVerifyLogin />
            }
            return <Redirect to="/login" />
          }}
        />
        <ProtectedRoute exact path="/user/payments">
          {userInfo.verificationCode === '' && (
            <Redirect to="/verification/login" />
          )}
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          <Payments />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/invest">
          {userInfo.verificationCode === '' && (
            <Redirect to="/verification/login" />
          )}
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          <Invest />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/withdrawals">
          {userInfo.verificationCode === '' && (
            <Redirect to="/verification/login" />
          )}
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          <Withdrawals />
        </ProtectedRoute>
        <Route component={Empty} />
      </Switch>
    </Router>
  )
}

export default App
