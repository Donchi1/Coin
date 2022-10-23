import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdminChat from './AdminChat'
import AdminPayments from './AdminPayments'
import AdminWithdrawals from './AdminWithdrawals'

function CostomRoute() {
  return (
    <Router>
      <Switch>
        <Route exact path="/adm/chats" component={AdminChat} />
        <Route exact path="/adm/payments" component={AdminPayments} />
        <Route exact path="/adm/withdrawals" component={AdminWithdrawals} />
      </Switch>
    </Router>
  )
}

export default CostomRoute
