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
import ProtectedRoute1 from './ProtectedRoute1'
import Closed from './components/user/Closed'
import Disable from './components/user/Disable'

function App() {
  const userInfo = useSelector((state) => state.firebase.profile)
  const authState = useSelector((state) => state.firebase.auth)
  console.log('user profile', userInfo)
  console.log('user auth', authState)

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}>
          <NavBar />
          <Home />
        </Route>
        <ProtectedRoute1 exact path="/login">
          {userInfo.closedForTheWeek && <Closed />}

          <Login />
        </ProtectedRoute1>
        <ProtectedRoute1 exact path="/signup">
          {userInfo.closedForTheWeek && <Closed />}

          <SignUp />
        </ProtectedRoute1>
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
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          {userInfo.verified === false && (
            <Redirect to="/verification/signup" />
          )}
          <ChatAuth />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/savings">
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          {userInfo.verified === false && (
            <Redirect to="/verification/signup" />
          )}
          <Savings />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/user/savings">
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          {userInfo.verified === false && (
            <Redirect to="/verification/signup" />
          )}
          <Savings />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/notifications">
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          {userInfo.verified === false && (
            <Redirect to="/verification/signup" />
          )}
          <Notifications />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/history">
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          {userInfo.verified === false && (
            <Redirect to="/verification/signup" />
          )}
          <HistoryData />
        </ProtectedRoute>
        <ProtectedRoute exact path="/savings/withdrawals">
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          {userInfo.verified === false && (
            <Redirect to="/verification/signup" />
          )}
          <SavingWithdrawal />
        </ProtectedRoute>
        <ProtectedRoute exact path="/savings/dashboard">
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          {userInfo.verified === false && (
            <Redirect to="/verification/signup" />
          )}
          {userInfo.savingsAccount ? <Funding /> : <Savings />}
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/dashboard">
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          {userInfo.verified === false && (
            <Redirect to="/verification/signup" />
          )}
          <User />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/profile">
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          {userInfo.verified === false && (
            <Redirect to="/verification/signup" />
          )}
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/user/profile">
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          {userInfo.verified === false && (
            <Redirect to="/verification/signup" />
          )}
          <Profile />
        </ProtectedRoute>

        <Route
          exact
          path="/verification/signup"
          component={AccountVerifySignup}
        />

        <ProtectedRoute exact path="/user/payments">
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          {userInfo.verified === false && (
            <Redirect to="/verification/signup" />
          )}
          <Payments />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/invest">
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          {userInfo.verified === false && (
            <Redirect to="/verification/signup" />
          )}
          <Invest />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/withdrawals">
          {userInfo.closedForTheWeek && <Closed />}
          {userInfo.disableAccount && <Disable />}
          {userInfo.verified === false && (
            <Redirect to="/verification/signup" />
          )}
          <Withdrawals />
        </ProtectedRoute>
        <Route exact component={Empty} />
      </Switch>
    </Router>
  )
}

export default App
