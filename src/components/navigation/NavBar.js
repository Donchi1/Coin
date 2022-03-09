import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import * as Icons from '@material-ui/icons'
import Translate from "../body/Translate"
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
} from '@material-ui/core'

function NavBar() {
  const authState = useSelector((state) => state.firebase.auth)
  const userDataState = useSelector((state) => state.firebase.profile)
  const fireState = useSelector((state) => state.firestore)
  const [openSlider, setOpenSlider] = useState(false)

  useFirestoreConnect([
    { collection: 'users', doc: userDataState.uid },
    { collection: 'testimonials' },
  ])

  const [smallScreen, setSmallScreen] = useState(false)

  useEffect(() => {
    const isSmall = window.matchMedia('screen and (max-width: 960px)')
    if (isSmall.matches) {
      setSmallScreen(true)
    } else {
      setSmallScreen(false)
    }
  }, [])

  return (
    <>
      <div className="transition  header-align " style={{ position: 'sticky' }}>
        <div
          className="container-fluid darkblue py-2"
          style={{ position: 'absolute', top: 0 }}
        >
          <div className="row flex-align">
            <div className="col-lg-4 col-md-3 col-8">
              <div className="logo">
                <Link to="/">
                  <h3 className="sub-heading  little-add ml-3">
                    <span className="u-design">U</span>
                    ltimateCoins
                  </h3>
                </Link>
              </div>
            </div>
            <div className="col-lg-8 col-md-9 col-4 text-right">
              <div
                className="nav-control d-lg-none d-sm-block"
                style={{ right: 0, top: 4, position: 'absolute' }}
                onClick={() => setOpenSlider(true)}
              >
                <div className="hamburger">
                  <span className="line"></span>
                  <span className="line"></span>
                  <span className="line"></span>
                </div>
              </div>
              <div className={`menu ${smallScreen && 'collapse'}`}>
                <ul className="d-flex justify-content-around align-items-center flex-sm-col">
                  <li>
                    <Link to="/" className="nav-color">
                      Home
                    </Link>
                  </li>
                  <li className="mega-menu">
                    <span className="opener plus"></span>
                    <Link to="#" className="nav-color">
                      Pages
                    </Link>
                    <ul className="transition">
                      <li>
                        <Link to="/about" className="userTextColor">
                          About
                        </Link>
                      </li>
                      <li>
                        <Link to="/pricing" className="userTextColor">
                          Plans
                        </Link>
                      </li>
                      <li>
                        <Link to="/contacts" className="userTextColor">
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link to="/faq" className="userTextColor">
                          FAQ
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/features" className="nav-color">
                      Feature
                    </Link>
                  </li>

                  <li>
                    <Link to="/teams" className="nav-color">
                      Team
                    </Link>
                  </li>

                  <li>
                    <Translate />
                  </li>

                  {!userDataState.verified ||
                  localStorage.getItem('userId') === '' ? (
                    <li className="signin d-inline-block">
                      <Link to="/login" className="btn history-info">
                        Sign in
                      </Link>
                    </li>
                  ) : (
                    <li className="signin d-inline-block">
                      <Link to="/" className="btn history-info">
                        Sign in
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer open={openSlider} onClose={() => setOpenSlider(false)}>
        <List className="bg-secondary text-light h-100">
          <div
            className="nav-control"
            style={{ right: 0, top: 20, position: 'absolute' }}
            onClick={() => setOpenSlider(false)}
          >
            <div className="hamburger">
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </div>
          </div>

          <ListItem button component={Link} to="/" className="side-bar-item">
            <ListItemIcon>
              <Icons.Home className="text-new" />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            component={Link}
          to="/about"
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.MoneySharp className="text-new" />
            </ListItemIcon>
            <ListItemText>About</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/pricing"
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.MoneySharp className="text-new" />
            </ListItemIcon>
            <ListItemText>Plans</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/contacts"
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.Message className="text-new" />
            </ListItemIcon>
            <ListItemText>Contact</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem button component={Link} to="/faq" className="side-bar-item">
            <ListItemIcon>
              <Icons.QuestionAnswerSharp className="text-new" />
            </ListItemIcon>
            <ListItemText>FAQ</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/features"
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.SecurityRounded className="text-new" />
            </ListItemIcon>
            <ListItemText>Features</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/teams"
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.PeopleAlt className="text-new" />
            </ListItemIcon>
            <ListItemText>Teams</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
           <ListItem
            button
            component={Link}
            to="/teams"
            className="side-bar-item "
          >
            
            <Translate />
           
          </ListItem>
          <Divider />
          {isLoaded(authState) &&
          !isEmpty(authState) &&
          userDataState?.verified ? (
            <div className="text-center">
              <button className=" bg-primary btn  ">
                <ListItem button component={Link} to="/user/dashboard">
                  <ListItemText className="text-light text-center uppercase">
                    DASHBOARD
                  </ListItemText>
                </ListItem>
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button className=" bg-primary btn  ">
                <ListItem button component={Link} to="/login">
                  <ListItemText className="text-light text-center uppercase">
                    LOGIN
                  </ListItemText>
                </ListItem>
              </button>
            </div>
          )}

          
        </List>
      </Drawer>
    </>
  )
}

export default NavBar
