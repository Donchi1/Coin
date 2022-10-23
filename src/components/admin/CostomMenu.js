import React from 'react'
import { createElement } from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from '@material-ui/core'
import { MenuItemLink, getResources } from 'react-admin'
import { withRouter } from 'react-router-dom'
import LabelIcon from '@material-ui/icons/Label'
import PaymentsIcon from '@material-ui/icons/AddShoppingCart'
import WithdrawalsIcon from '@material-ui/icons/Atm'

function CostomMenu({ onMenuClick, logout }) {
  const menuClicker = (e) => {
    onMenuClick(e)

    window.location.assign('/adm/withdrawals')
  }
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'))
  const open = useSelector((state) => state.admin.ui.sidebarOpen)
  const resources = useSelector(getResources)
  return (
    <div>
      {resources.map((resource) => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          primaryText={
            (resource.options && resource.options.label) || resource.name
          }
          leftIcon={createElement(resource.icon)}
          onClick={onMenuClick}
          sidebarIsOpen={open}
        />
      ))}
      <MenuItemLink
        to="#"
        primaryText="Chat"
        leftIcon={<LabelIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        onClickCapture={() => window.location.assign('/adm/chats')}
      />
      <MenuItemLink
        to="#"
        primaryText="Withdrawals"
        leftIcon={<WithdrawalsIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        onClickCapture={() => window.location.assign('/adm/withdrawals')}
      />
      <MenuItemLink
        to="#"
        primaryText="Payments"
        leftIcon={<PaymentsIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        onClickCapture={() => window.location.assign('/adm/payments')}
      />
      {isXSmall && logout}
    </div>
  )
}

export default CostomMenu
