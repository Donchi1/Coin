import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import * as Icons from '@material-ui/icons'
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
                <a href="/">
                  <h3 className="sub-heading  little-add ml-3">
                    <span className="u-design">U</span>
                    ltimateCoins
                  </h3>
                </a>
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
                    <a href="/" className="nav-color">
                      Home
                    </a>
                  </li>
                  <li className="mega-menu">
                    <span className="opener plus"></span>
                    <Link to="#" className="nav-color">
                      Pages
                    </Link>
                    <ul className="transition">
                      <li>
                        <a href="/about" className="userTextColor">
                          About
                        </a>
                      </li>
                      <li>
                        <a href="/pricing" className="userTextColor">
                          Pricing
                        </a>
                      </li>
                      <li>
                        <a href="/contacts" className="userTextColor">
                          Contact
                        </a>
                      </li>
                      <li>
                        <a href="/faq" className="userTextColor">
                          FAQ
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="/features" className="nav-color">
                      Feature
                    </a>
                  </li>

                  <li>
                    <a href="/teams" className="nav-color">
                      Team
                    </a>
                  </li>
                  <li className="mt-2 ">
                    <div id="google_translate_element"></div>
                  </li>
                  <li className="signin d-inline-block">
                    <a href="/login" className="btn history-info">
                      Sign in
                    </a>
                  </li>
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

          <ListItem button component="a" href="/" className="side-bar-item">
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
            component="a"
            href="/about"
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.MoneySharp className="text-new" />
            </ListItemIcon>
            <ListItemText>Pricing</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            component="a"
            href="/contact"
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
          <ListItem button component="a" href="/faq" className="side-bar-item">
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
            component="a"
            href="/user/history"
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
            component="a"
            href="/user/savings"
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
          <Divider />
          {isLoaded(authState) &&
          !isEmpty(authState) &&
          userDataState?.verificationCode ? (
            <div className="text-center">
              <button className=" bg-primary btn  ">
                <ListItem button component="a" href="/user/dashboard">
                  <ListItemText className="text-light text-center uppercase">
                    DASHBOARD
                  </ListItemText>
                </ListItem>
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button className=" bg-primary btn  ">
                <ListItem button component="a" href="/login">
                  <ListItemText className="text-light text-center uppercase">
                    LOGIN
                  </ListItemText>
                </ListItem>
              </button>
            </div>
          )}
          <ListItem button component="div">
            <div id="google_translate_element"></div>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default NavBar
